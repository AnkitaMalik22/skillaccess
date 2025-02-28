import { Disclosure } from "@headlessui/react";
import React from "react";
import { FaSortDown, FaX } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { GrExpand } from "react-icons/gr";
import { TfiClip } from "react-icons/tfi";
import { BsEmojiSmile } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";

const View = () => {
  return (
    <div className="w-full h-full p-5 font-dmSans">
      <h1 className="mt-4 mb-6 text-xl font-bold">UX Research for Product</h1>
      <p className="whitespace-pre-wrap text-sm h-[30vh] overflow-y-scroll">
        Hi Linh,
        <br />
        <br />
        Lauren Good afternoon, I was checking your work on dribble. We are
        creating a start up related to airport services and we need a beautiful
        landing page and mobile app. As we have previous experience in creating
        this kind of projects, we have the wireframes ready.We are looking for
        something minimalistic and clean with a quirky touch (with nice
        illustrations) and looking at your projects I am confident you would do
        the job fantastically.
        <br />
        <br />
        Have a lovely day.
      </p>

      <div className="flex gap-4">
        <div className="bg-accent p-2 rounded-md bg-opacity-10 sm:w-60 flex justify-between">
          <div className="flex gap-2">
            <img src="/images/icons/fileBlue.png" alt="" />
            <div className="self-center">
              <p className="text-sm font-bold">Brief Details</p>
              <p className="text-sm font-medium">50.3 Mb</p>
            </div>
          </div>
          <div className="self-center">
            <FiDownload className="text-lg text-gray-400" />
          </div>
        </div>

        <div className=" p-2 rounded-md bg-opacity-10 sm:w-60 flex justify-between">
          <div className=" flex gap-2">
            <img src="/images/icons/image.png" alt="" />
            <div className="self-center">
              <p className="text-sm font-bold">WireFrames</p>
              <p className="text-sm font-medium">50.3 Mb</p>
            </div>
          </div>
          <div className="self-center">
            <FiDownload className="text-lg text-gray-400" />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#8F92A1] bg-opacity-5 p-4 mt-4 rounded-md">
        {/* Reply to */}
        <div className=" bg-lGray bg-opacity-5 rounded-md p-3 flex   justify-between">
          <div className="flex gap-2">
            {/* photo */}
            <div className="h-10 w-10 rounded-md bg-blued"></div>
            {/*  */}

            <div className="flex gap-1 self-center">
              <p className="text-sm font-bold self-center">Reply</p>
              <p className="text-sm font-bold self-center text-gray-400">to:</p>
            </div>
            <div className="w-full sm:w-96 relative self-center">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full sm:w-96 justify-between rounded-md bg-[#8F92A1] bg-opacity-20 px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                      <span className="text-sm font-bold text-[#8F92A1]">
                        Barbara Buchanan (barbarabuchanan@carrotlabs.co
                      </span>
                      <FaX className={`w-4 h-4 text-gray-400`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 absolute"></Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>

          <div className="self-center">
            <GrExpand className="text-lg text-gray-400" />
          </div>
        </div>

        <div className="w-full">
          <textarea
            type="text"
            name=""
            id=""
            className="w-full bg-[#8F92A1] mt-2 bg-opacity-10 rounded-xl foucs:ring-0 border-none"
          />
        </div>

        <div className="flex justify-between w-full">
          <div className="flex gap-2 self-center">
            {" "}
            <BsEmojiSmile className="text-gray-400 text-xl self-center" />
            <TfiClip className="rotate-180 text-2xl text-gray-400 self-center" />
          </div>
          <button className="text-white text-sm font-bold px-3 bg-accent rounded-xl py-2 self-center">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
