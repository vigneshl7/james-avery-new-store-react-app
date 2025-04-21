import React, { useState } from "react";
import EngravingSide from "./EngravingSide";

const EngravingRight = ({  data = {} }) => {
  const engravingSkuAttributes = data?.product?.engravingSkuAttributes || [];
  const rawAttributes =
    JSON.parse(engravingSkuAttributes)?.engravingSkuAttributes || [];
  const allEngravingSkuAttributesData = rawAttributes
    .map((attr) => ({
      ...attr,
      itemZoneCode: attr.itemZoneCode.toLowerCase(),
      sequence: Number(attr.sequence || 0),
    }))
    .sort((a, b) => a.sequence - b.sequence);

  // Set initial active zone from the one with the lowest sequence (first in sorted list)

  const [activeSide, setActiveSide] = useState(
    allEngravingSkuAttributesData[0]?.itemZoneCode || ""
  );

  const getZoneData = (zone) =>
    allEngravingSkuAttributesData.find(
      (attr) => attr.itemZoneCode.toLowerCase() === zone
    );

  return (
    <div className="col-sm-12 col-lg-6 product-detail-right-section">
      {allEngravingSkuAttributesData.length > 0 && (
        <EngravingSide
          activeSide={activeSide}
          setActiveSide={setActiveSide}
          activeZoneData={getZoneData(activeSide)}
          allEngravingSkuAttributesData={allEngravingSkuAttributesData}
          data={data}
        />
      )}
    </div>
  );
};

export default EngravingRight;
