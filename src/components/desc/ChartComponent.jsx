import { Chart } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { initialData, isHover, mouseXY, pointData } from "../../recoil/atoms";
import NoData from "../NoData";
import TooltipBox from "../TooltipBox";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Legend
);

function makeArr(i, j) {
  return Array(j - i + 1)
    .fill(i)
    .map((v, i) => v + i);
}

const ChartComponent = () => {
  const initial = useRecoilValue(initialData);
  const setXY = useSetRecoilState(mouseXY);
  const setIsHover = useSetRecoilState(isHover);
  const setPointData = useSetRecoilState(pointData);
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
    function getAvg(d) {
      let l = [];
      for (let i = 0; i <= d.length + 1; i += 5) {
        let tmp =
          d.slice(i, i + 5).reduce((p, c) => p + c, 0) /
          d.slice(i, i + 5).length;
        l.push({ x: i, y: tmp });
      }
      return l;
    }
    setChartInfo({
      labels: makeArr(1, initial["wpm"]?.length ?? 10),
      datasets: [
        {
          type: "scatter",
          label: "Word Per Minute",
          backgroundColor: "rgba(55, 42, 21, 0.7)",
          borderWidth: 3,
          data: initial["wpm"],
          lineTension: 0.3,
        },
        {
          type: "line",
          label: "avg",
          backgroundColor: "rgba(55, 42, 21, 0.5)",
          borderColor: "rgba(55, 42, 21, 0.5",
          borderWidth: 5,
          data: getAvg(initial["wpm"] ?? []),
          lineTension: 0.5,
          pointStyle: false,
        },
        {
          type: "scatter",
          label: "Accuracy",
          yAxisID: "ACC",
          backgroundColor: "rgba(141, 73, 58, 0.7)",
          borderWidth: 3,
          data: initial["acc"],
          lineTension: 0.3,
          pointStyle: "triangle",
        },
        {
          type: "line",
          label: "avg",
          yAxisID: "ACC",
          backgroundColor: "rgba(141, 73, 58, 0.7)",
          borderColor: "rgba(141, 73, 58, 0.7)",
          borderWidth: 3,
          data: getAvg(initial["acc"] ?? []),
          lineTension: 0.3,
          pointStyle: false,
        },
      ],
    });
  }, [initial]);

  const dateFormat = (date) => {
    return date + 1 > 9 ? date + 1 : "0" + (date + 1);
  };

  const chartOptions = {
    interaction: {
      mode: "point",
      intersect: false,
    },
    plugins: {
      interaction: {
        mode: "point",
      },
      tooltip: {},
      legend: {
        display: true,
        position: "top",
      },
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
        label: {
          display: true,
        },
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
    onHover: (e, element) => {
      if (element.length > 0) {
        const index = element[0].index;
        initial["time"][index];
        let date = new Date(Number(initial["time"][index]));
        setPointData({
          wpm: initial["wpm"][index],
          acc: initial["acc"][index],
          mode: initial["mode"][index],
          mode2: initial["mode2"][index],
          language: initial["language"][index],
          date:
            date.getFullYear() +
            "-" +
            dateFormat(date.getMonth()) +
            "-" +
            dateFormat(date.getDate()) +
            " / " +
            dateFormat(date.getHours()) +
            ":" +
            dateFormat(date.getMinutes()),
        });

        setIsHover({ hover: true });
        setXY({ x: e.native.clientX, y: e.native.clientY });
      }
    },
  };
  return (
    <div id="chart-item">
      {initial.wpm?.length ? (
        <>
          <Chart
            data={chartInfo}
            options={chartOptions}
            width="1100px"
            height="600px"
            onMouseLeave={() => {
              setIsHover({ hover: false });
            }}
          />
          <TooltipBox />
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default ChartComponent;
