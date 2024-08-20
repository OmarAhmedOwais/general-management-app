export interface ILog extends Document {
    timestamp: Date;
    level: string;
    message: string;
    context: string;
  }