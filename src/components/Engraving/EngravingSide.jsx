import React, { useState } from "react";
import SwitchTabs from "./SwitchTabs";
import LaserEngravingFontStyles from "./LaserEngravingFontStyles";
import HandEngravingFontStyles from "./HandEngravingFontStyles";

const EngravingSide = ({
  side,
  onUpdate,
  setActiveSide,
  zoneData,
  engravingSkuAttributes,
  data,
  setSymbolMapInImage,
  setisModelOpen,
}) => {
  const [engravingType, setEngravingType] = useState("laser");

  const toggleEngravingType = () => {
    setEngravingType((prev) => (prev === "laser" ? "hand" : "laser"));
    // onUpdate(side, lines, selectedFont, engravingType);
  };
  console.log("data", data);
  const laserEngravingFontsData =
    data?.engravingLaserFonts || data?.engravingFonts;

  const handEngravingFontsData = data?.engravingHandFonts;
  const allLaserSymbolsObjects = data?.allLaserSymbolsObjects;

  let sideText=""
  if(side==="fr"){
    sideText="Front"
  }else if(side==="bk"){
    sideText="Back"
  }else if(side==="in"){
    sideText="Inside"
  }
  console.log("side",side)
  return (
    <>
      <div className="engraving-zone active">
        {engravingSkuAttributes?.length > 1 && (
          <SwitchTabs
            activeSide={side}
            setActiveSide={setActiveSide}
            engravingSkuAttributes={engravingSkuAttributes}
          />
        )}

        {/* select font style for laser/hand Engraving */}
        <nav>
          <ul className="nav" id="nav-tab" role="tablist">
            <strong className="font-proxima-bold select-font-name">
              Select {sideText} Font Style
            </strong>
            <li className="nav-item" role="tab">
              <a
                tabIndex="0"
                href="#"
                className="nav-link p-0"
                id="nav-laser-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-laser-0"
                role="tab"
                aria-controls="#nav-laser-0"
                aria-selected={false}
              >
                {/* Switch to Laser Engraving */}
                <span className="d-none d-lg-inline-block">-</span>
                <span
                  className="text-decoration-underline gtm-switch-laser-engraving-btn"
                  onClick={toggleEngravingType}
                >
                  Switch to {engravingType === "laser" ? "Hand" : "Laser"}{" "}
                  Engraving
                </span>
              </a>
            </li>
            <li className="nav-item active" role="tab">
              <a
                tabIndex={0}
                href="#"
                className={`nav-link p-0 active`}
                id={`nav-hand-tab`}
                data-bs-toggle={`tab`}
                data-bs-target={`#nav-hand-0`}
                role={`tab`}
                aria-controls={`#nav-hand-0`}
              >
                Switch Hand Engraving Btn
              </a>
            </li>
          </ul>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          {engravingType === "laser" && (
            <>
              <LaserEngravingFontStyles
                onUpdate={onUpdate}
                side={side}
                laserEngravingFontsData={laserEngravingFontsData}
                engravingSkuAttributesData={zoneData}
                setSymbolMapInImage={setSymbolMapInImage}
                allLaserSymbolsObjects={allLaserSymbolsObjects}
                setisModelOpen={setisModelOpen}
              />
            </>
          )}
          {engravingType === "hand" && (
            <>
              <HandEngravingFontStyles
                onUpdate={onUpdate}
                side={side}
                handEngravingFontsData={handEngravingFontsData}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EngravingSide;
