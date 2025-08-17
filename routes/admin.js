import express from "express";
import Area from "../models/Area.js";

const router = express.Router();

// Get all areas
router.get("/areas", async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch areas" });
  }
});

// Add a new area
router.post("/areas", async (req, res) => {
  try {
    console.log("POST /areas body:", req.body); // Debug log
    const { name, fare } = req.body;
    const area = new Area({ name, fare });
    await area.save();
    res.status(201).json(area);
  } catch (err) {
    console.error("Error adding area:", err); // Debug log
    res.status(400).json({ error: "Failed to add area" });
  }
});

// Update an area
router.put("/areas/:id", async (req, res) => {
  try {
    const { name, fare } = req.body;
    const area = await Area.findByIdAndUpdate(req.params.id, { name, fare }, { new: true });
    res.json(area);
  } catch (err) {
    res.status(400).json({ error: "Failed to update area" });
  }
});

// Delete an area
router.delete("/areas/:id", async (req, res) => {
  try {
    await Area.findByIdAndDelete(req.params.id);
    res.json({ message: "Area deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete area" });
  }
});

// Bulk add areas
router.post("/areas/bulk", async (req, res) => {
  try {
    const { areas } = req.body; // expects: { areas: ["Area1", "Area2", ...] }
    if (!Array.isArray(areas) || areas.length === 0) {
      return res.status(400).json({ error: "Areas array is required" });
    }
    const areaDocs = areas.map(name => ({ name }));
    const result = await Area.insertMany(areaDocs);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: "Failed to add areas in bulk" });
  }
});

export default router;