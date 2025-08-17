import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Navbar() {
  const { state, dispatch, nav } = useContext(AppContext);
  //const navigate = useNavigate();

  // Sync localStorage user with AppContext on load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && !state.currentUser) {
      dispatch({ type: "LOGIN", payload: storedUser });
    }
  }, [dispatch, state.currentUser]);

  const isAdmin = state.currentUser?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove user from localStorage
    dispatch({ type: "LOGOUT" });    // update context state
    nav("/");                        // navigate to home
  };

  return (
    <header className="sticky-top bg-dark">
      <div className="header-top"></div>
      <div className="container py-2 d-flex align-items-center main-menu">
        <Link to="/" className="navbar-brand fw-bold logotext">CabBook</Link>
        <nav className="ms-auto d-flex gap-3 align-items-center nav-menu">
          {!isAdmin && (
            <>
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/areas">Areas</Link>
              <Link className="nav-link" to="/booking">Book a Cab</Link>
              {state.currentUser && (
  <Link className="nav-link" to="/booking-history">Booking History</Link>
)}
            </>
          )}
          {isAdmin && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
          {isAdmin && <Link className="nav-link" to="/admin">Area Management</Link>}
          {isAdmin && <Link className="nav-link" to="/AdminUserEdit">Edit User</Link>}
          
          
          

          {state.currentUser ? (
            <>
              <span className="badge bg-secondary p-2">
                {state.currentUser.name}
              </span>
              <button
                className="btn btn-dark btn-sm p-1"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-dark btn-sm" to="/login">Login</Link>
              <Link className="btn btn-dark btn-sm" to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
