import express from "express";
import Booking from "../models/Booking.js";
import Area from "../models/Area.js";

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

// ✅ Book a cab
router.post("/bookings", async (req, res) => {
  try {
    const {name, mobile, email, pickupDate, pickupTime, passengers, pickupLocation, dropLocation} = req.body;

    // Optional: validate that area exists
    // const area = await Area.findById(areaId);
    // if (!area) return res.status(400).json({ error: "Invalid area selected" });

    const booking = new Booking({ name, mobile, email, pickupDate, pickupTime, passengers, pickupLocation, dropLocation });
    await booking.save();

    res.json({ message: "Cab booked successfully", booking });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /bookings - Book a cab (for frontend form)
router.post("/bookings", async (req, res) => {
  try {
    const { name, mobile, email, pickupDate, pickupTime, passengers, pickupLocation, dropLocation } = req.body;
    const booking = new Booking({ name, mobile, email, pickupDate, pickupTime, passengers, pickupLocation, dropLocation });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
