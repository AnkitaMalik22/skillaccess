import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgFolder } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentUsedQuestions,
  deleteRecentUsedQuestion,
} from "../../../redux/college/test/thunks/question";
import useTranslate from "../../../hooks/useTranslate";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { FaAngleLeft, FaSearch } from "react-icons/fa";
import { isUni } from "../../../util/isCompany";

const Recent = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentUsedQuestions } = useSelector((state) => state.test);
  useEffect(() => {
    dispatch(getRecentUsedQuestions());
  }, []);

  const getTotalQuestions = (topic) => {
    let total = 0;
    switch (topic?.Type) {
      case "mcq":
        total = topic?.questions?.length;
        break;
      case "video":
        total = topic?.video?.length;
        break;
      case "compiler":
        total = topic?.compiler?.length;
        break;
      case "essay":
        total = topic?.essay?.length;
        break;
      case "findAnswer":
        total = topic?.findAnswers?.length;
        break;
      default:
        break;
    }

    return total;
  };

  const handleDelete = (type, id) => {
    dispatch(deleteRecentUsedQuestion({ type, id }));
  };

  return (
    <div>
      <div className="flex  mx-auto justify-between mb-2 font-dmSans">
        <span className="flex gap-4">
          <button
            className="bg-[#D9E1E7]  self-center ml-2 rounded-lg h-10 w-10 sm:h-12 sm:w-14"
            onClick={() => navigate(-1)}
          >
            <FaAngleLeft className="mx-auto sm:h-6 sm:w-6 h-4 w-4" />
          </button>
        </span>
        <div className="bg-gray-100 rounded-xl mx-2  sm:h-12 h-10 flex my-2 px-4 w-fit">
          <FaSearch className="self-center w-5 h-5 ml-1 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="input border-none self-center bg-gray-100 focus:outline-none input-md sm:w-96 max-w-md mx-auto  "
          />
        </div>

        <button className="bg-gray-200  self-center mr-2 rounded-lg h-10 w-10 sm:h-12 sm:w-16">
          <PiSlidersHorizontalLight className="mx-auto sm:h-8 sm:w-8 h-6 w-6" />
        </button>
      </div>
      <div className="w-full mx-auto bg-[#F8F8F9] lg:px-8 lg:pt-7 pb-4 rounded-3xl">
        <span className="flex justify-between ">
          <h2 className="font-bold text-xl">Recent used questions</h2>
          <button className="">
            <input
              name="select"
              type="checkbox"
              className="rounded bg-[#DEEBFF] border-none"
            />{" "}
            <label for="select" className="text-sm pl-1">
              Delete Selected
            </label>
          </button>
        </span>

        {/* legend */}
        <div className=" grid-cols-5  text-center my-6 mx-auto  font-dmSans font-bold text-base grid">
          <div className="bg-accent bg-opacity-5 rounded-s-lg p-2 ">
            <h2>Topic</h2>
          </div>

          <div className="bg-accent bg-opacity-5 p-2">
            <h2>Type</h2>
          </div>
          <div className="bg-accent bg-opacity-5 p-2 ">
            <h2>No. of Questions</h2>
          </div>
          <div className="bg-accent bg-opacity-5  p-2 ">
            <h2>Category</h2>
          </div>
          <div className="bg-accent bg-opacity-5 rounded-e-lg p-2">
            <h2>Actions</h2>{" "}
          </div>
        </div>

        {/* list to be iterated */}
        {recentUsedQuestions?.map((topic) => (
          <div className=" grid-cols-5  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid bg-white py-3 mb-3 rounded-xl">
            {" "}
            {/* row-2 */}
            <div
              className={` flex justify-center cursor-pointer`}
              onClick={() => {
                navigate(
                  isUni() ? `/university/pr/quesbank/topic/${topic._id}` : `/college/quesbank/topic/${topic._id}`
                );
              }}
            >
              <div className="flex self-center gap-2 ">
                <span>
                  <CgFolder className="text-blued" />
                </span>
                <span>
                  <h2 className="font-dmSans text-center  sm:text-sm first-letter:uppercase">
                    {topic?.Heading}
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center ">
              <div className=" self-center h-fit">
                <span>
                  <h2 className="font-dmSans font-normal text-sm first-letter:uppercase">
                    {topic?.Type}
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="flex justify-center ">
              <div className=" self-center h-fit">
                <span>
                  <h2 className="font-dmSans font-normal sm:text-sm">
                    {getTotalQuestions(topic)}
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="flex justify-center ">
              <div className=" self-center h-fit">
                <span>
                  <h2 className="font-dmSans font-normal sm:text-sm text-blued ">
                    UI/UX Designer
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center gap-3 ">
              {/* <div className=" self-center ">
                {" "}
                <img src="../../images/icons/clip.png" alt="" />{" "}
              </div> */}
              {/* <div className=" self-center">
                <img src="../../images/icons/pencil.png" alt="" />
              </div> */}
              <div
                className=" self-center cursor-pointer"
                onClick={() => handleDelete(topic?.Type, topic._id)}
              >
                <img src="../../images/icons/cross.png" alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
