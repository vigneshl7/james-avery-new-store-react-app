import React from 'react';

const SwitchTabs = ({ engravingSkuAttributes, activeSide, setActiveSide }) => {
  const index = engravingSkuAttributes.findIndex(
    (zone) => zone.itemZoneCode.toLowerCase() === activeSide
  );
  const total = engravingSkuAttributes.length;
  const currentZone = engravingSkuAttributes[index];

  const handlePrev = () => {
    if (index > 0) {
      setActiveSide(engravingSkuAttributes[index - 1].itemZoneCode.toLowerCase());
    }
  };

  const handleNext = () => {
    if (index < total - 1) {
      setActiveSide(engravingSkuAttributes[index + 1].itemZoneCode.toLowerCase());
    }
  };

  return (
    <nav aria-label="Engraving Zone navigation">
      <ul className="pagination">
        <li className={`page-item previous-page-item ${index === 0 ? 'disabled' : ''}`}>
          <a
            tabIndex="0"
            className="page-link previous-page-link gtm-nextpage-btn"
            href="#"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
          ></a>
        </li>

        <span className="zone-name">{currentZone?.itemZoneName}</span>
        <span className="pagination-number">{index + 1}/{total}</span>

        <li className={`page-item next-page-item ${index === total - 1 ? 'disabled' : ''}`}>
          <a
            tabIndex="0"
            className="page-link next-page-link gtm-nextpage-btn"
            href="#"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          ></a>
        </li>
      </ul>
    </nav>
  );
};

export default SwitchTabs;
