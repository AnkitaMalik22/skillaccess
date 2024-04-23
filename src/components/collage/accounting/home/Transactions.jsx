import React from 'react'

const Transactions = () => {
    const transactions = [1,2,3,4,5,6,]
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
        transactions.map((transaction) => (
            <div className="grid grid-cols-3 items-center justify-between bg-white w-full p-3 mb-3 rounded-lg">
                <div>12/12/2021</div>
                <div>Basic Plan</div>
                <div>100</div>
            </div>
        ))
      }
        
        </div>
        </div>
        
    </section>
  )
}

export default Transactions