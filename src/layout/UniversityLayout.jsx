import React from "react";
import SharedLayout from "./SharedLayout";
import { getCollege } from "../redux/college/auth/authSlice";
import { universitySidebarItems } from "./SidebarItems";
import Navbar from "../components/navbar/Navbar";

const UniversityLayout = () => {
  return (
    <SharedLayout
      navbarComponent={(props) => <Navbar userType="university" {...props} />}
      sidebarItems={universitySidebarItems}
      getUser={getCollege}
    />
  );
};

export default UniversityLayout;
