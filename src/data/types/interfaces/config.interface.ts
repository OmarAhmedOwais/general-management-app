export interface IConfig {
    PORT: number;
    MONGO_URI: string;
    DB_NAME: string;
    NODE_ENV: 'development' | 'production';
    BCRYPT_SALT: string;
    CORS_ORIGIN: string;
    COOKIE_SECRET: string;
    COOKIE_NAME: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_EXPIRE_GUEST: string;
    APP_URL: string;
}
  