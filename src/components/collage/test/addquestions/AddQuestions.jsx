import React, { useState } from "react";
import Header from "./Header";
import { Progress } from "./Progress";
import { LiaStopwatchSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
import { PiPencilSimpleLine } from "react-icons/pi";
import { ImFileText } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setQuesions } from "../../../../redux/collage/test/testSlice";
import { useNavigate } from "react-router-dom";

const AddQuestions = () => {
  const navigate = useNavigate();
  // question of the section
  const { sections, selectedSections } = useSelector((state) => state.test);
  React.useEffect(() => {
    console.log(selectedSections, sections, "selectedSections");
  }, [sections, selectedSections]);
  const dispatch = useDispatch();

  return (
    <div className="font-dmSans text-sm font-bold">
      <Header page={"submit"} />
      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      <div className="w-11/12 mx-auto mt-20">
        {/* larger screens */}
        <div className="   my-2 rounded-lg tracking-wide justify-between  ">
          <div className="grid grid-rows-1 w-[65vw]">
            <h2 className="font-normal text-xs sm:text-sm text-gray-400  mt-8 tracking-wide [word-spacing:4px] ">
              Add up to 10 custom questions to your assessment (optional). You
              can use five question types: multiple-choice, essay, video and
              code.
            </h2>
            {sections?.map((section, index) => (
              <div className=" sm:mt-5 rounded-lg tracking-wide justify-between  ">
                <div className=" grid grid-cols-10 row-span-2 gap-x-10 gap-y-3 p-3 bg-gray-100 rounded-lg border border-blued h-28 w-[64vw] mx-auto">
                  {" "}
                  <div className="col-span-2 ">
                    <h2 className="self-center text-xs sm:text-sm">
                      {section.name}
                    </h2>
                  </div>
                  <div className="col-span-2 col-start-7 ">
                    <span className="flex gap-1">
                      <ImFileText className="text-blued self-center " />
                      <p className="self-center text-xs text-gray-500   sm:text-sm">
                        {section.type}
                      </p>
                    </span>
                  </div>
                  <div className="col-span-1 col-start-9 ">
                    <div className="flex gap-1 ">
                      <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
                      <p className="text-gray-400 text-xs self-center">
                        10 mins
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 col-start-10  flex justify-center">
                    <RxCross1 className="self-center text-red-600 w-5 h-5" />
                  </div>
                  <div className="col-span-8 line-clamp-2 text-xs font-normal text-[#8F92A1] ">
                    {section.description}
                  </div>
                  <div className="col-span-1 col-start-9  flex">
                    {/* Need Question Details page */}
                    <button
                      className="self-center  justify-center bg-gray-200 p-2 rounded-lg text-xs"
                      // onClick={() =>
                      //   navigate(`/collage/test/${section.type}/${section.id}`)
                      // }
                      onClick={() => navigate("/collage/test/details/:0")}
                    >
                      Details
                    </button>
                  </div>
                  <div className="col-span-1  flex justify-center">
                    <PiPencilSimpleLine className="self-center text-blued w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestions;
