import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isCompany from "../../../../util/isCompany";

const ChartComp = () => {
  const { year } = useSelector((state) => {if(isCompany()){
    return state.companyResult.graph
  }else{
    return state.result.graph;
  }});
  const [students, setStudents] = useState({ placed: [], appeared: [] });
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
  useEffect(() => {
    const newPlaced = [];
    const newAppeared = [];

    year.forEach((month) => {
      newPlaced.push(month.totalPlaced);
      newAppeared.push(month.totalAppearedCount);
    });

    setStudents((prev) => ({
      ...prev,
      placed: newPlaced,
      appeared: newAppeared,
    }));
  }, [year]);
  return (
    <div className="sm:flex  bg-gray-100 w-full rounded-lg gap-6 font-dmSans  justify-center relative">
      {/* chart component */}
      <div className="w-full  rounded-s p-5 mt-2">
        <div className="flex justify-between">
          <h2 className="font-extrabold text-lg mb-5 ">Result Overview</h2>{" "}
          <span className="flex gap-4 text-sm font-bold">
            {/* <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 5 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(5)}
            >
              Today
            </button>
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
            </button> */}
            {/* <button
              className={`border-2 border-x-transparent border-transparent ${
                toggle === 3 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(3)}
            >
              Year
            </button> */}
          </span>
        </div>

        <div>
          <div className="3xl:h-[507px] h-96 mb-5">
            {year && (
              <Chart
                id="results"
                className="bg-white shadow-md mt-2 rounded-lg "
                options={settings.options}
                series={[
                  {
                    name: "Total Students Appeared",
                    data: students.appeared,
                  },
                  {
                    name: "Total Students Selected",
                    data: students.placed,
                  },
                ]}
                type="line"
                height={"100%"}
                width={"100%"}
              />
            )}
          </div>
          <div className="flex gap-4">
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
