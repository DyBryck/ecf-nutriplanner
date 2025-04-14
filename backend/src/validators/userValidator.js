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
  email: emailSchema.required().messages({
    "any.required": "La clé email est requis",
  }),
  password: passwordSchema.required().messages({
    "any.required": "La clé mot de passe est requis",
  }),
}).options({ abortEarly: false, stripUnknown: true });

const createUserSchema = Joi.object({
  first_name: firstNameSchema.required().messages({
    "any.required": "La clé prénom est requis",
  }),
  email: emailSchema.required().messages({
    "any.required": "La clé email est requis",
  }),
  password: passwordSchema.required().messages({
    "any.required": "La clé mot de passe est requis",
  }),
  weight: weightSchema.required().messages({
    "any.required": "La clé poids est requis",
  }),
  body_fat_percentage: bodyFatSchema.required().messages({
    "any.required": "La clé taux de masse grasse est requis",
  }),
  activity_level: activityLevelSchema.required().messages({
    "any.required": "La clé niveau d'activité est requis",
  }),
}).options({ abortEarly: false, stripUnknown: true });

const updateUserSchema = Joi.object({
  first_name: firstNameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  weight: weightSchema.optional(),
  body_fat_percentage: bodyFatSchema.optional(),
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
