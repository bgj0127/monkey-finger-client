import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "../pages/Description";
import About from "../pages/About";
import Register from "../pages/Sign/Register";
import Login from "../pages/Sign/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Description />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
