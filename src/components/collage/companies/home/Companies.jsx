import React, { useState, useEffect } from "react";

import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../../../redux/collage/dashboard/dashboardSlice";

const Companies = () => {
  // const [companies, setcompanies] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.dashboard);
  const {user} =useSelector(
    (state) => state.collageAuth
  );

  useEffect(() => {
    if(user){
      dispatch(getCompany({collegeId : user?._id}));
    }
  }, [dispatch,user]);


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
    <div className="w-11/12 mx-auto py-5 md:py-10">
      <Header handleFilter={handleFilterCompanies} />
      <div className="flex flex-wrap gap-5 md:gap-10 md:gap-y-[30px] gap-y-4 ">
        {filtered &&
          filtered?.map((company, index) => {
            return (
              <div
                className="card card-compact xl:w-80 md:w-60 w-40 bg-[#F8F8F9] rounded-b-2xl rounded-none"
                key={index}
              >
                <figure>
                  <img
                    src="../../images/CompanyBg.png"
                    alt="company card"
                    className="object-cover xl:h-40 md:h-28 h-20"
                  />
                  {/* <img src={company.basic.coverPhoto} alt="cover photo"  /> */}
                </figure>
                <div className="card-body gap-0 py">
                  <div className="w-12 h-12  -mt-10 rounded-xl bg-[#F8F8F9] p-2 mb-4">
                    <img
                      // src="../../images/companyLogo.png"
                      src={company.basic?.logo || "../../images/companyLogo.pn"}
                      alt=""
                      className=" object-cover"
                    />
                    {/* <img src={company.basic.logo} alt="logo"  className="object-scale-down rounded-2xl" /> */}
                  </div>
                  <h2 className="card-title text-lg font-dmSans font-bold mb-2">
                    {company.basic?.companyName || "name"}
                  </h2>
                  <p className="line-clamp-5 text-sm opacity-[0.6024] mb-5">
                    {company.about?.description || "lorem skadn sadn  "}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="px-6 py-[10px] hover:bg-[#0052CC] bg-[#0052CC] text-xs font-dmSans font-bold rounded-2xl text-white"
                      onClick={
                        () =>
                          navigate(`/collage/companies/profile/${company._id}`)
                        // navigate(`/collage/companies/profile/:0`)
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
