import React, { useState } from "react";
import EngravingLeftSection from "./EngravingLeftSection";
import EngravingRightSection from "./EngravingRightSection";
import EngravingFooter from "./EngravingFooter";
import Model from "./Model";

const EngravingMainContent = ({data}) => {
  const getSidesAttributes=data?.sortedEngravingSkuAttributes
  const getInitialEngravingData = () => {
    const initial = {};
    getSidesAttributes.forEach((side) => {
      initial[side.itemZoneCode.toLowerCase()] = {
        text: ["", ""],
        font: "Lucida Calligraphy",
        type: "laser",
      };
    });
    return initial;
  };
  const [engravingData, setEngravingData] = useState(getInitialEngravingData);
  const [symbolMapInImage, setSymbolMapInImage] = useState({});
  const [isModelOpen, setisModelOpen] = useState({isOpen:false,type:"laser"})

  const updateEngraving = (side, text, font, type) => {

    setEngravingData((prev) => ({
      ...prev,
      [side]: { text, font, type },
    }));
  };
  console.log("engraving submitted details",engravingData)
  const engravingImage=data?.product?.images?.engravingImage
  return (
    <>
      <div role="main" id="maincontent">
        <div className="cyo-engraving-product-detail product-wrapper cyo-wrapper cyo-page">
          <div className="row m-0">
            <EngravingLeftSection engravingData={engravingData} engravingImage={engravingImage} symbolMapInImage={symbolMapInImage} />
            <EngravingRightSection onUpdate={updateEngraving} data={data} setSymbolMapInImage={setSymbolMapInImage} setisModelOpen={setisModelOpen}/>
          </div>
        </div>
      </div>
      <EngravingFooter />
      <Model isModelOpen={isModelOpen} setisModelOpen={setisModelOpen}/>
    </>
  );
};

export default EngravingMainContent;
