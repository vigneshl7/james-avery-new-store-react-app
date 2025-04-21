import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasErrorMessage } from '../../redux/features/engraving/selectors';
import { setErrorModelOpen } from '../../redux/features/engraving/engravingSlice';

const SwitchTabs = ({ allEngravingSkuAttributesData, activeSide, setActiveSide }) => {
  const hasErrorMsg=useSelector(hasErrorMessage)
    const dispatch = useDispatch();
  
  const index = allEngravingSkuAttributesData.findIndex(
    (zone) => zone.itemZoneCode.toLowerCase() === activeSide
  );
  const total = allEngravingSkuAttributesData.length;
  const currentZone = allEngravingSkuAttributesData[index];
  const handlePrev = () => {
    if (hasErrorMsg) {
      dispatch(setErrorModelOpen({ isOpen: true, type: 'error' }));
    } else if (index > 0) {
      setActiveSide(allEngravingSkuAttributesData[index - 1].itemZoneCode.toLowerCase());
    }
  };

  const handleNext = () => {
    if (hasErrorMsg) {
      dispatch(setErrorModelOpen({ isOpen: true, type: 'error' }));
    } else if (index < total - 1) {
      setActiveSide(allEngravingSkuAttributesData[index + 1].itemZoneCode.toLowerCase());
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
