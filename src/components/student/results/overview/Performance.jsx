import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./chart.css";

const Performance = () => {
  const [settings, setSettings] = useState({
    options: {
      columnWidth: "30%",
      dataLabels: {
        enabled: false,
      },
      stroke: {
        colors: ["transparent"],
        width: 5,
      },
      chart: {
        id: "results",
        toolbar: {
          show: false,
        },
      },
      colors: ["", "#6394DD", "#63B499", "#FCBF76", "#E8836A"],
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
          borderColor: "#8F92A1",
          labels: {
            show: false,
          },
          lines: {
            show: false, //or just here to disable only y axis
          },
        },
        yaxis: {
          axisBorder: {
            show: true,
            color: "#8F92A1",
            offsetX: 100,
            offsetY: 100,
          },
          borderColor: "#8F92A1",
          labels: {
            show: false,
          },
          lines: {
            show: true, //or just here to disable only y axis
          },
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
          color: "#8F92A1",
          offsetX: 37,
          offsetY: -1,
        },
        tickAmount: 6,
      },
      xaxis: {
        axisBorder: {
          show: true,
          color: "#8F92A1",
          offsetX: 0,
          offsetY: 0,
        },
        categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      },
    },
    series: [
      {
        name: "",
        data: [0],
      },
      {
        name: "Candidates Appeared",
        data: [30, 40, 45, 50, 1200],
      },
      {
        name: "Approved Candidates",
        data: [5, 15, 55, 50, 200],
      },
      {
        name: "Disapproved Candidates",
        data: [15, 25, 45, 60, 79],
      },
      {
        name: "Absent",
        data: [55, 15, 55, 50, 69],
      },
      {
        name: "",
        data: [0],
      },
    ],
  });
  return (
    <div>
      {" "}
      <div className="bg-gray-100 rounded-2xl p-2 mb-6">
        <div className="flex gap-4">
          <div className=" relative w-5/6 h-60 bg-white rounded-3xl">
            <Chart
              series={settings.series}
              options={settings.options}
              height={"100%"}
              type="bar"
            />
          </div>
          {/* labels */}
          <div className="self-center">
            <div className="flex gap-1 ">
              <div className="w-3 h-3 rounded-full bg-[#6394DD] "></div>{" "}
              <h2 className="text-sm font-bold text-[#7F7F7F]">
                Candidates Appeared
              </h2>
            </div>
            <div className="flex gap-1 mt-2 ">
              <div className="w-3 h-3 rounded-full bg-[#63B499]"></div>{" "}
              <h2 className="text-sm font-bold text-[#7F7F7F]">
                Approved Candidates
              </h2>
            </div>

            <div className="flex gap-1 mt-2">
              <div className="w-3 h-3 rounded-full bg-[#FCBF76]"></div>{" "}
              <h2 className="text-sm font-bold text-[#7F7F7F]">
                Disapproved Candidates
              </h2>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="w-3 h-3 rounded-full bg-[#E8836A]"></div>{" "}
              <h2 className="text-sm font-bold text-[#7F7F7F]">Absent</h2>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Performance;
