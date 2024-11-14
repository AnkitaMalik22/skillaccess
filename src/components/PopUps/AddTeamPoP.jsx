import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addTeam, getInvitedTeams } from "../../redux/college/teams/teamSlice";
import toast from "react-hot-toast";

const AddTeamPoP = ({ onClose }) => {
  const dispatch = useDispatch();
  const [team, setTeam] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Role: "",
  });

  const { Name, Email, Phone, Role } = team;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam({
      ...team,
      [name]: value,
    });
  };

  // const [teamName, setTeamName] = useState('');
  // const [emailAddress, setEmailAddress] = useState('');
  // const [mobileNumber, setMobileNumber] = useState('');
  // const [role, setRole] = useState('');

  const handleSendInvite = () => {
    if (Name === "" || Email === "" || Phone === "" || Role === "") {
      toast.error("Please fill all the fields");
    } else if (
      !Email.includes("@") ||
      !Email.includes(".com") ||
      Email.length < 6
    ) {
      toast.error("Please enter a valid email address");
    } else if (Phone.length !== 10 || isNaN(Phone)) {
      toast.error("Please enter a valid phone number");
    } else {
      // //console.log(team);

      dispatch(addTeam(team));

      onClose();
      dispatch(getInvitedTeams());
    }
  };

  return (
    <div>
      <div className="w-full  min-w-full  h-[100vh] bg-black absolute z-[9999] flex left-0 top-0 bg-opacity-30 ">
        <div className="py-12 bg-white shadow-md w-[500px] h-auto  mx-auto self-center rounded-lg bg-opactiy-10  px-12 flex flex-col justify-center gap-2 relative">
          <h3 className="text-xl font-semibold mb-4">Add Team</h3>
          <input
            type="text"
            placeholder="Team Name"
            className="bg-gray-200  rounded-md w-full  p-2 border-none"
            name="Name"
            value={Name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-gray-200  rounded-md w-full  p-2 border-none"
            name="Email"
            value={Email}
            onChange={handleChange}
          />
          <input
            type="number"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            placeholder="Mobile Number"
            className="bg-gray-200  rounded-md w-full  p-2 border-none"
            name="Phone"
            onChange={handleChange}
            value={Phone}
          />
          <select
            className="bg-gray-200  rounded-md w-full  p-2 border-none"
            name="Role"
            value={Role}
            onChange={handleChange}
          >
            <option value="">Role</option>
            <option value="Accountant">Accountant</option>
            <option value="Teacher">Teacher</option>
          </select>
          <div className="flex justify-end">
            <button
              className="bg-accent w-[140px] mt-4  text-white px-4 py-2 rounded-xl text-sm font-bold"
              onClick={handleSendInvite}
            >
              Send Invite
            </button>
          </div>

          <button
            className="h-6 w-6 text-[#2e3e4b] absolute right-4 top-4"
            onClick={onClose}
          >
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamPoP;
