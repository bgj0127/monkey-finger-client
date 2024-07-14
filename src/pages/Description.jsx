import React from "react";
import Introduce from "../components/desc/Introduce";
import MyProfile from "../components/desc/MyProfile";
import ChartTest from "../components/desc/ChartTest";
import Divider from "../components/Divider";
import "../styles/Description.css";
import Filter from "../components/desc/Filter";

const Description = () => {
  return (
    <div id="desc-wrap">
      <div id="intro-container">
        <MyProfile />
        <Introduce />
      </div>
      <Divider />
      <Filter />
      <div id="chart-container">
        <ChartTest dataType="타자속도" />
        <ChartTest dataType="정확도" />
      </div>
    </div>
  );
};

export default Description;
