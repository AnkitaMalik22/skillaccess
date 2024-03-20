import React from "react";
import Description from "./Description";


const About = ({ Description }) => {
  return (
    <div className="bg-[#8F92A1] font-dmSans rounded-lg bg-opacity-5 p-5 my-3">
      <h2 className="font-bold">About Assessment</h2>
      <p className="text-sm text-gray-400 mt-3">{Description}</p>

    </div>
  );
};

export default About;
