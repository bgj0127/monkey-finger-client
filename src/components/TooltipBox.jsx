import { useRecoilValue } from "recoil";
import { mouseXY, isHover, pointData } from "../recoil/atoms";
import "../styles/TooltipBox.css";

const TooltipBox = () => {
  const xy = useRecoilValue(mouseXY);
  const hover = useRecoilValue(isHover);
  const data = useRecoilValue(pointData);

  return (
    <>
      <div
        id="tooltip-box"
        style={{
          left: xy.x + 10,
          top: xy.y - 10,
          display: hover.hover ? "block" : "none",
        }}
      >
        <div>wpm : {data.wpm}</div>
        <div>acc : {data.acc}</div>
        <br />
        <div>
          mode : {data.mode} {data.mode2 == data.mode ? "" : data.mode2}
        </div>
        <div>language : {data.language}</div>
        <br />
        <div>date : {data.date}</div>
      </div>
    </>
  );
};

export default TooltipBox;
