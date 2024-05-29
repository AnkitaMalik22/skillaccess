import React, { useEffect } from "react";
import { LuBookmarkMinus } from "react-icons/lu";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmarks } from "../../../../redux/collage/test/thunks/question";

const BookMark = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const arr = [2, 1, 1, 1, 1];
  const { bookmarks } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(getAllBookmarks());

    console.log(bookmarks);
  }, []);

  return (
    <div className="w-full mx-auto bg-[#F8F8F9] md:px-8 md:py-6 py-5 px-5 rounded-3xl">
      <div className="flex justify-between mb-6 items-center ">
        <div className="flex gap-2 self-center">
          <LuBookmarkMinus className="self-center text-2xl text-[#95ACFA]" />
          <h2 className="font-bold text-base self-center">
            Bookmark questions
          </h2>
        </div>

        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-[5px] px-2"
          onClick={() => navigate("/collage/quesBank/bookmarks")}
        >
          View All
        </button>
      </div>

      {/* list to be iterated */}
      {bookmarks?.map(
        (bookmark, index) =>
          bookmark.Type === "mcq" && (
            <Dropdown bookmark={bookmark} index={index + 1} />
          )
      )}

      {bookmarks?.length === 0 && (
        <div className="flex gap-2  rounded-lg">
          <div className="w-full">
            <h2 className="text-[#171717] text-base text-center">
              No Bookmarks!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMark;
