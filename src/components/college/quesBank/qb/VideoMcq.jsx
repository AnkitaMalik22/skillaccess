import React from "react";
import { useDispatch } from "react-redux";
import { editQuestion } from "../../../../redux/college/test/testSlice";
import { RxCross1 } from "react-icons/rx";
import { PiFileTextBold } from "react-icons/pi";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { CiBookmarkMinus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getEntity } from "../../../../util/isCompany";
const VideoMcq = ({ Number, mcq, id, video }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // //console.log(mcq);
  return (
    <div className="mx-6 flex bg-white rounded-md justify-between my-4">
      {mcq.Title && (
        <div className="w-11/12 flex flex-col gap-2">
          <h2 className="flex gap-2 px-4 font-semibold pt-3 text-base">
            <p className="text-sm">{Number + 1}. </p>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: mcq.Title }}
            />
            <PiPencilSimpleLineBold
              className=" w-6 h-6 p-1 rounded-md  self-center cursor-pointer"
              onClick={() => {
                navigate(
                  `/${getEntity()}/quesBank/video/${id}/addmcq?addType=edit&index=${Number}`
                );
                localStorage.setItem("qbQues", JSON.stringify(video));
              }}
            />
          </h2>

          <div className="px-5 pb-4 flex flex-col gap-4">
            {mcq?.Options?.map((option, index) => {
              return (
                <span className="flex gap-2">
                  <div className="w-6">
                    {/* {//console.log(mcq?.AnswerIndex, index)} */}
                    {index === parseInt(mcq?.AnswerIndex) ? (
                      <img
                        src="/images/icons/greenDotSelected.png"
                        alt="greensel"
                      />
                    ) : (
                      <img src="/images/icons/blueDot.png" alt="greensel" />
                    )}
                  </div>
                  <label
                    className={` text-sm ${mcq?.AnswerIndex === index
                        ? "text-green"
                        : "text-[#3E3E3E]"
                      }`}
                  >
                    {" "}
                    {option}
                  </label>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMcq;
