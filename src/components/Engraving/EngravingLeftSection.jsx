import React, { useEffect, useState } from "react";
import { selectEngravingCurrentType } from "../../redux/features/engraving/selectors";
import { useSelector } from "react-redux";
import { getScene7Text } from "../../utlis/scene7Utils";


const EngravingLeftSection = ({ engravingData, engravingImage }) => {
  const [imageUrl, setImageUrl] = useState("");
  const engravingCurrentType = useSelector(selectEngravingCurrentType); // <-- Get current type from Redux

 
  const buildZoneURL = (zoneKey, zoneData) => {
    // Pick the engraving type to preview — e.g. prefer 'laser'
    const typeData = zoneData?.laser || zoneData?.hand;

    if (!typeData) return "";

    const {
      text = [],
      monoText = [],
      fontName = "",
      fontCode = "",
      symbol = {},
      sortedEngravingSkuAttributes: { templateStd, templateMono } = {},
    } = typeData;
    const isMonoFont = fontCode === "M1" || fontCode === "M2";
    const hasMonoInput = monoText.filter(Boolean).length === 3;
    const hasTextInput = text.filter(Boolean).length > 0;

    //No mono preview unless all 3 initials entered
    if (isMonoFont && !hasMonoInput) return "";
    if (!isMonoFont && !hasTextInput) return "";

    // Mono Font Rendering
    if (isMonoFont) {
      const monoString = monoText
        .map((char, i) => (i === 1 ? char.toUpperCase() : char.toLowerCase()))
        .join("");

      return `&obj=${zoneKey.toUpperCase()}&decal&src=is{JamesAvery/${templateMono}?$text=${encodeURIComponent(
        monoString
      )}&$font=${encodeURIComponent(fontName)}}&sharp=1&res=100&show`;
    }

    const scene7Text = text
    .filter(Boolean)
    .map((line) => getScene7Text(line, symbol)) // handles symbol + special chars
    .join("\\par%20");
   

    return `&obj=${zoneKey.toUpperCase()}&decal&src=is{JamesAvery/${templateStd}?$text=${scene7Text}&$font=${encodeURIComponent(
      fontName
    )}}&sharp=1&res=100&show`;
  };

  useEffect(() => {
    if (!engravingImage?.length || !engravingData) return;

    const baseURL = engravingImage[0]?.url + "?wid=704";
    const renderBase = baseURL.replace("/is/image", "/ir/render");

    if (engravingCurrentType === "hand") {
      setImageUrl(renderBase);
      return;
    }
    const allZoneURLs = Object.entries(engravingData)
      .map(([zoneKey, zoneData]) => buildZoneURL(zoneKey, zoneData))
      .join("");

    setImageUrl(`${renderBase}${allZoneURLs}`);
  }, [engravingData, engravingImage, engravingCurrentType]);

  return (
    <div className="col-sm-12 col-lg-6 product-detail-left-section pl-lg-0">
      <div className="engraving-image-container active">
        <img
          src={imageUrl}
          className="d-block img-fluid engraving-image"
          alt="Engraving Preview"
          itemProp="image"
        />
      </div>
      {engravingCurrentType === "hand" && (
        <div className="no-preview-message">
          No Preview Available for Hand Engraving
        </div>
      )}
    </div>
  );
};

export default EngravingLeftSection;
