import { Disclosure } from "@headlessui/react";
import React, { useRef, useState } from "react";
import {
  FaAngleLeft,
  FaChevronDown,
  FaChevronLeft,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import SearchForm from "./mail/SearchForm";
import { CiInboxIn } from "react-icons/ci";

const Header = ({ show, setShow, inboxType, setInboxType }) => {
  const refButton = useRef(null);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex w-full mx-auto justify-between mb-6">
      <div
        className={`fixed -left-[100px] w-[200vw] h-screen bg-black ${
          !toggle ? "-z-20" : "z-[99]"
        }  bg-opacity-10 top-0 `}
        onClick={() => {
          refButton.current.click();
        }}
      ></div>
      <div className="flex gap-4">
        <button className="bg-white border self-center rounded-md p-2 hover:shadow-md transition-shadow duration-300 hover:border-gray-500">
          <CiInboxIn className=" h-8 w-8" />
        </button>
        <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
          Inbox
        </h2>

        <Disclosure
          as={"div"}
          className={`flex flex-col z-[999] bg-white border rounded-md`}
        >
          {({ open }) => (
            <div className="relative">
              <div className="px-3 w-fit flex">
                <div className="flex justify-between">
                  <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search in mail"
                    className={`input border-none self-center focus:outline-none input-md sm:w-96 max-w-md mx-auto `}
                  />
                  <Disclosure.Button
                    ref={refButton}
                    className="self-center"
                    onClick={() => {
                      setToggle(!toggle);
                      // //console.log(toggle);
                    }}
                  >
                    <FaSortDown className="text-gray-400 self-center" />
                  </Disclosure.Button>
                </div>
              </div>

              <Disclosure.Panel
                className={`absolute  w-full ${
                  toggle ? "bg-white" : "bg-gray-100"
                }`}
              >
                <SearchForm
                  setToggle={setToggle}
                  refButton={refButton}
                  show={show}
                  setShow={setShow}
                />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>

        {/*  */}
      </div>

      <button
        className="bg-blued py-2 px-3 self-center  rounded-md flex gap-2 text-white"
        onClick={() => {
          navigate(`/college/inbox/mail?type=compose&inboxType=${inboxType}`);
        }}
      >
        <FaPlus className="self-center text-lg" />{" "}
        <p className="self-center text-sm font-bold">Compose</p>
      </button>
    </div>
  );
};

export default Header;
