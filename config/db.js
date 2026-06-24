const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI?.startsWith("mongodb+srv://")) {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      console.log("DNS servers set to Google/Cloudflare for SRV resolution");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    // console.log("MONGO_URI =", process.env.MONGO_URI);
  }
};

module.exports = connectDB;