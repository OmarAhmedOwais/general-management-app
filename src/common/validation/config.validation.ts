import joi from "joi";
import { IConfig } from "../../data/types";

export const envVarsSchema = joi
  .object<IConfig>({
    PORT: joi.number().required(),
    //NODE_ENV: joi.string().valid("development", "production").required(),
    BCRYPT_SALT: joi.string().required(),
    CORS_ORIGIN: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
  })
  .unknown(true);