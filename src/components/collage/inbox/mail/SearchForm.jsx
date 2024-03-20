import { Disclosure } from "@headlessui/react";
import React from "react";
import { FaSortDown } from "react-icons/fa";

const SearchForm = () => {
  return (
    <form action="" method="post" className="p-3 font-dmSans">
      {/* 1 */}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs font-bold text-gray-400">Search</label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-sm font-bold">All Emails</span>

                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                Options
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* 2*/}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs font-bold text-gray-400">From</label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-sm font-bold">example@hmail.com</span>

                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                Options
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* 3*/}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs font-bold text-gray-400">To</label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-sm font-bold">TO</span>

                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                Options
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* {4} */}
      <div className="w-full flex flex-col">
        <label className="pl-2 text-xs font-bold text-gray-400">
          Has Keywords
        </label>
        <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
          {({ open }) => (
            <div className="relative">
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-sm font-bold">ails</span>

                <FaSortDown className="text-gray-400 self-center" />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                Options
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      <div className="w-full flex justify-between gap-3">
        {/* 5.1 */}
        <div className="w-1/2 flex flex-col">
          <label className="pl-2 text-xs font-bold text-gray-400">
            Daten Within
          </label>
          <Disclosure className="rounded-lg bg-lGray bg-opacity-5 my-2 py-2">
            {({ open }) => (
              <div className="relative">
                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span className="text-sm font-bold">ails</span>

                  <FaSortDown className="text-gray-400 self-center" />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm font-bold absolute bg-white rounded-b-lg w-full">
                  Options
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
            type="date"
            className="rounded-lg bg-lGray bg-opacity-5 my-2 py-4 border-none text-gray-400"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
