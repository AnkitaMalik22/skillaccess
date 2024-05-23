import React from "react";
import Dashboard from "../../../components/collage/dashboard/dash/Dashboard";
import useTranslate from "../../../hooks/useTranslate";

const Home = () => {
  useTranslate();
  return <Dashboard />;
};

export default Home;
