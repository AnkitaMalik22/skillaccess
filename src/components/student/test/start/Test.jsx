import React from 'react'
import TestHeader from './TestHeader'
import Questions from './Questions';


const Test = () => {

  const questions = [
    {
      question: "What is your name?",
      options: ["A", "B", "C", "D"],
      answer: "A"
    },
    {
      question: "What is your age?",
      options: ["A", "B", "C", "D"],
      answer: "B"
    },
  ]
  return (
 <div className="flex w-full mx-auto justify-between mb-6 flex-col">
<div className="flex justify-between">
<div className="text">
    <h2 className="text-[28px] leading-[36px] font-bold self-center font-dmSans ">
    UX Test Advance
    </h2>
    <p className="text-[#6B7280] text-sm">Coding Question</p>
  </div>

 <button
          className="self-center w-32  justify-center flex text-bluedpy-2 px-4 rounded-xl font-bold gap-2 bg-white"
          // onClick={() => navigate(-1)}
        >
        <img src='../../../images/icons/CombinedShape.png' alt="" className="self-center w-6 h-6" />
        <p className="text-lg font-bold self-center text-[#E45B39] ">00:59:33</p>
        </button>

</div>


        <div className="questions flex flex-col items-between mt-8">

<h3 className="text-xl font-bold text-[#3E3E3E] ">Question 1</h3>
<Questions questions={questions} />



        </div>
        <div className="flex mt-8 justify-end gap-4  mr-4">
<button className="bg-white border borde-2 border-[#0052CC] text-blued  py-2 px-12 rounded-xl">Skip</button>
<button className="bg-[#00875A] text-white py-2 px-12 rounded-xl">Next</button>
</div>
    </div>
  )
}

export default Test