import { Router } from "express";
import {
  LoginController,
  SignUpController,
} from "../controllers/userController.mjs";
import { createUserValidationSchema } from "../../utils/validationSchemas.mjs";
import { checkSchema } from "express-validator";

const router = Router();
router.post("/login", LoginController);
router.post(
  "/signup",
  checkSchema(createUserValidationSchema),
  SignUpController
);

export default router;
