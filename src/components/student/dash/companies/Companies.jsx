import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../../../redux/college/dashboard/dashboardSlice";
import { IoIosSearch } from "react-icons/io";
import BackIcon from "../../../buttons/BackIcon";

const Companies = () => {
  const [companies, setcompanies] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const dispatch = useDispatch();
  // const { companies } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collegeAuth);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-2">
        <button
          className="  self-center  rounded-md h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>
        <div className=" rounded-xl mx-2 w-full sm:h-12 h-10 flex my-2 ">
          <span className="w-fit mx-auto flex self-center">
            <IoIosSearch className="self-center w-10 h-10 bg-gray-100 rounded-s-lg text-gray-400 py-2 " />
            <input
              type="text"
              placeholder="Search"
              className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>

        <button className="bg-gray-100  self-center  rounded-md h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto  h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 w-fit justify-center">
        {companies &&
          companies?.map((company, index) => {
            return (
              <div
                className="card card-compact w-[17rem] mb-4 bg-gray-100 rounded-none"
                key={index}
              >
                <figure>
                  <img
                    src={company.basic?.coverPhoto || "/images/CompanyBg.png"}
                    alt="cover photo"
                  />
                </figure>
                <div className="card-body">
                  <div className="w-14 h-14 bg-red-600 -mt-10">
                    <img
                      src={company.basic?.logo || ""}
                      alt="logo"
                      className="w-full h-full"
                    />
                  </div>
                  <h2 className="card-title">
                    {company.basic?.companyName || "Name"}
                  </h2>
                  <p className="min-h-[5rem]">
                    {company.about?.companyDescription || "description"}{" "}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="px-4 py-2 hover:bg-blued bg-accent text-sm font-dmSans font-bold rounded-xl text-white"
                      onClick={() => navigate("/college/companies/profile")}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Companies;
