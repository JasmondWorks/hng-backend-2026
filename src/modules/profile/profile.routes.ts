import { Router } from "express";
import { envConfig } from "../../config/env.config";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { ProfileRepository } from "./profile.repository";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { createProfileValidator } from "./profile.validators";

const router: Router = Router();

const profileRepo: ProfileRepository = new ProfileRepository();
const profileService: ProfileService = new ProfileService(
  envConfig.genderizeApiUrl,
  envConfig.agifyApiUrl,
  envConfig.nationalizeApiUrl,
  profileRepo,
);
const profileController: ProfileController = new ProfileController(
  profileService,
);

router.post(
  "/",
  createProfileValidator,
  validateRequest,
  profileController.createProfile.bind(profileController),
);
router.get("/:id", profileController.getProfileById.bind(profileController));
router.get("/", profileController.getAllProfiles.bind(profileController));
router.delete("/:id", profileController.deleteProfile.bind(profileController));

export default router;
