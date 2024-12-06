import React from "react";

const VideoEssay = ({ Number, Title }) => {
  return (
    <div className="mx-6 flex bg-white rounded-lg justify-between my-4">
      <div className="w-11/12 flex flex-col gap-2">
        <h2 className="px-4 font-semibold pt-3 text-base">
          {Number + 1} &nbsp; {Title}
        </h2>
      </div>
      {/* {type !== "topic" && view !== "false" && (
    <div className="w-[5%] flex flex-col gap-4 text-blued border-s-2 py-1">
      <RxCross1
        className="text-red-500 w-6 h-6 p-1 rounded-lg self-center bg-gray-100"
        onClick={handleDelete}
      />
   

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
            dispatch(
              editQuestion({
                topicIndex: id,
                selfIndex: Number,
                questionType: "mcq",
                question: mcq,
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
