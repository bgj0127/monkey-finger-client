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
import { atom, useRecoilState } from "recoil";

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
      borderColor: ["#372A15"],
      backgroundColor: "#372A15",
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
  },
};

const ChartTest = ({ dataType }) => {
  return (
    <>
      <div>
        <p>{dataType}</p>

        <Chart
          data={data}
          options={options}
          width="500px"
          height="350px"
        ></Chart>
      </div>
    </>
  );
};

export default ChartTest;
