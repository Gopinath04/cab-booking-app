import React, { useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Areas from "./pages/Areas";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
// import Header from "./components/header";
import Footer from "./components/footer";
import './styles/custom.css'; // Custom CSS for styling


export const AppContext = React.createContext();

const initialState = {
  users: [{ id: 1, name: "Admin", email: "admin@test.com", password: "admin", role: "admin" }],
  currentUser: null,
  areas: ["Andheri", "Bandra", "Powai"],
  bookings: []
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": return { ...state, currentUser: action.payload };
    case "LOGOUT": return { ...state, currentUser: null };
    case "SIGNUP": return { ...state, users: [...state.users, action.payload], currentUser: action.payload };
    case "ADD_AREA": return { ...state, areas: [...state.areas, action.payload] };
    case "REMOVE_AREA": return { ...state, areas: state.areas.filter(a => a !== action.payload) };
    case "BOOK": return { ...state, bookings: [...state.bookings, action.payload] };
    default: return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nav = useNavigate();
  return (
    <AppContext.Provider value={{ state, dispatch, nav }}>
  <Navbar />   {/* Always visible */}
  {/* <Header />    */}
  <main className="container py-4">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </main>
  <Footer />   {/* Always visible */}
</AppContext.Provider>
  );
}
