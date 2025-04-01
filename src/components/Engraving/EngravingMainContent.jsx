import React, { useState } from 'react'
import EngravingLeftSection from './EngravingLeftSection'
import EngravingRightSection from './EngravingRightSection'

const EngravingMainContent = () => {
  const [engravingData, setEngravingData] = useState({
    fr: { text: ["", ""], font: "Lucida Calligraphy", type: "laser" },
    bk: { text: ["", ""], font: "Lucida Calligraphy", type: "laser" },
  });

  const updateEngraving = (side, text, font, type) => {
    setEngravingData((prev) => ({
      ...prev,
      [side]: { text, font, type },
    }));
  };
  return (
    <div role='main' id='maincontent'>
      <div className="cyo-engraving-product-detail product-wrapper cyo-wrapper cyo-page">
        <div className='row m-0'>
        <EngravingLeftSection engravingData={engravingData} />
        <EngravingRightSection onUpdate={updateEngraving} />
        </div>

      </div>
        
    </div>
  )
}

export default EngravingMainContent