import React from 'react'

const Acounting = () => {
  return (
    <div className='w-11/12 mx-auto font-dmSans'>
        <div className="w-full flex justify-between items-center">
            <p className="font-bold text-[#171717] mt-10">My Current Plan</p>
            <button className="self-center justify-center flex bg-blue-700  rounded-xl px-5 py-4 text-white  ">Transactions</button>
        </div>
        <div className="shadow-md py-4 mt-6 px-7 rounded-[20px] flex items-center gap-16">
            <div className="flex flex-col justify-center gap-5">
            <div className="flex item-center gap-5">
                    <img src='../../images/aeroo.png' alt='aeroo' className='w-[64px] h-[64px]' />
                    <div className="flex flex-col gap-6">
                    <p className="text-[38px] font-bold text-[#2d2d2d]">Basic</p>
                    <p className="text-base  text-[#676562] -ml-4">$ <span className="text-[34px] text-[#2d2d2d] ">49.99</span>per Month</p>
                    </div>
                   
                </div>
                
                <div className=""><button className="self-center  bg-blue-700  rounded-xl px-20 py-4 text-white">Cancel Plan</button></div>
                
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
        <div className="shadow-md py-4 mt-6 px-7 rounded-[20px] flex items-center gap-16">
            <div className="flex flex-col justify-center gap-5">
            <div className="flex item-center gap-5">
                    <img src='../../images/aeroo.png' alt='aeroo' className='w-[64px] h-[64px]' />
                    <div className="flex flex-col gap-6">
                    <p className="text-[38px] font-bold text-[#2d2d2d]">Plus</p>
                    <p className="text-base  text-[#676562] -ml-4">$ <span className="text-[34px] text-[#2d2d2d] ">99.99</span>per Month</p>
                    </div>
                   
                </div>
                
                <div className=""><button className="self-center  bg-blue-700  rounded-xl px-20 py-4 text-white">Cancel Plan</button></div>
                
            </div>
            <div className="w-[380px] flex flex-col gap-5">
                <p className="text-lg">Assessment Credit</p>
                <p className="text-lg">Student invitation limit for one assessment</p>
                <p className="text-lg">Charges for each student invitation after limit</p>
            </div>
            <div className=" flex flex-col gap-5">
                <p className="text-lg font-semibold">200</p>
                <p className="text-lg font-semibold">20</p>
                <p className="text-lg font-semibold">Not allowed</p>
            </div>
        </div>
        <div className="shadow-md py-4 mt-6 px-7 rounded-[20px] flex items-center gap-16">
            <div className="flex flex-col justify-center gap-5">
            <div className="flex item-center gap-5">
                    <img src='../../images/aeroo.png' alt='aeroo' className='w-[64px] h-[64px]' />
                    <div className="flex flex-col gap-6">
                    <p className="text-[38px] font-bold text-[#2d2d2d]">Business</p>
                    <p className="text-base  text-[#676562] -ml-4">$ <span className="text-[34px] text-[#2d2d2d] ">199.99</span>per Month</p>
                    </div>
                   
                </div>
                
                
                <div className=""><button className="self-center  bg-blue-700  rounded-xl px-20 py-4 text-white">Upgrade  Plan</button></div>
                
            </div>
            <div className="w-[380px] flex flex-col gap-5">
                <p className="text-lg">Assessment Credit</p>
                <p className="text-lg">Student invitation limit for one assessment</p>
                <p className="text-lg">Charges for each student invitation after limit</p>
            </div>
            <div className=" flex flex-col gap-5">
                <p className="text-lg font-semibold">400</p>
                <p className="text-lg font-semibold">40</p>
                <p className="text-lg font-semibold">Not allowed</p>
            </div>
        </div>
        <div className="shadow-md py-4 mt-6 px-7 rounded-[20px] flex items-center gap-16 mb-16">
            <div className="flex flex-col justify-center gap-5">
                <div className="flex item-center gap-5">
                    <img src='../../images/aeroo.png' alt='aeroo' className='w-[64px] h-[64px]' />
                    <div className="flex flex-col gap-6">
                        <p className="text-[38px] font-bold text-[#2d2d2d]">Exclusive</p>
                        <p className="text-base  text-[#676562] -ml-4">$ <span className="text-[34px] text-[#2d2d2d] ">199.99</span>per Month</p>
                    </div>
                   
                </div>
             
                
                <div className=""><button className="self-center  bg-blue-700  rounded-xl px-20 py-4 text-white">Upgrade  Plan</button></div>
                
            </div>
            <div className="w-[380px] flex flex-col gap-5">
                <p className="text-lg">Assessment Credit</p>
                <p className="text-lg">Student invitation limit for one assessment</p>
                <p className="text-lg">Charges for each student invitation after limit</p>
            </div>
            <div className=" flex flex-col gap-5">
                <p className="text-lg font-semibold">400</p>
                <p className="text-lg font-semibold">400</p>
                <p className="text-lg font-semibold">50 cents</p>
            </div>
        </div>
       
    </div>
  )
}

export default Acounting