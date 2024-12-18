import React from "react";
import { CgPinAlt } from "react-icons/cg";
import { LuClock3 } from "react-icons/lu";

const Education = () => {
  return (
    <div className="font-dmSans">
      <span className="flex gap-2">
        <h2 className="text-2xl  font-bold  py-1  self-center">Education</h2>{" "}
        <div className=" p-[.3rem] w-6 h-6 rounded-lg  bg-accent bg-opacity-80 self-center">
          <img
            src="/images/icons/pen.png"
            alt="pen"
            // onClick={() => setEditable(!editable)}
          />
        </div>
      </span>
      {/* user header */}

      <section className="px-3 ">
        <div className="flex justify-between">
          {/* profile pic and details */}
          <div className="flex gap-2 py-1 mt-2">
            <div className="min-w-[2.5rem] h-10 bg-amber-500 self-center rounded-lg"></div>
            <div className="ml-1 mt-1">
              <h2 className="  font-bold  py-1 ">ABC college</h2>
              <h2 className="font-normal  text-sm pb-2">
                Bachelor in yapology
              </h2>
            </div>
          </div>

          {/* Location and date */}
          <span className="flex gap-12">
            {/*  */}
            <div className="self-center text-gray-400 mr-2 font-medium">
              <span className="flex gap-1 ">
                {" "}
                <LuClock3 className="self-center " />{" "}
                <p className="self-center text-xs font-medium">
                  August 12 2014 to July 8 2018
                </p>
              </span>
            </div>

            <div className="self-center text-gray-400 mr-2">
              <span className="flex gap-1">
                {" "}
                <CgPinAlt className="self-center text-lg font-bold" />{" "}
                <p className="self-center text-xs">Bhopal India</p>
              </span>
            </div>
            {/*  */}
          </span>
          {/* End of location and date */}
        </div>
        {/*  */}
        <p className="text-sm font-dmSans">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          ipsa quam vel quidem, perferendis ipsam. Deserunt cumque doloribus
          explicabo, distinctio tempore accusantium optio facilis non vitae
          ullam animi dolorum impedit?
        </p>
      </section>
      {/* end of user header */}

      {/*  Acheivements*/}
      <section className="px-3 text-xs font-bold mt-5">
        <h2>Acheivements (1)</h2>
        <div className="flex flex-wrap mt-4 border-b-2 pb-5">
          <img
            src="/images/cert.png"
            alt=""
            className="w-60 h-40 object-cover rounded-lg"
          />
        </div>
      </section>
      {/* End of  Acheivements */}
    </div>
  );
};

export default Education;
