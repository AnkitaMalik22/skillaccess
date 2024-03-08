import React, { useState } from "react";

import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  editQuestion,
  removeQuestion,
} from "../../../../redux/collage/test/testSlice";
import { useSearchParams } from "react-router-dom";
// import { type } from "@testing-library/user-event/dist/type";

const VideoEssay = ({
  Number,
  Title,
  question,
  search,
  setVideoState,
  videoState,
  type,
  Index,
}) => {
  // const dispatch = useDispatch();
  const [essay, setEssay] = useState(question);
  // const [search, setSearch] = useSearchParams();

  const handleChange = (e) => {
    const { name, value, key } = e.target;
    if (name === "Title") {
      // console.log("name");
      setEssay((prev) => {
        return { ...prev, [name]: [value] };
      });
    }
    if (type === "short") {
      if (videoState.short.length === 0) {
        setVideoState((prev) => {
          return { ...prev, short: [essay] };
        });
      } else {
        setVideoState((prev) => {
          return {
            ...prev,
            short: [
              ...prev.short.slice(0, Number),
              essay,
              ...prev.short.slice(Number + 1),
            ],
          };
        });
      }
      console.log(videoState, "short");
    } else if (type === "long") {
      if (videoState.long.length === 0) {
        setVideoState((prev) => {
          return { ...prev, long: [essay] };
        });
      } else {
        setVideoState((prev) => {
          return {
            ...prev,
            long: [
              ...prev.long.slice(0, Number),
              essay,
              ...prev.long.slice(Number + 1),
            ],
          };
        });
      }
    }
  };

  return (
    <div className="mx-6 flex bg-white rounded-lg justify-between my-4">
      <div className="w-11/12 flex flex-col gap-2">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="px-4 font-semibold pt-3 text-base">
            {Index + 1} &nbsp; {essay.Title}
          </h2>
        ) : (
          <input
            onChange={handleChange}
            placeholder="enter new question"
            name="Title"
            value={essay.Title}
          />
        )}
      </div>

      {/* {type !== "topic" && view !== "false" && (
        <div className="w-[5%] flex flex-col gap-4 text-blued border-s-2 py-1"> */}
      {/* <RxCross1
            className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
            onClick={handleDelete}
          /> */}
      {/* <PiFileTextBold className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}
      {/* <IoSwapVerticalSharp className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" />
        <CiBookmarkMinus className=" w-6 h-6 p-1 rounded-lg bg-gray-100 self-center" /> */}

      {/* {search.get(`${Number}`) !== "true" ? (
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
                dispatch(
                  editQuestion({
                    topicIndex: id,
                    selfIndex: Number,
                    questionType: "essay",
                    question: essay,
                  })
                );
              }}
            />
          )}
        </div>
      )} */}
    </div>
  );
};

export default VideoEssay;
