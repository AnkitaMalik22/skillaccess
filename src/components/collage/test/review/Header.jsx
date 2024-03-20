import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const Header = ({ type, sectionId, qt, topicId, view }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex w-11/12 mx-auto justify-between mb-2 mt-5">
      <div>
        <button className="flex self-center  rounded-lg  gap-2">
          <button
            onClick={() => {
              type === "section" && navigate("/collage/test/questions");
              type === "topic" && navigate("/collage/test/select");
              type === "assessment" && navigate(-1);
            }}
            className="mt-2 mr-3"
          >
            <FaChevronLeft className=" p-3 rounded-lg h-10 w-10 self-center bg-gray-200" />
          </button>

          <div className="">
            <h2 className="sm:text-xl  text-left font-bold self-center text-3xl font-dmSans ">
              Create Assessment
            </h2>
            <h2 className="text-xs font-bold text-gray-400 text-left">
              Edit Screen
            </h2>
          </div>
        </button>
      </div>

      <div className="rounded-xl mx-2   h-12 flex my-2 ">
        {type !== "assessment" && view !== "false" && (
          <div className=" flex gap-2">
            <button
              className="self-center justify-center flex bg-[#F8F8F9] py-3  rounded-xl w-32  gap-2 "
              onClick={() =>
                type === "section"
                  ? navigate(
                      `/collage/test/${
                        qt === "mcq"
                          ? "addMcq"
                          : qt === "findAnswer"
                          ? "find-ans"
                          : qt === "compiler"
                          ? "code"
                          : qt === "essay"
                          ? "essay"
                          : qt === "video"
                          ? "video"
                          : "addMcq"
                      }/${id}?addType=test&topicId=${topicId}`
                    )
                  : navigate(`/collage/test/typeOfQuestions/${sectionId}`)
              }
            >
              <FiPlus className="self-center text-lg " /> Add
            </button>

            <button
              className="self-center justify-center flex bg-blue-700 py-3  rounded-xl w-48 text-white  gap-2 "
              onClick={() => navigate(`/collage/test/addMcq/${id}`)}
            >
              <FiUpload className="self-center text-lg " /> Upload Questions
            </button>

            <button className="bg-[#F8F8F9] self-center  rounded-lg  w-10 sm:h-11 sm:w-14">
              <PiSlidersHorizontalLight className="mx-auto sm:h-8 sm:w-8 h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
