import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import Feedback from "../components/Feedback";

const UserProfile = () => {
  const { backendUrl } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(`${backendUrl}/api/user/data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setRating(res.data.user.feedbackRating || 0);
      } catch (err) {
        console.error("Failed to load user profile", err);
      }
    };
    fetchUser();
  }, [backendUrl]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${backendUrl}/api/feedback`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Feedback submitted successfully!");
    } catch (err) {
      console.error("Feedback submission failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6">
            <h2 className="text-3xl font-semibold mb-6">User Profile</h2>
            <div className="bg-teal-200 p-10 rounded shadow-md flex flex-col md:flex-row gap-10">
              {/* User Card */}
              <div className="bg-white relative w-full md:w-1/2 p-6 rounded-lg shadow-md">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-black">
                  <FiEdit2 size={18} />
                </button>
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-black">
                    <span>👤</span>
                  </div>
                </div>
                <div className="text-center text-sm space-y-2 mt-4">
                  <p>
                    <strong>Username:</strong> {user?.name || "-"}
                  </p>
                  <p>
                    <strong>Contact Number:</strong> {user?.contact || "-"}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email || "-"}
                  </p>
                  <p>
                    <strong>Department:</strong> {user?.department || "-"}
                  </p>
                </div>
              </div>

              {/* Feedback Card */}
              <div className="bg-white w-full md:w-1/2 p-6 rounded-lg shadow-md">
                <h3 className="text-center font-semibold mb-2">
                  Give Your Feedback
                </h3>
                <p className="text-center bg-gray-300 text-xs p-1 mb-3">
                  How satisfied are you with our service?
                </p>
                <div className="flex justify-center text-yellow-400 mb-4 text-xl">
                  {[1, 2, 3, 4, 5].map((i) =>
                    i <= rating ? (
                      <FaStar
                        key={i}
                        onClick={() => setRating(i)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <FaRegStar
                        key={i}
                        onClick={() => setRating(i)}
                        className="cursor-pointer"
                      />
                    )
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#55D6C2] hover:bg-teal-500 text-black font-semibold px-5 py-1.5 rounded-md text-sm shadow-sm"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
