import express from "express";
import Area from "../models/Area.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Add a new area
router.post("/areas", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Area name is required" });

    const existing = await Area.findOne({ name });
    if (existing) return res.status(400).json({ error: "Area already exists" });

    const newArea = new Area({ name });
    await newArea.save();
    res.json({ message: "Area added successfully", area: newArea });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all areas
router.get("/areas", async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete an area
router.delete("/areas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Area.findByIdAndDelete(id);
    res.json({ message: "Area removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all bookings (populate user info)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
