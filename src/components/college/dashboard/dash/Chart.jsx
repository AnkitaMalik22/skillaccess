import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { FaCircle, FaDotCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getPlacedStudents } from "../../../../redux/college/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

const ChartComp = () => {
  const [toggle, setToggle] = useState(0);
  const navigate = useNavigate();
  const [placements, setPlacements] = useState([1, 2, 3, 4, 5, , 9, 9, 6]);
  const [settings, setSettings] = useState({
    options: {
      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "graphData",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
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
          lines: {
            show: true, // Show vertical grid lines
          },
        },
        yaxis: {
          lines: {
            show: false, // Hide horizontal grid lines
          },
        },
      },
      xaxis: {
        borderColor: "#00FFFFFF",
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
      yaxis: {
        labels: {
          show: true,
        },
        lines: {
          show: false, // Hide horizontal grid lines
        },
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

  const dispatch = useDispatch();
  const { placedStudents } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.collegeAuth);
  // //console.log(user);
  useEffect(() => {
    dispatch(getPlacedStudents(user?._id));
  }, []);
  return (
    <div className="sm:flex bg-gray-100 w-full gap-1 justify-between relative rounded-3xl p-4 md:p-8 mb-5">
      {/* chart component */}
      <div className=" w-3/4 ">
        <div className="flex justify-between mb-4 md:mb-8">
          <h2 className="font-bold text-sm 2xl:text-base ">RESULTS OVERVIEW</h2>{" "}
          <span className="flex gap-8 text-sm font-bold">
            <button
              className={`border-2 border-x-transparent border-transparent text-bold ${
                toggle === 0 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(0)}
            >
              Week
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent text-bold ${
                toggle === 1 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(1)}
            >
              Month
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent text-bold ${
                toggle === 2 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(2)}
            >
              Quarter
            </button>
            <button
              className={`border-2 border-x-transparent border-transparent text-bold ${
                toggle === 3 && " text-blued border-b-blue-700"
              }`}
              onClick={() => setToggle(3)}
            >
              Year
            </button>
          </span>
        </div>

        <div className="h-[25rem] w-full ">
          <Chart
            id="dash"
            className="bg-white shadow-md rounded-md text-[#8F92A1] "
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
              <FaCircle className="text-[#11875A]" />{" "}
              <h2 className="font-medium text-sm text-[#8F92A1]">Student</h2>
            </span>
            <span className="flex gap-1">
              <FaCircle className="text-[#5243AA]" />{" "}
              <h2 className="font-medium text-sm text-[#8F92A1]">Placement</h2>
            </span>
          </div>
        </div>
      </div>
      {/* placements */}
      <div className=" sm:w-[20%]  bg-gray-100 rounded-e  mr-2  font-dmSans">
        <span className="flex justify-between sm:px-2 mb-4 md:mb-8 ">
          <h1 className="font-bold text-sm 2xl:text-base text-[#171717]">
            Recent Placements
          </h1>
          <h1
            className="text-blued hover:cursor-pointer text-sm"
            onClick={() => navigate("/college/students")}
          >
            See All
          </h1>
        </span>

        <div className="bg-white  overflow-y-scroll h-[27rem] mb-10 rounded-md ">
          {placedStudents?.map((student) => {
            return (
              <div className="card card-side shadow-sm mb-1 h-auto p-5 gap-2">
                <figure className="w-14 h-14 rounded mt-2">
                  <img src={student?.avatar.url} alt="Movie" />
                </figure>
                <div className="">
                  <p className="text-sm font-bold text-[#171717]">
                    {student.FirstName} {student.LastName}
                  </p>
                  <p className="text-sm text-[#8F92A1]">
                    {student?.CompanyPlaced?.basic?.companyName}
                  </p>
                  <FaStar className="inline-block text-sm 2xl:text-sm text-amber-500" />
                  <p className="inline-block pl-2 text-sm 2xl:text-sm text-[#171717] ">
                    {student?.PlacedAt.substring(0, 9)}
                  </p>
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
