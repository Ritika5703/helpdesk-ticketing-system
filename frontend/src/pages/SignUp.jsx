// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     // Backend logic here
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#55D6C2] px-4">
//       <div className="w-full max-w-[1000px] bg-[#EFEDED]/50 flex flex-col items-center px-6 sm:px-10 py-10 sm:py-12">
//         <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold italic text-[#060606] mb-2 text-center">
//           Helpdesk System
//         </h2>

//         <p className="text-xl sm:text-2xl md:text-[30px] mb-6 text-center">
//           Sign up here
//         </p>

//         <form
//           onSubmit={onSubmitHandler}
//           className="w-full max-w-[600px] flex flex-col gap-4"
//         >
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="h-[55px] sm:h-[60px] md:h-[70px] w-full text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="h-[55px] sm:h-[60px] md:h-[70px] w-full text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="h-[55px] sm:h-[60px] md:h-[70px] w-full text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
//             required
//           />

//           <div className="flex justify-center mt-4">
//             <button
//               type="submit"
//               className="w-[200px] sm:w-[260px] md:w-[321px] h-[50px] sm:h-[60px] md:h-[71px] bg-[#296EF2] text-white text-lg sm:text-xl md:text-[25px] font-medium rounded-[20px] hover:bg-blue-700 transition"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <div className="w-full max-w-[600px] flex justify-between mt-8 text-sm sm:text-base">
//           <button
//             className="text-[#EA0000] hover:underline"
//             onClick={() => navigate("/reset-password")}
//           >
//             Forgot password?
//           </button>
//           <button
//             className="text-black hover:underline"
//             onClick={() => navigate("/")}
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/register",
        {
          name: username,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.user);
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#55D6C2] px-4">
      <div className="w-full max-w-[1000px] bg-[#EFEDED]/50 flex flex-col items-center px-6 sm:px-10 py-10 sm:py-12">
        <h2 className="text-3xl sm:text-4xl md:text-[48px] font-bold italic text-[#060606] mb-2 text-center">
          Helpdesk System
        </h2>

        <p className="text-xl sm:text-2xl md:text-[30px] mb-6 text-center">
          Sign up here
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-[600px] flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-[55px] sm:h-[60px] md:h-[70px] w-full text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[55px] sm:h-[60px] md:h-[70px] w-full text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[55px] sm:h-[60px] md:h-[70px] w-full text-lg sm:text-xl md:text-[25px] placeholder-black bg-white border border-black px-4 py-2"
            required
          />

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-[200px] sm:w-[260px] md:w-[321px] h-[50px] sm:h-[60px] md:h-[71px] bg-[#296EF2] text-white text-lg sm:text-xl md:text-[25px] font-medium rounded-[20px] hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="w-full max-w-[600px] flex justify-between mt-8 text-sm sm:text-base">
          <button
            className="text-[#EA0000] hover:underline"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </button>
          <button
            className="text-black hover:underline"
            onClick={() => navigate("/")}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
