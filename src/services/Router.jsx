import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "../pages/Description";
import About from "../pages/About";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Description />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
