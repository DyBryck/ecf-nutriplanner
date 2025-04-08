import Joi from "joi";
import { ValidationError } from "../errors/customErrors.js";
import {
  activityLevelSchema,
  bodyFatSchema,
  emailSchema,
  firstNameSchema,
  passwordSchema,
  weightSchema,
} from "./commonValidators.js";

const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
}).options({ abortEarly: false, stripUnknown: true });

const createUserSchema = Joi.object({
  first_name: firstNameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
  weight: weightSchema.required(),
  body_fat: bodyFatSchema.required(),
  activity_level: activityLevelSchema.required(),
}).options({ abortEarly: false, stripUnknown: true });

const updateUserSchema = Joi.object({
  first_name: firstNameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  weight: weightSchema.optional(),
  body_fat: bodyFatSchema.optional(),
  activity_level: activityLevelSchema.optional(),
})
  .min(1)
  .options({ abortEarly: false, stripUnknown: true });

export const validateUser = (data, method) => {
  let result;

  switch (method) {
    case "post":
      result = createUserSchema.validate(data);
      break;
    case "put":
      result = updateUserSchema.validate(data);
      break;
    case "login":
      result = loginSchema.validate(data);
      break;
    default:
      throw new ValidationError("Méthode de validation non reconnue");
  }

  const { error, value } = result;

  if (error) throw new ValidationError(error.details.map((err) => err.message).join(", "));

  return value;
};
