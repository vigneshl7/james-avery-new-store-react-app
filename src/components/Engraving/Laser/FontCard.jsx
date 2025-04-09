import React from 'react'

const FontCard = ({handleFontSelect,selectedFont,data}) => {
    const {fontCode,fontLimitKey,fontName,scene7Url,templateType}=data
  return (
    <a
      href="javascript:void(0)"
      data-fontlimit="7"
      data-fontname={fontName}
      data-templatetype={templateType}
      tabIndex="0"
      onClick={() => handleFontSelect(fontCode)}
      className={`laser-font-click ${selectedFont === fontCode ? "active" : ""}`}
    >
      <img
        src={scene7Url}
        className={`font-images img-fluid  ${selectedFont === fontCode ? "active" : ""} gtm-laserengrave-btn`}
        alt={fontName}
        data-font-id={fontCode}
        itemprop="image"
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