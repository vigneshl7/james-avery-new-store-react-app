import React, { useEffect, useState } from "react";

const EngravingLeft = ({ engravingData, engravingImage, symbolMapInImage }) => {
  const [imageUrl, setImageUrl] = useState("");
  const encodeScene7Text = (textLine = "") => {
    let encoded = "";
    for (const char of textLine) {
      if (symbolMapInImage?.[char]) {
        encoded += `\\f1${symbolMapInImage[char]}\\f0+`;
      } else {
        encoded += char;
      }
    }
    return encoded;
  };
  // Helper to build URL section per side
  const buildURL = (side, data) => {
    if (!data?.text?.some(Boolean)) return "";

    const lines = data.text
      .filter(Boolean)
      .map(encodeScene7Text)
      .join("\\par%20");

    return `&obj=${side.toUpperCase()}&decal&src=is{JamesAvery/STD_11x8?$text=${lines}&$font=${encodeURIComponent(
      data.font
    )}}&sharp=1&res=100&show`;
  };

  useEffect(() => {
    if (!engravingImage?.length) return;

    const baseURL = engravingImage[0]?.url + "?wid=704";
    const updatedEngravingImage = baseURL.replace("/is/image", "/ir/render");
    const frURL = buildURL("FR", engravingData.fr);
    const bkURL = buildURL("BK", engravingData.bk);
   
    const newImageUrl = `${updatedEngravingImage}${frURL}${bkURL}`;
    setImageUrl(newImageUrl);
  }, [engravingData, engravingImage,symbolMapInImage]);
  console.log("@@ engraving img url", imageUrl);
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
      <div className="no-preview-message">
        {/* No Preview Available for Hand Engraving */}
      </div>
    </div>
  );
};

export default EngravingLeft;
