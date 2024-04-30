import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getAllPlans,selectAPlan } from "../../../../redux/collage/account/paymentSlice";
import { getCollege } from "../../../../redux/collage/auth/authSlice";

const Acounting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {plans} = useSelector((state) => state.payment);
  const {selectedPlan} = useSelector((state) => state.collageAuth);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);


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
    <div className="w-11/12 mx-auto font-dmSans">
      <div className="w-full flex justify-between items-center">
        <p className="font-bold text-[#171717] mt-10">My Current Plan</p>
        <button
          className="self-center justify-center flex bg-blue-700  rounded-xl px-5 py-4 text-white  "
          onClick={() => navigate("/collage/accounting/transactions")}
        >
          Transactions
        </button>
      </div>

      {
        // !payments[0] && <div className="text-lg text-gray-400  font-bold my-2 py-2 pl-2"> No Transaction found </div>
       plans?.map((plan) => (
          <>
            <div className={`shadow-sm py-4 mt-6 px-7 rounded-[20px] flex items-center gap-16 border ${plan._id == selectedPlan?._id ? 'border-2 border-[#007AFF]' : ''}`}>
              <div className="flex flex-col justify-center gap-5">
                <div className="flex item-center gap-5">
                  <img
                    src="../../images/aeroo.png"
                    alt="aeroo"
                    className="w-[64px] h-[64px]"
                  />
                  <div className="flex flex-col gap-6">
                    <p className="text-[38px] font-bold text-[#2d2d2d]">
                      {plan.planName}
                    </p>
                    <p className="text-base  text-[#676562] -ml-4">
                      ${" "}
                      <span className="text-[34px] text-[#2d2d2d] ">
                        {plan.price}
                      </span>{" "}
                      per Month
                    </p>
                  </div>
                </div>

                <div className="">
                  
                  {
        
                    plan._id == selectedPlan?._id ? (
                      <button className="self-center  bg-[#007AFF]  rounded-xl px-16 py-3 text-white">
                       Cancel Plan    
                       
                      </button>
                    ) : (
                      <button
                        className="self-center  bg-[#007AFF]  rounded-xl px-16 py-3 text-white"
                        onClick={() => {
                          console.log(plan);
                          dispatch(selectAPlan({ planId: plan._id})).then(() => {
                            dispatch(getCollege());
                          }
                        )
                        }}
                      >
                       
                  
                        Upgrade Plan
                      </button>
                    )
                      
                  }
                </div>
              </div>
              <div className="w-[380px] flex flex-col gap-5">
                <p className="text-lg">Assessment Credit</p>
                <p className="text-lg">
                  Student invitation limit for one assessment
                </p>
                <p className="text-lg">
                  Charges for each student invitation after limit
                </p>
              </div>
              <div className=" flex flex-col gap-5">
                <p className="text-lg font-semibold">{plan.credit}</p>
                <p className="text-lg font-semibold">{plan.limit}</p>
                <p className="text-lg font-semibold">{plan.charges}</p>
              </div>
            </div>
          </>
        ))
      }
    </div>
  );
};

export default Acounting;
