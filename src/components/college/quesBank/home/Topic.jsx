import React, { useEffect, useState, useMemo } from "react";
import Folder from "./icon/Folder";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTopicsQB } from "../../../../redux/college/test/thunks/topic";
import { setCurrentTopic } from "../../../../redux/college/test/testSlice";
import { useSearchParams } from "react-router-dom";
import { isUni, isCompany } from "../../../../util/isCompany";

const Topic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level");

  const { sections, GET_TOPICS_LOADING } = useSelector((state) => state.test);

  const [query] = useState({
    category: "",
    accessibleDepartments: [],
    hasAccessToAllDepartments: false,
    hasAccessToAllCategories: true,
  });

  // Memoized topics from localStorage to avoid unnecessary re-renders
  const topics = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("topics")) || [];
    } catch (error) {
      console.error("Error parsing topics from localStorage:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    dispatch(getAllTopicsQB(query));
  }, [dispatch, query]);

  // Calculate total questions in a topic
  const getTotalQuestions = (topic) => {
    return (
      (topic?.questions?.length || 0) +
      (topic?.video?.length || 0) +
      (topic?.compiler?.length || 0) +
      (topic?.essay?.length || 0) +
      (topic?.findAnswers?.length || 0)
    );
  };

  // Generate a random image from predefined options
  const randomImage = () => {
    const images = [
      "/images/FrontEnd.png",
      "/images/HR.png",
      "/images/Marketing.png",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  // Handle card click navigation
  const handleTopicClick = (section) => {
    dispatch(setCurrentTopic({ topic: section }));
    localStorage.setItem("TopicDetails", JSON.stringify(section));
    const basePath = isUni()
      ? "/university/pr/quesBank/topic"
      : isCompany()
      ? "/company/pr/quesBank/topic"
      : "/college/quesBank/topic";
    navigate(`${basePath}/${section._id}`);
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="w-[17rem] mb-4 bg-gray-200 rounded-md animate-pulse">
      <div className="h-40 bg-gray-300 rounded-t-2xl"></div>
      <div className="card-body p-4">
        <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
      </div>
    </div>
  );

  // Render Individual Topic Card
  const TopicCard = ({ section }) => (
    <div
      key={section.id}
      className="xl:w-[285px] w-[24%] bg-white rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow"
      onClick={() => handleTopicClick(section)}
    >
      <figure className="h-[155.5px] w-full object-cover overflow-hidden">
        <img
          src={randomImage()}
          alt="Topic Cover"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-3 text-[#171717] capitalize">
          {section.Heading}
        </h2>
        <div className="flex gap-2 items-center">
          <Folder />
          <p className="text-blued text-sm">
            {getTotalQuestions(section)} Questions
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#F8F8F9] rounded-md md:py-8 py-5 md:px-12 px-5">
      {/* Header */}
      <div className="flex justify-between md:mb-8 mb-5 items-center">
        <h2 className="font-bold text-xl text-[#171717]">Choose a Topic</h2>
        <button
          className="rounded-xl bg-accent text-sm font-bold text-white py-[5px] px-3"
          onClick={() =>
            navigate(
              isUni()
                ? "/university/pr/quesBank/topic"
                : isCompany()
                ? "/company/pr/quesBank/topic"
                : "/college/quesBank/topic"
            )
          }
        >
          View All
        </button>
      </div>

      {/* Topic Cards */}
      <div className="flex flex-wrap justify-between gap-y-5">
        {GET_TOPICS_LOADING
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : sections?.map(
              (section, index) =>
                index < 4 && <TopicCard key={section.id} section={section} />
            )}
      </div>
    </div>
  );
};

export default Topic;
