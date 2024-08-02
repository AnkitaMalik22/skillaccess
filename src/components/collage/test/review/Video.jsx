import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ReactPlayer from "react-player";
import { RxCross1 } from "react-icons/rx";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import VideoMcq from "./VideoMcq";
import VideoEssay from "./VideoEssay";
import {
  editQuestion,
  removeQuestion,
  setCurrentQuestionCount,
} from "../../../../redux/collage/test/testSlice";
import { addBookmark } from "../../../../redux/collage/test/thunks/question";

const Video = ({ Number, id, video, type, view }) => {
  const { currentQuestionCount } = useSelector((state) => state.test);

  const [search, setSearch] = useSearchParams();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(setCurrentQuestionCount(currentQuestionCount - 1));

    dispatch(
      removeQuestion({
        selfIndex: Number,
        topicIndex: id,
        questionType: "video",
      })
    );
  };
  // //console.log(video, "video");

  const [videoState, setVideoState] = useState(video);
  // //console.log(videoState);

  const handleBookmark = () => {
    // //console.log("bookmark");
    // //console.log(question);
    dispatch(
      addBookmark({
        ...video,
        questionId: video._id,
        Type: "video",
      })
    );
  };

  // const [mcq, setMcq] = useState(question);

  // const handleChange = (e) => {
  //   const { name, value, key } = e.target;
  //   if (name === "Title") {
  //     //console.log("name");
  //     setMcq((prev) => {
  //       return { ...prev, [name]: [value] };
  //     });
  //   } else {
  //     //console.log(name + " " + value + " " + key);
  //     setMcq((prev) => {
  //       return {
  //         ...prev,
  //         Options: [
  //           ...prev.Options.slice(0, name),
  //           value,
  //           ...prev.Options.slice(name + 1),
  //         ],
  //       };
  //     });
  //   }
  // };
  return (
    <div className="flex bg-white rounded-lg justify-between mb-5 flex-col">
      <div className="p-5 flex flex-col gap-2">
        <h2 className="px-4 font-semibold pt-3 text-base">
          {Number + 1} &nbsp;
        </h2>
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

      {type !== "topic" && view !== "false" && (
        <div className="w-full content-end mr-1 flex-wrap items-end flex flex-col gap-4 text-blued border-s-2 py-1">
          <RxCross1
            className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
            onClick={handleDelete}
          />
          <CiBookmarkMinus
            className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center"
            onClick={handleBookmark}
          />
          {/* <PiFileTextBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}
          {/* <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
<CiBookmarkMinus className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}

          {search.get(`${Number}`) !== "true" ? (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center"
              onClick={() => {
                search.set(`${Number}`, "true");
                setSearch(search);
              }}
            />
          ) : (
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-lg bg-amber-600 self-center"
              onClick={() => {
                search.set(`${Number}`, "false");
                setSearch(search);
                // //console.log(videoState);
                dispatch(
                  editQuestion({
                    topicIndex: id,
                    selfIndex: Number,
                    questionType: "video",
                    question: videoState,
                  })
                );
              }}
            />
          )}
        </div>
      )}
      <h1 className="text-lg font-semibold text-[#3E3E3E] px-4 pt-3">
        {video?.questions.length > 0 && "Multiple Choice questions"}
      </h1>
      {video?.questions?.length > 0 &&
        video.questions.map((question, index) => {
          return (
            <VideoMcq
              Index={index}
              id={id}
              // handleDelete={handleDelete}
              view={view}
              type={type}
              question={question}
              videoState={videoState}
              setVideoState={setVideoState}
              Number={Number}
              // handleChange={handleChange}
              search={search}
              setSearch={setSearch}
            />
          );
        })}
      <h1 className="text-lg font-semibold text-[#3E3E3E] px-4 pt-3">
        {video?.long.length > 0 && "Long answer questions"}
      </h1>
      {video?.long?.length > 0 &&
        video.long.map((question, index) => (
          <VideoEssay
            Title={question.Title}
            question={question}
            Number={Number}
            search={search}
            type={"long"}
            id={id}
            view={view}
            Index={index}
            key={index}
            setVideoState={setVideoState}
            videoState={videoState}
          />
        ))}
      <h1 className="text-lg font-semibold text-[#3E3E3E] px-4 pt-3">
        {" "}
        {video?.short.length > 0 && "Short answer questions"}
      </h1>
      {video?.short?.length > 0 &&
        video.short.map((question, index) => (
          <VideoEssay
            Title={question.Title}
            question={question}
            Number={Number}
            search={search}
            type={"short"}
            Index={index}
            id={question.id}
            view={view}
            key={index}
            setVideoState={setVideoState}
            videoState={videoState}
          />
        ))}
    </div>
  );
};

export default Video;
