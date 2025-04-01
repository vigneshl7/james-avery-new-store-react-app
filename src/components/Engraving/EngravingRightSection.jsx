import React, { useState } from "react";
import EngravingFrontSide from "./EngravingFrontSide";
import EngravingBackSide from "./EngravingBackSide";

const EngravingRight = ({onUpdate}) => {
  const [activeSide, setActiveSide] = useState("fr");

  return (
    <div className="col-sm-12 col-lg-6 product-detail-right-section">
      <input
        type="hidden"
        className="cyo-price-cals-url"
        value="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-CyoEngravingVariation"
      />
      {activeSide === "fr" ? (
        <EngravingFrontSide side="fr" setActiveSide={setActiveSide}onUpdate={onUpdate} />
      ) : (
        <EngravingBackSide side="bk" setActiveSide={setActiveSide}onUpdate={onUpdate} />
      )}
    </div>
  );
};

export default EngravingRight;
