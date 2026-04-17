import { BaseRepository } from "../../common/repositories/base.repository";
import { CreateProfileDTO, UpdateProfileDTO } from "./profile.dtos";
import { ProfileModel } from "./profile.model";
import { Profile } from "./profile.types";

export class ProfileRepository extends BaseRepository<
  Profile,
  CreateProfileDTO,
  UpdateProfileDTO
> {
  constructor() {
    super(ProfileModel);
  }

  async findByName(name: string): Promise<Profile | null> {
    const doc = await ProfileModel.findOne({ name });
    return doc ? this.toEntity(doc) : null;
  }
}
