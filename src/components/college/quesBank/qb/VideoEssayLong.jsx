import React from "react";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const VideoEssayLong = ({ Number, Title, id, video }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-6 flex bg-white rounded-md justify-between my-4">
      <div className="w-11/12 flex flex-col gap-2">
        <h2 className="px-4 font-semibold pt-3 text-base">
          {Number + 1} &nbsp; {Title}
          <PiPencilSimpleLineBold
            className=" w-6 h-6 p-1 rounded-md  self-center cursor-pointer"
            onClick={() => {
              navigate(
                `/college/quesBank/video/shortlong/${id}?length=long&addType=edit&index=${Number}`
              );
              localStorage.setItem("qbQues", JSON.stringify(video));
            }}
          />
        </h2>
      </div>
    </div>
  );
};

export default VideoEssayLong;
