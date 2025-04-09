import React, { useState } from "react";
import EngravingSide from "./EngravingSide";

const EngravingRight = ({ onUpdate = () => {}, data = {},setSymbolMapInImage,setisModelOpen }) => {
  const engravingSkuAttributes = data?.product?.engravingSkuAttributes || [];
  const rawAttributes =
    JSON.parse(engravingSkuAttributes)?.engravingSkuAttributes || [];
console.log("rawAttributes",rawAttributes)
  const engravingSkuAttributesData = rawAttributes
    .map((attr) => ({
      ...attr,
      itemZoneCode: attr.itemZoneCode.toLowerCase(),
      sequence: Number(attr.sequence || 0),
    }))
    .sort((a, b) => a.sequence - b.sequence);

  // Map of available zones for safety
  const availableZones = engravingSkuAttributesData.map((attr) =>
    attr.itemZoneCode.toLowerCase()
  );
  const [activeSide, setActiveSide] = useState(
    availableZones.includes("fr") ? "fr" : availableZones[0] || ""
  );
  const getZoneData = (zone) =>
    engravingSkuAttributesData.find(
      (attr) => attr.itemZoneCode.toLowerCase() === zone
    );

  return (
    <div className="col-sm-12 col-lg-6 product-detail-right-section">
      {engravingSkuAttributesData.length > 0 && (
        <EngravingSide
          side={activeSide}
          setActiveSide={setActiveSide}
          onUpdate={onUpdate}
          zoneData={getZoneData(activeSide)}
          engravingSkuAttributes={engravingSkuAttributesData}
          data={data}
          setSymbolMapInImage={setSymbolMapInImage}
          setisModelOpen={setisModelOpen}
        />
      )}
    </div>
  );
};

export default EngravingRight;
