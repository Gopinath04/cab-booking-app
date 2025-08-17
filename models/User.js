import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // user or admin
    mobile: { type: String }, // new field for mobile number
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

export default mongoose.model("User", userSchema);
