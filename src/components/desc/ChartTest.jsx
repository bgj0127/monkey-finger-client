import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import dummyData from "../../constants/dummyData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip
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
      borderColor: ["#aaa112", "#b24a11"],
      borderWidth: 2,
      data: dummyData,
      lineTension: 0.3,
    },
  ],
};

const options = {
  responsive: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: false,
    },
  },
};

const ChartTest = ({ dataType }) => {
  return (
    <>
      <div>
        <Chart
          data={data}
          options={options}
          width="400px"
          height="400px"
        ></Chart>
        <p>{dataType}</p>
      </div>
    </>
  );
};

export default ChartTest;
