import React from "react";
import Header from "./Header";
import List from "./List";
import { useNavigate } from "react-router-dom";

const ApprovedTeams = () => {
  const navigate = useNavigate();

  const handleAddTeamClick = () => {
    navigate("/college/teams/pending");
  };
  return (
    <>
      <Header handleAddTeamClick={handleAddTeamClick} />
      <List />
    </>
  );
};

export default ApprovedTeams;
