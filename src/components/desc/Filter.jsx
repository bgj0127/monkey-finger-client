import React from "react";
import { useState } from "react";
import { currentFilter, initialData } from "../../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { apiURL } from "../../services/url";
import axios from "axios";

const Filter = () => {
  const curFilter = useRecoilValue(currentFilter);
  const setInitialData = useSetRecoilState(initialData);
  const [file, setFile] = useState();

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

    formData.append("file", file);
    axios
      .post(`${apiURL}` + "/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        async function updateData() {
          await axios.get(apiURL + "/default").then((res) => {
            setInitialData(res.data);
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
        <div id="filter-items">
          <span>filter</span>
          <form action={`${apiURL}/uploadfile`} method="POST">
            <input type="file" onChange={fileHandler} accept=".csv" />
            <button onClick={uploadFiles}>전송</button>
          </form>
        </div>
        <div id="selected-items">
          <span className="filter-text">Language: {curFilter.language}</span>
          <span className="filter-text">|</span>
          <span className="filter-text">Mode: {curFilter.mode}</span>
        </div>
      </div>
    </>
  );
};

export default Filter;
