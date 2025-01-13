import React from "react";
import Chart from "react-apexcharts";

const PerformanceChart = ({
  chartData,
  chartCategories,
  chartLabels,
  loading,
}) => {
  const settings = {
    chart: {
      id: "performance-chart",
      type: "bar",
      toolbar: { show: false },
      height: "100%",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 6,
      },
    },
    colors: ["#6394DD", "#63B499", "#FCBF76", "#E8836A"],
    dataLabels: { enabled: false },
    stroke: { width: 3, colors: ["transparent"] },
    grid: {
      show: true,
      padding: { left: 50, right: 20 },
      xaxis: { show: false },
      yaxis: { show: true, labels: { show: false } },
    },
    legend: { show: true, horizontalAlign: "left" },
    xaxis: {
      categories: chartCategories || [
        "Day 1",
        "Day 2",
        "Day 3",
        "Day 4",
        "Day 5",
      ],
    },
    yaxis: {
      tickAmount: 6,
    },
  };

  const renderChart = () => {
    return (
      <Chart
        series={chartData || settings.series}
        options={settings}
        type="bar"
        height="100%"
      />
    );
  };

  const renderLabels = () => {
    return chartLabels?.map(({ color, label }, index) => (
      <div key={index} className="flex gap-1 mt-2">
        <div
          className={`w-3 h-3 rounded-full`}
          style={{ backgroundColor: color }}
        ></div>
        <h2 className="text-sm font-bold text-[#7F7F7F]">{label}</h2>
      </div>
    ));
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-4 mb-6">
      <div className="flex gap-4">
        <div className="relative w-5/6 h-60 bg-white rounded-3xl shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              Loading...
            </div>
          ) : (
            renderChart()
          )}
        </div>

        <div className="self-center">{renderLabels()}</div>
      </div>
    </div>
  );
};

export default PerformanceChart;
