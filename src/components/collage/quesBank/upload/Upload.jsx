import React from "react";
import Header from "./Header";

const Upload = () => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // console.log(e.dataTransfer.files);
    window.alert("file dropped");
  };

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="w-[95%] mx-auto mt-4 font-dmSans">
        <Header />

        <div
          className="w-full 3xl:h-[449px] sm:h-[50vh] border rounded-2xl border-dashed border-blued bg-gray-100 mt-20 flex justify-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="self-center">
            <img
              src="./../../images/icons/folderBlack.png"
              alt=""
              className="mx-auto"
            />
            <p className="text-4xl text-gray-400 text-center mt-2">
              Drag and drop to upload it
            </p>
            <p className="text-2xl text-center text-gray-300 mt-1">or </p>
            <div className="w-full flex justify-center">
              <label for="upload-file">
                <div className="bg-[#0052CC] text-white font-bold   text-sm 3xl:text-base rounded-lg py-3 px-6 mx-auto hover:cursor-pointer">
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
    </div>
  );
};

export default Upload;
