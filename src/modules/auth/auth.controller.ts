import { NextFunction, type Request, type Response } from "express";
import { AuthService } from "./auth.service";
import { sendSuccess } from "../../utils/api-response.util";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   async register(req: Request, res: Response, next: NextFunction) {
  //     const result = await this.authService.register(req.body);
  //     sendSuccess(res, result, { statusCode: 201 });
  //   }
  //   async login(req: Request, res: Response, next: NextFunction) {
  //     const result = await this.authService.login(req.body);
  //     sendSuccess(res, result, { statusCode: 200 });
  //   }

  async githubLogin(req: Request, res: Response) {
    const result = await this.authService.githubLogin(req.body);
    sendSuccess(res, result, { statusCode: 200 });
  }
}
