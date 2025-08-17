import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // if using react-router

export default function Admin() {
  const [areas, setAreas] = useState([]);
 //onst [bookings, setBookings] = useState([]);
  const [newArea, setNewArea] = useState("");
  const [newFare, setNewFare] = useState("");
  const [message, setMessage] = useState("");
  const [editAreaId, setEditAreaId] = useState(null);
  const [editAreaName, setEditAreaName] = useState("");
  const [editAreaFare, setEditAreaFare] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // No token check or redirect
    fetchAreas();
   //etchBookings();
  }, [navigate]);

  const fetchAreas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/areas");
      setAreas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchBookings = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/admin/bookings");
  //     setBookings(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // The backend API should store new areas in the 'cabapp' database, 'areas' collection
  const addArea = async () => {
    if (!newArea || !newFare) return;
    try {
      await axios.post(
        "http://localhost:5000/api/admin/areas",
        { name: newArea, fare: newFare }
      );
      setMessage("Area added successfully!");
      setNewArea("");
      setNewFare("");
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

  const startEditArea = (area) => {
    setEditAreaId(area._id);
    setEditAreaName(area.name);
    setEditAreaFare(area.fare || "");
  };

  const cancelEditArea = () => {
    setEditAreaId(null);
    setEditAreaName("");
    setEditAreaFare("");
  };

  const updateArea = async (id) => {
    if (!editAreaName || !editAreaFare) return;
    try {
      await axios.put(`http://localhost:5000/api/admin/areas/${id}`, { name: editAreaName, fare: editAreaFare });
      setMessage("Area updated successfully!");
      setEditAreaId(null);
      setEditAreaName("");
      setEditAreaFare("");
      fetchAreas();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error updating area");
    }
  };

  return (
    <div className="container mt-4">
      {/* <h2>Admin Dashboard</h2> */}
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
          <input
            type="number"
            className="form-control"
            placeholder="Enter fare"
            value={newFare}
            onChange={(e) => setNewFare(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addArea}>Add Area</button>
        </div>
        <ul className="list-group">
          {areas.map((area) => (
            <li key={area._id} className="list-group-item d-flex justify-content-between align-items-center">
              {editAreaId === area._id ? (
                <>
                  <input
                    type="text"
                    className="form-control me-2"
                    value={editAreaName}
                    onChange={(e) => setEditAreaName(e.target.value)}
                    style={{ maxWidth: 200, display: 'inline-block' }}
                  />
                  <input
                    type="number"
                    className="form-control me-2"
                    value={editAreaFare}
                    onChange={(e) => setEditAreaFare(e.target.value)}
                    style={{ maxWidth: 120, display: 'inline-block' }}
                  />
                  <button className="btn btn-sm btn-success me-2" onClick={() => updateArea(area._id)}>Update</button>
                  <button className="btn btn-sm btn-secondary" onClick={cancelEditArea}>Cancel</button>
                </>
              ) : (
                <>
                  {area.name} <span className="badge bg-info ms-2">Fare: {area.fare ?? '-'}</span>
                  <div>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => startEditArea(area)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => removeArea(area._id)}>Remove</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Areas Table */}
      <div className="mt-4">
        <h5>Areas Table</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area._id}>
                {/* <td>{area._id}</td> */}
                <td>{area.name}</td>
                <td>{area.fare ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bookings Management */}
      {/* <div>
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
      </div> */}
    </div>
  );
}
