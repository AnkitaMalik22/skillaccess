import React from "react";
import Header from "./Header";
import List from "./List";
import { useNavigate } from "react-router-dom";

const ApprovedTeams = () => {
    const navigate = useNavigate();

    const handleAddTeamClick = () => {

        navigate("/collage/teams/pending");

    };
  return (
    <div className="w-11/12 mx-auto pt-6">
      <Header handleAddTeamClick={handleAddTeamClick} />
      <List />
    </div>
  );
};

export default ApprovedTeams;