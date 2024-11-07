import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";
import { searchMail } from "../../../../redux/collage/auth/authSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({ setToggle, refButton, show, setShow }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    type: "All Emails",
    within: null,
    keyword: null,
    from: null,
    to: null,
    date: null,
  });

  const handleChange = (e) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(searchMail({ ...filter, limit: 5 }));
    // setShow("search");
    setSearchParams({
      show: "search",
      within: filter.within,
      keyword: filter.keyword,
      from: filter.from,
      to: filter.to,
      date: filter.date,
      typeFilter: filter.type,
    });
    setToggle(true);
    refButton.current.click();
    // setFilter({
    //   type: "All Emails",
    //   within: null,
    //   keyword: "",
    //   from: "",
    //   to: "",
    //   date: "",
    // });
  };
  return (
    <form action="" className="p-3 font-dmSans">
      {/* 1 */}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs font-bold text-gray-400">SEARCH</label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open, close }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-sm font-bold">{filter.type}</span>

                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-snow  rounded-b-lg w-full z-[9999999]">
                <div
                  className="w-full mb-2 cursor-pointer"
                  onClick={() => {
                    setFilter((prev) => {
                      return { ...prev, type: "All Emails" };
                    });
                    close();
                  }}
                >
                  {" "}
                  All Emails
                </div>

                <div
                  className="w-full mb-2 cursor-pointer"
                  onClick={() => {
                    setFilter((prev) => {
                      return { ...prev, type: "College" };
                    });
                    close();
                  }}
                >
                  {" "}
                  College
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* 2*/}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs font-bold text-gray-400">FROM</label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4  text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                {/* <span className="text-sm font-bold">example@hmail.com</span> */}
                <input
                  onChange={handleChange}
                  value={filter.from}
                  name="from"
                  type="email"
                  className="text-sm bg-transparent w-full font-bold border-none focus:border-none focus:ring-0 "
                />
                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>
              {/* <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                Options
              </Disclosure.Panel> */}
            </div>
          )}
        </Disclosure>
      </div>

      {/* 3*/}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs font-bold text-gray-400">TO</label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4  text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <input
                  value={filter.to}
                  onChange={handleChange}
                  name="to"
                  type="text"
                  className="text-sm bg-transparent w-full font-bold border-none focus:border-none focus:ring-0 "
                />

                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>
              {/* <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                Options
              </Disclosure.Panel> */}
            </div>
          )}
        </Disclosure>
      </div>

      {/* {4} */}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs  font-bold text-gray-400">
          HAS KEYWORDS
        </label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4  text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <input
                  value={filter.keyword}
                  onChange={handleChange}
                  name="keyword"
                  type="text"
                  className="text-sm bg-transparent w-full font-bold border-none focus:border-none focus:ring-0 "
                />
                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>

              {/* <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                Options
              </Disclosure.Panel> */}
            </div>
          )}
        </Disclosure>
      </div>

      <div className="w-full flex justify-between gap-3">
        {/* 5.1 */}
        <div className="w-1/2 flex flex-col">
          <label className="pl-2 text-xs font-bold text-gray-400">
            DATE WITHIN
          </label>
          <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
            {({ open, close }) => (
              <div className="relative">
                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span className="text-sm font-bold">
                    {filter.within}{" "}
                    {filter.within ? (filter.within > 1 ? "Days" : "Day") : ""}
                  </span>
                  <FaSortDown className="text-gray-400 self-center" />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-snow rounded-b-lg w-full z-[9999999]">
                  <div
                    className="w-full mb-2 cursor-pointer"
                    onClick={() => {
                      setFilter((prev) => {
                        return { ...prev, within: 1 };
                      });
                      close();
                    }}
                  >
                    {" "}
                    1 Day
                  </div>

                  <div
                    className="w-full mb-2 cursor-pointer"
                    onClick={() => {
                      setFilter((prev) => {
                        return { ...prev, within: 2 };
                      });
                      close();
                    }}
                  >
                    {" "}
                    2 Days
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        </div>
        {/* 5.2 */}
        <div className="w-1/2 flex flex-col">
          <label className="pl-2 text-xs font-bold text-gray-400">
            Custom Date
          </label>
          <input
            name="date"
            type="date"
            className="rounded-lg bg-lGray bg-opacity-5 my-2 py-4 border-none text-gray-400"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* {4} */}
      <div className="w-full flex justify-between gap-2 text-xs font-bold">
        <button
          className="rounded-lg bg-snow w-1/2 py-2"
          onClick={(e) => {
            e.preventDefault();
            setToggle(true);
            refButton.current.click();
          }}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-accent w-1/2 py-2 text-white"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
