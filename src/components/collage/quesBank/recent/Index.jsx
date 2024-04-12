import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { CgFolder } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentUsedQuestions,
  deleteRecentUsedQuestion,
} from "../../../../redux/collage/test/thunks/question";

const Recent = () => {
  // const arr = [2, 1, 1, 1, 1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentUsedQuestions } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(getRecentUsedQuestions());
    console.log(recentUsedQuestions);
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
    console.log("Delete", id);

    dispatch(deleteRecentUsedQuestion({ type, id }));
  };

  return (
    <div className="w-11/12 mx-auto mt-4 font-dmSans">
      <Header />
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
          <div className="bg-[#0052CC] bg-opacity-5 rounded-s-lg p-2 ">
            <h2>Topic</h2>
          </div>

          <div className="bg-[#0052CC] bg-opacity-5 p-2">
            <h2>Type</h2>
          </div>
          <div className="bg-[#0052CC] bg-opacity-5 p-2 ">
            <h2>No. of Questions</h2>
          </div>
          <div className="bg-[#0052CC] bg-opacity-5  p-2 ">
            <h2>Category</h2>
          </div>
          <div className="bg-[#0052CC] bg-opacity-5 rounded-e-lg p-2">
            <h2>Actions</h2>{" "}
          </div>
        </div>

        {/* list to be iterated */}
        {recentUsedQuestions?.map((topic) => (
          <div className=" grid-cols-5  text-center  mx-auto  font-dmSans font-bold text-base hidden md:grid bg-white py-3 mb-3 rounded-xl">
            {" "}
            {/* row-2 */}
            <div className={` flex justify-center`}>
              <div className="flex self-center gap-2 ">
                <span>
                  <CgFolder className="text-blued" />
                </span>
                <span>
                  <h2 className="font-dmSans text-center  sm:text-sm">
                    {topic?.Heading}
                  </h2>
                </span>
              </div>
            </div>
            {/*  */}
            <div className="flex justify-center ">
              <div className=" self-center h-fit">
                <span>
                  <h2 className="font-dmSans font-normal sm:text-sm">
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
                  <h2 className="font-dmSans font-normal sm:text-sm text-[#0052CC]">
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
