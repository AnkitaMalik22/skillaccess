import React from "react";
import SharedLayout from "./SharedLayout";
import { companySidebarItems } from "./SidebarItems";
import { getCompany } from "../redux/company/auth/companyAuthSlice";
import Navbar from "../components/navbar/Navbar";

const CompanyLayout = () => {
  return (
    <SharedLayout
      navbarComponent={(props) => <Navbar userType="company" {...props} />}
      sidebarItems={companySidebarItems}
      getUser={getCompany}
    />
  );
};

export default CompanyLayout;
