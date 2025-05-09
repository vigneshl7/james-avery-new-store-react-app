import React from "react";
import Header from "../components/Header";
import EngravingMainContent from "../components/Engraving/EngravingMainContent";
import { productDataFrBk } from "/public/sampleData/FrBk.js";
import { productDataInside } from "/public/sampleData/Inside.js";
import { productDataFullSide } from "/public/sampleData/FullSide.js";

const Engrave = () => {
  // const [data, setdata] = useState({})
  // useEffect(() => {
  //   const fetchData=async()=>{
  //     const res=await fetch("/sampleData/FrBk.json")
  //     const data=await res
  //     console.log("res",data)

  //   }
  //   fetchData()

  // }, [])

  const data = productDataFrBk;
  return (
    <div>
      <Header showRightButton={true} />
      <EngravingMainContent data={data} />
    </div>
  );
};

export default Engrave;
