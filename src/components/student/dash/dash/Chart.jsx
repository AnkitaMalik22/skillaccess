import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ChartComp = () => {
  const [toggle, setToggle] = useState(0);
  const navigate = useNavigate();
  const [placements, setPlacements] = useState([1, 2, 3, 4, 5, , 9, 9, 6]);
  const [settings, setSettings] = useState({
    options: {
      stroke: {
        curve: "smooth",
      },
      responsive: [
        {
          breakpoint: 400,

          options: {
            chart: {
              height: 300,
            },
            grid: {
              padding: {
                right: 0,
              },
            },
          },
        },
      ],
      chart: {
        id: "dash",
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
        horizontalAlign: "left",
        offsetX: 10,
        offsetY: 10,
      },
      grid: {
        show: true,
        padding: {
          left: 50,
          right: 20,
        },
        xaxis: {
          borderColor: "#00FFFFFF",
          lines: {
            show: true, //or just here to disable only x axis grids
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          lines: {
            show: false, //or just here to disable only y axis
          },
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "Placements",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 19, 100, 55, 20],
      },
      {
        name: "Students",
        data: [5, 15, 55, 50, 69, 70, 74, 96, 100, 55, 33, 77],
      },
    ],
  });
  return (
    <div className="sm:flex  mt-6 bg-gray-100 w-full rounded-lg gap-1 gird  justify-between relative">
      {/* chart component */}
      <div className=" w-[65%] rounded-s sm:px-6 mt-2">
        <div className="md:p-2 flex justify-between">
          <h2 className="font-extrabold text-lg ">RESULTS OVERVIEW</h2>{" "}
          <span className="flex gap-8 text-sm font-bold">
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 0 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(0)}
            >
              Week
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 1 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(1)}
            >
              Month
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 2 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(2)}
            >
              Quarter
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 3 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(3)}
            >
              Year
            </button>
          </span>
        </div>

        <div className="h-[25rem] w-[52vw] ml-2">
          <Chart
            id="dash"
            className="bg-white shadow-md mt-2 rounded-lg  "
            options={settings.options}
            series={settings.series}
            type="line"
            height={"100%"}
            width={"100%"}
            responsive={[
              {
                breakpoint: 500,

                options: {},
              },
            ]}
          />
          <div className="flex gap-4 my-4">
            <span className="flex gap-1">
              <FaCircle className="text-lightBlue" />{" "}
              <h2 className="font-bold text-xs">Placements</h2>
            </span>
            <span className="flex gap-1">
              <FaCircle className="text-green-400" />{" "}
              <h2 className="font-bold text-xs">Students</h2>
            </span>
          </div>
        </div>
      </div>
      {/* placements */}
      <div className=" sm:w-[25%]  bg-gray-100 rounded-e  mr-2  font-dmSans">
        <span className="flex justify-between sm:px-2 mb-4 mt-4 ">
          <h1 className="font-extrabold text-lg ">Recent Placements</h1>
          <h1
            className="text-blued hover:cursor-pointer"
            onClick={() => navigate("/student/dashboard/assessment")}
          >
            See All
          </h1>
        </span>

        <div className="bg-white  overflow-y-scroll h-[27rem] mb-10 rounded-lg flex flex-col gap-4 ">
          {placements?.map((placement) => {
            return (
              <div className="card card-side !rounded-none shadow-sm mb-1  p-4 flex justify-between  border-b-2">
                <div>
                  <h2 className="font-bold mb-2">UI/UX Designer</h2>
                  <h2 className="text-gray-400 mb-4">Due on 05/12/22</h2>
                  <button className="bg-gray-100 rounded-lg px-2 py-3 text-blued">
                    Start Assessment
                  </button>
                </div>
                <div className="">
                  <h2 className="text-green-600 mb-2">Completed</h2>
                  <span className="flex gap-2 mb-4">
                    <div className="min-w-[4rem] bg-opacity-5 rounded-lg h-3 mx-auto bg-green-600">
                      <div
                        className={`w-3/5 bg-green-700 h-full rounded-lg`}
                      ></div>
                    </div>
                    <h2 className="font-dmSans font-bold text-xs sm:text-xs ">
                      {" "}
                      70%
                    </h2>
                  </span>
                  <button className="mt-2 rounded-lg px-2 py-3  text-blued">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChartComp;
