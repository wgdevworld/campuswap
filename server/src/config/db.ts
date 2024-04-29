import mongoose from "mongoose";

const DB_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/campuswap";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
