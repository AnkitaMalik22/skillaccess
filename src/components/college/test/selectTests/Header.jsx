import React from "react";
import toast from "react-hot-toast";
import { FaAngleLeft, FaAngleRight, FaChevronLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getEntity,isUni } from "../../../../util/isCompany";
import CommonHeader from "../../../CommonHeader";


const Header = () => {
  const navigate = useNavigate();
  const topics = JSON.parse(localStorage.getItem("topics"));
  const { name } = useSelector((state) => state.test);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");
  const handleSubmit = () => {
    if (topics.length === 0) {
      toast.error("Please select atleast one topic to proceed");
      return;
    }
    // if (isUni()) {
    //   navigate(`/university/pr/test/questions?level=${level}`);
    // } else {
    //   navigate(`/college/test/questions?level=${level}`);
    // }

    navigate(`/${getEntity()}/test/questions?level=${level}`);
  };

  return (
   
        <CommonHeader 
          // backPath={`${getEntity()}/test/name?level=${level}`}
          handleNext={handleSubmit} 
        />

  );
};

export default Header;
