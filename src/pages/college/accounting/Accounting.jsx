// import React from "react";
// import Acounting from "../../../components/college/accounting/home/Acounting";
// import useTranslate from "../../../hooks/useTranslate";

// const AccountingPage = () => {
//   //useTranslate();
//   return <Acounting />;
// };

// export default AccountingPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAPlan,
  getAllPlans,
  getSelectedPlans,
  selectAPlan,
} from "../../../redux/college/account/paymentSlice";
import { getCollege } from "../../../redux/college/auth/authSlice";
import useTranslate from "../../../hooks/useTranslate";

import axios from "axios";

const Accounting = () => {
  //useTranslate();
  const { user, isLoggedIn, uploadImg } = useSelector(
    (state) => state.collegeAuth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plans, select_loading, selectPlan, cancel_loading } = useSelector(
    (state) => state.payment
  );
  const [requestStatus, setRequestStatus] = useState();
  const { credit } = useSelector((state) => state.collegeAuth);
  const selectedPlan = user?.selectedPlan;
  // //console.log(requestStatus);

  useEffect(() => {
    if (user?._id) {
      getSelected();
    }
  }, [user?._id]);

  async function getSelected() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/selected-plans/${user?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      // //console.log(response.data);
      setRequestStatus(response.data.selectedPlan);

      return response.data.selectedPlan;
    } catch (err) {
      //console.log(err);
    }
  }

  useEffect(() => {
    dispatch(getAllPlans());

    // dispatch(getSelectedPlans());
  }, [dispatch, requestStatus]);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-5 md:mb-10">
        <p className="font-bold text-[#171717] text-md font-[Heebo]">
          My Current Plan
        </p>
        <button
          className="self-center justify-center flex bg-accent  rounded-2xl px-[18px] py-[10px] text-white text-[12px] font-bold"
          onClick={() => navigate("/college/accounting/transactions")}
        >
          Transactions
        </button>
      </div>
      {select_loading && (
        <div className="fixed top-20 font-bold">Upgrading...</div>
      )}

      {
        // !payments[0] && <div className="text-lg text-gray-400  font-bold my-2 py-2 pl-2"> No Transaction found </div>
        plans?.map((plan) => (
          <>
            <div
              key={plan._id}
              className={`shadow-sm p-4 md:p-8  rounded-[20px] flex items-center gap-16 border border-[#E4E4E4] mb-5 md:mb-8 ${
                plan._id == selectedPlan?._id ? "border-2 border-[#007AFF]" : ""
              }`}
            >
              <div className="flex flex-col justify-center gap-5">
                <div className="flex item-center gap-5">
                  <img
                    src="../../images/aeroo.png"
                    alt="aeroo"
                    className="w-[64px] h-[64px]"
                  />
                  <div className="flex flex-col gap-6">
                    <p className="text-2xl md:text-[32px] font-bold text-[#2d2d2d] font-[Heebo]">
                      {plan.planName}
                    </p>
                    <p className="text-base  text-[#676562] font-[Heebo] font-normal">
                      ${" "}
                      <span className="text-xl md:text-[34px] text-[#2d2d2d] font-[Heebo] font-normal ">
                        {plan.price}
                      </span>{" "}
                      per month
                    </p>
                    {requestStatus?.status === "" &&
                      requestStatus?.planId === plan._id && (
                        <p>Request Pending</p>
                      )}
                  </div>
                </div>

                <div>
                  {plan._id == selectedPlan && credit.credit !== 0 ? (
                    <button
                      className="self-center  bg-secondary rounded-xl px-10 md:px-20 py-3 text-white font-[Heebo] text-lg font-bold"
                      onClick={() => {
                        dispatch(cancelAPlan({ planId: plan._id })).then(() => {
                          //console.log(plan);
                          dispatch(getCollege());
                        });
                      }}
                    >
                      Cancel Plan
                    </button>
                  ) : (
                    <button
                      className="self-center  bg-accent  rounded-xl px-10 md:px-20 py-3 text-white font-[Heebo] text-lg font-bold"
                      onClick={() => {
                        // //console.log(plan);
                        dispatch(selectAPlan({ planId: plan._id })).then(() => {
                          dispatch(getCollege());
                          getSelected();
                        });
                      }}
                    >
                      Upgrade Plan
                    </button>
                  )}
                </div>
              </div>
              <div className="max-w-[380px] flex flex-col gap-5 text-lg font-[Heebo]">
                <p>Assessment Credit</p>
                <p>Student invitation limit for one assessment</p>
                <p>Charges for each student invitation after limit</p>
              </div>
              <div className=" flex flex-col gap-5 text-lg font-bold font-[Heebo]">
                <p>{plan.credit}</p>
                <p>{plan.limit}</p>
                <p>{plan.charges}</p>
              </div>
            </div>
          </>
        ))
      }
    </>
  );
};

export default Accounting;
