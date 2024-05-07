import React, { useState, useEffect } from "react";

import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCompany } from "../../../../redux/collage/dashboard/dashboardSlice";

const Companies = () => {
  // const [companies, setcompanies] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <div className="w-11/12 mx-auto">
      <Header />
      <div className="flex flex-wrap mx-1 w-fit justify-between">
        {companies &&
          companies?.map((company, index) => {
            return (
              <div
                className="card card-compact  w-[18rem] md:w-[18rem] xl:w-[16rem] mb-4 bg-gray-100 rounded-none m-2"
                key={index}
              >
                <figure>
                  <img src="../../images/CompanyBg.png" alt="Shoes" />
                  {/* <img src={company.basic.coverPhoto} alt="cover photo"  /> */}
                </figure>
                <div className="card-body">
                  <div className="w-14 h-14  -mt-10">
                    <img
                      // src="../../images/companyLogo.png"
                      src={company.basic?.logo || "../../images/companyLogo.pn"}
                      alt=""
                      className="object-scale-down rounded-2xl"
                    />
                    {/* <img src={company.basic.logo} alt="logo"  className="object-scale-down rounded-2xl" /> */}
                  </div>
                  <h2 className="card-title text-lg font-dmSans font-bold">
                    {company.basic?.companyName || "name"}
                  </h2>
                  <p className="line-clamp-5 text-sm opacity-[0.6024]">
                    {company.about?.description || "lorem skadn sadn  "}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="px-4 py-2 hover:bg-blue-900 bg-[#0052CC] text-xs font-dmSans font-bold rounded-xl text-white"
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
