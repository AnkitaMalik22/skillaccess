import React from 'react';
import { useNavigate } from 'react-router-dom';


const TestCard = (props) => {
    const navigate = useNavigate();
    // console.log(props.assessment)
  return (
    <div className="w-full  bg-[#0d9aac23] text-start font-bold text-black rounded-lg p-4 font-dmSans shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="mb-2 text-lg line-clamp-2 first-letter:uppercase">
        {props.assessment?.test?.name}
      </h2>
      <p className="font-normal text-gray-500 text-sm line-clamp-1 mb-2 h-[28%]">
        {props.assessment?.test?.description?.length > 100 ? `${props.assessment?.test?.description.substring(0, 100)}...` : props.assessment?.test?.description}
      </p>
      <h2 className="text-gray-500 text-sm tracking-wide font-dmSans mb-2">
        Topics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {props?.assessment?.test?.topics?.slice(0, 4).map((topic, index) => (
          <div key={index} className="overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-4 h-full flex flex-col justify-between">
              <h2 className="text-md font-semibold  mb-2 line-clamp-2 text-blued">
                {topic?.Heading}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 w-full max-w-xs">
                {topic?.Description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestCard