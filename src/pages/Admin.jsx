import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [areas, setAreas] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newArea, setNewArea] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAreas();
    fetchBookings();
  }, []);

  const fetchAreas = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/areas");
    setAreas(res.data);
  };

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/bookings");
    setBookings(res.data);
  };

  const addArea = async () => {
    if (!newArea) return;
    try {
      await axios.post("http://localhost:5000/api/admin/areas", { name: newArea });
      setMessage("Area added successfully!");
      setNewArea("");
      fetchAreas();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error adding area");
    }
  };

  const removeArea = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/areas/${id}`);
      setMessage("Area removed successfully!");
      fetchAreas();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error removing area");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {/* Areas Management */}
      <div className="mb-4">
        <h4>Manage Areas</h4>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new area"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addArea}>Add Area</button>
        </div>
        <ul className="list-group">
          {areas.map((area) => (
            <li key={area._id} className="list-group-item d-flex justify-content-between align-items-center">
              {area.name}
              <button className="btn btn-sm btn-danger" onClick={() => removeArea(area._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bookings Management */}
      <div>
        <h4>All Bookings</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Area</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.user?.name}</td>
                <td>{b.user?.email}</td>
                <td>{b.area}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>{b.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
