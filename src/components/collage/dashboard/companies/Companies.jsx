import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import {
  PiSlidersHorizontal,
  PiSlidersHorizontalBold,
  PiSlidersHorizontalLight,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../../../redux/collage/dashboard/dashboardSlice";
import { IoIosSearch } from "react-icons/io";
import BackIcon from "../../../buttons/BackIcon";

const Companies = () => {
  // const [companies, setcompanies] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);
  const [filtered, setFiltered] = React.useState([]);
  const handleFilterCompanies = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      console.log("empty");

      setFiltered(companies);

      return;
    } else {
      setFiltered(
        companies.filter((company) => {
          const regex = new RegExp(value, "i");
          return regex.test(company.basic.companyName);
        })
      );
    }
  };
  useEffect(() => {
    setFiltered(companies);
  }, [companies]);
  const navigate = useNavigate();
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex w-full mx-auto justify-between mb-2">
        <button
          className="  self-center  rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>
        <div className=" rounded-xl mx-2 w-full sm:h-12 h-10 flex my-2 ">
          <span className="w-fit mx-auto flex self-center">
            <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
            <input
              type="text"
              onChange={handleFilterCompanies}
              placeholder="Search..."
              className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>

        <button className="bg-gray-100  self-center  rounded-lg h-10 w-8 sm:h-16 sm:w-14">
          <img
            src="../../../images/icons/Filter.png"
            alt=""
            className="mx-auto"
          />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 w-fit justify-center">
        {filtered &&
          filtered?.map((company, index) => {
            return (
              <div
                className="card card-compact w-[18rem] md:w-[18rem] xl:w-[16rem]  mb-4 bg-gray-100 rounded-none"
                key={index}
              >
                <figure>
                  <img
                    src={
                      company.basic?.coverPhoto === "" ||
                      "../../images/CompanyBg.png"
                    }
                    // src="../../images/CompanyBg.png"
                    alt="cover photo"
                  />
                </figure>
                <div className="card-body">
                  <div className="w-14 h-14 bg-blue-400 -mt-10">
                    <img
                      src={company.basic?.logo || "../../images/companyLogo.pn"}
                      // src = "../../images/companyLogo.png"
                      alt="logo"
                      className="w-full h-full"
                    />
                  </div>
                  <h2 className="card-title">
                    {company.basic?.companyName || "Name"}
                  </h2>
                  <p className="min-h-[5rem]">
                    {company.about?.description.substring(0, 150) ||
                      "description"}
                    {"..."}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="px-4 py-2 hover:bg-blue-900 bg-[#0052CC] text-xs font-dmSans font-bold rounded-xl text-white"
                      onClick={() =>
                        navigate(`/collage/companies/profile/${company._id}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Companies;
