import "../../styles/Keyboard.css";
import { numberKeyItems, firstKeyItems, secondKeyItems, thirdKeyItems } from "../../constants/keyboardItems";

const VirtualKeyboard = () => {
  return (
    <>
      <div id="keyboard_container">
        <div className="keyItem_container">
          {numberKeyItems.map((v, i) => {
            return <div className={`key_${v} key_item`} key={v + i}></div>;
          })}
        </div>
        <div className="keyItem_container">
          {firstKeyItems.map((v, i) => {
            return <div className={`key_${v} key_item`} key={v + i}></div>;
          })}
        </div>
        <div className="keyItem_container">
          {secondKeyItems.map((v, i) => {
            return <div className={`key_${v} key_item`} key={v + i}></div>;
          })}
        </div>
        <div className="keyItem_container">
          {thirdKeyItems.map((v, i) => {
            return <div className={`key_${v} key_item`} key={v + i}></div>;
          })}
        </div>
      </div>
    </>
  );
};

export default VirtualKeyboard;
