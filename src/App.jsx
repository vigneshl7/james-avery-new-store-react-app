import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Engrave from "@pages/Engrave";
import CyoReviewPage from "@pages/CyoReviewPage";
import useBodyScrollLock from "./hooks/useBodyScrollLock";

const App = () => {
  useBodyScrollLock();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Sites-JamesAvery-Site/en_US/Product-CyoShow"
          element={<Engrave />}
        />
        <Route
          // path="/Sites-JamesAvery-Site/en_US/Product-CyoShow/CyoReviewPage"
          path="/CyoReviewPage"
          element={<CyoReviewPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
