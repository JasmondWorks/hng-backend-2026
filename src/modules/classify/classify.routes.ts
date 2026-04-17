import { Router } from "express";
import { envConfig } from "../../config/env.config";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { ClassifyController } from "./classify.controller";
import { ClassifyService } from "./classify.service";
import { classifyNameValidator } from "./classify.validators";

const router: Router = Router();

const classifyService: ClassifyService = new ClassifyService(
  envConfig.genderizeApiUrl,
);
const classifyController: ClassifyController = new ClassifyController(
  classifyService,
);

router.get(
  "/",
  classifyNameValidator,
  validateRequest,
  classifyController.classifyName.bind(classifyController),
);

export default router;
