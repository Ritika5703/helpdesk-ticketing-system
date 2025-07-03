import React from "react";
import StarIcon from "./icons/StarIcon";

const Feedback = () => {
  return (
    <div className="bg-[#55D6C2] p-4 rounded-xl text-center mt-4 w-full">
      <h4 className="text-lg font-semibold">Customer Feedback</h4>
      <div className="flex justify-center mt-2 space-x-1">
        <StarIcon filled={true} />
        <StarIcon filled={true} />
        <StarIcon filled={true} />
        <StarIcon filled={true} />
        <StarIcon filled={false} />
      </div>
    </div>
  );
};

export default Feedback;
