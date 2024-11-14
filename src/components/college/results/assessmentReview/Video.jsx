import React from "react";
import ReactPlayer from "react-player";
import VideoMcq from "./VideoMcq";
import VideoEssay from "./VideoEssay";
import { Disclosure } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/college/test/testSlice";

const Video = ({ video, Number }) => {
  const dispatch = useDispatch();
  const handleDelete = ({ sectionId, questionId }) => {
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
      })
    );
  };
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10 mb-4">
            {" "}
            <button className="bg-accent rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] p-3 h-12">
              {" "}
              <div className=" bg-blued rounded-xl text-white  text-center self-center text-base font-bold py-2 w-12 h-11">
                Q-{Number}
              </div>
            </button>
            <Disclosure.Button className=" flex w-full justify-between rounded-lg text-left text-sm font-medium border border-[#0D9AAC] p-3">
              Click to Expand{" "}
            </Disclosure.Button>
            {/* <div className="bg-gray-100 h-11 flex  rounded-xl px-1">
              <img
                src="../../images/icons/cross.png"
                alt="cross"
                className="self-center "
                onClick={() => {
                  //console.log(video.section, video._id);
                  handleDelete({
                    sectionId: video.section,
                    questionId: video._id,
                  });
                }}
              />
            </div> */}
          </div>

          <Disclosure.Panel>
            <div className="mx-6  bg-white rounded-lg ">
              <div className="w-11/12 flex flex-col gap-2">
                <h2 className="px-4 font-semibold pt-3 text-base"></h2>
                <div className="px-5 pb-4 flex flex-col gap-4">
                  <span className="flex gap-2">
                    <div className="flex w-5 justify-center">
                      {/* <input
            type="radio"
            name="answer"
            id="answer"
            className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
          />{" "} */}
                    </div>
                    <ReactPlayer url={video.videoFile} controls />

                    <label for="answer" className="self-center">
                      {" "}
                    </label>
                  </span>
                </div>
              </div>
              {/* {type !== "topic" && view !== "false" && (
    <div className="w-[5%] flex flex-col gap-4 text-blued justify-center border-s-2 py-1">
      <RxCross1
        className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
        onClick={handleDelete}
      />
      <PiFileTextBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
      <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
      <CiBookmarkMinus className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
      <PiPencilSimpleLineBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
    </div>
  )} */}
              <h1>
                {video?.questions.length > 0 && "Multiple Choice questions"}
              </h1>
              {video?.questions?.length > 0 &&
                video.questions.map((mcq, index) => {
                  return (
                    <VideoMcq
                      //   handleDelete={handleDelete}
                      key={mcq._id}
                      mcq={mcq}
                      Number={index}
                      AnswerIndex={mcq.AnswerIndex}
                      StudentAnswerIndex={mcq.StudentAnswerIndex}
                    />
                  );
                })}

              <h1>{video?.long.length > 0 && "Long answer questions"}</h1>
              {video?.long?.length > 0 &&
                video.long.map((question, index) => (
                  <VideoEssay
                    Title={question.Title}
                    Number={index}
                    Answer={question.studentAnswer}
                  />
                ))}
              <h1> {video?.short.length > 0 && "Short answer questions"}</h1>
              {video?.short?.length > 0 &&
                video.short.map((question, index) => (
                  <VideoEssay
                    Title={question.Title}
                    Number={index}
                    Answer={question.studentAnswer}
                  />
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Video;
