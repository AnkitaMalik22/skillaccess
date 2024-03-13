import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editQuestion } from "../../../../redux/collage/test/testSlice";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";

const VideoMcq = ({
  Number,
  question,
  id,
  search,
  setVideoState,
  setSearch,
  // handleChange,
  handleDelete,
  type,
  view,
  Index,
  videoState,
}) => {
  const dispatch = useDispatch();

  const [save, setSave] = useState(true);
  const [mcq, setMcq] = useState(question);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Title") {
      console.log("name", name, value);
      setMcq((prev) => {
        return { ...prev, [name]: value };
      });
    } else {
      setMcq((prev) => {
        return {
          ...prev,
          Options: prev.Options.map((option, index) =>
            index === parseInt(name) ? value : option
          ),
        };
      });
    }

    // setVideoState((prev) => {
    //   return { ...prev, questions :[...prev.mcq.slice(0, Number), mcq, ...prev.mcq.slice(Number + 1)] };
    // });

    // setVideoState((prev) => {
    //   return {
    //     ...prev,
    //     questions: [
    //       ...prev.questions.slice(0, Number),
    //       { ...prev.questions[Number], Options: mcq.Options },
    //       ...prev.questions.slice(Number + 1),
    //     ],
    //   };
    // });

    console.log(videoState, "mcq-state");
    // console.log(mcq, "mcq");
  };

  return (
    <div className="mx-6 flex bg-white rounded-lg justify-between my-4">
      <div className="w-11/12 flex flex-col gap-2">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="px-4 font-semibold pt-3 text-base">
            {Index + 1}&nbsp;{mcq.Title}
          </h2>
        ) : (
          <input
            className={`${!save && "border-none"}`}
            onChange={handleChange}
            placeholder="enter new question"
            name="Title"
            value={mcq.Title}
          />
        )}
        <div className="px-5 pb-4 flex flex-col gap-4">
          {search.get(Number) === "true" && (
            <button
              onClick={() => {
                setSave(false);
                console.log(mcq);
                setVideoState((prev) => {
                  {
                    return {
                      ...prev,
                      questions: [
                        ...prev.questions.slice(0, Number),
                        {
                          Title: mcq.Title,
                          Options: mcq.Options,
                        },
                        ...prev.questions.slice(Number + 1),
                      ],
                    };
                  }
                });
              }}
            >
              save
            </button>
          )}

          {/* <span className="flex gap-2">
            <div className="flex w-5 justify-center">
              <input
                type="radio"
                id="answer"
                className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
              />{" "}
            </div>
            {search.get(`${Number}`) !== "true" ? (
              <label for="answer" className="self-center">
                {" "}
                {mcq.Options[0]}
              </label>
            ) : (
              <input
                onChange={handleChange}
                placeholder="enter new option"
                name={0}
                value={mcq.Options[0]}
              />
            )}
          </span>
          <span className="flex gap-2">
            <div className="flex w-5 justify-center">
              <input
                type="radio"
                name="answer"
                id="answer"
                className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
              />{" "}
            </div>
            {search.get(`${Number}`) !== "true" ? (
              <label for="answer" className="self-center">
                {" "}
                {mcq.Options[1]}
              </label>
            ) : (
              <input
                onChange={handleChange}
                placeholder="enter new option"
                name={1}
                value={mcq.Options[1]}
              />
            )}
          </span>
          <span className="flex gap-2">
            <div className="flex w-5 justify-center">
              <input
                type="radio"
                id="answer"
                className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
              />{" "}
            </div>
            {search.get(`${Number}`) !== "true" ? (
              <label for="answer" className="self-center">
                {" "}
                {mcq.Options[2]}
              </label>
            ) : (
              <input
                onChange={handleChange}
                name={2}
                placeholder="enter new option"
                value={mcq.Options[2]}
              />
            )}
          </span>
          <span className="flex gap-2">
            <div className="flex w-5 justify-center">
              <input
                type="radio"
                name="answer"
                id="answer"
                className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
              />{" "}
            </div>
            {search.get(`${Number}`) !== "true" ? (
              <label for="answer" className="self-center">
                {" "}
                {mcq.Options[3]}
              </label>
            ) : (
              <input
                onChange={handleChange}
                placeholder="enter new option"
                name={3}
                value={mcq.Options[3]}
              />
            )}
          </span> */}

          {mcq.Options.map((ques, index) => (
            <span className="flex gap-2">
              <div className="flex w-5 justify-center">
                <input
                  type="radio"
                  name="answer"
                  id="answer"
                  className="w-3 h-3 p-[.4rem] checked:bg-none  checked:border checked:border-blue-700 border-blued checked:p-0 border-2  ring-transparent ring-2 checked:ring-blue-700 ring-offset-2   self-center "
                />{" "}
              </div>
              <label htmlFor="answer" className="self-center">
                {" "}
                {search.get(`${Number}`) !== "true" ? (
                  mcq.Options[index]
                ) : (
                  <>
                    <input
                      // className={`${!save && "border-none"}`}
                      name={index}
                      value={mcq.Options[index]}
                      onChange={handleChange}
                      placeholder="enter new question"
                    />
                  </>
                )}
              </label>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoMcq;
