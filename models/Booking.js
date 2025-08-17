import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cabId: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
  date: Date,
  time: String,
});

export default mongoose.model("bookings", bookingSchema);
