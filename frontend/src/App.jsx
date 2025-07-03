import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <div className="font-sans">
      {/* Toast notification container (can be kept for UI feedback even without backend) */}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add other UI-only routes below if needed */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/my-ticket" element={<MyTickets />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
