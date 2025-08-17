const express = require("express");
const Booking = require("../models/Booking");
const Cab = require("../models/Area");
const router = express.Router();

// Get all available areas
router.get("/areas", async (req, res) => {
  try {
    const areas = await Cab.find().distinct("area");
    res.json({ areas });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Book a cab
router.post("/book", async (req, res) => {
  try {
    const { userId, cabId, date, time } = req.body;
    const booking = new Booking({ userId, cabId, date, time });
    await booking.save();
    res.json({ message: "Cab booked successfully", booking });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
