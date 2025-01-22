import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../../redux/college/dashboard/dashboardSlice";
import { IoIosSearch } from "react-icons/io";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collegeAuth);
  const [filtered, setFiltered] = React.useState([]);

  useEffect(() => {
    if (user) {
      dispatch(getCompany({ collegeId: user?._id }));
    }
  }, [dispatch, user]);

  const handleFilterCompanies = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
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
  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-3">
          <button
            className="self-center object-center rounded-md h-10 w-10 "
            // onClick={() => navigate('college/companies')}
          >
            <img src="/images/icons/sales.jpg" alt="icon" />
          </button>
          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
            Companies
          </h2>
        </div>

        {/* search */}
        <div className=" rounded-xl w-full sm:h-12 h-10 flex">
          <span className="w-fit mx-auto flex self-center bg-[#F8F8F9] rounded-xl px-5 py-3 gap-3">
            <IoIosSearch className="self-center w-6 h-6 bg-gray-100 rounded-s-lg text-gray-400 " />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleFilterCompanies}
              className="placeholder p-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
            />
          </span>
        </div>

        {/* <div className="flex gap-3">
          <button className="self-center justify-center flex bg-[#8f92a11a] px-7 py-3 rounded-2xl gap-2 text-sm text-[#171717] font-bold ">
            <FiPlus className="self-center text-lg " /> Add
          </button>

          <button className="self-center justify-center flex bg-accent px-5 py-3  rounded-2xl text-white  gap-2 text-md font-bold w-40">
            <FiUpload className="self-center text-lg " /> Upload New
          </button>
          <button className="bg-[#8f92a11a]  self-center  rounded-md h-10 w-10 sm:h-12 sm:w-16 flex items-center justify-center">
            <img src="/images/icons/Filter.png" className="w-7 h-7" />
          </button>
        </div> */}
      </div>
      <div className="flex flex-wrap gap-5 md:gap-10 md:gap-y-[30px] gap-y-4 ">
        {filtered &&
          filtered.map((company, index) => (
            <div
              className="relative card card-compact xl:w-80 md:w-60 w-40 bg-[#F8F8F9] border rounded-md border-gray-200 hover:shadow-md"
              key={index}
            >
              {/* Hiring Tag */}
              {/* {company.hiring && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-sm font-semibold py-2 px-6 rounded-full">
          Hiring
        </div>
      )} */}
              <figure>
                <img
                  src={company?.basic?.coverPhoto || "/images/default.jpg"}
                  alt="company card"
                  className="object-cover xl:h-40 md:h-28 h-20 w-full"
                />
              </figure>
              <div className="card-body gap-0 py">
                <div className="w-12 h-12 -mt-10 rounded-md bg-[#F8F8F9] p-2 mb-4">
                  <img
                    src={company.basic?.logo || "/images/defaultUser.jpg"}
                    alt=""
                    className="object-cover"
                  />
                </div>
                <h2 className="card-title text-lg font-dmSans font-bold mb-2">
                  {company.basic?.companyName || "Name"}
                </h2>
                <p className="line-clamp-5 text-sm opacity-[0.6] mb-5">
                  {company.about?.description || "Lorem ipsum dolor sit amet."}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="px-4 py-2 hover:bg-accent bg-accent text-sm font-dmSans font-bold rounded-md text-white"
                    onClick={() =>
                      navigate(`/college/companies/profile/${company._id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Companies;
