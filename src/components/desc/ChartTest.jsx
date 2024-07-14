import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  plugins,
} from "chart.js";
import dummyData from "../../constants/dummyData";
import { atom, useRecoilState } from "recoil";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip
  // plugins
);

function makeArr(i, j) {
  return Array(j - i + 1)
    .fill(i)
    .map((v, i) => v + i);
}

const data = {
  labels: makeArr(1, dummyData.length),
  datasets: [
    {
      type: "scatter",
      label: "Dataset 1",
      borderColor: ["#372A15"],
      backgroundColor: "#372A15",
      borderWidth: 2,
      data: dummyData,
      lineTension: 0.3,
    },
    {
      type: "line",
      label: "Avg",
      data: [
        { x: 1, y: 100 },
        { x: 5, y: 102 },
        { x: 10, y: 98 },
        { x: 15, y: 110 },
      ],
      tension: 0.5,
    },
  ],
};

const options = {
  responsive: false,
  interaction: {
    mode: "nearest",
  },
  elements: {
    point: {
      pointStyle: "crossRot",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const ChartTest = ({ dataType }) => {
  return (
    <div id="chart-item">
      <p className="chart-title">{dataType}</p>
      <Chart data={data} options={options} width="500px" height="350px"></Chart>
    </div>
  );
};

export default ChartTest;
