import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectToDb() {
  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: process.env.MONGO_DB_NAME,
  });
  console.log("MongoDB connected");
}
