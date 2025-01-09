import React, { useEffect, useState } from "react";
import Header from "./Header";
import List from "./List";
import AddTeamPoP from "../../../PopUps/AddTeamPoP";

import { useDispatch, useSelector } from "react-redux";
import {
  getInvitedTeams,
  setLoading,
} from "../../../../redux/college/teams/teamSlice";
import TeamCard from "./TeamCard";

const Teams = () => {
  const dispatch = useDispatch();
  const { teams, teamloading } = useSelector((state) => state.teamCollege);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTeamClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    dispatch(getInvitedTeams());
    // //console.log("Teams", teams);
  }, []);

  useEffect(() => {
    if (teamloading) {
      dispatch(getInvitedTeams());
    } else {
      dispatch(setLoading(false));
    }
    return () => {
      dispatch(setLoading(false));
    };
  }, [teamloading]);

  return (
    <>
      <Header handleAddTeamClick={handleAddTeamClick} />
      <div className="flex gap-4 my-3 flex-wrap justify-evenly">
        {teams?.map((team, index) => (
          <TeamCard
            key={index}
            Name={team.Name}
            Email={team.Email}
            Phone={team.Phone}
            Role={team.Role}
          />
        ))}
      </div>

      {!showPopup && teams?.length === 0 && (
        <div className="w-1/2 mx-auto bg-white p-4 text-center rounded-md text-slate-600">
          No Member Found
        </div>
      )}

      {/* <List /> */}
      {showPopup && <AddTeamPoP onClose={handleClosePopup} />}
    </>
  );
};

export default Teams;
