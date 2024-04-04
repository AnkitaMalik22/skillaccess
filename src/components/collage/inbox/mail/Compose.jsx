import React, { useState } from "react";
import { TfiClip } from "react-icons/tfi";
import { sendMail } from "../../../../redux/collage/auth/authSlice";
import { useDispatch } from "react-redux";

const Compose = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ Email: "", Message: "", Subject: "" });
  const handleChange = (e) => {
    setEmail((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(email);
  };
  return (
    <div className="p-4 flex flex-col gap-3">
      <input
        onChange={handleChange}
        value={email.Email}
        name="Email"
        type="text"
        placeholder="example@mail.com"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      <input
        onChange={handleChange}
        value={email.Subject}
        name="Subject"
        type="text"
        placeholder="Subject"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      {/* <input
      placeholder="Subject"
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      />
      <input
        type="text"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg"
      /> */}
      <textarea
        onChange={handleChange}
        value={email.Message}
        name="Message"
        className="w-full border-none focus:ring-0 bg-lGray bg-opacity-5 px-3 py-5 rounded-lg h-[30vh] placeholder-gray-400"
        placeholder="Type Something ..."
      />

      <div className="flex justify-between">
        <div>
          {" "}
          <TfiClip className="rotate-180 text-2xl text-gray-400 self-center" />
        </div>

        <div>
          <button
            className="bg-blue-700 text-sm font-bold text-white rounded-xl px-4 py-2"
            onClick={() => dispatch(sendMail(email))}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compose;
