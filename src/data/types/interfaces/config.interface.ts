export interface IConfig {
    PORT: number;
    // NODE_ENV: 'development' | 'production';
    BCRYPT_SALT: string;
    CORS_ORIGIN: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
}
  