import { Model } from "mongoose";
import { AppError } from "../../utils/app-error.util";
import { IRepository } from "./base.repository.interface";

export abstract class BaseRepository<T, CreateInput, UpdateInput>
  implements IRepository<T, CreateInput, UpdateInput>
{
  constructor(protected readonly model: Model<any>) {}

  protected toEntity(doc: any): T {
    const obj = doc.toObject ? doc.toObject() : { ...doc };
    const { _id, __v, ...rest } = obj;
    return { id: _id.toString(), ...rest } as T;
  }

  private guardId(err: any): never {
    if (err.name === "CastError" && err.kind === "ObjectId")
      throw new AppError(`Invalid id: ${err.value}`, 400);
    throw err;
  }

  async findById(id: string): Promise<T | null> {
    try {
      const doc = await this.model.findById(id);
      return doc ? this.toEntity(doc) : null;
    } catch (err) {
      this.guardId(err);
    }
  }

  async findAll(): Promise<T[]> {
    const docs = await this.model.find();
    return docs.map((doc) => this.toEntity(doc));
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    const doc = await this.model.findOne(filter as any);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: CreateInput): Promise<T> {
    const doc = await this.model.create(data as any);
    return this.toEntity(doc);
  }

  async update(id: string, data: UpdateInput): Promise<T | null> {
    try {
      const doc = await this.model.findByIdAndUpdate(id, data as any, { new: true });
      return doc ? this.toEntity(doc) : null;
    } catch (err) {
      this.guardId(err);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (err) {
      this.guardId(err);
    }
  }
}
