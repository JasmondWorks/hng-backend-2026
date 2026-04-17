import { stringBodyValidator } from "../../common/constants/validators";

export const createProfileValidator = stringBodyValidator(
  "name",
  "Name is required",
);
