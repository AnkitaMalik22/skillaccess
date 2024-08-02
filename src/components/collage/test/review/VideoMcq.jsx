import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editQuestion } from "../../../../redux/collage/test/testSlice";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import toast from "react-hot-toast";

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
      // //console.log("name", name, value);
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

    // //console.log(videoState, "mcq-state");
    // //console.log(mcq, "mcq");
  };
  const handleSubmit = () => {
    if (
      mcq.Title.trim() === "" ||
      mcq.Options.some((option) => option.trim() === "")
    ) {
      handleAlertDismiss();
      toast.error("Please fill in all fields for the MCQ.");
      return;
    }

    setSave(false);
    // //console.log(mcq);
    setVideoState((prev) => {
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
    });
  };

  const handleAlertDismiss = () => {
    // Iterate over each option in the mcq state
    const updatedMcq = { ...mcq };
    updatedMcq.Options = mcq.Options.map((option, index) => {
      // If the option is empty, revert it back to its previous value
      if (option.trim() === "") {
        return question.Options[index];
      } else {
        return option;
      }
    });

    // Update the mcq state with the modified options
    setMcq(updatedMcq);
  };

  return (
    <div className="flex bg-white rounded-lg justify-between mb-5">
      <div className="p-5 flex flex-col gap-2">
        {search.get(`${Number}`) !== "true" ? (
          <h2 className="flex px-4 font-semibold pt-3 text-base ">
            <div className="">{Index + 1}. </div>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: mcq.Title }}
            ></div>
          </h2>
        ) : (
          <ReactQuill
            value={mcq.Title}
            onChange={(value) => setMcq({ ...mcq, Title: value })}
            className="border-none focus:outline-none rounded-lg focus:ring-0 placeholder-gray-400"
            placeholder="Enter Question Here"
            name="Title"
          />
        )}
        <div className="px-5 pb-4 flex flex-col gap-4 mt-8">
          {search.get(Number) === "true" && (
            <button
              onClick={
                handleSubmit
                // () => {
                //   setSave(false);
                //   //console.log(mcq);
                //   setVideoState((prev) => {
                //     {
                //       return {
                //         ...prev,
                //         questions: [
                //           ...prev.questions.slice(0, Number),
                //           {
                //             Title: mcq.Title,
                //             Options: mcq.Options,
                //           },
                //           ...prev.questions.slice(Number + 1),
                //         ],
                //       };
                //     }
                //   });
                //}
              }
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
