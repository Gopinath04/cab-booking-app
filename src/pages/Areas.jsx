import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Areas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/areas");
        setAreas(res.data.areas);
      } catch (err) {
        console.error("Error fetching areas:", err);
      }
    }
    fetchAreas();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Available Cab Areas</h2>
      <ul className="list-group mt-3">
        {areas.map((area, index) => (
          <li key={index} className="list-group-item">{area}</li>
        ))}
      </ul>
    </div>
  );
}
