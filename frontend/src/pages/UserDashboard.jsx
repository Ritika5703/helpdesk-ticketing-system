// import React from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import StatsCard from "../components/StatsCard";
// import SupportCard from "../components/SupportCard";
// import Feedback from "../components/Feedback";

// import TechIcon from "../assets/icons/tech.svg?react";
// import OpsIcon from "../assets/icons/ops.svg?react";
// import BarGraphIcon from "../assets/icons/graph.svg?react";
// import Footer from "../components/Footer";

// const UserDashboard = ({ role = "user" }) => {
//   const isFullDashboard =
//     role === "admin" || role === "operation" || role === "technical";

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <Header />
//       <div className="flex flex-1 flex-col md:flex-row">
//         <Sidebar role={role} />
//         <div className="flex flex-col flex-1">
//           <main className="flex-1 p-6">
//             <h2 className="text-2xl font-normal mb-6">Dashboard</h2>

//             {/* Stats Cards for all roles */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               <StatsCard color="#2F82FF" title="Total Tickets" count={12} />
//               <StatsCard color="#0BFF68" title="Total Solved" count={8} />
//               <StatsCard
//                 color="#FE594E"
//                 title="Total Awaiting Approval"
//                 count={2}
//               />
//               <StatsCard color="#FCFF6C" title="Total in Progress" count={2} />
//             </div>

//             {/* Show Graph + Support + Feedback ONLY if role is not 'user' */}
//             {isFullDashboard && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 {/* Left: Bar Graph */}
//                 <div className="bg-[#55D6C2] h-96 flex justify-center items-center">
//                   <BarGraphIcon
//                     className="h-4/5 w-auto"
//                     aria-label="Bar Graph"
//                   />
//                 </div>

//                 {/* Right: Support + Feedback */}
//                 <div className="flex flex-col h-96 gap-2">
//                   {/* 3/4 height: Support Cards */}
//                   <div className="flex flex-1 w-full">
//                     <div className="w-full flex">
//                       <SupportCard
//                         Icon={TechIcon}
//                         count={3}
//                         label="Technical Supports"
//                       />
//                       <SupportCard
//                         Icon={OpsIcon}
//                         count={4}
//                         label="Operation Team"
//                       />
//                     </div>
//                   </div>

//                   {/* 1/2 height: Feedback */}
//                   <div className="flex justify-center items-center h-1/2">
//                     <Feedback />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </main>

//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import SupportCard from "../components/SupportCard";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";

import TechIcon from "../assets/icons/tech.svg?react";
import OpsIcon from "../assets/icons/ops.svg?react";
import BarGraphIcon from "../assets/icons/graph.svg?react";

const UserDashboard = () => {
  const { userData } = useContext(AppContext);
  const role = userData?.role || "user";

  const isFullDashboard =
    role === "admin" || role === "operation" || role === "technical";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar role={role} />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6">
            <h2 className="text-2xl font-normal mb-6">Dashboard</h2>

            {/* Stats Cards for all roles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatsCard color="#2F82FF" title="Total Tickets" count={12} />
              <StatsCard color="#0BFF68" title="Total Solved" count={8} />
              <StatsCard
                color="#FE594E"
                title="Total Awaiting Approval"
                count={2}
              />
              <StatsCard color="#FCFF6C" title="Total in Progress" count={2} />
            </div>

            {/* Graph + Support + Feedback only for non-'user' roles */}
            {isFullDashboard && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Left: Bar Graph */}
                <div className="bg-[#55D6C2] h-96 flex justify-center items-center">
                  <BarGraphIcon
                    className="h-4/5 w-auto"
                    aria-label="Bar Graph"
                  />
                </div>

                {/* Right: Support + Feedback */}
                <div className="flex flex-col h-96 gap-2">
                  {/* Support Cards */}
                  <div className="flex flex-1 w-full">
                    <div className="w-full flex">
                      <SupportCard
                        Icon={TechIcon}
                        count={3}
                        label="Technical Supports"
                      />
                      <SupportCard
                        Icon={OpsIcon}
                        count={4}
                        label="Operation Team"
                      />
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="flex justify-center items-center h-1/2">
                    <Feedback />
                  </div>
                </div>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
