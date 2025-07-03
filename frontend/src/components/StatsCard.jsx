import React from "react";

const StatsCard = ({ color, title, count }) => {
  return (
    <div
      className="rounded-xl w-[248px] h-[273px] px-4 py-6 text-center flex flex-col"
      style={{
        backgroundColor: color,
        boxShadow: "6px 6px 0px #9EA6A1",
      }}
    >
      {/* Title fixed at top */}
      <h3 className="text-3xl font-normal mb-4">{title}</h3>

      {/* Spacer pushes count to vertical center */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-7xl font-medium text-[#05386B] font-sanchez">
          {count}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
