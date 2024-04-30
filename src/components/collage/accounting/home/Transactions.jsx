import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../../../redux/collage/account/paymentSlice';

const Transactions = () => {
    // const transactions = [1,2,3,4,5,6,];
    const dispatch = useDispatch();
    const {transactions,fetch_loading} = useSelector((state) => state.payment);
    useEffect(() => {
      dispatch(getAllTransactions());
    }, [dispatch]);


    const covertToDateFormat = (date) => {
      const d = new Date(date);
      return d.toDateString();
    };

  return (
    <section className="transactions flex flex-col w-full p-6 ]">
        <h2 className='font-dmSans font-bold mb-3 text-xl'>Previous Transactions</h2>
        <div className="acc-table  flex flex-col w-full p-6 bg-[#f8f8f9] rounded-lg">
        <div className="header grid grid-cols-3 items-center justify-between bg-[#ECF0F7] w-full p-3 mb-3 rounded-lg font-bold">
            <div>Date</div>
            <div>Description</div>
            <div>Points Used</div>

        </div>
        <div className="acc-table  flex flex-col w-full rounded-lg font-dmSans font-medium">
          {
            fetch_loading && <div>Loading...</div>
          }
          {!fetch_loading && transactions?.length > 0 ? (
            transactions?.map((transaction) => (
              <div className="grid grid-cols-3 items-center justify-between bg-white w-full p-3 mb-3 rounded-lg">
                <div>{covertToDateFormat(transaction.Date)}</div>
                <div>{transaction.planName}</div>
                <div>{transaction.credit}</div>
              </div>
            ))
          ) : (
            <div>{!fetch_loading && 'No transactions found.'}</div>
          )}
        </div>
        </div>
        
    </section>
  )
}

export default Transactions