import React from 'react'
import { BsGeoAlt } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaLocationArrow } from 'react-icons/fa'
import { PiPencilSimpleLine } from 'react-icons/pi'

const JobCard = ({job}) => {
  const navigate = useNavigate();
  console.log(job)
  return (

    <div className=" w-[40%] 2xl:w-1/3 h-auto bg-[#f8f8f9] my-3 text-start font-bold text-black rounded-2xl  font-dmSans p-5"  key={job.id}>
      <div className="logo flex ">
        <div className="w-24 h-24 flex items-center ">
          <img
            src="../../images/companyLogo.png"
            alt=""
            className=" rounded-2xl "
          />
        </div>
        <h2 className="mb-2 ml-2 line-clamp-2 break-words self-center">
            {job?.companyName}
        </h2></div>

      <div className='flex flex-row items-start justify-between'>
        <span className="self-center">
        {job?.JobTitle}

        </span>
        <span className='text-gray-400 font-medium text-sm font-dmSans  self-center'> {
        job?.createdAt}
        </span>

        <div className='flex items-start justify-between   h-full my-2'>
        jobs
        </div>
      </div>
      <div className="location flex flex-row items-start my-3 ">
        <BsGeoAlt className="w-6  h-6 mr-3 " />
        <h2 className='text-gray-400 font-medium text-base font-dmSans sm:mb-2'>Greater Bengaluru, Bengaluru Area</h2>
      </div>

      <h2 className="my-6  line-clamp-2 break-words self-center">Google Analytics

      </h2>
   
        <p className="text-sm py-2 text-gray-400 ">
           Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae….
        </p>
      <div className="flex flex-row items-start justify-between my-3">
      <p className="text-[#e45b39] text-sm">Final Date 05/12/22</p>

        <button className="bg-blued text-white rounded-2xl text-xs font-bold flex gap-2 px-7 py-2 "
          onClick={() => navigate(`/company/pr/jobs/${job?._id}`)}
        >
          View Details
        </button>
      </div>


    </div>


  )
}

export default JobCard;