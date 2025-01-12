import React from "react";
import SharedLayout from "./SharedLayout";
import UniversityNavbar from "../components/navbar/UniversityNavbar";
import { getCollege } from "../redux/college/auth/authSlice";
import { universitySidebarItems } from "./SidebarItems";

const UniversityLayout = () => {
  return (
    <SharedLayout
      navbarComponent={UniversityNavbar}
      sidebarItems={universitySidebarItems}
      getUser={getCollege}
    />
  );
};

export default UniversityLayout;


