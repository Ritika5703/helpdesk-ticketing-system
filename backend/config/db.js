import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1); // Exit if database fails to connect
  }
};

export default connectDb;
