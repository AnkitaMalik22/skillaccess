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
    <div className="w-full mx-auto bg-[#f7f7f8] lg:px-8 lg:pt-7 pb-4 rounded-3xl">
      <span className="flex justify-between mb-6 ">
        <span className="flex gap-2 self-center">
          <LuBookmarkMinus className="self-center text-2xl text-[#95ACFA]" />
          <h2 className="font-bold text-base self-center mr-2">
            Bookmark questions
          </h2>
        </span>

        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-2 px-3"
          onClick={() => navigate("/collage/quesBank/bookmarks")}
        >
          View All
        </button>
      </span>

      {/* list to be iterated */}
      {bookmarks?.map(
        (bookmark, index) =>
          bookmark.Type === "mcq" && (
            <Dropdown bookmark={bookmark} index={index + 1} />
          )
      )}

      {bookmarks?.length === 0 && (
        <div className="flex gap-2  rounded-lg p-3">
          <div className="w-full">
            <h2 className="p-4">No Bookmarks!</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMark;
