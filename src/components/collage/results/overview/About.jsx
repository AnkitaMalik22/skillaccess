import React from "react";
import Description from "./Description";

const About = ({ Description }) => {
  return (
    <div className="bg-[#8F92A1] font-dmSans bg-opacity-5 p-5 my-1">
      <h2 className="font-bold text-base mb-2">About Assessment</h2>
      <p className="text-sm text-[7D7D7D] first-letter:capitalize">
        {Description}
      </p>
    </div>
  );
};

export default About;
