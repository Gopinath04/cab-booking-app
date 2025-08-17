import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Booking() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchAreas() {
      const res = await axios.get("http://localhost:5000/api/bookings/areas");
      setAreas(res.data.areas);
    }
    fetchAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For demo, pick first cab in area (or you can extend to select cab)
      const cabsRes = await axios.get(`http://localhost:5000/api/bookings/areas`);
      const cabId = null; // Replace with actual cab id from backend if needed

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post("http://localhost:5000/api/bookings/book", {
        userId: user._id,
        cabId,
        date,
        time,
      });

      setMessage(res.data.message);
      setDate("");
      setTime("");
      setSelectedArea("");
    } catch (err) {
      setMessage(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Book a Cab</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Area</label>
          <select className="form-select" value={selectedArea} onChange={e => setSelectedArea(e.target.value)} required>
            <option value="">Select Area</option>
            {areas.map((area, i) => (
              <option key={i} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Time</label>
          <input type="time" className="form-control" value={time} onChange={e => setTime(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100">Book Cab</button>
      </form>
    </div>
  );
}
