// import { useState } from "react";
// import { currentFilter, initialData } from "../../recoil/atoms";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { apiURL } from "../../services/url";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { apiURL } from "../../services/url";
import "../../styles/Search.css";
import { useSetRecoilState } from "recoil";

import { initialData } from "../../recoil/atoms";
// import axios from "axios";

const Filter = () => {
  // const curFilter = useRecoilValue(currentFilter);
  // const setInitialData = useSetRecoilState(initialData);
  // const [file, setFile] = useState();
  const language = ["korean", "english"];
  const mode = ["time", "words", "zen", "custom"];
  const [lanFilter, setLanFilter] = useState(language);
  const [modeFilter, setModeFilter] = useState(mode);
  const setInitialData = useSetRecoilState(initialData);

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

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post(apiURL + `/filter`, { language: lanFilter, mode: modeFilter })
        .then((res) => {
          console.log(res.data);
          setInitialData(res.data);
        });
    };

    fetchData();
  }, [lanFilter, modeFilter]);

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
                  <div
                    className="language box select"
                    onClick={toggleFilter}
                    key={v + i}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
            <div>Mode:</div>
            <div id="mode" className="search">
              {mode.map((v, i) => {
                return (
                  <div
                    className="mode box select"
                    onClick={toggleFilter}
                    key={v + i}
                  >
                    {v}
                  </div>
                );
              })}
              {/* <div className="box">time</div>
              <div className="box">word</div>
              <div className="box">custom</div>
              <div className="box">zen</div> */}
            </div>
          </div>
        </div>
        <button>원숭이의 조언 🍌</button>
      </div>
    </>
  );
};

export default Filter;
