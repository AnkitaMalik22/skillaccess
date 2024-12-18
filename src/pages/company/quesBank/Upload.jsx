import React from "react";
import toast from "react-hot-toast";
import useTranslate from "../../../hooks/useTranslate";
import BackIcon from "../../../components/buttons/BackIcon";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  //useTranslate();
  const navigate = useNavigate();
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // //console.log(e.dataTransfer.files);
    toast.success("file dropped");
  };

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="flex w-full mx-auto justify-between mb-2 font-dmSans">
        <button
          className="  self-center  rounded-lg h-10 w-10 "
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>

        <button className="bg-accent text-white font-bold  self-center   text-sm 3xl:text-base rounded-lg py-3 px-6">
          Upload New
        </button>
      </div>

      <div
        className="w-full 3xl:h-[449px] sm:h-[50vh] border rounded-2xl border-dashed border-blued bg-gray-100 mt-20 flex justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="self-center">
          <img
            src="/images/icons/folderBlack.png"
            alt=""
            className="mx-auto"
          />
          <p className="text-4xl text-gray-400 text-center mt-2">
            Drag and drop to upload it
          </p>
          <p className="text-2xl text-center text-gray-300 mt-1">or </p>
          <div className="w-full flex justify-center">
            <label for="upload-file">
              <div className="bg-accent text-white font-bold   text-sm 3xl:text-base rounded-lg py-3 px-6 mx-auto hover:cursor-pointer">
                Select a file from your computer
              </div>
            </label>
            <input
              type="file"
              className="hidden"
              id="upload-file"
              multiple
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
