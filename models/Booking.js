const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cabId: { type: mongoose.Schema.Types.ObjectId, ref: "Cab" },
  date: Date,
  time: String,
  status: { type: String, default: "Booked" },
});

module.exports = mongoose.model("Booking", bookingSchema);
