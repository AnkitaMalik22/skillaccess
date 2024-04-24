import React, { useState } from "react";
import Chart from "react-apexcharts";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ChartComp = () => {
  const [toggle, setToggle] = useState(5);
  const navigate = useNavigate();
  const [placements, setPlacements] = useState([1, 2, 3, 4, 5, , 9, 9, 6]);
  const [settings, setSettings] = useState({
    options: {
      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "results",
        toolbar: {
          show: false,
        },
      },
      colors: ["#0052CC90", "#00875A90", "#DE350B90"],

      legend: {
        show: false,
        horizontalAlign: "left",
        offsetX: 10,
        offsetY: 10,
      },
      grid: {
        show: true,
        padding: {
          right: 20,
        },
        xaxis: {
          borderColor: "#00FFFFFF",
          lines: {
            show: true, //or just here to disable only x axis grids
          },
        },
        yaxis: {
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
        name: "Total Students Appeared",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 19, 100, 55, 20],
      },
      {
        name: "Total Students Selected",
        data: [5, 15, 55, 50, 69, 70, 74, 96, 100, 55, 33, 77],
      },
    ],
  });
  return (
    <div className="sm:flex  mt-6 bg-gray-100 w-full rounded-lg gap-6 font-dmSans  justify-center relative">
      {/* chart component */}
      <div className="w-full  rounded-s sm:px-6 mt-2">
        <div className="md:p-2 flex justify-between">
          <h2 className="font-extrabold text-lg ">Result Overview</h2>{" "}
          <span className="flex gap-4 text-sm font-bold">
            <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 5 && " text-blue-600 border-b-blue-700"
              }`}
              onClick={() => setToggle(5)}
            >
              Today
            </button>
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

        <div className="3xl:h-[507px] h-96">
          <Chart
            id="results"
            className="bg-white shadow-md mt-2 rounded-lg "
            options={settings.options}
            series={settings.series}
            type="line"
            height={"100%"}
            width={"100%"}
          />
          <div className="flex gap-4 my-4">
            <span className="flex gap-1">
              <FaCircle className="text-[#0052CC90]" />{" "}
              <h2 className="font-bold text-xs">Total Students Appeared</h2>
            </span>
            <span className="flex gap-1">
              <FaCircle className="text-[#00875A90]" />{" "}
              <h2 className="font-bold text-xs">Total Students Selected</h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComp;
