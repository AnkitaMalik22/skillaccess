import React from "react";
import Header from "./Header";
import Details from "./Details";
import Lower from "./Lower";

const ProfileTeacher = () => {
  return (
    <div className="mx-auto w-11/12 pt-6">
      <div className="w-full mb-8">
        {" "}
        <Header />{" "}
      </div>
      <Details />
      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <Lower />
      </div>
    </div>
  );
};

export default ProfileTeacher;
