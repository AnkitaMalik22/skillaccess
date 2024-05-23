import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAPlan,
  getAllPlans,
  selectAPlan,
} from "../../../../redux/collage/account/paymentSlice";
import { getCollege } from "../../../../redux/collage/auth/authSlice";

const Acounting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plans, select_loading, cancel_loading } = useSelector(
    (state) => state.payment
  );
  const { selectedPlan, credit } = useSelector((state) => state.collageAuth);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  //   useEffect(() => {
  // if(!cancel_loading){
  //   dispatch(getCollege());
  // }
  //   }, [cancel_loading]);

  // const payments = [
  //   {
  //     planName: "Basic",
  //     price: "49.99",
  //     credit: 100,
  //     limit: 10,
  //     charges: "Not Allowed",
  //     active: true,
  //   },
  //   {
  //     planName: "Plus",
  //     price: "99.99",
  //     credit: 200,
  //     limit: 20,
  //     charges: "Not Allowed",
  //     active: false,
  //   },
  //   {
  //     planName: "Business",
  //     price: "149.99",
  //     credit: 400,
  //     limit: 40,
  //     charges: "Not Allowed",
  //     active: false,
  //   },
  //   {
  //     planName: "Exclusive",
  //     price: "199.99",
  //     credit: 400,
  //     limit: 400,
  //     charges: "50 Cents",
  //     active: false,
  //   },
  // ];
  return (
    <div className="px-5 md:px-10 xl:px-20 py-4 md:py-8 xl:py-12  ">
      <div className="w-full flex justify-between items-center mb-5 md:mb-10">
        <p className="font-bold text-[#171717] text-md font-[Heebo]">
          My Current Plan
        </p>
        <button
          className="self-center justify-center flex bg-[#0052CC]  rounded-2xl px-[18px] py-[10px] text-white text-[12px] font-bold"
          onClick={() => navigate("/collage/accounting/transactions")}
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
                      per Month
                    </p>
                  </div>
                </div>

                <div className="">
                  {plan._id == selectedPlan?._id && credit.credit !== 0 ? (
                    <button
                      className="self-center  bg-[#007AFF]  rounded-xl px-10 md:px-20 py-3 text-white font-[Heebo] text-lg font-bold"
                      onClick={() => {
                        dispatch(cancelAPlan({ planId: plan._id })).then(() => {
                          console.log(plan);
                          dispatch(getCollege());
                        });
                      }}
                    >
                      Cancel Plan
                    </button>
                  ) : (
                    <button
                      className="self-center  bg-[#007AFF]  rounded-xl px-10 md:px-20 py-3 text-white font-[Heebo] text-lg font-bold"
                      onClick={() => {
                        console.log(plan);
                        dispatch(selectAPlan({ planId: plan._id })).then(() => {
                          dispatch(getCollege());
                        });
                      }}
                    >
                      Upgrade Plan
                    </button>
                  )}
                </div>
              </div>
              <div className="max-w-[380px] flex flex-col gap-5">
                <p className="text-lg font-[Heebo]">Assessment Credit</p>
                <p className="text-lg font-[Heebo]">
                  Student invitation limit for one assessment
                </p>
                <p className="text-lg font-[Heebo]">
                  Charges for each student invitation after limit
                </p>
              </div>
              <div className=" flex flex-col gap-5">
                <p className="text-lg font-bold font-[Heebo]">{plan.credit}</p>
                <p className="text-lg font-bold font-[Heebo]">{plan.limit}</p>
                <p className="text-lg font-bold font-[Heebo]">{plan.charges}</p>
              </div>
            </div>
          </>
        ))
      }
    </div>
  );
};

export default Acounting;
