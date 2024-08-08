import "../../styles/Sign.css";
import CustomInput from "../../components/sign/CustomInput";
import { Link } from "react-router-dom";
import { signData } from "../../recoil/atoms";
import VirtualKeyboard from "../../components/keyboard/VirtualKeyboard";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { apiURL } from "../../services/url";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../services/cookie";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import ServiceInfo from "../../components/sign/ServiceInfo";

const Register = () => {
  const navigate = useNavigate();
  const inputData = useRecoilValue(signData);
  const [isAwait, setIsAwait] = useState(false);
  const [errorText, setErrorText] = useState("");
  const submit = () => {
    setErrorText("");
    if (inputData.userId.length <= 0 || inputData.userPw.length <= 0) return;
    if (inputData.userPw.length < 8) {
      setErrorText("비밀번호는 8자 이상 입력해주세요.");
      return;
    }
    const login = async () => {
      setIsAwait(true);
      const formData = new FormData();
      formData.append("username", inputData.userId);
      formData.append("password", inputData.userPw);
      await axios({
        method: "POST",
        url: apiURL + "/user/login",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((res) => {
          setCookie("access_token", res.data.access_token);
          setCookie("refresh_token", res.data.refresh_token);
          setIsAwait(false);
          navigate("/");
        })
        .catch((e) => {
          if (e.response?.status === 400) {
            setErrorText("아이디 혹은 비밀번호가 잘못되었습니다.");
          } else if (e.response?.status === 422) {
            setErrorText(e.response.data.detail);
          } else {
            setErrorText("오류가 발생했어요. 잠시 후 다시 시도해주세요.");
          }
        })
        .finally(() => {
          setIsAwait(false);
        });

      // await axios
      //   .post(apiURL + "/token", { user_id: inputData.userId, user_pw: inputData.userPw })
      //   .then((res) => {
      //     setCookie("userId", res.data.userId);
      //     navigate("/");
      //     setIsAwait(false);
      //   })
      //   .catch((e) => {
      //     if (e.response?.status === 400) {
      //       setErrorText("아이디 혹은 비밀번호가 잘못되었습니다.");
      //     } else if (e.response?.status === 422) {
      //       setErrorText(e.response.data.detail);
      //     } else {
      //       setErrorText("오류가 발생했어요. 잠시 후 다시 시도해주세요.");
      //     }
      //   })
      //   .finally(() => {
      //     setIsAwait(false);
      //   });
    };
    login();
  };
  useEffect(() => {
    if (getCookie("access_token") !== undefined) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="form_container">
        <ServiceInfo />
        <h2>Login</h2>
        {isAwait && (
          <SyncLoader color="rgb(122,111,98" size={10} speedMultiplier="0.5" style={{ position: "absolute" }} />
        )}
        <div className="sep" />
        <CustomInput name="userId" type="text" use="아이디" />
        <CustomInput name="userPw" type="password" use="비밀번호" submit={submit} />
        <div style={{ color: "red" }}>{errorText}</div>
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
