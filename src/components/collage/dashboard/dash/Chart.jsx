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
        name: "Students",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 19, 100, 55, 20],
      },
      {
        name: "Placements",
        data: [5, 15, 55, 50, 69, 70, 74, 96, 100, 55, 33, 77],
      },
    ],
  });
  return (
    <div className="sm:flex  mt-6 bg-gray-100 w-full rounded-lg gap-1 justify-center relative">
      {/* chart component */}
      <div className=" w-3/4  rounded-s sm:px-6 mt-2">
        <div className="md:p-2 flex justify-between">
          <h2 className="font-extrabold text-lg ">RESULTS OVERVIEW</h2>{" "}
          <span className="flex gap-8 text-sm font-bold">
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 0 && " text-blue-600 border-b-blue-700"
              }`}
              onClick={() => setToggle(0)}
            >
              Week
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 1 && " text-blue-600 border-b-blue-700"
              }`}
              onClick={() => setToggle(1)}
            >
              Month
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 2 && " text-blue-600 border-b-blue-700"
              }`}
              onClick={() => setToggle(2)}
            >
              Quarter
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 3 && " text-blue-600 border-b-blue-700"
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
              <FaCircle className="text-blue-400" />{" "}
              <h2 className="font-bold text-xs">Students</h2>
            </span>
            <span className="flex gap-1">
              <FaCircle className="text-green-400" />{" "}
              <h2 className="font-bold text-xs">Placements</h2>
            </span>
          </div>
        </div>
      </div>
      {/* placements */}
      <div className=" sm:w-[20%]  bg-gray-100 rounded-e  mr-2  font-dmSans">
        <span className="flex justify-between sm:px-2 mb-4 mt-4 ">
          <h1 className="font-extrabold text-lg ">Recent Placements</h1>
          <h1
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => navigate("/collage/dashboard/students")}
          >
            See All
          </h1>
        </span>

        <div className="bg-white  overflow-y-scroll h-[27rem] mb-10 rounded-lg ">
          {placements?.map((placement) => {
            return (
              <div className="card card-side shadow-sm mb-1 h-20 p-2 ">
                <figure className="w-14 h-14 rounded mt-2">
                  <img
                    src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="ml-2">
                  <h2 className=""></h2>
                  <p className="text-base">name</p>
                  <p className="text-xs text-gray-400">company</p>
                  <FaStar className="inline-block text-sm text-amber-500" />
                  <p className="inline-block pl-2 text-sm ">date</p>
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
