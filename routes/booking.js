import express from "express";
import Booking from "../models/Booking.js";
import Area from "../models/Area.js";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Get all available areas
router.get("/areas", async (req, res) => {
  try {
    // Use 'name' field instead of 'area'
    const areas = await Area.find().distinct("name");
    res.json({ areas });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Book a cab (single route, ensures userId is stored as ObjectId)
router.post("/bookings", async (req, res) => {
  try {
    const { userId, name, mobile, email, pickupDate, pickupTime, passengers, pickupLocation, dropLocation } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required for booking." });
    }
    const bookingData = {
      userId: mongoose.Types.ObjectId(userId),
      name,
      mobile,
      email,
      pickupDate,
      pickupTime,
      passengers,
      pickupLocation,
      dropLocation
    };
    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
