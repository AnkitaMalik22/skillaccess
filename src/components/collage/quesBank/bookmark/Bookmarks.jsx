import React, { useState } from "react";
import Header from "./Header";
import { Progress } from "./Progress";
import List from "./List";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Code from "./Code";
import Video from "./Video";

const Bookmarks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.test);
console.log(bookmarks);


 

  const max = bookmarks?.length / 10;
  const [selected, setSelected] = useState(1);

  return (
    <div className="w-11/12 mx-auto relative    min-h-[90vh] pb-20">
      <Header page={"final"}  />
      <div className="w-4/5 mx-auto">
       
      </div>

      <div className="mt-16">
        {console.log(bookmarks)}
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

        {/* iterate this list */}
      </div>

      <div className="absolute bottom-2 mt-20 flex gap-2 w-full justify-center">
  <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
    <FaChevronLeft
      className={`rotate-45 text-lg self-center ${selected === 1 && "disabled"}`}
      onClick={() => selected !== 1 && setSelected(selected - 1)}
    />
  </div>

  {Array.from({ length: Math.ceil(max) }).map((_, index) => {
    const pageNumber = index + 1;
    const hasbookmarks = (pageNumber - 1) * 10 < bookmarks.length;
   console.log(bookmarks.length)
  console.log(Math.ceil(max));
    return (
      hasbookmarks && (
        <div
          key={pageNumber}
          className={`rounded-lg h-10 w-10 flex justify-center ${
            selected === pageNumber ? "bg-blue-700 text-white" : "bg-gray-100"
          }`}
          onClick={() => setSelected(pageNumber)}
        >
          <p className="self-center">{pageNumber}</p>
        </div>
      )
    );
  })}

  <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
    <FaChevronRight
      className={`rotate-45 text-lg self-center ${selected === Math.ceil(max) && "disabled"}`}
      onClick={() => selected !==Math.ceil(max) && setSelected(selected + 1)}
    />
  </div>
</div>


    </div>
  );
};

export default Bookmarks;
