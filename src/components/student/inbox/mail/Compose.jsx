import React from "react";
import { TfiClip } from "react-icons/tfi";

const Compose = () => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <input
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg "
      />
      <input
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      <input
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      <input
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      <textarea
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg h-[30vh] placeholder-gray-400"
        placeholder="Type Something ..."
      />

      <div className="flex justify-between">
        <div>
          {" "}
          <TfiClip className="rotate-180 text-2xl text-gray-400 self-center" />
        </div>

        <div>
          <button className="bg-accent text-sm font-bold text-white rounded-xl px-4 py-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compose;
