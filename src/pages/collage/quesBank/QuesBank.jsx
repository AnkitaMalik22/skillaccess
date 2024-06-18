import { useEffect } from "react";
import Topic from "../../../components/collage/quesBank/home/Topic";
import Recent from "../../../components/collage/quesBank/home/Recent";
import useTranslate from "../../../hooks/useTranslate";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../../components/collage/quesBank/home/Dropdown";
import { getAllBookmarks } from "../../../redux/collage/test/thunks/question";
import { LuBookmarkMinus } from "react-icons/lu";

const QuesBank = () => {
  useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.test);
  useEffect(() => {
    dispatch(getAllBookmarks());
  }, []);

  return (
    <>
      <div className="flex w-full mx-auto justify-between mb-6">
        <div className="flex gap-4">
          <button className="  self-center object-center  rounded-lg h-10 w-10 ">
            <img src="../../images/icons/reports.png" alt="icon" />
          </button>
          <h2 className="text-xl md:text-[28px] font-bold self-center font-dmSans text-[#171717]">
            Question Bank
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            className="self-center justify-center flex bg-[#F8F8F9] py-3 px-5 rounded-xl  font-bold gap-2 "
            onClick={() => navigate("/collage/quesbank/createTopic")}
          >
            <FiPlus className="self-center text-lg " /> Add
          </button>
        </div>
      </div>
      <>
        <Topic />
      </>
      <div className="flex justify-between md:flex-nowrap flex-wrap  mt-8 gap-3 md:gap-9">
        <div className=" w-3/5">
          <Recent />
        </div>
        <div className="w-2/5">
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
        </div>
      </div>
    </>
  );
};

export default QuesBank;
