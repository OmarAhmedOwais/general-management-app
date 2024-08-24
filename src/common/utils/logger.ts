import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { validateEnv } from './config';

const {error , value : config}=validateEnv(process.env)
if(error){
  throw new Error(`Config validation error: ${error.message}`);
}
// Custom format for logging
const nestLikeFormat = winston.format.printf(
  ({ timestamp, level, message, context }) => {
    return `${timestamp} [${level}] ${context || 'Application'} - ${message}`;
  },
);

// Determine log directory (relative to the project root)
const logsDirectory = path.resolve(__dirname, '../../../logs/');

// Logger configuration
export const logger = winston.createLogger({
  level: 'debug' ,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    nestLikeFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        nestLikeFormat,
      ),
    }),
    // Add DailyRotateFile transport for production
      new DailyRotateFile({
        filename: path.join(logsDirectory, 'app-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxFiles: '7d', // Rotate logs daily and keep up to 7 days worth of logs
        utc: true,
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          nestLikeFormat,
        ),
      }),
  ].filter(Boolean) as winston.transport[],
});

export default logger;
