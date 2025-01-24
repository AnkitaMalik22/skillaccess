import React from "react";
import SharedLayout from "./SharedLayout";
import Navbar from "../components/navbar/Navbar";
import { getCollege } from "../redux/college/auth/authSlice";
import { collegeSidebarItems } from "./SidebarItems";

const CollegeLayout = () => {
  return (
    <SharedLayout
      navbarComponent={(props) => <Navbar userType="college" {...props} />}
      sidebarItems={collegeSidebarItems}
      getUser={getCollege}
    />
  );
};

export default CollegeLayout;
