import { Router } from "express";
import { envConfig } from "../../config/env.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { asyncHandler } from "../../utils/async-handler.util";

const router = Router();

const authService = new AuthService(
  envConfig.githubLoginUrl,
  envConfig.githubAccessTokenUrl,
  envConfig.githubUserUrl,
  envConfig.githubClientId,
  envConfig.githubClientSecret,
  envConfig.githubCallbackUrl,
  envConfig.githubState,
);
const authController = new AuthController(authService);

// router.post(
//   "/register",
//   asyncHandler(authController.register.bind(authController)),
// );
// router.post("/login", asyncHandler(authController.login.bind(authController)));

router.get(
  "/github",
  asyncHandler(authController.githubLogin.bind(authController)),
);
router.get(
  "/github/callback",
  asyncHandler(authController.githubLogin.bind(authController)),
);
router.post(
  "/refresh",
  asyncHandler(authController.githubLogin.bind(authController)),
);
router.post(
  "/logout",
  asyncHandler(authController.githubLogin.bind(authController)),
);

export default router;
