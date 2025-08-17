// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import bookingRoutes from "./routes/booking.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cabapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User model (for demo, move to models/User.js in production)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Booking model (for demo, move to models/Booking.js in production)
const bookingSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  pickupDate: String,
  pickupTime: String,
  passengers: String,
  pickupLocation: String,
  dropLocation: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Added userId field
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

// GET all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// UPDATE user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;
    console.log('Update request:', req.body); // Debug log
    if (typeof mobile === 'undefined') {
      return res.status(400).json({ error: "Mobile number is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, mobile },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// POST /api/bookings - Create a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    console.log('Booking request body:', req.body); // Debug log
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error('Booking insert error:', err); // Debug log
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// GET /api/bookings - Get all bookings or filter by userId
app.get("/api/bookings", async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.setHeader('Content-Type', 'application/json');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Cab Booking API is running 🚖");
});

// Mount routes
app.use("/api/auth", authRoutes);       // Signup/Login
app.use("/api/admin", adminRoutes);     // Admin routes (areas, contacts)
app.use("/api/booking", bookingRoutes); // Booking routes (areas, book cab)

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
