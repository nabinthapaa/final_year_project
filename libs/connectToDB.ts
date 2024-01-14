import mongoose from "mongoose";

export function ConnectToDB() {
  try {
    const res = mongoose.connect(process.env.MONGODB_URL || "");
    console.log("Connected to Database");
  } catch (error) {
    return error;
  }
}
