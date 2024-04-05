import { Disclosure } from "@headlessui/react";
import React, { useEffect } from "react";
import { FaSortDown, FaX } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { GrExpand } from "react-icons/gr";
import { TfiClip } from "react-icons/tfi";
import { BsEmojiSmile } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getMail } from "../../../../redux/collage/auth/authSlice";

const View = ({ index }) => {
  const dispatch = useDispatch();

  const { mail } = useSelector((state) => state.collageAuth);
  const Email = mail.emailsReceived[index];
  console.log(Email);
  useEffect(() => {
    dispatch(getMail());
  }, []);
  return (
    <div className="w-full h-full p-5 font-dmSans">
      <h1 className="mt-4 mb-6 text-xl font-bold break-words">
        {Email.subject}
      </h1>
      <p className="break-words  text-sm h-[30vh] max-w-[60vw]">
        {Email.message}
      </p>

      {/* <div className="flex gap-4">
        <div className="bg-[#0052CC] p-2 rounded-lg bg-opacity-10 sm:w-60 flex justify-between">
          <div className="flex gap-2">
            <img src="../../images/icons/fileBlue.png" alt="" />
            <div className="self-center">
              <p className="text-sm font-bold">Brief Details</p>
              <p className="text-xs font-medium">50.3 Mb</p>
            </div>
          </div>
          <div className="self-center">
            <FiDownload className="text-lg text-gray-400" />
          </div>
        </div>

        <div className=" p-2 rounded-lg bg-opacity-10 sm:w-60 flex justify-between">
          <div className=" flex gap-2">
            <img src="../../images/icons/image.png" alt="" />
            <div className="self-center">
              <p className="text-sm font-bold">WireFrames</p>
              <p className="text-xs font-medium">50.3 Mb</p>
            </div>
          </div>
          <div className="self-center">
            <FiDownload className="text-lg text-gray-400" />
          </div>
        </div>
      </div> */}

      <div className="w-full bg-[#8F92A1] bg-opacity-5 p-4 mt-4 rounded-lg">
        {/* Reply to */}
        <div className=" bg-lGray bg-opacity-5 rounded-lg p-3 flex   justify-between">
          <div className="flex gap-2">
            {/* photo */}
            <div className="h-10 w-10 rounded-lg bg-blued"></div>
            {/*  */}

            <div className="flex gap-1 self-center">
              <p className="text-sm font-bold self-center">Reply</p>
              <p className="text-sm font-bold self-center text-gray-400">to:</p>
            </div>
            <div className="w-full sm:w-96 relative self-center">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full sm:w-96 justify-between rounded-lg bg-[#8F92A1] bg-opacity-20 px-4 py-2 text-left text-sm font-medium   focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                      <span className="text-xs font-bold text-[#8F92A1]">
                        {Email.from.Email}
                      </span>
                      {/* <FaX className={`w-4 h-4 text-gray-400`} /> */}
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
          <button className="text-white text-sm font-bold px-3 bg-blue-700 rounded-xl py-2 self-center">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
