import mongoose from 'mongoose';
import 'colors';
import { config } from './config';
import { logger } from '@/common/utils'; // Import the logger

class Database {
  private static instance: mongoose.Connection;

  private constructor() {}

  public static getInstance(): mongoose.Connection {
    if (!Database.instance) {
      mongoose.set('strictQuery', true); // Add this line
      mongoose.connect(config.MONGO_URI!, { dbName: config.DB_NAME })
        .then(() => {
          logger.info('MongoDB connected successfully', { context: 'Database' });
        })
        .catch((error) => {
          logger.error('MongoDB connection failed', { context: 'Database' });
          logger.error(`${error.message}`, { context: 'Database' });
          process.exit(1); // exit the process if the connection fails
        });

      Database.instance = mongoose.connection;

      Database.instance.on('disconnected', () => {
        logger.warn('MongoDB connection lost. Reconnecting...', { context: 'Database' });
        Database.getInstance();
      });
    }
    return Database.instance;
  }
}

export default Database;
