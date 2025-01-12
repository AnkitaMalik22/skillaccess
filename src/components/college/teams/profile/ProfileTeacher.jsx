import React from "react";
import Header from "./Header";
import Details from "./Details";
import Lower from "./Lower";

const ProfileTeacher = () => {
  return (
    <>
      {" "}
      <Header /> <Details />
      <div className="bg-gray-50 rounded-md p-6 mt-8">
        <Lower />
      </div>
    </>
  );
};

export default ProfileTeacher;
