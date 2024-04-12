import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getCompany } from "../../../../redux/collage/dashboard/dashboardSlice";
import Folder from "../home/icon/Folder";
import Header from "./Header";
import { getAllTopics } from "../../../../redux/collage/test/thunks/topic";
import { useNavigate } from "react-router-dom";
import { setCurrentTopic } from "../../../../redux/collage/test/testSlice";

const Topic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [topics, settopics] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const { sections } = useSelector((state) => state.test);

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

  const [filteredSections, setFilteredSections] = useState(sections);

  const handleFilterSections = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      console.log("empty");
      console.log(filteredSections, "filtered");
      setFilteredSections(sections);

      return;
    } else {
      setFilteredSections(
        sections.filter((section) => {
          const regex = new RegExp(value, "i");
          return regex.test(section.Heading);
        })
      );

      console.log(filteredSections, "filtered--", value);
    }
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
  }, [dispatch]);

  return (
    <div className="w-[95%] mx-auto font-dmSans">
      <Header handleFilter={handleFilterSections} />
      <div className="flex flex-wrap gap-4 w-full justify-center bg-gray-100 px-3 py-6 rounded-3xl ">
        <div className="w-full flex justify-between px-6 mb-2">
          <h2 className="font-bold text-xl">Choose a Topic</h2>{" "}
          <div className="flex">
            {" "}
            {/* <input
            type="text"
            placeholder="Search..."
            name="search"
            onChange={handleFilterSections}
            className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          /> */}
            <label className="text-sm pl-1 self-center">Delete Selected</label>
          </div>
        </div>

        {filteredSections?.map((section, index) => {
          return (
            <div
              className=" w-[17rem] mb-4 bg-white rounded-2xl"
              key={index}
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
              <figure>
                <img src={randomImage()} alt="cover" />
              </figure>
              <div className="card-body">
                <h2 className="font-bold text-xl">{section?.Heading}</h2>
                <div className="flex gap-2">
                  <Folder />
                  <p className="text-[#95ACFA] text-sm">
                    {getTotalQuestions(section)} Files
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="w-full flex justify-center items-center  mb-4 bg-white rounded-2xl">
            <h2 className="text-xl font-bold">No Topics Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic;
