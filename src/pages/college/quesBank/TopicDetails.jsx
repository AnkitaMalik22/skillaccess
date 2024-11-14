import React, { useEffect, useState } from "react";
import TopicHeader from "../../../components/college/quesBank/home/TopicHeader";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FindAnswer from "../../../components/college/quesBank/qb/FindAnswer";
import Essay from "../../../components/college/quesBank/qb/Essay";
import Mcq from "../../../components/college/quesBank/qb/Mcq";
import Code from "../../../components/college/quesBank/qb/Code";
import Video from "../../../components/college/quesBank/qb/Video";
import { getTopicById } from "../../../redux/college/test/thunks/topic";
import useTranslate from "../../../hooks/useTranslate";

const TopicDetails = () => {
  //useTranslate();
  const dispatch = useDispatch();
  const currentTopic = useSelector((state) => state.test.currentTopic);
  const [questions, setQuestions] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    dispatch(getTopicById(id));
  }, [id]);

  useEffect(() => {
    if (currentTopic && currentTopic?.questions) {
      setQuestions([
        ...currentTopic.questions,
        ...currentTopic.findAnswers,
        ...currentTopic.essay,
        ...currentTopic.video,
        ...currentTopic.compiler,
      ]);
    }
  }, [currentTopic, ""]);

  const max = questions?.length / 10;
  const [selected, setSelected] = useState(1);

  return (
    <div className="min-h-[90vh] relative">
      <TopicHeader Heading={currentTopic?.Heading} page={"qb"} sectionId={id} />
      <div className="mb-5">
        {questions
          ?.slice((selected - 1) * 10, selected * 10)
          .map((question, i) => {
            return (
              <div>
                {question.Options && !question.videoFile && (
                  <Mcq
                    question={question}
                    number={(selected - 1) * 10 + 1 + i}
                  />
                )}
                {question.questions && !question.videoFile && (
                  <FindAnswer
                    question={question}
                    number={(selected - 1) * 10 + 1 + i}
                  />
                )}

                {!question.Options &&
                  !question.questions &&
                  !question.code &&
                  !question.videoFile && (
                    <Essay
                      question={question}
                      number={(selected - 1) * 10 + 1 + i}
                    />
                  )}
                {question.code && !question.videoFile && (
                  <Code
                    question={question}
                    Title={question.codeQuestion}
                    code={question.code}
                    number={(selected - 1) * 10 + 1 + i}
                  />
                )}
                {question.videoFile && (
                  <Video
                    Number={(selected - 1) * 10 + 1 + i}
                    video={question}
                  />
                )}
              </div>
            );
          })}
      </div>

      <div className="flex gap-2 w-full justify-center bottom-1">
        <div className="rounded-lg bg-gray-100 h-10 w-10 flex justify-center">
          <IoMdArrowDropleft
            className={` text-lg self-center ${selected === 1 && "disabled"}`}
            onClick={() => selected !== 1 && setSelected(selected - 1)}
          />
        </div>

        {Array.from({ length: Math.ceil(max) }).map((_, index) => {
          const pageNumber = index + 1;
          const hasQuestions = (pageNumber - 1) * 10 < questions.length;

          return (
            hasQuestions && (
              <div
                key={pageNumber}
                className={`rounded-lg h-10 w-10 flex justify-center cursor-pointer ${
                  selected === pageNumber
                    ? "bg-accent text-white"
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

export default TopicDetails;
