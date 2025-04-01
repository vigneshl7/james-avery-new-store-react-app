import React from 'react'

const EngravingLeft = ({ engravingData }) => {
  const baseURL = "https://jamesavery.scene7.com/ir/render/JamesAveryrender/CM-1093-485374_eng?wid=704";
  const buildURL = (side, data) => {
    if (!data.text[0] && !data.text[1]) return "";

    const text = data.text.filter(Boolean).join("\\par%20");
    return `&obj=${side.toUpperCase()}&decal&src=is{JamesAvery/STD_11x8?$text=${text}&$font=${data.font}}&sharp=1&res=100&show`;
  };
  const imageUrl = `${baseURL}${buildURL("FR", engravingData.fr)}${buildURL("BK", engravingData.bk)}`;

  return (
    <div className="col-sm-12 col-lg-6 product-detail-left-section pl-lg-0">
    <div className="engraving-image-container active">
      <img
        src={imageUrl}
        className="d-block img-fluid engraving-image"
        alt="Engravable Disc Charm"
        itemprop="image"
      />
    </div>
    <div className="no-preview-message">No Preview Available for Hand Engraving</div>
  </div>
  )
}

export default EngravingLeft