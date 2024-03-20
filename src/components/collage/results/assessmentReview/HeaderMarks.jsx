import React from 'react'

const HeaderMarks = () => {
  return (
    <div className='w-full flex justify-between items-center bg-[#8f92a1] bg-opacity-5  rounded-[24px] py-7 mt-4'>
         <div className="flex flex-col pl-12 w-2/3">
            <div className="">
                <p className="text-lg text-[#171717]">Test name</p>
                <p className='font-bold text-[#171717] text-[28px]'>Google Analytics</p>
            </div>
            <div className="flex justify-between ">
              <div className='w-1/2'>
                <p className="text-lg">Time taken</p>
                <p className='font-bold text-[28px]'>1 hr 40 min</p>
             </div>
              <div className='w-1/2 '>
                <p className="text-lg">Questions Attempted</p>
                <p className='font-bold text-[28px]'>25</p>
            </div>
            </div>
            <div className="flex justify-between ">
            <div className='w-1/2'>
                <p className="text-lg">Correct Answers</p>
                <p className='font-bold text-[28px]'>21</p>
             </div>
              <div className='w-1/2'>
                <p className="text-lg">Overall Result</p>
                <p className='font-bold text-[28px]'>80%</p>
            </div>
            </div>
         </div>
         <div class="mr-10 w-[200px] h-[200px] flex flex-row justify-center items-center gap-10 mt-22 mb-23  px-12 py-30 rounded-full shadow-md border border-solid border-black border-opacity-25 bg-gradient-to-b from-white to-white  border-[radial-gradient(circle at 100% 85%, #2fd790, rgba(47, 215, 144, 0) 100%)]">
           <p className='text-[32px] font-bold text-[#2fd790]'>21/25</p>
</div>

    </div>
  )
}

export default HeaderMarks