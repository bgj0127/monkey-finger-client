import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { apiURL } from "../../services/url";
import "../../styles/Search.css";
import { useRecoilState } from "recoil";
import { typingData } from "../../recoil/atoms";
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
  const [isComplete, setIsComplete] = useState(true);
  const [isAPI, setIsAPI] = useState(false);

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
    if (typing?.wpm.length == 0) {
      setAdviceText("데이터가 없어 분석할 수 없어요🙈");
      return;
    }
    setIsAPI(true);
    const getData = async () => {
      await axios
        .post(
          apiURL + "/advice",
          { language: lanFilter, mode: modeFilter },
          {
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          }
        )
        .then((res) => {
          setMonkey(res.data);
          setIsAPI(false);
        })
        .catch(() => {
          setAdviceText("다시 시도해주세요🙊");
          setIsAPI(false);
        });
    };
    getData();
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(
          apiURL + "/typing/filter",
          { language: lanFilter, mode: modeFilter },
          {
            headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          }
        )
        .then((res) => {
          setTypingData(res.data);
        });
    };

    fetchData();
  }, [lanFilter, modeFilter, setTypingData]);

  useEffect(() => {
    if (monkey !== "") {
      setAdviceText(monkey);
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
    setIsComplete(false);
    e.preventDefault();
    const formData = new FormData();

    formData.append("typing_data", file);
    axios
      .post(apiURL + "/typing/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      })
      .then(() => {
        async function updateData() {
          await axios
            .post(
              apiURL + "/typing/filter",
              {
                language: lanFilter,
                mode: modeFilter,
              },
              {
                headers: {
                  Authorization: `Bearer ${getCookie("access_token")}`,
                },
              }
            )
            .then((res) => {
              setTypingData(res.data);
              setIsComplete(true);
            });
        }
        updateData();
      })
      .catch(() => {
        setIsComplete(true);
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
        {!isComplete && (
          <SyncLoader
            color="rgb(122,111,98"
            size={10}
            speedMultiplier="0.5"
            style={{ position: "absolute", top: "-3rem", left: "15rem" }}
          />
        )}
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
        {isAPI ? (
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
