import "../../styles/Sign.css";
import CustomInput from "../../components/sign/CustomInput";
import { Link } from "react-router-dom";
import VirtualKeyboard from "../../components/keyboard/VirtualKeyboard";
import { useRecoilValue } from "recoil";
import { signData } from "../../recoil/atoms";
import { useState } from "react";

const Register = () => {
  const inputData = useRecoilValue(signData);
  const [errorText, setErrorText] = useState("");

  const submit = () => {
    setErrorText("");
    if (inputData.userId.length * inputData.userPw.length * inputData.checkPw.length === 0) return;
    if (inputData.userPw !== inputData.checkPw) {
      setErrorText("비밀번호를 확인하세요.");
      return;
    }
    console.log(inputData.userId);
    console.log(inputData.userPw);
    console.log(inputData.checkPw);
  };
  return (
    <>
      <div className="form_container">
        <h2>Welcome</h2>
        <div className="sep" />
        <CustomInput name="userId" type="text" use="id" />
        <CustomInput name="userPw" type="password" use="password" />
        <CustomInput name="checkPw" type="password" use="check password" />
        <div style={{ color: "red" }}>{errorText}</div>
        <Link to="/login" className="sign_text">
          로그인 하러가기
        </Link>
        <br />
        <button onClick={submit}>계정 생성</button>
      </div>
      <VirtualKeyboard />
    </>
  );
};

export default Register;
