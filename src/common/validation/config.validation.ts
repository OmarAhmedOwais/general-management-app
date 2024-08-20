import joi from "joi";
import { IConfig } from "@/data/types";

export const envVarsSchema = joi
  .object<IConfig>({
    PORT: joi.number().required(),
    MONGO_URI: joi.string().required(),
    DB_NAME: joi.string().required(),
    NODE_ENV: joi.string().valid("development", "production").required(),
    BCRYPT_SALT: joi.string().required(),
    CORS_ORIGIN: joi.string().required(),
    COOKIE_SECRET: joi.string().required(),
    COOKIE_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    JWT_EXPIRE_GUEST: joi.string().required(),
    APP_URL: joi.string().required(),
    AWS_REGION: joi.string().optional(),
    AWS_ACCESS_KEY_ID: joi.string().optional(),
    AWS_SECRET_ACCESS_KEY: joi.string().optional(),
    AWS_S3_BUCKET_NAME: joi.string().optional(),
  })
  .unknown(true);