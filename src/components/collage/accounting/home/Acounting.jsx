import React from 'react'
import { useNavigate } from 'react-router-dom'

const Acounting = () => {
    const navigate = useNavigate();

const payments = [1,2,3,4,5,6,]
  return (
    <div className='w-11/12 mx-auto font-dmSans'>
        <div className="w-full flex justify-between items-center">
            <p className="font-bold text-[#171717] mt-10">My Current Plan</p>
            <button className="self-center justify-center flex bg-blue-700  rounded-xl px-5 py-4 text-white  "
            onClick={() => navigate("/collage/accounting/transactions")}
            >Transactions</button>
        </div>

{
    // !payments[0] && <div className="text-lg text-gray-400  font-bold my-2 py-2 pl-2"> No Transaction found </div>
    payments.map((payment) => (
        <>
           <div className="shadow-sm py-4 mt-6 px-7 rounded-[20px] flex items-center gap-16 border">
            <div className="flex flex-col justify-center gap-5">
            <div className="flex item-center gap-5">
                    <img src='../../images/aeroo.png' alt='aeroo' className='w-[64px] h-[64px]' />
                    <div className="flex flex-col gap-6">
                    <p className="text-[38px] font-bold text-[#2d2d2d]">Basic</p>
                    <p className="text-base  text-[#676562] -ml-4">$ <span className="text-[34px] text-[#2d2d2d] ">49.99</span>per Month</p>
                    </div>
                   
                </div>
                
                <div className=""><button className="self-center  bg-[#007AFF]  rounded-xl px-16 py-3 text-white">Cancel Plan</button></div>
                
            </div>
            <div className="w-[380px] flex flex-col gap-5">
                <p className="text-lg">Assessment Credit</p>
                <p className="text-lg">Student invitation limit for one assessment</p>
                <p className="text-lg">Charges for each student invitation after limit</p>
            </div>
            <div className=" flex flex-col gap-5">
                <p className="text-lg font-semibold">100</p>
                <p className="text-lg font-semibold">10</p>
                <p className="text-lg font-semibold">Not allowed</p>
            </div>
        </div>
        </>
    ))

}

     
       
       
    </div>
  )
}

export default Acounting