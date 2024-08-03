// import { useState } from "react";
// import { currentFilter, initialData } from "../../recoil/atoms";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { apiURL } from "../../services/url";
import "../../styles/Search.css";
// import axios from "axios";

const Filter = () => {
  // const curFilter = useRecoilValue(currentFilter);
  // const setInitialData = useSetRecoilState(initialData);
  // const [file, setFile] = useState();
  const language = ["korean", "english"];
  const mode = ["time", "word", "zen", "custom"];

  // 태그 눌릴 때마다 GET요청 보낼거임
  const toggleFilter = (e) => {
    e.preventDefault();
    // GET 요청 구현하기
    console.log(e);
  };

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
                  <div className="box" onClick={toggleFilter} key={v + i}>
                    {v}
                  </div>
                );
              })}
            </div>
            <div>Mode:</div>
            <div id="mode" className="search">
              {mode.map((v, i) => {
                return (
                  <div className="box" onClick={toggleFilter} key={v + i}>
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
        <button>원숭이의 조언</button>
      </div>
    </>
  );
};

export default Filter;
