import React, { useState } from "react";
import Header from "../../../components/collage/test/assessment/Header";
import { FaFolder } from "react-icons/fa";
import { ImFileText } from "react-icons/im";
import { LiaStopwatchSolid } from "react-icons/lia";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../../hooks/useTranslate";

const Assessment = () => {
  useTranslate();
  const navigate = useNavigate();
  const assessment = JSON.parse(localStorage.getItem("assessment"));
  const [settings, setSettings] = useState({
    options: {
      chart: {
        background: "",
      },
      colors: ["#0052CC90", "#00875A90", "#DE350B90"],
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          donut: {
            labels: {
              show: false,
              name: {
                show: false,
              },
              value: {
                show: false,
              },
              total: {
                show: false,
              },
            },
          },
        },
      },
      legend: {
        show: false,
      },
      series: [44, 55, 13],
      labels: ["Total Students Applied", "Shortlisted", "Attempted for Exam"],
      formatter: function (val) {
        return val + "%";
      },
    },
  });
  console.log(assessment);
  const handleCalculateTime = () => {
    const topicTimes = assessment.topics.reduce((acc, topic) => {
      const existingIndex = acc.findIndex(
        (item) => item.type === topic.Type && item.Heading === topic.Heading
      );
      let totalMcq = 0,
        totalEssay = 0,
        totalVideo = 0,
        totalCompiler = 0,
        totalFindAnswer = 0;

      if (topic.Type === "essay") {
        totalEssay = topic.essay?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "video") {
        totalVideo = topic.video?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "compiler") {
        totalCompiler = topic.compiler?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }
      if (topic.Type === "findAnswer") {
        totalFindAnswer = topic.findAnswers?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (topic.Type === "mcq") {
        totalMcq = topic.questions?.reduce((acc, curr) => {
          return acc + parseInt(curr.Duration);
        }, 0);
      }

      if (existingIndex !== -1) {
        // If entry exists, add to existing total
        acc[existingIndex].total +=
          totalMcq + totalEssay + totalVideo + totalCompiler + totalFindAnswer;
      } else {
        // If entry doesn't exist, push a new entry
        acc.push({
          type: topic.Type,
          Heading: topic.Heading,
          total:
            totalMcq +
            totalEssay +
            totalVideo +
            totalCompiler +
            totalFindAnswer,
        });
      }

      return acc;
    }, []);

    return topicTimes;
  };
  const totalTime = handleCalculateTime();
  console.log(totalTime);
  return (
    <>
      <Header name={assessment.name} />
      <div className="flex gap-2 mx-auto mb-5 ">
        <FaFolder className="text-blued w-5 h-5" />
        <h2 className="text-xs">Beginner Level</h2>
      </div>

      <h2 className="flex gap-2  mx-auto p-3 bg-gray-100 mb-5  rounded-lg tracking-wide">
        Create the first things for your platform
      </h2>

      <div className="  mx-auto rounded-lg tracking-wide justify-between flex font-dmSans gap-5">
        <div className="w-1/2 ">
          {assessment?.topics?.map((topic, index) => (
            <div className="w-full  mb-5 gap-x-10 gap-y-3 p-3 bg-gray-100 rounded-2xl border border-blued h-28">
              {" "}
              {/* heading */}
              <div className="flex justify-between px-4 ">
                <h2 className="self-center text-xs capitalize">
                  {topic.Heading}
                </h2>
                <span className="flex gap-1">
                  <ImFileText className="text-blued self-center " />
                  <p className="self-center text-xs text-gray-500   sm:text-sm">
                    {topic.Type === "mcq" && "Multiple Choice Questions"}
                    {topic.Type === "findAnswer" && "Comprehension"}
                    {topic.Type === "compiler" && "Code"}
                    {topic.Type === "essay" && "Essay"}
                    {topic.Type === "video" && "Video"}
                  </p>
                </span>
                <div className="flex gap-1 ">
                  <LiaStopwatchSolid className="self-center text-gray-500 w-5 h-5" />
                  <p className="text-gray-400 text-xs self-center">
                    {
                      totalTime.find(
                        (timeObj) =>
                          timeObj.type === topic.Type &&
                          timeObj.Heading === topic.Heading
                      )?.total
                    }{" "}
                    mins
                  </p>
                </div>
              </div>
              {/* type */}
              {/* cross */}
              {/* <div className="col-span-1  flex justify-center">
                <RxCross1 className="self-center text-red-600 w-5 h-5" />
              </div> */}
              {/* desc */}
              <div className="flex px-4 justify-between mt-4 text-xs font-normal text-gray-400 ">
                <p className="line-clamp-2 first-letter:uppercase">
                  {topic.Description}
                </p>
                <button
                  className="self-center justify-center bg-gray-200 p-2 rounded-lg text-xs hover:bg-blue-500 hover:text-white"
                  onClick={() =>
                    navigate(
                      `/collage/test/details/${index}?question=${topic.Type}&type=assessment&view=false`
                    )
                  }
                >
                  Details
                </button>
              </div>
              {/* details */}
              {/* edit */}
              {/* <div className="col-span-1  flex justify-center">
                <PiPencilSimpleLine
                  className="self-center text-blued w-5 h-5"
                  onClick={() =>
                    navigate(
                      `/collage/test/details/${index}?question=${topic.Type}&type=assessment`
                    )
                  }
                />
              </div> */}
            </div>
          ))}
        </div>

        <div className="  hidden md:block w-1/2 ">
          <div className=" !rounded-lg  ">
            {/* 
            
            */}
            <div className="bg-gray-100 rounded-2xl p-2 mb-6">
              <div className="flex justify-between px-2 font-bold text-base ">
                <h2>Number of Student Placed</h2>{" "}
                <h2 className="text-sm text-gray-400">Updated 5 min ago</h2>
              </div>
              <div className="flex">
                <div className=" relative w-80 h-60">
                  <Chart
                    className="bg-gray-100 rounded-lg"
                    options={settings.options}
                    series={settings.options.series}
                    type="donut"
                    width={"100%"}
                    responsive={[
                      {
                        breakpoint: 500,

                        options: {},
                      },
                    ]}
                  />{" "}
                  <h2 className="absolute top-[45%] left-[46%] font-bold text-xl">
                    560
                  </h2>
                  <h2 className="absolute top-[55%] left-[46%] font-bold text-gray-400">
                    Total
                  </h2>
                </div>
                {/* labels */}
                <div className="self-center">
                  <div className="flex gap-1 ">
                    <div className="w-4 h-4 rounded-full bg-[#0052CC] opacity-60"></div>{" "}
                    <h2 className="text-xs font-bold text-[#7F7F7F]">
                      Total Students Applied
                    </h2>
                  </div>
                  <div className="flex gap-1 mt-2 ">
                    <div className="w-4 h-4 rounded-full bg-[#00875A] opacity-60"></div>{" "}
                    <h2 className="text-xs font-bold text-[#7F7F7F]">
                      Shortlisted
                    </h2>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <div className="w-4 h-4 rounded-full bg-[#DE350B] opacity-60"></div>{" "}
                    <h2 className="text-xs font-bold text-[#7F7F7F]">
                      Attempted for Exam
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-2 mt-2">
              <span className="flex justify-between px-2 font-bold text-base ">
                <h2>Total Attempts</h2>{" "}
                <input
                  type="date"
                  className="rounded-lg focus:outline-none  border-none text-blue-500 "
                />
              </span>
              <div className="w-full h-60">
                <Chart
                  className="bg-gray-100 rounded-lg mt-2"
                  options={{
                    chart: {
                      type: "bar",
                      toolbar: {
                        show: false,
                      },
                    },

                    series: [
                      {
                        data: [
                          {
                            x: "category A",
                            y: 10,
                          },
                          {
                            x: "category B",
                            y: 18,
                          },
                          {
                            x: "category C",
                            y: 13,
                          },
                        ],
                      },
                    ],
                  }}
                  series={[
                    {
                      data: [23, 34, 12, 54, 32, 43],
                    },
                  ]}
                  type="bar"
                  height={"100%"}
                  width={"100%"}
                  responsive={[
                    {
                      breakpoint: 500,

                      options: {},
                    },
                  ]}
                />
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>

      {/* larger screens */}
    </>
  );
};

export default Assessment;
