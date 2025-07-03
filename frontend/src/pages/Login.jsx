import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedin(true);
        await getUser(); // get user data after login
        toast.success("Login successful!");
        navigate("/dashboard"); // or wherever you want to redirect
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed. Try again.");
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/is-auth`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        const res = await axios.get(`${backendUrl}/api/user/data`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUserData(res.data.userData);
        } else {
          toast.error("Failed to fetch user data");
        }
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      toast.error("Error fetching user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#55D6C2] px-4">
      <div className="w-full max-w-[1000px] bg-[#A3E8DD] shadow-md p-6 sm:p-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold italic text-[#060606] mb-2 text-center">
          Helpdesk System
        </h2>

        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-[600px] flex flex-col items-center gap-4 mt-10"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
            required
          />
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              className="w-[200px] sm:w-[260px] md:w-[321px] h-[50px] sm:h-[60px] bg-[#03CC17] hover:bg-green-700 text-white text-lg sm:text-xl md:text-[25px] font-semibold rounded-[20px] transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="w-full max-w-[600px] flex justify-between mt-6 text-sm sm:text-base">
          <button
            className="text-[#EA0000] hover:underline"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password
          </button>
          <button
            className="text-black hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
