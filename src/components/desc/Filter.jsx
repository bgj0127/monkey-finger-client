import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { apiURL } from "../../services/url";
import "../../styles/Search.css";
import { useRecoilState } from "recoil";
import { typingData } from "../../recoil/atoms";
import { ReactTyped } from "react-typed";
import { useRef } from "react";
import { SyncLoader } from "react-spinners";

const Filter = () => {
  // const [file, setFile] = useState();
  const language = ["korean", "english"];
  const mode = ["time", "words", "quote", "zen", "custom"];
  const [lanFilter, setLanFilter] = useState(language);
  const [modeFilter, setModeFilter] = useState(mode);
  const [typing, setTypingData] = useRecoilState(typingData);
  const [monkey, setMonkey] = useState({});
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
    if (typing?.wpm.length == 0) {
      setAdviceText("데이터가 없어 분석할 수 없어요🙈");
      return;
    }
    const getData = async () => {
      if (isDisableAPI.current) return;
      isDisableAPI.current = true;
      await axios
        .get(apiURL + "/advice")
        .then((res) => {
          console.log(res.data);
          setMonkey(JSON.parse(res.data));
          isDisableAPI.current = false;
        })
        .catch((e) => {
          setAdviceText("다시 시도해주세요🙊");
          console.log(e);
          isDisableAPI.current = false;
        });
    };
    getData();
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.post(apiURL + `/filter`, { language: lanFilter, mode: modeFilter }).then((res) => {
        setTypingData(res.data);
      });
    };

    fetchData();
  }, [lanFilter, modeFilter, setTypingData]);

  useEffect(() => {
    if (monkey?.average_speed !== undefined) {
      setAdviceText(
        `평균 WPM - ${monkey.average_speed}\n평균 정확도 - ${monkey.average_accuracy}%\n평균 테스트 시간 - ${monkey.average_duration}초\n타자속도 - ${monkey.speed_trend}\n일관성 - ${monkey.stability}\n정확도 - ${monkey.accuracy_trend} \n\n${monkey.advice}`
      );
    }
  }, [monkey]);

  // const fileHandler = (e) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const uploadFile = e.target.files[0];
  //     setFile(uploadFile);
  //   }
  // };

  // const uploadFiles = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   formData.append("file", file);
  //   axios
  //     .post(`${apiURL}` + "/uploadfile", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then(() => {
  //       async function updateData() {
  //         await axios.get(apiURL + "/default").then((res) => {
  //           setInitialData(res.data);
  //         });
  //       }
  //       updateData();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // 기간별 필터링 가능해야함
  // 모드별 필터링도 마찬가지
  // 언어별 필터링은 필수 -> 언어에서 _1k 어떻게 할지?
  //                         하나로 통일해서 보여주는게 맞을듯
  //                         이 작업은 DB에서 처리하는게 좋을듯하다.

  // 암튼 프론트 구현 먼저 하자
  return (
    <>
      <div id="filter-wrap">
        <div id="filter-items">
          {/* <span>filter</span>
          <form action={`${apiURL}/uploadfile`} method="POST">
            <input type="file" onChange={fileHandler} accept=".csv" />
            <button onClick={uploadFiles}>전송</button>
          </form> */}
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
          <button onClick={advice} style={{ color: "#123123" }}>
            원숭이의 평가 🍌
          </button>
        )}
        {adviceText && (
          <div id="monkey">
            <ReactTyped strings={[adviceText]} typeSpeed={30} />
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
