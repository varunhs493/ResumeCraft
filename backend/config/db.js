import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://varunhs493:resume123@cluster0.kb16fc8.mongodb.net/RESUME')
  .then(() => 
    console.log("MongoDB connected successfully"));
}