import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", mobile: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ call backend API
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", password: "", mobile: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Signup</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name*</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email*</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile*</label>
          <input type="tel" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password*</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Signup</button>
      </form>
    </div>
  );
}
