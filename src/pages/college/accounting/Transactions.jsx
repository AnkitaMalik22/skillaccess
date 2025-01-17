import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../../redux/college/account/paymentSlice";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { capitalize, convertToReadable } from "../../../util/getDate";
import CircularLoader from "../../../components/CircularLoader";
import { Table } from "../../../components/ui/tables/Table"; // Import reusable Table component

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions, fetch_loading } = useSelector((state) => state.payment);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const filteredAssessmentsWithIndex = transactions.map(
    (transaction, index) => ({
      ...transaction,
      index: index + 1, // Add index to each filtered assessment
    })
  );

  // Define table columns
  const columns = [
    {
      header: "S. No.",
      accessor: "index", // Generate serial number
      className: "text-center", // Optional styling
    },
    {
      header: "Date",
      accessor: (transaction) => convertToReadable(transaction.date),
    },
    {
      header: "Description",
      accessor: (transaction) => capitalize(transaction.for),
    },
    {
      header: "Points Used",
      accessor: (transaction) => transaction.creditUsed,
      className: "text-right", // Optional styling
    },
  ];

  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-6">
        <button
          className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500"
          onClick={() => navigate(-1)}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="transactions flex flex-col w-full">
        <h2 className="font-dmSans font-bold mb-3 text-xl">
          Previous Transactions
        </h2>
        <div className="acc-table flex flex-col w-full p-4 bg-[#f8f8f9] rounded-md">
          {fetch_loading ? (
            <CircularLoader />
          ) : (
            <Table
              columns={columns} // Pass columns
              data={filteredAssessmentsWithIndex || []} // Pass transaction data
              isLoading={fetch_loading} // Handle loading state
              className="mt-4" // Add optional table styling
            />
          )}
          {!fetch_loading && transactions?.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No transactions found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
