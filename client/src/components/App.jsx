import { Route, Routes } from "react-router-dom";
import styles from "./App.css";
import AllRoutes from "./AllRoutes";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
