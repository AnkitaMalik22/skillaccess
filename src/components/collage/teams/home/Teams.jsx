import React, { useEffect,useState } from "react";
import Header from "./Header";
import List from "./List";
import AddTeamPoP from "../../../PopUps/AddTeamPoP";

import { useDispatch, useSelector } from "react-redux";
import { getInvitedTeams } from "../../../../redux/collage/teams/teamSlice";
import TeamCard from "./TeamCard";
const Teams = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector(state => state.teamCollege);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddTeamClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    dispatch(getInvitedTeams());
    console.log("Teams", teams);
  }, [])

  return (
    <div className="w-11/12 mx-auto pt-6">
      <Header handleAddTeamClick={handleAddTeamClick} />
      <div className="flex gap-4 my-3">
        {
          teams?.map((team, index) => (
            <TeamCard key={index} Name={team.Name} Email={team.Email} Phone={team.Phone} Role={team.Role} />
          ))
        }
      </div>


      {
       !showPopup && teams?.length === 0 && <div className="w-1/2 mx-auto bg-white p-4 text-center rounded-lg text-slate-600">No Member Found</div>
      }

      {/* <List /> */}
      {showPopup && <AddTeamPoP onClose={handleClosePopup} />}
    </div>
  );
};

export default Teams;
