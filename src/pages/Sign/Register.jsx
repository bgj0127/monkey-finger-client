import "../../styles/Sign.css";
import CustomInput from "../../components/sign/CustomInput";
import { Link } from "react-router-dom";
import VirtualKeyboard from "../../components/keyboard/VirtualKeyboard";
import { useRecoilValue } from "recoil";
import { signData } from "../../recoil/atoms";
import { useEffect, useState } from "react";
import { getCookie } from "../../services/cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../services/url";
import { SyncLoader } from "react-spinners";
import ServiceInfo from "../../components/sign/ServiceInfo";

const Register = () => {
  const navigate = useNavigate();
  const inputData = useRecoilValue(signData);
  const [errorText, setErrorText] = useState("");
  const [isAwait, setIsAwait] = useState(false);

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
    // 서버 통신
    const register = async () => {
      setIsAwait(true);

      await axios
        .post(apiURL + "/user/register", { user_id: userId, user_pw: userPw })
        .then((res) => {
          if (res.data.status_code === 200) {
            setIsAwait(false);
            navigate("/login");
          }
        })
        .catch((e) => {
          if (e.response?.status === 409) {
            setErrorText("이미 존재하는 아이디 입니다.");
          } else {
            setErrorText("오류가 발생했어요. 잠시 후 다시 시도해주세요.");
          }
        })
        .finally(() => {
          setIsAwait(false);
        });
    };
    register();
  };
  useEffect(() => {
    if (getCookie("userId") !== undefined) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="form_container">
        <ServiceInfo />
        <h2>Welcome</h2>
        {isAwait && (
          <SyncLoader color="rgb(122,111,98" size={10} speedMultiplier="0.5" style={{ position: "absolute" }} />
        )}
        <div className="sep" />
        <CustomInput name="userId" type="text" use="아이디" />
        <CustomInput name="userPw" type="password" use="비밀번호 (8~30자)" />
        <CustomInput name="checkPw" type="password" use="비밀번호 확인" submit={submit} />
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
