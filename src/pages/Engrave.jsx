import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import EngravingMainContent from "../components/Engraving/EngravingMainContent";
import { productDataFrBk } from "/public/sampleData/FrBk.js";
import { productDataInside } from "/public/sampleData/Inside.js";
import { productDataFullSide } from "/public/sampleData/FullSide.js";
import { callEngravingAPI, getToken } from "../utlis/auth";

const Engrave = () => {
  const [result, setResult] = useState(null);
 useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const data = await callEngravingAPI(token);
      setResult(data);
    };
    fetchData();
  }, []);

  const data = productDataFrBk;
  return (
    <div>
      <Header showRightButton={true} />
     {result && <EngravingMainContent data={result} />}
    </div>
  );
};

export default Engrave;
