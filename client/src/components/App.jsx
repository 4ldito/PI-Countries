import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllRoutes from "./AllRoutes";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </>
  );
}

export default App;
