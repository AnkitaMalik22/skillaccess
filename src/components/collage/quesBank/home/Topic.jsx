import React, { useEffect } from "react";
import Folder from "./icon/Folder";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTopics,
  getAllTopicsQB,
} from "../../../../redux/collage/test/thunks/topic";
import { setCurrentTopic } from "../../../../redux/collage/test/testSlice";
import { useSearchParams } from "react-router-dom";

const Topic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");
  const { sections, GET_TOPICS_LOADING } = useSelector((state) => state.test);
  let topics = localStorage.getItem("topics")
    ? JSON.parse(localStorage.getItem("topics"))
    : [];

  const getTotalQuestions = (topic) => {
    console.log("topics", topic);
    let total = 0;
    total =
      topic?.questions?.length +
      topic?.video?.length +
      topic?.compiler?.length +
      topic?.essay?.length +
      topic?.findAnswers?.length;

    return total;
  };

  const randomImage = () => {
    const images = [
      "../../images/FrontEnd.png",
      "../../images/HR.png",
      "../../images/Marketing.png",
      "../../images/HR.png",
      "../../images/Marketing.png",
      "../../images/FrontEnd.png",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    // dispatch(getAllTopics({
    //   level: level,
    // }));

    dispatch(getAllTopicsQB());

    // if (sections) {
    //   setFilteredSections(sections);
    // }

    try {
      topics = JSON.parse(localStorage.getItem("topics"));

      // setSelectedSections(topics);
    } catch (error) {}

    // console.log("hello tests",sections);
  }, []);

  return (
    <div className=" w-full bg-[#F8F8F9] rounded-[32px] md:py-8 py-5 md:px-12 px-5 ">
      <div className="flex justify-between md:mb-8 mb-5 items-center">
        <h2 className="font-bold text-xl text-[#171717]">Choose a Topic</h2>
        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-[5px] px-3"
          onClick={() => navigate("/collage/quesBank/topic")}
        >
          View All
        </button>
      </div>

      <div className="flex flex-wrap 3xl:gap-10 gap-3">
        {GET_TOPICS_LOADING
          ? // Render skeleton loader
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-[17rem] mb-4 bg-gray-200 rounded-2xl animate-pulse"
              >
                <div className="h-40 bg-gray-300 rounded-t-2xl"></div>
                <div className="card-body">
                  <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
                </div>
              </div>
            ))
          : sections?.map(
              (section, index) =>
                index < 4 && (
                  <div
                    key={section.id}
                    className="xl:w-[285px] w-[24%] bg-white rounded-3xl cursor-pointer"
                    onClick={() => {
                      dispatch(
                        setCurrentTopic({
                          topic: section,
                          // Type: questionType || "mcq",
                        })
                      );
                      localStorage.setItem(
                        "TopicDetails",
                        JSON.stringify(section)
                      );
                      navigate(`/collage/quesBank/topic/${section._id}`);
                    }}
                  >
                    <figure className="h-[155.5px] w-full object-cover">
                      <img src={randomImage()} alt="images" />
                    </figure>
                    <div className="p-4">
                      <h2 className="text-lg font-bold mb-3 text-[#171717] capitalize">
                        {section.Heading}
                      </h2>
                      <div className="flex gap-2">
                        <Folder />
                        <p className="text-[#95ACFA] text-sm">
                          {getTotalQuestions(section)} Files
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
      </div>
    </div>
  );
};

export default Topic;
