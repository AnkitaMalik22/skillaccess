import React, { useState } from "react";
import Selected from "./Selected";
import Appeared from "./Appeared";
import Performance from "./Performance";


const Toggle = ({ assessment }) => {

  const [toggle, setToggle] = useState(2);
  return (
    <div className="bg-gray-50 p-4 mt-4 rounded-lg ">
      <span className="grid grid-cols-3 text-xs font-bold border-b border-spacing-0 border-gray-200 mb-4">
        <h2
          className={`${
            toggle === 1 ? "text-blued border-b-4 border-blued" : ""
          } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
          onClick={() => setToggle(1)}
        >
          Selected Candidates
        </h2>
        <h2
          className={`${
            toggle === 2 ? "text-blued border-b-4 border-blued" : ""
          } w-fit px-20 pb-2 hover:cursor-pointer mx-auto`}
          onClick={() => setToggle(2)}
        >
          Appeared Candidates
        </h2>
        <h2
          className={`${
            toggle === 3 ? "text-blued border-b-4 border-blued" : ""
          } w-fit px-12 pb-2 hover:cursor-pointer mx-auto`}
          onClick={() => setToggle(3)}
        >
          Overall Performance
        </h2>
      </span>

      {toggle === 1 ? (
        <Selected />
      ) : toggle === 2 ? (

        <Appeared assessment={assessment} />

      ) : toggle === 3 ? (
        <Performance />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Toggle;
