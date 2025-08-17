import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

export default function BookingHistory() {
  const { state } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      if (!state.currentUser) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/bookings?userId=${state.currentUser._id}`);
        const contentType = res.headers.get("content-type");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned invalid data format");
        }
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [state.currentUser]);

  if (!state.currentUser) {
    return <div className="container py-4">Please log in to view your booking history.</div>;
  }

  return (
    <div className="container py-4">
      <h2>Booking History</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : null}
      {!loading && !error && bookings.length > 0 && (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Pickup Date</th>
              <th>Pickup Location</th>
              <th>Drop Location</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={idx}>
                <td>{booking.pickupDate}</td>
                <td>{booking.pickupLocation}</td>
                <td>{booking.dropLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
