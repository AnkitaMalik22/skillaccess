import React from "react";
import ReactPlayer from "react-player";
import VideoMcq from "./VideoMcq";
import VideoEssayLong from "./VideoEssayLong";
import VideoEssayShort from "./VideoEssayShort";
import { Disclosure } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { removeQuestionById } from "../../../../redux/collage/test/testSlice";
import { useNavigate } from "react-router-dom";
import { PiPencilSimpleLineBold } from "react-icons/pi";

const Video = ({ video, Number }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = ({ sectionId, questionId }) => {
    dispatch(
      removeQuestionById({
        sectionId,
        questionId,
        questionType: "video",
      })
    );
  };
  console.log(video);
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="flex justify-between gap-3 md:gap-5 font-dmSans relative z-10 mb-4 ">
            {" "}
            {/* <button className=" bg-blued rounded-lg bg-opacity-5 text-left text-blued flex"> */}{" "}
            <div className=" bg-[#95ACFA] rounded-2xl text-white text-base font-bold flex justify-center items-center w-[70px] h-14">
              Q-{Number}
            </div>
            {/* </button> */}
            <Disclosure.Button className="w-full bg-gray-100 ">
              <div className="flex w-full justify-between items-center gap-2 rounded-lg border-[#95ACFA] border text-[#3E3E3E] py-3 text-left text-lg font-normal">
                <div></div>
                <h2 className="px-4 font-semibold  text-base text-center">
                  Click to Expand{" "}
                </h2>
                <div className="level flex items-center mr-3 gap-2 ">
                  {video.QuestionLevel == "beginner" && (
                    <p className="rounded-2xl bg-cyan-500 text-white text-sm w-8 h-8 text-center font-medium flex items-center justify-center ">
                      L1
                    </p>
                  )}
                  {video.QuestionLevel == "intermediate" && (
                    <p className="rounded-2xl bg-green-500 text-white text-sm  w-8 h-8 text-center font-medium flex items-center justify-center ">
                      L2
                    </p>
                  )}
                  {video.QuestionLevel == "advanced" && (
                    <p className="rounded-2xl bg-red-500 text-white text-sm  w-8 h-8 text-center font-medium flex justify-center items-center ">
                      L3
                    </p>
                  )}
                </div>
              </div>
            </Disclosure.Button>
          </div>

          <Disclosure.Panel className="relative z-10">
            <div className="mb-4 ml-16">
              <div className="flex w-full justify-between flex-col rounded-lg border-[#95ACFA] border text-[#3E3E3E] py-3 text-left text-lg font-normal  ">
                <div className="flex justify-between items-center w-full px-2">
                  {/* <h2 className="px-4 font-semibold pt-3 text-base"></h2> */}
                  <div className="px-5 pb-4 flex flex-col gap-4">
                    <span className="flex gap-2">
                      <div className="flex w-5 justify-center"></div>
                      <ReactPlayer url={video?.videoFile} controls />

                      <label for="answer" className="self-center">
                        {" "}
                      </label>
                    </span>
                  </div>
                </div>

                <h1 className="text-lg font-semibold text-[#3E3E3E] px-4 pt-3">
                  {video?.questions.length > 0 && "Multiple Choice questions"}
                </h1>
                {video?.questions?.length > 0 &&
                  video.questions.map((mcq, index) => {
                    console.log(mcq);
                    return (
                      <VideoMcq
                        //   handleDelete={handleDelete}
                        mcq={mcq}
                        Number={index}
                        id={video._id}
                        video={video}
                      />
                    );
                  })}

                <h1 className="text-lg font-semibold text-[#3E3E3E] px-4 pt-3">
                  {video?.long.length > 0 && "Long answer questions"}
                </h1>
                {video?.long?.length > 0 &&
                  video.long.map((question, index) => (
                    <VideoEssayLong
                      Title={question.Title}
                      Number={index}
                      id={video._id}
                      video={video}
                    />
                  ))}
                <h1 className="text-lg font-semibold text-[#3E3E3E] px-4 pt-3">
                  {" "}
                  {video?.short.length > 0 && "Short answer questions"}
                </h1>
                {video?.short?.length > 0 &&
                  video.short.map((question, index) => (
                    <VideoEssayShort
                      Title={question.Title}
                      Number={index}
                      id={video._id}
                      video={video}
                    />
                  ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Video;
