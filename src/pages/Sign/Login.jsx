import "../../styles/Sign.css";
import CustomInput from "../../components/sign/CustomInput";
import { Link } from "react-router-dom";
import { signData } from "../../recoil/atoms";
import VirtualKeyboard from "../../components/keyboard/VirtualKeyboard";
import { useRecoilValue } from "recoil";

const Register = () => {
  const inputData = useRecoilValue(signData);
  const submit = () => {
    if (inputData.userId.length <= 0 || inputData.userPw.length <= 0) return;
    console.log(inputData.userId);
    console.log(inputData.userPw);
  };
  return (
    <>
      <div className="form_container">
        <h2>Login</h2>
        <div className="sep" />
        <CustomInput name="userId" type="text" use="id" />
        <CustomInput name="userPw" type="password" use="password" />
        <Link to="/register" className="sign_text">
          신규 회원이신가요?
        </Link>
        <br />
        <button onClick={submit}>로그인</button>
      </div>
      <VirtualKeyboard />
    </>
  );
};

export default Register;
