import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAPlan,
  getAllPlans,
  selectAPlan,
} from "../../../redux/college/account/paymentSlice";
import { getCollege } from "../../../redux/college/auth/authSlice";
import { FaMoneyCheck } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import axios from "axios";

const Accounting = () => {
  const { user } = useSelector((state) => state.collegeAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plans, select_loading, cancel_loading } = useSelector(
    (state) => state.payment
  );
  const [requestStatus, setRequestStatus] = useState();
  const { credit } = useSelector((state) => state.collegeAuth);
  const selectedPlan = user?.selectedPlan;

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
      setRequestStatus(response.data.selectedPlan);
      return response.data.selectedPlan;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch, requestStatus]);

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-4">
          <GrMoney className="text-blued h-10 w-10" />
          <h2 className="text-2xl font-bold text-gray-800">My Current Plan</h2>
        </div>
        <button
          className="flex items-center gap-2 bg-blued text-white py-2 px-4 rounded-lg font-medium hover:bg-blued transition"
          onClick={() => navigate("/college/accounting/transactions")}
        >
          <FaMoneyCheck className="text-lg" /> Transactions
        </button>
      </div>

      {/* Selected Plan Section */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Selected Plan
        </h3>
        {selectedPlan ? (
          <div className="shadow-md p-6 rounded-md border-2 border-blued bg-white">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/images/aeroo.png"
                alt="Plan Icon"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedPlan?.planName}
                </h3>
                <p className="text-gray-500">
                  ${" "}
                  <span className="text-2xl font-bold">
                    {selectedPlan?.price}
                  </span>{" "}
                  / month
                </p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                Assessment Credit: {selectedPlan?.credit}
              </p>
              <p className="text-sm text-gray-500">
                Student Invitation Limit: {selectedPlan?.limit}
              </p>
              <p className="text-sm text-gray-500">
                Extra Charges: {selectedPlan?.charges}
              </p>
            </div>
            <div className="mt-4">
              <button
                className="w-full bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition"
                onClick={() => {
                  dispatch(cancelAPlan({ planId: selectedPlan._id })).then(() =>
                    dispatch(getCollege())
                  );
                }}
                disabled={cancel_loading}
              >
                {cancel_loading ? "Cancelling..." : "Cancel Plan"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">You do not have a selected plan.</p>
        )}
      </div>

      {/* All Plans Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Available Plans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="shadow-md p-6 rounded-md bg-white border hover:shadow-lg transition-all duration-300 hover:border-blued"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/images/aeroo.png"
                  alt="Plan Icon"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {plan.planName}
                  </h3>
                  <p className="text-gray-500">
                    $ <span className="text-2xl font-bold">{plan.price}</span> /
                    month
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  Assessment Credit: {plan.credit}
                </p>
                <p className="text-sm text-gray-500">
                  Student Invitation Limit: {plan.limit}
                </p>
                <p className="text-sm text-gray-500">
                  Extra Charges: {plan.charges}
                </p>
              </div>
              <div className="mt-4">
                <button
                  className={`w-full py-2 rounded-lg font-bold transition ${
                    plan._id === selectedPlan
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blued text-white hover:bg-blued"
                  }`}
                  onClick={() => {
                    dispatch(selectAPlan({ planId: plan._id })).then(() => {
                      dispatch(getCollege());
                      getSelected();
                    });
                  }}
                  disabled={plan._id === selectedPlan}
                >
                  {plan._id === selectedPlan ? "Current Plan" : "Upgrade Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounting;
