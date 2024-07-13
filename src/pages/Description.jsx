import React from "react";
import Introduce from "../components/desc/Introduce";
import MyProfile from "../components/desc/MyProfile";
import ChartTest from "../components/desc/ChartTest";
import Divider from "../components/Divider";
import "../styles/Description.css";

const Description = () => {
  return (
    <div id="desc-wrap">
      <div id="intro">
        <MyProfile />
        <Introduce />
      </div>
      <Divider />
      <div id="chart">
        <ChartTest dataType="wpm" />
        <ChartTest dataType="acc" />
        <ChartTest dataType="wpm" />
      </div>
    </div>
  );
};

export default Description;
