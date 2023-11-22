import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();

export function connectDB () {
  return mongoose.connect(process.env.DATABASE_URL)
}
