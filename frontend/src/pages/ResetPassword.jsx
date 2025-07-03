import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Reset OTP sent to your email!");
        setShowModal(true); // Show modal
      } else {
        toast.error(data.message || "Failed to send reset OTP");
      }
    } catch (error) {
      toast.error("Something went wrong while sending reset OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error("Please enter OTP and new password");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Password reset successful!");
        setShowModal(false);
        navigate("/");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong while resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#55D6C2] px-4">
      <div className="w-full max-w-4xl md:h-[650px] flex items-center justify-center bg-[#EFEDED]/50 p-4 md:p-8 flex-col">
        <p className="text-[20px] md:text-[24px] text-center max-w-xl mb-6 font-roboto">
          Don’t worry, enter your email below and we’ll send you a link to reset
          your password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[600px] flex flex-col gap-4 items-center"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[60px] md:h-[73px] text-[24px] md:text-[30px] placeholder-black bg-white border border-black px-4 py-2 mt-4 mb-4"
            required
          />

          <button
            type="submit"
            className="w-[250px] md:w-[321px] h-[60px] md:h-[71px] bg-[#03CC17] text-white text-[24px] md:text-[30px] font-medium rounded-[20px] hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-[250px] md:w-[321px] h-[60px] md:h-[71px] bg-[#0769DC] text-white text-[24px] md:text-[30px] font-medium rounded-[20px] hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Reset Password
            </h2>
            <form
              onSubmit={handleResetPassword}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-400 p-3 rounded-md"
                required
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-400 p-3 rounded-md"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
              >
                Reset Password
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
