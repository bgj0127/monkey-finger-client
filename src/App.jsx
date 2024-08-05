import { RecoilRoot } from "recoil";
// import Description from "./pages/Description";
import "./styles/App.css";
import Router from "./services/Router";

function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}

export default App;
