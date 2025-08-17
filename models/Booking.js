import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  pickupDate: { type: String, required: true },
  pickupTime: { type: String, required: true },
  passengers: { type: String, required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("bookings", bookingSchema);
