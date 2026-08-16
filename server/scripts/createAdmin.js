require("dotenv").config();

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const createOrUpdateAdmin = async () => {
  try {
    await connectDB();

    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin email and password are required in .env");
    }

    const email = ADMIN_EMAIL.toLowerCase().trim();

    let admin = await Admin.findOne({ email }).select("+password");

    if (admin) {
      // Update existing admin
      admin.name = ADMIN_NAME || "Perfect Tailors Admin";
      admin.password = ADMIN_PASSWORD;

      await admin.save();

      console.log("Admin account updated successfully");
    } else {
      // Create new admin
      await Admin.create({
        name: ADMIN_NAME || "Perfect Tailors Admin",
        email,
        password: ADMIN_PASSWORD,
      });

      console.log("Admin account created successfully");
    }

    process.exit(0);
  } catch (error) {
    console.error("Admin creation/update failed:", error.message);
    process.exit(1);
  }
};

createOrUpdateAdmin();