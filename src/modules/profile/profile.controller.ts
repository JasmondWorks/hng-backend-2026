import { Request, Response } from "express";
import { sendSuccess } from "../../utils/api-response.util";
import { AppError } from "../../utils/app-error.util";
import { ProfileDTO } from "./profile.dtos";
import { ProfileService } from "./profile.service";

export class ProfileController {
  constructor(private readonly classifyService: ProfileService) {}

  async createProfile(req: Request, res: Response) {
    const data: ProfileDTO = req.body;

    const result = await this.classifyService.createProfile(data);

    if (result.message === "Profile already exists") {
      res.status(200).json({
        status: "success",
        message: result.message,
        data: result.data,
      });
      return;
    }

    res.status(201).json({
      status: "success",
      data: result,
    });
  }
  async getProfileById(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.classifyService.getProfileById(id as string);

    res.status(200).json({
      status: "success",
      data: result,
    });
  }
  async getAllProfiles(_: Request, res: Response) {
    const result = await this.classifyService.getAllProfiles();

    res.status(200).json({
      status: "success",
      data: result,
    });
  }
  async deleteProfile(req: Request, res: Response) {
    const { id } = req.params;

    await this.classifyService.deleteProfile(id as string);

    res.status(204).send();
  }
}
