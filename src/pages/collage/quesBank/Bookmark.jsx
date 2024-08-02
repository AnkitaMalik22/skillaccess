import React, { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import List from "../../../components/collage/quesBank/bookmark/List";
import Header from "../../../components/collage/quesBank/bookmark/Header";
import Code from "../../../components/collage/quesBank/bookmark/Code";
import Video from "../../../components/collage/quesBank/bookmark/Video";
import useTranslate from "../../../hooks/useTranslate";

const Bookmarks = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks, GET_BOOKMARKS_LOADING } = useSelector(
    (state) => state.test
  );
  //console.log(bookmarks);

  const max = bookmarks?.length / 10;
  const [selected, setSelected] = useState(1);

  return (
    <div className=" relative    min-h-[90vh]">
      <Header page={"final"} />
      <div className="w-4/5 mx-auto"></div>

      <div className="mt-16">
        {/* //console.log(bookmarks) */}
        {GET_BOOKMARKS_LOADING ? (
          <>
            <div className="grid-cols-3 text-center mx-auto font-dmSans font-bold text-base hidden md:grid bg-white py-3 mb-3 rounded-xl">
              <div className="flex justify-center animate-pulse">
                <div className="h-6 bg-gray-300 rounded-full w-3/4"></div>
              </div>
              <div className="flex justify-center animate-pulse">
                <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
              </div>
              <div className="flex justify-center gap-1 animate-pulse">
                <div className="h-6 bg-gray-300 rounded-full w-6"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            {bookmarks
              ?.slice((selected - 1) * 10, selected * 10)
              .map((question, i) => {
                return (
                  <div className="my-2">
                    {question.codeQuestion && (
                      <Code
                        question={question}
                        Title={question.codeQuestion}
                        code={question.code}
                        number={(selected - 1) * 10 + 1 + i}
                      />
                    )}
                    {question.Title && (
                      <List
                        question={question}
                        number={(selected - 1) * 10 + 1 + i}
                      />
                    )}
                    {question.videoFile && (
                      <Video
                        Number={(selected - 1) * 10 + 1 + i}
                        video={question}
                      />
                    )}{" "}
                  </div>
                );
              })}
          </>
        )}

        {/* iterate this list */}
      </div>

      <div className="absolute bottom-2 mt-20 flex gap-2 w-full justify-center">
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <IoMdArrowDropleft
            className={` text-lg self-center ${selected === 1 && "disabled"}`}
            onClick={() => selected !== 1 && setSelected(selected - 1)}
          />
        </div>

        {Array.from({ length: Math.ceil(max) }).map((_, index) => {
          const pageNumber = index + 1;
          const hasbookmarks = (pageNumber - 1) * 10 < bookmarks.length;
          //console.log(bookmarks.length);
          //console.log(Math.ceil(max));
          return (
            hasbookmarks && (
              <div
                key={pageNumber}
                className={`rounded-lg h-10 w-10 flex justify-center ${
                  selected === pageNumber
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelected(pageNumber)}
              >
                <p className="self-center">{pageNumber}</p>
              </div>
            )
          );
        })}

        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <IoMdArrowDropright
            className={` text-lg self-center ${
              selected === Math.ceil(max) && "disabled"
            }`}
            onClick={() =>
              selected !== Math.ceil(max) && setSelected(selected + 1)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
