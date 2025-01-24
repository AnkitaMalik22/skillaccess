import { Disclosure } from "@headlessui/react";
import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const Header = () => {
  const refButton = useRef(null);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-2 font-dmSans">
      <div
        className={`fixed -left-[100px] w-[200vw] h-screen bg-black ${
          !toggle ? "-z-20" : "z-[99]"
        }  bg-opacity-10 top-0 `}
        onClick={() => {
          refButton.current.click();
        }}
      ></div>
      <span className="flex gap-4 w-3/4 justify-between">
        <div className="flex gap-2">
          <button
            className="bg-[#D9E1E7]  self-center ml-2 rounded-md h-10 w-10 sm:h-12 sm:w-14"
            onClick={() => navigate(-1)}
          >
            <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
          </button>
          <h2 className="text-xl font-bold self-center">Notifications</h2>
        </div>

        <Disclosure
          as={"div"}
          className={`flex flex-col z-[999] ${
            toggle ? "bg-white rounded-t-xl " : "bg-gray-100 rounded-xl "
          }`}
        >
          {({ open }) => (
            <div className="relative">
              <div className=" mx-2  sm:h-12 h-10  px-4 w-fit ">
                <div className="flex justify-between">
                  <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`input border-none self-center focus:outline-none input-md sm:w-96 max-w-md mx-auto ${
                      open ? "bg-white" : "bg-gray-100"
                    } `}
                  />
                </div>
              </div>
            </div>
          )}
        </Disclosure>

        {/*  */}
      </span>
    </div>
  );
};

export default Header;
