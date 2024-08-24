// src/common/config/config.ts
import { IConfig } from '../../data/types';
import logger from '../utils/logger';
import { validateEnv } from '../utils/config'; // Ensure the correct path

class ConfigSingleton {
  private static instance: IConfig;

  private constructor() {}

  public static getInstance(): IConfig {
    if (!ConfigSingleton.instance) {
      const { error, value } = validateEnv(process.env);
      if (error) {
        logger.error(`Config validation error: ${error.message}`, {
          context: 'Config',
        }); // Log the error
        throw new Error(`Config validation error: ${error.message}`);
      }

      logger.info('Configuration loaded successfully', { context: 'Config' }); // Log successful loading of configuration

      ConfigSingleton.instance = value;
    }
    return ConfigSingleton.instance;
  }
}

export const config: IConfig = ConfigSingleton.getInstance();