import React, { useEffect } from "react";
import { TbFileDownload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPayments } from "../../../../redux/collage/account/paymentSlice";

const List = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getPayments());
    // //console.log(payments);
  }, []);

  const covertToDateFormat = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  return (
    <div className="w-full bg-[#F8F8F9] p-5 rounded-lg">
      {/* legend */}
      <div className=" grid-cols-6   w-full mx-auto mt-4 font-dmSans font-semibold text-base hidden md:grid ">
        <div className="bg-accent rounded-s-lg p-2 bg-opacity-5 ">
          <h2>Date</h2>
        </div>
        <div className="bg-accent p-2 bg-opacity-5">
          <h2>Description</h2>
        </div>
        <div className="bg-accent p-2 bg-opacity-5">
          <h2>Plan Duration</h2>{" "}
        </div>
        <div className="bg-accent p-2 bg-opacity-5">
          <h2>Mode</h2>
        </div>
        <div className="bg-accent p-2 bg-opacity-5">
          <h2>Status</h2>
        </div>

        <div className="bg-accent p-2 rounded-e-lg bg-opacity-5">
          <h2>Amount</h2>
        </div>
      </div>

      {/* list to be iterated */}

      {!payments[0] && (
        <div className="text-lg text-gray-400  font-bold my-2 py-2 pl-2">
          {" "}
          No Transaction found{" "}
        </div>
      )}
      {payments.map((payment) => (
        <div className=" grid-cols-6 rounded-lg my-2 py-2 pl-2 text-center w-full mx-auto  font-dmSans font-semibold text-base hidden md:grid bg-white">
          <div className="flex pl-1 ">
            <div className="  h-fit">
              <span>
                <h2 className="font-dmSans font-medium text-sm sm:text-base">
                  {covertToDateFormat(payment.createdAt)}
                </h2>
              </span>
            </div>
          </div>
          <div className="flex pl-1 justify-start">
            <div className=" self-center h-fit">
              <span>
                <h2 className="font-dmSans font-medium text-sm sm:text-base line-clamp-3 text-left">
                  {payment?.products[0]?.description}
                </h2>
              </span>
            </div>
          </div>
          <div className="flex pl-1 ">
            <div className="  h-fit">
              <span>
                <h2 className="font-dmSans font-medium text-sm sm:text-base">
                  {payment.products[0].duration}
                </h2>
              </span>
            </div>
          </div>
          <div className="flex pl-1 ">
            <div className="  h-fit">
              <span>
                <h2 className="font-dmSans font-medium text-sm sm:text-base">
                  {payment.paymentMethod}
                </h2>
              </span>
            </div>
          </div>
          <div className="flex pl-1 ">
            <div className="  h-fit">
              <span>
                <h2 className="font-dmSans font-medium text-sm sm:text-base">
                  {payment.status}
                </h2>
              </span>
            </div>
          </div>
          <div className="flex pl-1 ">
            <div className="  h-fit">
              <span>
                <h2 className="font-dmSans font-medium text-sm sm:text-base">
                  {payment?.products[0]?.price}
                </h2>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
