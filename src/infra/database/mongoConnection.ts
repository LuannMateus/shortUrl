import mongoose from 'mongoose';
import config from '../../config/config';

export class MongoConnection {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(config.MONGO_URL);
      console.log('Database is connected with success!');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
