import React from 'react'

const FontCard = ({handleFontSelect,selectedFontCode,fontData}) => {
    const {fontCode,fontLimitKey,fontName,scene7Url,templateType}=fontData
  return (
    <a
      href=""
      data-fontlimit="7"
      data-fontname={fontName}
      data-templatetype={templateType}
      tabIndex="0"
      onClick={(e) =>{
          e.preventDefault();
          handleFontSelect(fontCode,fontLimitKey,templateType)
      } }
      className={`laser-font-click ${selectedFontCode === fontCode ? "active" : ""}`}
    >
      <img
        src={scene7Url}
        className={`font-images img-fluid  ${selectedFontCode === fontCode ? "active" : ""} gtm-laserengrave-btn`}
        alt={fontName}
        data-font-id={fontCode}
        itemProp="image"
      />
      <span
        className="font-code gtm-laserengrave-btn"
        data-font-id={fontCode}
      >
        {fontCode}
      </span>
    </a>
  )
}

export default FontCard