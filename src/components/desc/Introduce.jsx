import { ReactTyped } from "react-typed";
import typingList from "../../constants/typingWords";

const Introduce = () => {
  return (
    <div>
      <h3>Welcome to My Personal Study Project</h3>
      <h1>Monkey Finger</h1>
      <br />
      <div id="desc">
        <ReactTyped strings={typingList} typeSpeed={30} shuffle={true} fadeOut fadeOutDelay={2000} loop />
      </div>
    </div>
  );
};

export default Introduce;
