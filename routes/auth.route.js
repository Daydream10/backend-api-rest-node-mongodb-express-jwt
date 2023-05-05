import express from 'express'
import { login, register } from "../controllers/auth.controller.js"
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
const router = express.Router()


router.post('/register', [
  body("email", "Wrong email format")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password must have 6 or more characters")
    .trim()
    .isLength({ min: 6 }),
  body("password", "Wrong Password format")
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Passwords don't match");
      }
      return value;
    })

], validationResultExpress,
  register);
router.post("/login", [
  body("email", "Wrong email format")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password must have 6 or more characters")
    .trim()
    .isLength({ min: 6 }),
],
  validationResultExpress,
  login);
export default router;