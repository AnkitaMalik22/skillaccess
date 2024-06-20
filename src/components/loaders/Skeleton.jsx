import React from 'react'

const Skeleton = () => {
  return (
    <div className="grid-cols-5 rounded-2xl my-4 py-2 pl-2 text-center mx-auto font-dmSans text-sm hidden md:grid w-full border-2 animate-pulse">
    <div className="flex justify-center gap-2">
      <div className=" min-w-[3rem]  h-12 self-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      </div>
      <div className="break-words min-w-0 self-center">
        <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    <div className="flex justify-center items-center">
      <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
    </div>
    <div className="flex justify-center">
      <div className=" self-center h-fit">
        <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    <div className="flex justify-center">
      <div className=" self-center">
        <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    <div className="flex justify-center">
      <div className=" self-center">
        <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
  )
}

export default Skeleton