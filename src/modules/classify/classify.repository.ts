import { BaseRepository } from "../../common/repositories/base.repository";
import { CreateClassificationDTO, UpdateClassificationDTO } from "./classify.dtos";
import { ClassificationModel } from "./classify.model";
import { Classification } from "./classify.types";

export class ClassificationRepository extends BaseRepository<
  Classification,
  CreateClassificationDTO,
  UpdateClassificationDTO
> {
  constructor() {
    super(ClassificationModel);
  }

  async findByName(name: string): Promise<Classification | null> {
    const doc = await ClassificationModel.findOne({ name });
    return doc ? this.toEntity(doc) : null;
  }
}
