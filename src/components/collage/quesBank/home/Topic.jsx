import React, { useEffect } from "react";
import Folder from "./icon/Folder";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTopics } from "../../../../redux/collage/test/thunks/topic";
import { setCurrentTopic } from "../../../../redux/collage/test/testSlice";

const Topic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.test);
  let topics = localStorage.getItem("topics")
    ? JSON.parse(localStorage.getItem("topics"))
    : [];

  const getTotalQuestions = (topic) => {
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
    dispatch(getAllTopics());

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
    <div className=" w-full bg-[#F8F8F9] rounded-3xl py-8 px-12 ">
      <span className="flex justify-between mb-7">
        <h2 className="font-bold text-xl">Choose a Topic</h2>
        <button
          className="rounded-xl bg-[#95ACFA] text-xs font-bold text-white py-2 px-3"
          onClick={() => navigate("/collage/quesBank/topic")}
        >
          View All
        </button>
      </span>

      <div className="flex flex-wrap 3xl:gap-10 gap-3">
        {sections?.map(
          (section, index) =>
            index < 4 && (
              <div
                key={section.id}
                className="3xl:w-72 w-[24%] h-64 bg-white rounded-3xl  "
                onClick={() => {
                  dispatch(
                    setCurrentTopic({
                      topic: section,
                      // Type: questionType || "mcq",
                    })
                  );
                  localStorage.setItem("TopicDetails", JSON.stringify(section));
                  navigate(`/collage/quesBank/topic/${section._id}`);
                }}
              >
                <figure className="h-[155.5px] w-full object-cover">
                  <img src={randomImage()} alt="" />
                </figure>
                <h2 className="text-lg font-bold ml-4 mt-4">
                  {section.Heading}
                </h2>
                <div className="ml-4 mt-4 flex gap-2">
                  <Folder />
                  <p className="text-[#95ACFA] text-sm">
                    {getTotalQuestions(section)} Files
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Topic;
