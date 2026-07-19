import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/creatorai';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info('✅ MongoDB Connected Successfully');
    return mongoose.connection;
  } catch (error) {
    logger.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('✅ MongoDB Disconnected');
  } catch (error) {
    logger.error('❌ MongoDB Disconnection Failed:', error.message);
  }
};

export { connectDB, disconnectDB };
