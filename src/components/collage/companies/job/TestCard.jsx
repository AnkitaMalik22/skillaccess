import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestCard = (props) => {
    const navigate = useNavigate();
    console.log(props.assessment)
  return (
    <div className="w-full h-[312px] bg-[#0d9aac23] text-start font-bold text-black rounded-lg p-2 font-dmSans">
  <h2 className="mb-2 line-clamp-2 first-letter:uppercase">
    {props.assessment?.test?.name}
  </h2>
  <p className="font-normal text-gray-400 text-xs line-clamp-4 sm:mb-2 mb-1 h-[28%]">
    {props.assessment?.test?.description}
  </p>
  <h2 className="text-gray-400 text-xs tracking-[1px] font-dmSans sm:mb-2">
            Topics
            </h2>

  <div className="flex justify-between">
 
{/*   */}
{/* {props.assessment?.test?.topics?.slice(0, 4).map((topic, index) => ( */}
{/* sample static 4 */}
{["topic1", "topic2", "topic3", "topic4"].map((topic, index) => (
    <div key={index} className="w-[23%] h-[100px] bg-white rounded-lg flex items-center justify-center text-xs text-gray-700">
        {topic}
    </div>
))}

  </div>
</div>

  )
}

export default TestCard