import { useState } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import Description from "./pages/Description";
import "./styles/App.css";

function App() {
  return (
    <RecoilRoot>
      <Description />
    </RecoilRoot>
  );
}

export default App;
