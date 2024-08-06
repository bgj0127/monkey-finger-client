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
    const userId = inputData.userId;
    const userPw = inputData.userPw;
    const checkPw = inputData.checkPw;

    setErrorText("");
    if (userId.length * userPw.length * checkPw.length === 0) return;
    if (userPw.length < 8) {
      setErrorText("비밀번호는 8자 이상 입력해주세요.");
      return;
    }
    if (userPw !== checkPw) {
      setErrorText("비밀번호를 확인하세요.");
      return;
    }
  };
  return (
    <>
      <div className="form_container">
        <h2>Welcome</h2>
        <div className="sep" />
        <CustomInput name="userId" type="text" use="id" />
        <CustomInput name="userPw" type="password" use="password (8~30자)" />
        <CustomInput name="checkPw" type="password" use="check password" />
        <div style={{ color: "red" }}>{errorText}</div>
        <Link to="/login" className="sign_text">
          계정이 있으신가요?
        </Link>
        <br />
        <button onClick={submit}>계정 생성</button>
      </div>
      <VirtualKeyboard />
    </>
  );
};

export default Register;
