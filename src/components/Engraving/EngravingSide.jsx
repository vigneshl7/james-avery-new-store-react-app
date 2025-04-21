import React, { useState } from "react";
import SwitchTabs from "./SwitchTabs";
// import LaserEngravingFontStyles from "./LaserEngravingFontStyles";
// import HandEngravingFontStyles from "./HandEngravingFontStyles";
import { useSelector } from "react-redux";
import { selectEngravingData } from "../../redux/features/engraving/selectors";
import Engraving from "./Engraving";

const EngravingSide = ({
  activeSide,
  setActiveSide,
  activeZoneData,
  allEngravingSkuAttributesData,
  data,
}) => {
  const engravingData = useSelector(selectEngravingData);
  const [engravingType, setEngravingType] = useState("laser");
  // Get available engraving types for current zone
  const currentZoneEngravingTypes = engravingData[activeSide]
    ? Object.keys(engravingData[activeSide])
    : [];
  // Only show switch if both types exist
  const showTypeSwitch =
    currentZoneEngravingTypes.includes("laser") &&
    currentZoneEngravingTypes.includes("hand");
  const toggleEngravingType = () => {
    setEngravingType((prev) => (prev === "laser" ? "hand" : "laser"));
  };
  const laserEngravingFontsData =
    data?.engravingLaserFonts || data?.engravingFonts;
  const allLaserSymbolsObjects = data?.allLaserSymbolsObjects;
  const handEngravingFontsData = data?.engravingHandFonts;
  const allHandSymbolsObjects = data?.allHandSymbolsObjects;

  const activeSideText =
    allEngravingSkuAttributesData.find(
      (zone) => zone.itemZoneCode.toLowerCase() === activeSide
    )?.itemZoneName || activeSide;
  return (
    <>
      <div className="engraving-zone active">
        {allEngravingSkuAttributesData?.length > 1 && (
          <SwitchTabs
            activeSide={activeSide}
            setActiveSide={setActiveSide}
            allEngravingSkuAttributesData={allEngravingSkuAttributesData}
          />
        )}

        {/* select font style for laser/hand Engraving */}
        <nav>
          <ul className="nav" id="nav-tab" role="tablist">
            <strong className="font-proxima-bold select-font-name">
              Select {activeSideText} Font Style
            </strong>
            {showTypeSwitch && (
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
            )}
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
          <>
            <Engraving
              activeSide={activeSide}
              laserEngravingFontsData={laserEngravingFontsData}
              activeZoneData={activeZoneData}
              allLaserSymbolsObjects={allLaserSymbolsObjects}
              engravingType={engravingType}
              handEngravingFontsData={handEngravingFontsData}
              allHandSymbolsObjects={allHandSymbolsObjects}
              activeSideText={activeSideText}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default EngravingSide;
