import React, { useEffect, useState } from "react";
import Header from "../../../components/college/quesBank/recentAll/Header";
import List from "../../../components/college/quesBank/recentAll/List";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Code from "../../../components/college/quesBank/recentAll/Code";
import Video from "../../../components/college/quesBank/recentAll/Video";
import { getRecentUsedQuestions } from "../../../redux/college/test/thunks/question";
import useTranslate from "../../../hooks/useTranslate";

const RecentAll = () => {
  //useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get("id");
  const Type = searchParams.get("type");

  const { recentUsedQuestions } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(getRecentUsedQuestions());
  }, [dispatch]);

  const seenIds = new Set();

  const filteredQuestions = recentUsedQuestions.filter((question) => {
    if (question._id === topicId && question.Type === Type) {
      if (!seenIds.has(question._id)) {
        seenIds.add(question._id);
        return true;
      }
    }
    return false;
  });

  const logPropertyLengths = (questions, type) => {
    let length = 0;
    questions.forEach((question) => {
      switch (type) {
        case "compiler":
          length += question.compiler?.length || 0;
          break;
        case "essay":
          length += question.essay?.length || 0;
          break;
        case "mcq":
          length += question.questions?.length || 0;
          break;
        case "findAnswers":
          length += question.findAnswers?.length || 0;
          break;
        case "video":
          length += question.video?.length || 0;
          break;
        default:
          //console.log(`No matching type found for ${type}`);
          break;
      }
    });
    return length;
  };

  const lengthQues = logPropertyLengths(filteredQuestions, Type);

  const maxPages = Math.ceil(lengthQues / 10);
  const [selected, setSelected] = useState(1);

  const getPaginatedQuestions = () => {
    let allQuestions = [];
    filteredQuestions.forEach((question) => {
      switch (Type) {
        case "compiler":
          allQuestions = allQuestions.concat(question.compiler || []);
          break;
        case "essay":
          allQuestions = allQuestions.concat(question.essay || []);
          break;
        case "mcq":
          allQuestions = allQuestions.concat(question.questions || []);
          break;
        case "findAnswers":
          allQuestions = allQuestions.concat(question.findAnswers || []);
          break;
        case "video":
          allQuestions = allQuestions.concat(question.video || []);
          break;
        default:
          break;
      }
    });

    return allQuestions.slice((selected - 1) * 10, selected * 10);
  };

  const paginatedQuestions = getPaginatedQuestions();

  return (
    <div className="relative min-h-[90vh] ">
      <Header page={"final"} />
      <div className="mt-16">
        {paginatedQuestions.map((question, i) => {
          return (
            <div key={i} className="my-2">
              {Type === "compiler" && (
                <Code
                  question={question}
                  Title={question.codeQuestion}
                  code={question.code}
                  number={(selected - 1) * 10 + 1 + i}
                />
              )}
              {Type === "mcq" && (
                <List
                  question={question}
                  number={(selected - 1) * 10 + 1 + i}
                />
              )}
              {Type === "findAnswers" && (
                <List
                  question={question}
                  number={(selected - 1) * 10 + 1 + i}
                />
              )}
              {Type === "essay" && (
                <List
                  question={question}
                  number={(selected - 1) * 10 + 1 + i}
                />
              )}
              {Type === "video" && (
                <Video Number={(selected - 1) * 10 + 1 + i} video={question} />
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-2 mt-20 flex gap-2 w-full justify-center">
        <div className="rounded-md bg-gray-100 h-10 w-10 flex justify-center">
          <IoMdArrowDropleft
            className={` text-lg self-center ${selected === 1 && "disabled"}`}
            onClick={() => selected !== 1 && setSelected(selected - 1)}
          />
        </div>

        {Array.from({ length: maxPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <div
              key={pageNumber}
              className={`rounded-md h-10 w-10 flex justify-center ${
                selected === pageNumber ? "bg-accent text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelected(pageNumber)}
            >
              <p className="self-center">{pageNumber}</p>
            </div>
          );
        })}

        <div className="rounded-md bg-gray-100 h-10 w-10 flex justify-center">
          <IoMdArrowDropright
            className={` text-lg self-center ${
              selected === maxPages && "disabled"
            }`}
            onClick={() => selected !== maxPages && setSelected(selected + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentAll;
