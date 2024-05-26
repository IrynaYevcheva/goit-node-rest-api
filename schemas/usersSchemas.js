import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});
