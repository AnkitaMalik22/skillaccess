import React, { useEffect, useState } from "react";
import Header from "./Header";

import List from "./List";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useSearchParams } from "react-router-dom";
import Code from "./Code";
import Video from "./Video";
import {
    getRecentUsedQuestions,
    deleteRecentUsedQuestion,
  } from "../../../../redux/collage/test/thunks/question";
const RecentAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const topicId = searchParams.get("id");
  const Type = searchParams.get("type");
  
  console.log(topicId);
  console.log(Type);
  const { recentUsedQuestions } = useSelector((state) => state.test);
  console.log(recentUsedQuestions);


  useEffect(() => {
    dispatch(getRecentUsedQuestions());
    console.log(recentUsedQuestions);
  }, []);


  const filteredQuestions = recentUsedQuestions.filter(
    (question) => question._id === topicId && question.Type===Type
  );

 console.log(filteredQuestions);

  const max = filteredQuestions?.length / 10;
  const [selected, setSelected] = useState(1);

  return (
    <div className="w-11/12 mx-auto relative    min-h-[90vh] pb-20">
      <Header page={"final"}  />
      <div className="w-4/5 mx-auto">
       
      </div>

      <div className="mt-16">
        
        {filteredQuestions
          ?.slice((selected - 1) * 10, selected * 10)
          .map((question, i) => {
            {console.log(question)};
            return (
              <div className="my-2">
                {question.Type==="compiler" && question.compiler && (
                  question.compiler.map((question,i)=>{
                    return(
                  <Code
                    question={question}
                    Title={question.codeQuestion}
                    code={question.code}
                    number={(selected - 1) * 10 + 1 + i}
                  />
                )
                  
              }
            )
                )}
                {question.Type==="mcq" && question.questions && (
                  question.questions.map((question,i)=>{
                    return(
                      <List
                      question={question}
                      number={(selected - 1) * 10 + 1 + i}
                    />
                    )
                  
                  }
                )
                )}
                {question.Type==="findAnswer" && question.findAnswers && (
                  question.findAnswers.map((question,i)=>{
                    {console.log(question)}
                    return(
                     
                      <List
                      question={question}
                      number={(selected - 1) * 10 + 1 + i}
                    />
                    )
                  
                  }
                )
                )}
                {question.Type==="Essay" && question.Essay && (
                  question.findAnswers.map((question,i)=>{
                    return(
                      <List
                      question={question}
                      number={(selected - 1) * 10 + 1 + i}
                    />
                    )
                  
                  }
                )
                )}
                { question.Type==="video" && question.video && (
                  question.video.map((question,i)=>{
                    return(
                  <Video
                    Number={(selected - 1) * 10 + 1 + i}
                    video={question}
                  />
                )
                  
              }
            )
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
    const hasbookmarks = (pageNumber - 1) * 10 < recentUsedQuestions.length;
   console.log(recentUsedQuestions.length)
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

export default RecentAll;
