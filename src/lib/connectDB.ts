import mongoose from "mongoose";

// Utility for timestamped logs
const log = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) { 
      log("✅ MongoDB already connected.");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string);
    log("✅ MongoDB connected successfully.");
  } catch (error) {
    log("❌ Error connecting to MongoDB:");
    console.error(error);
    // Optional: If critical, stop the app in production
    process.exit(1);
  }
};
