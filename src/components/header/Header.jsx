import { Link } from "react-router-dom";
import "../../styles/Header.css";
import { delCookie } from "../../services/cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navgitate = useNavigate();
  return (
    <div id="header">
      <Link to="/about" className="link">
        About
      </Link>
      <Link to="/" className="link">
        Home
      </Link>
      <div
        id="logout_btn"
        onClick={() => {
          delCookie("access_token");
          navgitate("/login");
        }}
      ></div>
    </div>
  );
};

export default Header;
