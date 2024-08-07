import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { apiURL } from "../../services/url";
import "../../styles/Search.css";
import { useRecoilState } from "recoil";
import { typingData } from "../../recoil/atoms";
import { useRef } from "react";
import { SyncLoader } from "react-spinners";
import ReactMarkDown from "react-markdown";
import { getCookie } from "../../services/cookie";

const Filter = () => {
  const [file, setFile] = useState();
  const language = ["korean", "english"];
  const mode = ["time", "words", "quote", "zen", "custom"];
  const [lanFilter, setLanFilter] = useState(language);
  const [modeFilter, setModeFilter] = useState(mode);
  const [typing, setTypingData] = useRecoilState(typingData);
  const [monkey, setMonkey] = useState("");
  const [adviceText, setAdviceText] = useState("");
  const isDisableAPI = useRef(false);

  // 필터 타입에 따른 데이터 설정 다르게 해주는 함수
  const filterSetter = (d, setD, t) => {
    if (d.includes(t)) {
      setD(d.filter((lan) => lan !== t));
    } else {
      setD([...d, t]);
    }
  };

  // 태그 눌릴 때마다 GET요청 보낼거임
  const toggleFilter = (e) => {
    const curFilterText = e.target.innerText;
    const curFilterType = e.target.classList[0];
    // GET 요청 구현하기
    curFilterType === "language"
      ? filterSetter(lanFilter, setLanFilter, curFilterText)
      : filterSetter(modeFilter, setModeFilter, curFilterText);

    e.target.classList.toggle("select");
  };

  const advice = () => {
    setAdviceText("");
    if (isDisableAPI.current) return;
    isDisableAPI.current = true;
    if (typing?.wpm.length == 0) {
      setAdviceText("데이터가 없어 분석할 수 없어요🙈");
      isDisableAPI.current = false;
      return;
    }
    const getData = async () => {
      isDisableAPI.current = true;
      await axios
        .get(apiURL + "/advice")
        .then((res) => {
          setMonkey(res.data);
          isDisableAPI.current = false;
        })
        .catch((e) => {
          setAdviceText("다시 시도해주세요🙊");
          isDisableAPI.current = false;
        });
    };
    getData();
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(apiURL + "/typing/filter", { user_id: getCookie("userId"), language: lanFilter, mode: modeFilter })
        .then((res) => {
          setTypingData(res.data);
        });
    };

    fetchData();
  }, [lanFilter, modeFilter, setTypingData]);

  useEffect(() => {
    if (monkey !== "") {
      setAdviceText(monkey.replace(/\\r\\n|\\n|\\r/gm, ""));
    }
  }, [monkey]);

  const fileHandler = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setFile(uploadFile);
    }
  };

  const uploadFiles = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("typing_data", file);
    axios
      .post(`${apiURL}` + `/typing/upload?user_id=${getCookie("userId")}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        async function updateData() {
          await axios
            .post(apiURL + "/typing/filter", { user_id: getCookie("userId"), language: lanFilter, mode: modeFilter })
            .then((res) => {
              setTypingData(res.data);
            });
        }
        updateData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div id="filter-wrap">
        <form action={`${apiURL}/uploadfile`} method="POST" id="file_form">
          <input type="file" onChange={fileHandler} accept=".csv" id="file_input" />
          <button onClick={uploadFiles} id="file_sumbit">
            업로드
          </button>
        </form>
        <div id="filter-items">
          <div id="search-container">
            <div>Language:</div>
            <div id="language" className="search">
              {language.map((v, i) => {
                return (
                  <div className="language box select" onClick={toggleFilter} key={v + i}>
                    {v}
                  </div>
                );
              })}
            </div>
            <div>Mode:</div>
            <div id="mode" className="search">
              {mode.map((v, i) => {
                return (
                  <div className="mode box select" onClick={toggleFilter} key={v + i}>
                    {v}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {isDisableAPI.current ? (
          <div id="loading" onClick={(e) => e.preventDefault()}>
            <SyncLoader color="rgb(122,111,98" size={10} speedMultiplier="0.5" />
          </div>
        ) : (
          <button onClick={advice}>원숭이의 평가 🍌</button>
        )}
        {adviceText && (
          <div id="monkey">
            <ReactMarkDown>{adviceText}</ReactMarkDown>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
