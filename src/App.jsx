import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Engrave from "@pages/Engrave";
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sites-JamesAvery-Site/en_US/Product-CyoShow" element={<Engrave />} />
        </Routes>
    </Router>
  );
};

export default App;
