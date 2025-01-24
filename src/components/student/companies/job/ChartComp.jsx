import React, { useState } from "react";
import Chart from "react-apexcharts";

const ChartComp = () => {
  const [settings, setSettings] = useState({
    options: {
      chart: {
        background: "",
      },

      plotOptions: {
        pie: {
          dataLabels: { enabled: false },
          donut: {
            labels: {
              show: false,
              name: {
                show: true,
                offsetY: 40,
              },
              value: {
                offsetY: -10,
                show: true,
              },

              total: {
                show: false,
              },
            },
          },
        },
      },
      legend: {
        offsetY: 100,
      },

      series: [48, 16, 33],
      labels: ["Total Students Applied", "Shortlisted", "Attempted for exam"],
      formatter: function (val) {
        return val + "%";
      },
    },
  });
  return (
    <div className="relative">
      <Chart
        className="bg-gray-100 rounded-md"
        options={settings.options}
        series={settings.options.series}
        type="donut"
        height={400}
        width={"100%"}
        responsive={[
          {
            breakpoint: 500,

            options: {},
          },
        ]}
      />
      <h2 className="absolute top-[45%] left-[29%] font-bold text-xl">560</h2>
      <h2 className="absolute top-[55%] left-[30%] font-bold text-gray-400">
        Total
      </h2>
    </div>
  );
};

export default ChartComp;
