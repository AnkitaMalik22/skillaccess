import { Disclosure } from "@headlessui/react";
import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const refButton = useRef(null);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* <div className="mx-auto justify-between mb-2 font-dmSans"> */}
      {/* <div
        className={`fixed -left-[100px] w-[200vw] h-screen bg-black ${
          !toggle ? "-z-20" : "z-[99]"
        }  bg-opacity-10 top-0 `}
        onClick={() => {
          refButton.current.click();
        }}
      ></div> */}
      <div className="flex gap-4 justify-between md:mb-10 mb-5">
        <div className="flex gap-2">
          <button
            className=" self-center ml-2 rounded-md "
            // onClick={() => navigate(-1)}
          >
            {/* <img
            src="/images/icons/inbox.png"
            className="mx-auto sm:h-6 sm:w-6 h-4 w-4"
          /> */}
            {/* setting icon */}
            <IoSettingsOutline className="h-8 w-8" />
          </button>
          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
            Settings
          </h2>
        </div>
        {/* 
        <Disclosure
          as={"div"}
          className={`flex flex-col z-[999] ${
            toggle ? "bg-white rounded-t-xl " : "bg-gray-100 rounded-xl "
          }`}
        >
          {({ open }) => (
            <div className="relative">
              <div className="py-2 px-4">
                <div className="flex justify-between">
                  <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`input border-none focus:outline-none sm:w-96 ${
                      open ? "bg-white" : "bg-gray-100"
                    } `}
                  />
                </div>
              </div>
            </div>
          )}
        </Disclosure> */}

        {/*  */}
      </div>
      {/* </div> */}
    </>
  );
};

export default Header;
