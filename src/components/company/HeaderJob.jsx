import React from "react";
import { FaAngleLeft, FaEdit } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Header = ({
  Role,
  jobId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-2 font-dmSans">
      <span className="flex gap-4">
        <button
          className="bg-gray-200  self-center ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-16"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
        </button>
        <h2 className="text-xl font-bold self-center">{Role}</h2>
      </span>


        <button className="bg-blued text-white font-semibold px-4 rounded-lg transition duration-200 hover:bg-secondary"
        onClick={()=> navigate(`/company/pr/job/edit/${jobId}`)}
        >
         <FaEdit className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
        
        </button>
       
    </div>
  );
};

export default Header;
