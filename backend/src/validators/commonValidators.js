import Joi from "joi";

export const firstNameSchema = Joi.string().trim().min(2).max(30).required().messages({
  "string.base": "Le prénom doit être une chaîne de caractères",
  "string.min": "Le prénom doit contenir au moins 2 caractères",
  "string.max": "Le prénom ne doit pas dépasser 30 caractères",
  "string.empty": "Le prénom ne peut être vide",
  "any.required": "Le prénom est requis",
});

export const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .trim()
  .required()
  .messages({
    "string.email": "L'email doit être une adresse email valide",
    "string.empty": "L'email ne peut être vide",
    "any.required": "L'email est requis",
  });

export const passwordSchema = Joi.string().trim().min(8).required().messages({
  "string.base": "Le mot de passe doit être une chaîne de caractères",
  "string.empty": "Le mot de passe ne peut être vide",
  "string.min": "Le mot de passe doit contenir au moins 8 caractères",
  "any.required": "Le mot de passe est requis",
});

export const weightSchema = Joi.number().min(30).max(300).required().messages({
  "number.base": "Le poids doit être un nombre",
  "number.min": "Le poids ne peut être inférieur à 30kg",
  "number.max": "Le poids ne peut dépasser 300kg",
  "any.required": "Le poids est requis",
});

export const bodyFatSchema = Joi.number().min(3).max(32).required().messages({
  "number.base": "Le pourcentage de masse grasse doit être un nombre",
  "number.min": "Le pourcentage de masse grasse ne peut être inférieur à 3%",
  "number.max": "Le pourcentage de masse grasse ne peut dépasser 32%",
  "any.required": "Le pourcentage de masse grasse est requis",
});

export const activityLevelSchema = Joi.number().integer().min(1).max(5).required().messages({
  "number.base": "Le niveau d'activité doit être un nombre",
  "number.integer": "Le niveau d'activité doit être un entier",
  "number.min": "Le niveau d'activité minimum est 1",
  "number.max": "Le niveau d'activité maximum est 5",
  "any.required": "Le niveau d'activité est requis",
});
