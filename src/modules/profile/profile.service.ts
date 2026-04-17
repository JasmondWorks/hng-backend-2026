import { ProfileRepository } from "./profile.repository";
import { AppError } from "../../utils/app-error.util";
import {
  GenderizeExternalApiResponse,
  AgifyExternalApiResponse,
  NationalizeExternalApiResponse,
  ProfileResponse,
  ProfileShortResponse,
} from "./profile.types";
import { ProfileDTO } from "./profile.dtos";

type ExternalApiName = "Genderize" | "Agify" | "Nationalize";

export class ProfileService {
  constructor(
    private readonly genderizeApi: string,
    private readonly agifyApi: string,
    private readonly nationalizeApi: string,
    private readonly profileRepo: ProfileRepository,
  ) {}

  private categorizeAge(age: number) {
    switch (true) {
      case age > 0 && age < 12:
        return "child";
      case age >= 13 && age < 19:
        return "teen";
      case age >= 20 && age < 59:
        return "young adult";
      case age >= 60:
        return "adult";
      default:
        return "unknown";
    }
  }
  private getExternalApiErrorMessage(apiName: ExternalApiName) {
    return `${apiName} API returned an invalid response`;
  }

  async createProfile(data: ProfileDTO): Promise<ProfileResponse | any> {
    try {
      const existingProfile = await this.profileRepo.findOne({
        name: data.name,
      });
      if (existingProfile) {
        return {
          message: "Profile already exists",
          data: existingProfile,
        };
      }

      const genderResponse = await fetch(
        `${this.genderizeApi}/?name=${data.name}`,
      );
      if (!genderResponse.ok)
        throw new AppError(this.getExternalApiErrorMessage("Genderize"), 500);

      const ageResponse = await fetch(`${this.agifyApi}/?name=${data.name}`);
      if (!ageResponse.ok)
        throw new AppError(this.getExternalApiErrorMessage("Agify"), 500);

      const countryResponse = await fetch(
        `${this.nationalizeApi}/?name=${data.name}`,
      );
      if (!countryResponse.ok)
        throw new AppError(this.getExternalApiErrorMessage("Nationalize"), 500);

      const genderResponseData =
        (await genderResponse.json()) as GenderizeExternalApiResponse;
      const ageResponseData =
        (await ageResponse.json()) as AgifyExternalApiResponse;
      const countryResponseData =
        (await countryResponse.json()) as NationalizeExternalApiResponse;

      if (genderResponseData.gender === null)
        throw new AppError(this.getExternalApiErrorMessage("Genderize"), 502);
      if (ageResponseData.age === null)
        throw new AppError(this.getExternalApiErrorMessage("Agify"), 502);
      if (countryResponseData.country.length === 0)
        throw new AppError(this.getExternalApiErrorMessage("Nationalize"), 502);

      const payload = {
        name: data.name,
        gender: genderResponseData.gender,
        gender_probability: genderResponseData.probability,
        sample_size: genderResponseData.count,

        age: ageResponseData.age,
        age_group: this.categorizeAge(ageResponseData.age),

        country_id: countryResponseData.country[0]!.country_id,
        country_probability: countryResponseData.country[0]!.probability,
      };

      const newProfile = await this.profileRepo.create(payload);

      return newProfile;
    } catch (err) {
      console.error("Fetch failed:", err);
      throw new AppError("Upstream or server failure", 502);
    }
  }

  async getProfileByName(name: string) {
    const existingProfile = await this.profileRepo.findOne({ name });
    if (!existingProfile) {
      throw new AppError("Profile not found", 404);
    }
    return existingProfile;
  }
  async getProfileById(id: string) {
    const existingProfile = await this.profileRepo.findById(id);
    if (!existingProfile) {
      throw new AppError("Profile not found", 404);
    }
    return existingProfile;
  }
  async getAllProfiles() {
    const existingProfiles = await this.profileRepo.findAll();
    if (!existingProfiles) {
      throw new AppError("Profiles not found", 404);
    }

    const payload = existingProfiles.map((profile: any) => {
      return {
        id: profile.id,
        name: profile.name,
        gender: profile.gender,
        age: profile.age,
        age_group: profile.age_group,
        country_id: profile.country_id,
      } as ProfileShortResponse;
    });

    return payload;
  }

  async deleteProfile(id: string) {
    const existingProfile = await this.profileRepo.findById(id);
    if (!existingProfile) {
      throw new AppError("Profile not found", 404);
    }
    await this.profileRepo.delete(id);

    return;
  }
}
