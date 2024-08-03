import Introduce from "../components/desc/Introduce";
import MyProfile from "../components/desc/MyProfile";
import ChartComponent from "../components/desc/ChartComponent";
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
        <ChartComponent />
      </div>
      <div style={{ marginBottom: "5rem" }}></div>
    </div>
  );
};

export default Description;
