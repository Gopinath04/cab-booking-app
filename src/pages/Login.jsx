import React, { useState } from "react";
import InnerBanner from "../components/innerbanner";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        alert("✅ Login successful!");
        console.log("User:", data.user);

        // Store user info in localStorage, ensuring _id is present for MongoDB relations
        if (data.user && data.user._id) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setError("Login response missing user ID. Please contact support.");
          setLoading(false);
          return;
        }

        // Redirect based on user role
        if (data.user.role === "admin") {
          console.log("Redirecting admin to dashboard");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 300); // 300ms delay to allow console.log to show
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      setError("Server error, please try again later");
    }

    setLoading(false);
  };

  const bannerdata = {
  title: "Login",
  navtext: "Access your account",
};

  return (
   <article>
   <InnerBanner bannertext={bannerdata} />
    <form
      onSubmit={handleSubmit}
      className=" p-4 mx-auto mt-5 mb-5"
      style={{ maxWidth: "400px" }}
    >
      <h2 className="h4 mb-3">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>

      <button className="btn btn-dark w-100" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
    </article>
  );
}
