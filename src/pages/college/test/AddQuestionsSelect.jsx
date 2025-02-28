import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getEntity } from "../../../util/isCompany";
import CommonHeader from "../../../components/CommonHeader";

const AddQuestionsSelect = () => {
  //useTranslate();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const level = searchParams.get("level");
  const [selectQuestionType, setSelectQuestionType] = useState("");
  //console.log(id);
  // useEffect(() => {
  //   dispatch(setTest({ questionType: selectQuestionType }));
  // }, [selectQuestionType]);

  const NavHandler = () => {
    let entity = getEntity();

    switch (selectQuestionType) {
      case "mcq":
        navigate(
          `/${entity}/test/addMcqToTopic/${id}?type=mcq&addType=topic&level=${level}`
        );
        break;

      case "code":
        navigate(
          `/${entity}/test/code/${id}?type=compiler&addType=topic&level=${level}`
        );
        break;

      case "video":
        navigate(
          `/${entity}/test/video/${id}?type=video&addType=topic&level=${level}`
        );

        break;

      case "findAnswer":
        navigate(
          `/${entity}/test/find-ans/${id}?type=findAnswer&addType=topic&level=${level}`
        );
        break;

      case "essay":
        navigate(
          `/${entity}/test/essay/${id}?type=essay&addType=topic&level=${level}`
        );
        break;

      default:
        toast.error("please select field");
        break;
    }
  };

  const handleNext = () => {
    // //console.log("level", level);
    level === "adaptive"
      ? navigate(`/${getEntity()}/test/selectAdaptive?level=${level}`)
      : navigate(`/${getEntity()}/test/select?level=${level}`);
  };
  return (
    <>
      {/* <HeaderSelect Q={selectQuestionType} /> */}
      <CommonHeader backPath={`${level === "adaptive" ? `/${getEntity()}/test/selectAdaptive` : `/${getEntity()}/test/select`}?level=${level}`} title="Add Questions" handleNext={handleNext} />

      <div className=" mx-auto mt-20">
        {/* larger screens */}
        <div className="   my-2 rounded-md tracking-wide justify-between  ">
          <h2 className="font-normal text-sm sm:text-sm text-gray-400  mt-8 tracking-wide ">
            Add up to 10 custom questions to your assessment (optional). You can
            use five question types: multiple-choice, essay, video, code and
            find answer.
          </h2>
        </div>

        <div className="  sm:mt-5 rounded-md tracking-wide  w-full ">
          {/* mcq */}
          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${selectQuestionType === "mcq" ? "border-blued" : "opacity-70"
              }`}
            onClick={() => setSelectQuestionType("mcq")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === "mcq"}
                  className={`w-3 h-3 p-[.4rem]  checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center `}
                  onClick={(e) => {
                    setSelectQuestionType("mcq");
                  }}
                />
              </div>

              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">
                Multiple Questions
              </h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              One Correct Answer
            </h2>
            <div className=""></div>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>

          {/* code */}
          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${selectQuestionType === "code" ? "border-blued" : "opacity-70"
              }`}
            onClick={() => setSelectQuestionType("code")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                {" "}
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === "code"}
                  className={`w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center   border-blue-700`}
                  onClick={() => setSelectQuestionType("code")}
                />
              </div>

              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">Code</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              Programming Questions
            </h2>
            <div className=""></div>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>

          {/* Essay */}

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${selectQuestionType === "essay" ? "border-blued" : "opacity-70"
              }`}
            onClick={() => setSelectQuestionType("essay")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  checked={selectQuestionType === "essay"}
                  name="ques"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  onClick={() => setSelectQuestionType("essay")}
                />
              </div>
              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">Essay</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              Open Text Answer
            </h2>
            <div className=""></div>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>
          {/*  */}

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${selectQuestionType === "video" ? "border-blued" : "opacity-70"
              }`}
            onClick={() => setSelectQuestionType("video")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === "video"}
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  onClick={() => setSelectQuestionType("video")}
                />
              </div>
              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">Video</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              Record video to answer questions
            </h2>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
            <div className=""></div>
          </div>
          {/*  */}

          {/* Find Answer*/}

          <div
            className={`w-full flex justify-between bg-gray-100 rounded-md border  h-20 py-4 px-8  my-2  ${selectQuestionType === "findAnswer"
              ? "border-blued"
              : "opacity-70"
              }`}
            onClick={() => setSelectQuestionType("findAnswer")}
          >
            {" "}
            <div className="flex gap-5 font-dmSans w-1/3">
              <div className="w-5 h-5 self-center">
                <input
                  type="radio"
                  name="ques"
                  checked={selectQuestionType === "findAnswer"}
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blue-700 checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                  onClick={() => setSelectQuestionType("findAnswer")}
                />
              </div>
              <img
                src="/images/icons/exam.png"
                alt=""
                className="w-6 h-8 self-center"
              />
              <h2 className="text-xl font-normal self-center">Find Answer</h2>
            </div>
            {/*  */}
            <h2 className="text-xl font-normal self-center">
              Read Phrase and Answer them
            </h2>
            <div className=""></div>
            {/* <img
              src="/images/icons/dot.png"
              alt=""
              className="self-center w-5"
            /> */}
          </div>
          {/*  */}
        </div>
      </div>

      <div className=" w-11/12 mx-auto flex justify-end mt-14">
        <div className="flex gap-4">
          <button
            className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued"
            onClick={NavHandler}
          >
            New Question
          </button>
          {/* <button className="self-center justify-center flex bg-white border border-blued py-3 px-8 rounded-xl text-sm gap-2 text-blued">
            Copy question from another assessment
          </button> */}
        </div>
      </div>
    </>
  );
};

export default AddQuestionsSelect;
