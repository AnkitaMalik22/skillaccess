import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TestHeader = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex w-[98%] mx-auto justify-between "
      style={{ marginTop: "5rem" }}
    >
      <div className="h-fit self-center"></div>

      <div className=" rounded-xl mx-2   h-12 flex my-2 font-dmSans ">
        <div className=" flex gap-3">
          <button
            className="self-center w-32  justify-center flex text-bluedpy-2 px-4 rounded-xl font-bold gap-2 bg-white"
            onClick={() => navigate(-1)}
          >
            <img
              src="../../../images/icons/CombinedShape.png"
              alt=""
              className="self-center w-6 h-6"
            />
            <p className="text-lg font-bold self-center text-[#E45B39] ">
              00:59:33
            </p>
          </button>
          <button
            className="self-center w-24  justify-center flex text-bluedpy-2 px-4 rounded-xl font-bold gap-2 bg-white"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="self-center w-32 justify-center flex bg-accent py-2 font-bold px-4 rounded-xl gap-2 text-white"
            // onClick={() => navigate("/college/test/preview")}
            // onClick={handleSaveNext}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;
