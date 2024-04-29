import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getCompany } from "../../../../redux/collage/dashboard/dashboardSlice";
import Folder from "../home/icon/Folder";
import Header from "./Header";
import {
  getAllTopics,
  getAllTopicsQB,
  deleteTopics,
} from "../../../../redux/collage/test/thunks/topic";
import { useNavigate } from "react-router-dom";
import {
  setCurrentTopic,
  setFilteredSections,
} from "../../../../redux/collage/test/testSlice";
import DeletePoP from "../../../PopUps/DeleetPoP";
import { FaDeleteLeft } from "react-icons/fa6";

const Topic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [topics, settopics] = useState([1, 2, 3, 4, 5, 6, , 9, 6]);
  const [selectedSections, setSelectedSections] = useState([]);
  const { sections, filteredSections } = useSelector((state) => state.test);
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");

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

  // const [filteredSections, setFilteredSections] = useState(sections);
  const [loading, setLoading] = useState(false);

  const handleFilterSections = (e) => {
    const value = e.target.value;
    if (value === "" || value.trim() === "") {
      console.log("empty");
      console.log(filteredSections, "filtered");
      dispatch(setFilteredSections(sections));

      return;
    } else {
      // dispatch();\
      dispatch(
        setFilteredSections(
          sections.filter((section) =>
            section.Heading.toLowerCase().includes(value.toLowerCase())
          )
        )
      );

      console.log(filteredSections, "filtered--", value);
    }
  };
  useEffect(() => {
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

  // useEffect(() => {
  //   if (!sections) {
  //     dispatch(getAllTopicsQB()).then((res) => {
  //       console.log("sections", sections);
  //       dispatch(setFilteredSections(sections));
  //     });
  //   }
  // }, [sections]);

  const handleSelect = (id) => {
    console.log("id", id);
    if (!selectedSections.includes(id)) {
      setSelectedSections([...selectedSections, id]);
    } else {
      setSelectedSections(selectedSections.filter((section) => section !== id));
    }
    console.log("selected", selectedSections);
  };

  // const handleDiselect = (e, id) => {
  //   if (selectedSections.includes(id)) {
  //     setSelectedSections(selectedSections.filter((section) => section !== id));
  //   }
  // }

  const selectedClass = (id) => {
    return selectedSections.includes(id) ? "border-2 border-[#0052CC]" : "";
  };

  const handleDelete = () => {
    dispatch(deleteTopics(selectedSections));
    setVisible(false);
    // dispatch(deleteSections(selectedSections));
    setSelectedSections([]);
    // dispatch( setFilteredSections(sections))
    setLoading(true);
  };

  return (
    <div className="w-[95%] mx-auto font-dmSans">
      {visible && (
        <DeletePoP
          visible={visible}
          setVisible={setVisible}
          handleDelete={handleDelete}
          handleCancel={() => {
            setVisible(false);
            setSelectedSections([]);
          }}
        />
      )}
      <Header handleFilter={handleFilterSections} />
      <div className="flex flex-wrap gap-4 w-full justify-center bg-gray-100 px-3 py-6 rounded-3xl ">
        <div className="w-full flex justify-between px-6 mb-2">
          <h2 className="font-bold text-xl">Choose a Topic</h2>{" "}
          {/* <div className="flex self-center"> */}{" "}
          {/* <input
            type="text"
            placeholder="Search..."
            name="search"
            onChange={handleFilterSections}
            className="placeholder pl-0 border-none self-center bg-gray-100 focus:outline-none focus:ring-0 rounded-e-lg sm:w-80 w-fit"
          /> */}
          {/* <input
              name="select"
              type="checkbox"
              className="rounded bg-[#DEEBFF] border-none mr-1"
            />{" "}
            <label className="text-sm pl-1 self-center">Delete Selected</label>
          </div> */}
          <button className="inline-flex items-center justify-center">
         {
          selectedSections?.length > 0 && (   <h3 className="text-sm mr-3 font-bold text-gray-500">{selectedSections?.length}{" /"}{sections?.length}{" "}</h3>)
}
            <input
              name="select"
              type="checkbox"
              checked={selectedSections?.length > 0 ? true : false}
              className={`rounded bg-[#DEEBFF] border-none ${
                selectedSections.length > 0 ? "w-6 h-6 " : " focus:ring-0 "
              }`}
              onChange={(e) => {
                selectedSections?.length > 0
                  ? setVisible(true)
                  : setVisible(false);
              }}
            />{" "}
            {selectedSections?.length > 0 ? (
              <button
                className="rounded-xl bg-[#0052cc] text-sm font-bold text-white py-2 px-4 ml-2 flex items-center gap-1 "
                onClick={handleDelete}
              >
                Delete Selected
                {/* <MdDelete
                  className="text-white-500 w-8 h-8 p-1 rounded-lg self-center  cursor-pointer"
                  onClick={handleDelete}
                /> */}
              </button>
            ) : (
              <label for="select" className="text-sm pl-1">
                Delete Selected
              </label>
            )}
          </button>
        </div>

        {filteredSections &&
          filteredSections.map((section, index) => {
            return (
              <div
                className={`w-[17rem] mb-4 bg-white rounded-2xl cursor-pointer ${
                  selectedSections.includes(section._id)
                    ? "border-2 border-[#0052CC]"
                    : ""
                }`}
                key={index}
                onClick={() => {
                  console.log("section", section);
                  handleSelect(section._id);
                }}
              >
                <figure>
                  <img src={randomImage()} alt="cover" />
                </figure>
                <div className="card-body">
                  <h2 className="font-bold text-xl">{section?.Heading}</h2>
                  <div
                    className="flex gap-2"
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
                    <Folder />
                    <p className="text-[#95ACFA] text-sm">
                      {getTotalQuestions(section)} Files
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        {filteredSections?.length === 0 && (
          <div className="w-full flex justify-center items-center  mb-4 bg-white rounded-2xl">
            <h2 className="text-xl font-bold">No Topics Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topic;
