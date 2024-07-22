import React from "react";
import Introduce from "../components/desc/Introduce";
import MyProfile from "../components/desc/MyProfile";
import ChartComponent from "../components/desc/ChartComponent";
import Divider from "../components/Divider";
import "../styles/Description.css";
import Filter from "../components/desc/Filter";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../services/url";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentFilter, initialData } from "../recoil/atoms";

const Description = () => {
  const setInitialData = useSetRecoilState(initialData);
  const setcurrentFilter = useSetRecoilState(currentFilter);

  useEffect(() => {
    async function fetchData() {
      await axios.get(apiURL + "/default").then((res) => {
        setInitialData(res.data);
      });
    }
    setcurrentFilter({ language: "all", mode: "all" });

    fetchData();
  });

  return (
    <div id="desc-wrap">
      <div id="intro-container">
        <MyProfile />
        <Introduce />
      </div>
      <Divider />
      <Filter />
      <div id="chart-container">
        <ChartComponent />
      </div>
    </div>
  );
};

export default Description;
