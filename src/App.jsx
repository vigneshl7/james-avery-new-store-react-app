import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Engrave from "@pages/Engrave";
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/engrave" element={<Engrave />} />
        </Routes>
    </Router>
  );
};

export default App;
