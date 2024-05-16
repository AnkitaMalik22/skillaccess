import React from "react";

export const Progress = ({ level }) => {
  return (
    <>
      <div className="w-4/5 flex my-7 font-dmSans p-2">
        <div className="w-1/4 flex">
          <div className="relative">
            <figure
              className={`3xl:w-28 text-xs font-bold  w-20   h-10 p-3 rounded-xl bg-blue-700 z-50 text-white justify-center flex`}
            >
              <div className="self-center">Personal</div>
            </figure>
          </div>

          <div
            className={`w-full  rounded-lg h-1/4 self-center -ml-1 ${
              level !== 1 ? "bg-blue-700" : "bg-[#CCDCF5] "
            } `}
          ></div>
        </div>

        {/* education */}
        <div className="w-1/4 flex">
          <div
            className={`w-full ${
              level >= 2 ? "bg-blue-700 " : "bg-[#CCDCF5]  "
            }  h-1/4 self-center -ml-2`}
          ></div>
          <div className="relative">
            <figure
              className={`3xl:w-28 text-xs font-bold  w-20 flex justify-center h-10 p-3 rounded-xl ${
                level >= 2 ? "bg-blue-700 text-white " : "bg-[#CCDCF5]   "
              }  z-50`}
            >
              <div className="self-center">Education</div>
            </figure>
          </div>
          <div
            className={`w-full  h-1/4 self-center -ml-1 ${
              level >= 3 ? "bg-blue-700 " : "bg-[#CCDCF5]  "
            }`}
          ></div>
        </div>

        <div className="w-1/4 flex">
          <div
            className={`w-full   h-1/4 self-center -ml-2 ${
              level >= 3 ? "bg-blue-700 " : "bg-[#CCDCF5]  "
            }`}
          ></div>
          <div className="relative">
            <figure
              className={`3xl:w-28 text-xs font-bold  w-20  h-10 p-3 rounded-xl flex justify-center ${
                level >= 3 ? "bg-blue-700 text-white " : "bg-[#CCDCF5]  "
              } z-50`}
            >
              <div className="self-center">Skills</div>
            </figure>
          </div>
          <div
            className={`w-full ${
              level >= 4 ? "bg-blue-700 " : "bg-[#CCDCF5]  "
            } h-1/4 self-center -ml-1`}
          ></div>
        </div>

        <div className="w-1/4 flex">
          <div
            className={`w-1/3  ${
              level >= 4 ? "bg-blue-700 " : "bg-[#CCDCF5]  "
            }  h-1/4 self-center `}
          ></div>
          <div
            className={`w-1/3  ${
              level >= 4 ? "bg-blue-700 " : "bg-[#CCDCF5]  "
            }  h-1/4 self-center `}
          ></div>
          <div className="relative">
            <figure
              className={`3xl:w-28 text-xs font-bold  w-20  h-10 p-3 rounded-xl flex justify-center ${
                level >= 4 ? "bg-blue-700 text-white" : "bg-[#CCDCF5]  "
              }  z-50`}
            >
              <div className="self-center">Portfolio</div>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};
