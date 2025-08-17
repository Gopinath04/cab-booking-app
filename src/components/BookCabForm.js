import React, { useState } from 'react';

const BookCabForm = () => {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const [form, setForm] = useState({
    name: user.name || '',
    mobile: user.mobile || '',
    email: user.email || '',
    pickupDate: '',
    pickupTime: '',
    passengers: '',
    pickupLocation: '',
    dropLocation: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Booking form data:', form); // Debug log
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert('Cab booked!');
      } else {
        alert('Failed to book cab.');
      }
    } catch (error) {
      alert('Error booking cab.');
    }
  };

  if (!user) {
    return (
      <div className="p-4 border rounded bg-light shadow-sm text-center">
        <h2 className="mb-4">Book a Cab</h2>
        <div className="alert alert-warning mb-3">You must be logged in to book a cab.</div>
        <a href="/login" className="btn btn-primary">Login</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
      <h2 className="mb-4 text-center">Book a Cab</h2>
      <div className="mb-3">
        <label className="form-label">Your Name</label>
        <input type="text" className="form-control" name="name" value={form.name} readOnly required />
      </div>
      <div className="mb-3">
        <label className="form-label">Mobile number</label>
        <input type="tel" className="form-control" name="mobile" value={form.mobile} readOnly required />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={form.email} readOnly required />
      </div>
      <div className="mb-3">
        <label className="form-label">Pickup Date</label>
        <input type="date" className="form-control" name="pickupDate" value={form.pickupDate} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Pickup Time</label>
        <input type="time" className="form-control" name="pickupTime" value={form.pickupTime} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Passengers</label>
        <input type="number" className="form-control" name="passengers" value={form.passengers} onChange={handleChange} min="1" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Pickup Location</label>
        <textarea className="form-control" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Drop Location</label>
        <textarea className="form-control" name="dropLocation" value={form.dropLocation} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Book Now</button>
    </form>
  );
};

export default BookCabForm;
