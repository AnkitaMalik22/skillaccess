import React from "react";
import { Disclosure, Transition } from "@headlessui/react";

const VideoEssay = ({ Number, Title ,Answer}) => {
  return (
    <div className="mx-6 flex bg-white rounded-lg justify-between my-4">
      <div className="w-11/12 flex flex-col gap-2">
        <h2 className="px-4 font-semibold pt-3 text-base">
          {Number + 1} &nbsp; {Title}
        </h2>

        <Transition
                enter="transition duration-300 "
                enterFrom="transform scale-95 ease-in opacity-0"
                enterTo="transform scale-100   duration-700 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100  opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="bg-white rounded-b-lg pb-2 mb-2  text-sm text-gray-500">
                  <div className="flex gap-2  rounded-lg p-3">
                    <div className="w-6"></div>

                    <label className="text-blacktext-sm">
                      {/* {code.toString().substring(0, 50)} */}
                     {Answer}
                    </label>
                  </div>
                </Disclosure.Panel>
              </Transition>
      </div>
      {/* {type !== "topic" && view !== "false" && (
    <div className="w-[5%] flex flex-col gap-4 text-blued border-s-2 py-1">
      <RxCross1
        className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
        onClick={handleDelete}
      />
   

      {search.get(`${Number}`) !== "true" ? (
        <PiPencilSimpleLineBold
          className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center"
          onClick={() => {
            search.set(`${Number}`, "true");
            setSearch(search);
          }}
        />
      ) : (
        <PiPencilSimpleLineBold
          className=" w-6 h-6 p-1 rounded-lg bg-amber-600 self-center"
          onClick={() => {
            search.set(`${Number}`, "false");
            setSearch(search);
            dispatch(
              editQuestion({
                topicIndex: id,
                selfIndex: Number,
                questionType: "mcq",
                question: mcq,
              })
            );
          }}
        />
      )}
    </div>
  )} */}
    </div>
  );
};

export default VideoEssay;
