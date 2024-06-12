import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../../../redux/collage/account/paymentSlice";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import CircularLoader from "../../../CircularLoader";
import { capitalize, convertToReadable } from "../../../../util/getDate";

const Transactions = () => {
  // const transactions = [1,2,3,4,5,6,];
  const dispatch = useDispatch();
  const { transactions, fetch_loading } = useSelector((state) => state.payment);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  return (
    <div className="w-11/12 mx-auto py-5 md:py-10">
      {" "}
      <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-3">
          <button
            className="self-center object-center rounded-lg h-10 w-10 "
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-[#D9E1E7]" />
          </button>
        </div>
      </div>
      <section className="transactions flex flex-col w-full">
        <h2 className="font-dmSans font-bold mb-3 text-xl">
          Previous Transactions
        </h2>
        <div className="acc-table  flex flex-col w-full p-6 bg-[#f8f8f9] rounded-lg">
          <div className="header grid grid-cols-3 items-center justify-between bg-[#ECF0F7] w-full p-3 mb-3 rounded-lg font-bold">
            <div>Date</div>
            <div>Description</div>
            <div>Points Used</div>
          </div>
          <div className="acc-table  flex flex-col w-full rounded-lg font-dmSans font-medium">
            <div className="flex justify-center">
              {fetch_loading && <CircularLoader />}
            </div>

            {!fetch_loading && transactions?.length > 0 ? (
              transactions?.map((transaction) => (
                <div className="grid grid-cols-3 items-center justify-between bg-white w-full p-3 mb-3 rounded-lg">
                  <div>{convertToReadable(transaction.date)}</div>
                  <div>{capitalize(transaction.for)}</div>
                  <div>{transaction.creditUsed}</div>
                </div>
              ))
            ) : (
              <div>{!fetch_loading && "No transactions found."}</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transactions;
