import React, { useEffect, useState } from "react";
import TopicHeader from "./TopicHeader";
import { Progress } from "../bookmark/Progress";
import List from "../bookmark/List";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Code from "../bookmark/Code";
import Video from "../bookmark/Video";
import { getTopicById } from "../../../../redux/collage/test/thunks/topic";

const TopicDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.test);

  const currentTopic = useSelector((state) => state.test.currentTopic);
  const [questions, setQuestions] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    dispatch(getTopicById(id));
  }, [id]);

  //
  // all questions in the topic

//  let questions = [ ];

  // const topicDetails = JSON.parse(localStorage.getItem(JSON.stringify(currentTopic)))

  // console.log(questions);

  useEffect(() => {

      if (currentTopic && currentTopic?.questions) {
        setQuestions([  ...currentTopic.questions,
          ...currentTopic.findAnswers,
          ...currentTopic.essay,
          ...currentTopic.video,
          ...currentTopic.compiler])
            }
    },[currentTopic, ""])
 




  const max = questions?.length / 10;
  const [selected, setSelected] = useState(1);
console.log(questions);
  return (
    <div className="w-11/12 mx-auto relative    min-h-[90vh] pb-20">
      {/* <Header page={"final"} /> */}
      <TopicHeader Heading={currentTopic?.Heading} page={"qb"} sectionId={id} />
      <div className="w-4/5 mx-auto"></div>

      <div className="mt-16">
        {/* {console.log(bookmarks)} */}
        {/* {TopicDetails */}
        {/* //   ?.slice((selected - 1) * 10, selected * 10)
        //   .map((question, i) => { */}
        {/* //     return ( */}
        {questions?.slice((selected - 1) * 10, selected * 10).map((question, i) => {
          return (
            <div className="my-2">
              {!question.code && !question.videoFile && 
                <List
                  question={question}
                  number={(selected - 1) * 10 + 1 + i}
                />
              }
              {question.code && (
                <Code
                  question={question}
                  Title={question.codeQuestion}
                  code={question.code}
                  number={(selected - 1) * 10 + 1 + i}
                />
              )}
              {question.videoFile && (
                <Video Number={(selected - 1) * 10 + 1 + i} video={question} />
              )}
            </div>
          );
        })}

        {/* 


  {
                    currentTopic.findAnswers?.map((question, i) => {
                        return (
                            <div className="my-2">

                                <List
                                    question={question}
                                    number={(selected - 1) * 10 + 1 + i}
                                />
                            </div>
                        );
                    }
                    )
                }
                {
                    currentTopic.essay?.map((question, i) => {
                        return (
                            <div className="my-2">

                                <List
                                    question={question}
                                    number={(selected - 1) * 10 + 1 + i}
                                />
                            </div>
                        );
                    }
                    )
                }
                {
                    currentTopic.video?.map((question, i) => {
                        return (

                            <div className="my-2">
                                <Video
                                    Number={(selected - 1) * 10 + 1 + i}
                                    video={question}
                                />
                            </div>
                        );
                    })
                }
                {
                    currentTopic.compiler?.map((question, i) => {
                        return (
                            <div className="my-2">
                                <Code
                                    question={question}
                                    Title={question.codeQuestion}
                                    code={question.code}
                                    number={(selected - 1) * 10 + 1 + i}
                                />
                            </div>
                        );
                    })
                }
            */}
      </div>

      <div className="absolute bottom-2 mt-20 flex gap-2 w-full justify-center">
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <FaChevronLeft
            className={`rotate-45 text-lg self-center ${
              selected === 1 && "disabled"
            }`}
            onClick={() => selected !== 1 && setSelected(selected - 1)}
          />
        </div>

        {Array.from({ length: Math.ceil(max) }).map((_, index) => {
          const pageNumber = index + 1;
          const hasQuestions = (pageNumber - 1) * 10 < questions.length;
          console.log(questions.length);
          console.log(Math.ceil(max));
          return (
            hasQuestions && (
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
          <FaChevronRight
            className={`rotate-45 text-lg self-center ${
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

export default TopicDetails;
