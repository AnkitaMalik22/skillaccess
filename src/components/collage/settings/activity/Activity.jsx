import React from "react";
import Header from "./Header";

const Activity = () => {
  return (
    <div className="pt-4 mx-auto w-11/12 font-dmSans">
      <Header />

      <div className="mt-20">
        <h1 className="text-lg font-bold mb-7">Where You’re Logged in</h1>

        <div className="w-1/2 bg-lGray bg-opacity-5 py-3 px-4 flex justify-between rounded-2xl mb-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 object-contain p-2">
              <img src="../../images/icons/location.png" alt="" />
            </div>

            <div>
              <h1 className="text-lg font-bold">Jaipur Rajasthan</h1>
              <span className="flex gap-2">
                {" "}
                <p className="text-green-500">Active now</p>
                <p className="text-gray-400">This is Mac OS</p>
              </span>
            </div>
          </div>

          {/*  */}
          <div className="self-center">
            <button className="bg-[#DE350B33] bg-opacity-20 text-[#DE350B] py-1 px-2 rounded-lg text-sm font-medium">
              Log Out
            </button>
          </div>

          {/*           
          <div className="self-center">
            <button className="bg-lGray bg-opacity-20 text-gray-700 py-1 px-2 rounded-lg text-sm font-medium">
              Delete
            </button>
          </div> */}
        </div>
        <div className="w-1/2 bg-lGray bg-opacity-5 py-3 px-4 flex justify-between rounded-2xl mb-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 object-contain p-2">
              <img src="../../images/icons/location.png" alt="" />
            </div>

            <div>
              <h1 className="text-lg font-bold">Jaipur Rajasthan</h1>
              <span className="flex gap-2">
                {" "}
                <p className="text-green-500">Active now</p>
                <p className="text-gray-400">This is Mac OS</p>
              </span>
            </div>
          </div>

          {/*  */}
          <div className="self-center">
            <button className="bg-[#DE350B33] bg-opacity-20 text-[#DE350B] py-1 px-2 rounded-lg text-sm font-medium">
              Log Out
            </button>
          </div>

          {/*           
          <div className="self-center">
            <button className="bg-lGray bg-opacity-20 text-gray-700 py-1 px-2 rounded-lg text-sm font-medium">
              Delete
            </button>
          </div> */}
        </div>
        <div className="w-1/2 bg-lGray bg-opacity-5 py-3 px-4 flex justify-between rounded-2xl mb-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 object-contain p-2">
              <img src="../../images/icons/location.png" alt="" />
            </div>

            <div>
              <h1 className="text-lg font-bold">Jaipur Rajasthan</h1>
              <span className="flex gap-2">
                {" "}
                <p className="text-green-500">Active now</p>
                <p className="text-gray-400">This is Mac OS</p>
              </span>
            </div>
          </div>

          {/*  */}
          {/* <div className="self-center">
            <button className="bg-[#DE350B33] bg-opacity-20 text-[#DE350B] py-1 px-2 rounded-lg text-sm font-medium">
              Log Out
            </button>
          </div> */}

          <div className="self-center">
            <button className="bg-lGray bg-opacity-20 text-gray-700 py-1 px-2 rounded-lg text-sm font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
