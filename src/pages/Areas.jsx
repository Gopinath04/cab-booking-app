import React, { useEffect, useState } from "react";
import axios from "axios";
import InnerBanner from "../components/innerbanner";

export default function Areas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/areas");
        setAreas(res.data);
      } catch (err) {
        console.error("Error fetching areas:", err);
      }
    }
    fetchAreas();
  }, []);

   const bannerdata = {
   title: "Areas",
   navtext: "Manage your cab areas",
 };

  return (
     <article>
   <InnerBanner bannertext={bannerdata} />
    <div className="container mt-5 mb-5">
      <h2>Available Cab Areas</h2>
      <ul className="list-group mt-3">
        {areas.map((area) => (
          <li key={area._id} className="list-group-item">
            {area.name}{" "}
            <span className="badge bg-info ms-2">
              Fare: {area.fare ?? "-"}
            </span>
          </li>
        ))}
      </ul>
    </div>
    </article>
  );
}
