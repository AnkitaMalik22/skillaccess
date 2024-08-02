import React, { useEffect, useState } from "react";

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
import toast from "react-hot-toast";
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

  // const [save, setSave] = useState(true);
  const [essay, setEssay] = useState(question);
  // const [search, setSearch] = useSearchParams();

  const [previousShortEssay, setPreviousShortEssay] = useState(question);
  const [previousLongEssay, setPreviousLongEssay] = useState(question);

  useEffect(() => {
    if (type === "short") {
      setPreviousShortEssay(question);
    } else if (type === "long") {
      setPreviousLongEssay(question);
    }
  }, [question, type]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEssay((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (essay.Title.trim() === "") {
      handleAlertDismiss();
      toast.error("Please fill in the Title for the essay.");
      return;
    }

    if (type === "short") {
      if (videoState.short.length === 0) {
        setVideoState((prev) => ({ ...prev, short: [essay] }));
      } else {
        setVideoState((prev) => ({
          ...prev,
          short: [
            ...prev.short.slice(0, Number),
            essay,
            ...prev.short.slice(Number + 1),
          ],
        }));
      }
    } else if (type === "long") {
      if (videoState.long.length === 0) {
        setVideoState((prev) => ({ ...prev, long: [essay] }));
      } else {
        setVideoState((prev) => ({
          ...prev,
          long: [
            ...prev.long.slice(0, Number),
            essay,
            ...prev.long.slice(Number + 1),
          ],
        }));
      }
    }
  };

  const handleAlertDismiss = () => {
    // Revert back to the original essay state
    if (type === "short") {
      setEssay(previousShortEssay);
    } else if (type === "long") {
      setEssay(previousLongEssay);
    }
  };

  return (
    <div className="flex bg-white rounded-lg justify-between mb-5">
      <div className="p-5 flex flex-col gap-2">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="px-4 font-semibold pt-3 text-base">
            {Index + 1} &nbsp; {essay.Title}
          </h2>
        ) : (
          <input
            // className={`${!save && "border-none"}`}
            onChange={handleChange}
            placeholder="enter new question"
            name="Title"
            value={essay.Title}
          />
        )}

        {search.get(Number) === "true" && (
          <button
            onClick={handleSubmit}
            // onClick={() => {
            //   if (type === "short") {
            //     if (videoState.short.length === 0) {
            //       setVideoState((prev) => {
            //         return { ...prev, short: [essay] };
            //       });
            //     } else {
            //       setVideoState((prev) => {
            //         return {
            //           ...prev,
            //           short: [
            //             ...prev.short.slice(0, Number),
            //             essay,
            //             ...prev.short.slice(Number + 1),
            //           ],
            //         };
            //       });
            //     }
            //     //console.log(videoState, "short");
            //   } else if (type === "long") {
            //     if (videoState.long.length === 0) {
            //       setVideoState((prev) => {
            //         return { ...prev, long: [essay] };
            //       });
            //     } else {
            //       setVideoState((prev) => {
            //         return {
            //           ...prev,
            //           long: [
            //             ...prev.long.slice(0, Number),
            //             essay,
            //             ...prev.long.slice(Number + 1),
            //           ],
            //         };
            //       });
            //     }
            //   }
            // }}
          >
            save
          </button>
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
