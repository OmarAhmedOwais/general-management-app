import Joi from 'joi';
import { IConfig } from '../../data/types';

export const envVarsSchema = Joi.object<IConfig>({
  PORT: Joi.number().required(),
  BCRYPT_SALT: Joi.string().required(),
  CORS_ORIGIN: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
}).unknown(true);