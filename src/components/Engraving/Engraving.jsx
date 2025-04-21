import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEngravingData } from "../../redux/features/engraving/selectors";
import { setDefaultEngravingForZone,setEngravingCurrentType  } from "../../redux/features/engraving/engravingSlice";
import LaserEngravingFontStyles from "./LaserEngravingFontStyles";
import HandEngravingFontStyles from "./HandEngravingFontStyles";

const Engraving = ({
  activeSide,
  laserEngravingFontsData,
  allLaserSymbolsObjects,
  handEngravingFontsData,
  allHandSymbolsObjects,
  activeZoneData,
  engravingType,
  activeSideText
}) => {
  const dispatch = useDispatch();
  const engravingData = useSelector(selectEngravingData);
  const currentEngravingData = engravingData[activeSide]?.[engravingType];
  const { maxRowsLaser, standardDefaultFont } = activeZoneData;

  useEffect(() => {
    // Wait until both engravingData and font list are available
    if (!currentEngravingData || currentEngravingData.text.length > 0) return;
    if (!laserEngravingFontsData || laserEngravingFontsData.length === 0)
      return;

    const rows = Number(maxRowsLaser || 1);
    let defaultFont=""
    if(engravingType==="laser"){
      defaultFont =
      laserEngravingFontsData.find(
        (font) => font.fontCode === standardDefaultFont
      ) || laserEngravingFontsData[0];
    }else if(engravingType==="hand"){
      defaultFont =
      handEngravingFontsData?.find((font) => font.default === "true") ||
      handEngravingFontsData?.[0];
    }
 

    if (defaultFont) {
      dispatch(
        setDefaultEngravingForZone({
          side: activeSide,
          type: engravingType,
          monoText:["","",""],
          text: Array(rows).fill(""),
          fontName: defaultFont.fontName,
          fontCode: defaultFont.fontCode,
        })
      );
    }
  }, [
    dispatch,
    activeSide,
    engravingType,
    engravingData,
    currentEngravingData,
    laserEngravingFontsData,
    maxRowsLaser,
    standardDefaultFont,
  ]);
  useEffect(() => {
    dispatch(setEngravingCurrentType(engravingType));
  }, [dispatch, engravingType]);
  return (
    <>
      {engravingData && engravingType==="laser" && (
        <LaserEngravingFontStyles
          activeSide={activeSide}
          laserEngravingFontsData={laserEngravingFontsData}
          activeZoneData={activeZoneData}
          allLaserSymbolsObjects={allLaserSymbolsObjects}
          engravingType={engravingType}
          currentEngravingData={currentEngravingData}
          activeSideText={activeSideText}
        />
      )}
       {engravingData && engravingType==="hand" && (
        <HandEngravingFontStyles
          activeSide={activeSide}
          handEngravingFontsData={handEngravingFontsData}
          activeZoneData={activeZoneData}
          allHandSymbolsObjects={allHandSymbolsObjects}
          engravingType={engravingType}
          currentEngravingData={currentEngravingData}
          activeSideText={activeSideText}
        />
      )}
    </>
  );
};

export default Engraving;
