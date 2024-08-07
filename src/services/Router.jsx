import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "../pages/Description";
import About from "../pages/About";
import Register from "../pages/Sign/Register";
import Login from "../pages/Sign/Login";
import Layout from "./Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Description />} />
          <Route exact path="/about" element={<About />} />
        </Route>

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
