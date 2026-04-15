import { query } from "express-validator";

export const classifyNameValidator = [
  query("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .custom((value) => {
      if (typeof value !== "string") {
        throw new Error("Name is not a string");
      }
      return true;
    })
    .bail()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .matches(/^[A-Za-z\s\-']+$/)
    .withMessage("Name is not a string"),
];
