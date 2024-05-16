import React from 'react'
import { MdOutlineMailOutline } from "react-icons/md";
import { LuSmartphone } from "react-icons/lu";




const TeamCard = ({
    Name,
    Email,
    Phone,
    Role
}) => {
  return (
    <div className="bg-white  rounded-3xl border-2 overflow-hidden p-2 w-72 mt-20">
    <div className="bg-[#95acfa] rounded-xl  h-24 "></div> 
    <div className="flex flex-col items-start p-4">
      <img src="../../images/teams.png" alt="Person Image" className="w-20 h-20 rounded-[18px] -mt-16"/>
      <div className="">
        <h2 className="text-lg font-semibold">{Name}</h2>
        <p className="text-gray-500">{Role}</p>
        <div className="flex items-center gap-4 pt-4">
        <div className="bg-gray-200 rounded-full p-1">
            <LuSmartphone />
          </div>
          
          <p className="text-gray-500">(+91) {Phone}</p>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div className="bg-gray-200 rounded-full p-1">
            <MdOutlineMailOutline />
          </div>
          
          <p className="text-gray-500">{Email}</p>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default TeamCard