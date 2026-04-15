import { AppError } from "../../utils/app-error.util";
import {
  ClassifyApiResponseDTO,
  ClassifyQueryDTO,
  ClassifyResponseDTO,
} from "./classify.dtos";

export class ClassifyService {
  constructor(private genderizeApi: string) {}

  async classifyName(data: ClassifyQueryDTO): Promise<ClassifyResponseDTO> {
    let response: Response;

    const serverErrorMessage = "Upstream or server failure";

    try {
      response = await fetch(`${this.genderizeApi}/?name=${data.name}`);
    } catch (err) {
      console.error("Fetch failed:", err);
      throw new AppError(serverErrorMessage, 502);
    }

    if (!response.ok) {
      throw new AppError(serverErrorMessage, 500);
    }

    const res: ClassifyApiResponseDTO = (await response.json()) as any;

    const sample_size = res.count;

    const payload = {
      name: res.name,
      gender: res.gender,
      probability: res.probability,
      sample_size,
      is_confident: res.probability > 0.7 && sample_size >= 100,
    };

    return payload;
  }
}
