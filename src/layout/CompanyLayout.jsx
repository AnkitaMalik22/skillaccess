import React from "react";
import SharedLayout from "./SharedLayout";
import CompanyNavbar from "../components/navbar/CompanyNavbar";
import { companySidebarItems } from "./SidebarItems";
import { getCompany } from "../redux/company/auth/companyAuthSlice";

const CompanyLayout = () => {
  return (
    <SharedLayout
      navbarComponent={CompanyNavbar}
      sidebarItems={companySidebarItems}
      getUser={getCompany}
    />
  );
};

export default CompanyLayout;
