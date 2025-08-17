import React, { useState, useEffect } from "react";
import axios from "axios";
import InnerBanner from "../components/innerbanner";

export default function AdminUserEdit() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all users on mount
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setUserId(user._id);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || ""
    });
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
      setMessage(res.data.message || "User updated successfully");
      // Refresh user list after update
      const updatedUsers = await axios.get("http://localhost:5000/api/users");
      setUsers(updatedUsers.data);
    } catch (err) {
      setMessage(err.response?.data?.error || "Update failed");
    }
  };

     const bannerdata = {
   title: "Edit User",
   navtext: "Manage your users",
 };


  return (
    <article>
       <InnerBanner bannertext={bannerdata} />
    
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      {/* <h2 className="mb-4">Admin: Edit User</h2> */}
      {message && <div className="alert alert-info">{message}</div>}
      <div className="mb-4">
        <h5>User List</h5>
        <div style={{ maxHeight: "250px", overflowY: "auto" }}>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>
                    <button className="btn btn-link btn-sm" onClick={() => handleUserSelect(user)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {userId && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input type="tel" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Update User</button>
        </form>
      )}
    </div>
    </article>
  );
}
