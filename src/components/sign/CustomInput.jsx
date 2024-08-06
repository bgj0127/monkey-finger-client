import { useRecoilState } from "recoil";
import { signData } from "../../recoil/atoms";
import { useEffect } from "react";

const CustomInput = (props) => {
  const [inputData, setInputData] = useRecoilState(signData);
  const handleInputValue = (e) => {
    e.preventDefault();
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setInputData({ ...inputData, [inputName]: inputValue });
  };

  const downKey = (e) => {
    const curKey = document.getElementsByClassName(`key_${e.key.toLowerCase()}`)[0];
    if (curKey) curKey.classList.add("press");
  };

  const upKey = (e) => {
    const curKey = document.getElementsByClassName(`key_${e.key.toLowerCase()}`)[0];
    if (curKey) curKey.classList.remove("press");
  };

  useEffect(() => {
    setInputData({
      userId: "",
      userPw: "",
      checkPw: "",
    });
  }, []);

  return (
    <>
      <div className="input_container">
        <input
          type={props.type}
          name={props.name}
          onChange={handleInputValue}
          onKeyDown={downKey}
          onKeyUp={upKey}
          value={inputData[props.name]}
          placeholder={props.use}
          maxLength={20}
        />
      </div>
    </>
  );
};

export default CustomInput;
