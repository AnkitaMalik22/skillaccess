import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Header from "./Header";

import { Progress } from "./Progress";

import { FiPlusCircle } from "react-icons/fi";

import Inputs from "./Inputs";

import { useSelector, useDispatch } from "react-redux";

import { FaPlus } from "react-icons/fa";

import { useNavigate,useSearchParams } from "react-router-dom";

import {
  setCurrentTopic,
  setTestSelectedTopics,
} from "../../../../redux/collage/test/testSlice";
import { getAllTopics } from "../../../../redux/collage/test/thunks/topic";

const SelectTests = () => {
  const [questionType, setQuestionType] = useState("mcq");

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const { sections } = useSelector((state) => state.test);
  // for filter the sections

  const [filteredSections, setFilteredSections] = useState(sections);
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level");

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

  let topics = localStorage.getItem("topics")
    ? JSON.parse(localStorage.getItem("topics"))
    : [];

  const [selectedSections, setSelectedSections] = useState(topics);

  const addSection = (section) => {
    if (!questionType) {
      toast.error("Please select a question type first.");
      return;
    }
    if (selectedSections?.length < 5 || !selectedSections) {
      for (let i = 0; i < selectedSections.length; i++) {
        if (selectedSections[i]._id === section._id) {
          if (selectedSections[i].Type === questionType) {
            return;
          }

          // else{

          //   selectedSections[i].Type = questionType;

          //   return;

          // }
        }
      }

      let sectionCopy = { ...section, Type: questionType };

      // sectionCopy[Type] ="mcq";

      console.log(sectionCopy);

      setSelectedSections([...selectedSections, sectionCopy]);

      //   dispatch(

      //     setTest({

      //       sections: selectedSections,

      //     })

      //   );

      dispatch(setTestSelectedTopics(selectedSections));
    }

    // dispatch(setSections(sections.filter((s) => s !== section)));

    // console.log(updatedSections);
  };

  const removeSection = (section, index) => {
    const updatedSections = [...selectedSections];

    updatedSections.splice(index, 1);

    setSelectedSections(updatedSections);

    dispatch(setTestSelectedTopics(updatedSections));
  };

  useEffect(() => {
    dispatch(getAllTopics({
      level: level,
    }));

    if (sections) {
      setFilteredSections(sections);
    }

    try {
      topics = JSON.parse(localStorage.getItem("topics"));

      setSelectedSections(topics);
    } catch (error) {}

    // console.log("hello tests",sections);
  }, []);

  useEffect(() => {
    if (sections) {
      setFilteredSections(sections);

    }
  }, [sections]);

  useEffect(() => {
    // getSelectedSections();

    dispatch(setTestSelectedTopics(selectedSections));
  }, [addSection, removeSection, selectedSections]);

  return (
    <div className="font-dmSans text-sm font-bold">
      <Header />

      <div className="w-4/5 mx-auto">
        <Progress />
      </div>

      {/* larger screens */}

      <div className="  w-11/12 mx-auto min-h-[90vh] my-2 rounded-lg tracking-wide justify-between  ">
        <div>
          <h2 className="w-11/12  text-gray-400 sm:h-10 py-2 sm:mt-12  mt-4 rounded-lg mb-10 sm:mb-1 ">
            Your Assessment can include upto 5 tests, Browse the test library
            and add the most relevant tests.{" "}
          </h2>
        </div>

        <div className=" mx-auto  my-2 rounded-lg grid sm:grid-cols-5 grid-cols-2 gap-6">
          {selectedSections?.map((section, index) => (
            <div
              className="w-full h-32 border border-dashed rounded-lg border-blued col-span-1 flex justify-center "
              key={`${section._id + section.Type}`}
            >
              {/* {console.log(section, "section")} */}

              <span className="self-center">
                <h2 className="text-xl font-bold mb-4">{section?.Heading}</h2>

                <div className="flex gap-2">
                  <img
                    src="../../images/icons/menu-boxed.png"
                    alt=""
                    className="self-center"
                  />

                  <h2 className="font-bold text-xs text-gray-400 self-center">
                    {section?.Type}
                  </h2>
                </div>

                <div className="flex justify-between mt-1">
                  {" "}
                  <div className="flex gap-2 w-full">
                    <img
                      src="../../images/icons/stopwatch.png"
                      alt=""
                      className="w-6 h-6 self-center"
                    />

                    <h2 className="font-bold text-xs text-gray-400 self-center">
                      {section?.Time}
                    </h2>
                  </div>
                  <img
                    src="../../images/icons/cross.png"
                    alt=""
                    onClick={() => removeSection(section, index)}
                  />
                </div>
              </span>
            </div>
          ))}

          {selectedSections?.length < 5
            ? Array.from({ length: 5 - selectedSections.length }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-full h-32 border border-dashed rounded-lg border-blued col-span-1 flex justify-center "
                  >
                    <span className="self-center">
                      <FiPlusCircle className="mx-auto sm:w-8 sm:h-8 text-gray-200" />

                      <h2 className="font-semibold mt-1">
                        Add section {index + 1}{" "}
                      </h2>
                    </span>
                  </div>
                )
              )
            : null}

          {/* <div className="w-full h-32 border border-dashed rounded-lg border-blued col-span-1 flex justify-center ">

            <span className="self-center">

              <FiPlusCircle className="mx-auto sm:w-8 sm:h-8 text-gray-200" />

              <h2 className="font-semibold mt-1">Add section 2 </h2>

            </span>

          </div> */}
        </div>

        <Inputs
          questionType={questionType}
          setQuestionType={setQuestionType}
          handleFilter={handleFilterSections}
          type = {"adaptive"}
        />

        <div className="grid grid-cols-4 gap-8 justify-center">
          <div className="w-full h-64 bg-gray-100 rounded-lg flex justify-center">
            <div className=" self-center w-fit h-fit ">
              <div
                className="bg-white sm:w-20 sm:h-20 w-10 h-10 rounded-lg mx-auto flex justify-center"
                onClick={() => Navigate("/collage/test/createTopicAdaptive")}
              >
                <FaPlus className="self-center w-4 h-4 sm:h-8 sm:w-8 text-blue-500" />
              </div>

              <h2 className="text-center text-black text-base  font-bold my-2 w-20  md:w-60">
                Add New Topic
              </h2>

              <h2 className="text-xs text-center text-gray-400">
                Create new Topic
              </h2>
            </div>
          </div>
          {filteredSections?.map((section, index) => (
            // <div className="card w-96 bg-base-100 shadow-xl">

            //   <div className="card-body">

            //     <h2 className="card-title">{section.name}</h2>

            //     <p> {section.desription}</p>

            //     <div className="card-actions justify-end">

            //       <button

            //         onClick={() => addSection(section)}

            //         className="btn btn-primary"

            //       >

            //         Add

            //       </button>

            //       <button

            //         onClick={() => removeSection(section)}

            //         className="btn btn-primary"

            //       >

            //         Remove

            //       </button>

            //     </div>

            //   </div>

            // </div>

            <div className="w-full h-64 rounded-lg bg-gray-100  relative">
              <div className="card-body">
                <h2 className="text-xl font-bold mb-4">{section.Heading}</h2>

                <p className="text-sm leading-[26px] text-[#8F92A1] break-words">
                  {section.Description.length > 60
                    ? section.Description.substring(0, 60) + "..."
                    : section.Description}
                </p>

                <div>
                  <div className="flex justify-between absolute bottom-0 w-3/4 mb-2">
                    <div>
                      {/* <span className="flex gap-1 mb-1">
                        <img
                          src="./../../images/icons/stopwatch.png"
                          alt=""
                          className="w-7 h-7"
                        />{" "}
                        <p className="text-gray-400 self-center">
                          {section.Time}
                        </p>
                      </span> */}

                      <button
                        className="w-[90px] h-[40px] bg-[#8F92A120] rounded-xl"
                        onClick={() => {
                          // if (!questionType) {
                          //   toast.error("Please select a question type first.");
                          //   return;
                          // }
                          dispatch(
                            setCurrentTopic({
                              topic: {
                                ...section,
                                Type: questionType || "mcq",
                              },
                            })
                          );
                          localStorage.setItem(
                            "Details",

                            JSON.stringify({
                              ...section,
                              Type: questionType || "mcq",
                            })
                          );

                          Navigate(
                            `/collage/test/details/${index}?type=topic&question=${questionType}`
                          );
                        }}
                      >
                        Details
                      </button>
                    </div>

                    <button
                      className=" bg-[#00875A85] h-[40px] w-[72px] rounded-xl text-white "
                      onClick={() => addSection(section)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default SelectTests;
