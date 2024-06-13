import React, { useState, useEffect } from "react";

import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../../../redux/collage/dashboard/dashboardSlice";

const Companies = () => {
  const [companies, setcompanies] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const dispatch = useDispatch();
  // const { companies } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collageAuth);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="flex flex-wrap mx-1 w-fit justify-between">
        {companies?.map((company, index) => {
          return (
            <div
              className="card card-compact w-[17rem] mb-4 bg-gray-100 rounded-none m-2"
              key={index}
            >
              <figure>
                <img src="../../images/CompanyBg.png" alt="Shoes" />
                {/* <img src={company.basic.coverPhoto} alt="cover photo"  /> */}
              </figure>
              <div className="card-body">
                <div className="w-14 h-14  -mt-10">
                  <img
                    src="../../images/companyLogo.png"
                    alt=""
                    className="object-scale-down rounded-2xl"
                  />
                  {/* <img src={company.basic.logo} alt="logo"  className="object-scale-down rounded-2xl" /> */}
                </div>
                <h2 className="card-title text-lg font-dmSans font-bold">
                  {company.basic?.companyName || "name"}
                </h2>
                <p className="line-clamp-5 text-sm opacity-[0.6024]">
                  {company.about?.companyDescription || "lorem skadn sadn  "}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="px-4 py-2 hover:bg-blue-900 bg-[#0052CC] text-xs font-dmSans font-bold rounded-xl text-white"
                    onClick={() =>
                      // navigate(`/collage/companies/profile/${company._id}`)
                      navigate(`profile`)
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
    </>
  );
};

export default Companies;
