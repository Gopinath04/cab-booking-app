import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InnerBanner from "../components/innerbanner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null; // Prevent rendering until user is set

    const bannerdata = {
      title: "Admin Dashboard",
      navtext: "admin panel",
    };

  return (
    <article>
      <InnerBanner bannertext={bannerdata} />
   
    <div className="container mt-5 mb-5">
      <h2>Welcome, {user.name}</h2>
      {/* Bookings Management */}
      <div>
        <h4>All Bookings</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Pickup Date</th>
              <th>Pickup Time</th>
              <th>Passengers</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.mobile}</td>
                <td>{b.email}</td>
                <td>{b.pickupDate}</td>
                <td>{b.pickupTime}</td>
                <td>{b.passengers}</td>
                <td>{b.pickupLocation}</td>
                <td>{b.dropLocation}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
     </article>
  );
}