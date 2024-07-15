import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { initialData } from "../../recoil/atoms";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Tooltip);

function makeArr(i, j) {
  return Array(j - i + 1)
    .fill(i)
    .map((v, i) => v + i);
}

const options = {
  legend: {
    display: true,
  },
  responsive: false,
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  elements: {
    point: {
      pointStyle: "circle",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        stepSize: 10,
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
      },
    },
    ACC: {
      position: "right",
      grid: {
        display: false,
      },
      min: 0,
      max: 100,
      reverse: true,
    },
  },
  animation: {
    duration: 0,
    easing: "easeOutCubic",
  },
};

const ChartComponent = ({ dataType }) => {
  const initial = useRecoilValue(initialData);

  const [chartInfo, setChartInfo] = useState({
    labels: initial["timestamp"] ?? [""],
    datasets: [
      {
        type: "scatter",
        label: "word per minute",
        borderColor: ["#372A15"],
        backgroundColor: "#372A15",
        borderWidth: 2,
        data: [],
        lineTension: 0.3,
      },
    ],
  });
  useEffect(() => {
    setChartInfo({
      labels: makeArr(1, initial["wpm"]?.length ?? 10),

      datasets: [
        {
          type: "scatter",
          label: "Word Per Minute",
          // borderColor: "#372A15",
          backgroundColor: "rgba(55, 42, 21, 0.7)",
          borderWidth: 3,
          data: initial["wpm"],
          lineTension: 0.3,
        },
        {
          type: "scatter",
          label: "Accuracy",
          yAxisID: "ACC",
          // borderColor: "rgba(141, 73, 58)",
          backgroundColor: "rgba(141, 73, 58, 0.7)",
          borderWidth: 3,
          data: initial["acc"],
          lineTension: 0.3,
        },
      ],
    });
  }, [initial]);
  return (
    <div id="chart-item">
      {/* <p className="chart-title">{dataType}</p> */}
      <Chart data={chartInfo} options={options} width="1000px" height="600px"></Chart>
    </div>
  );
};

export default ChartComponent;
