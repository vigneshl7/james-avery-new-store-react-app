import React from "react";

const FontInputs = ({
  index,
  errorMessage,
  unsupportedError,
  value,
  setActiveInputIndex,
  setCursorPosition,
  setisInputNotSelected,
  maxLength,
  handleTextChange,
  currentLength,
}) => {
  return (
    <>
      <div className="position-relative row m-0 mt-3">
        <div className="col-lg-1 p-0 font-line">Line {index + 1}</div>
        <div
          className={`col-lg-11 input-form ${errorMessage && "error-danger"}`}
        >
          <div className="input-counter" data-line-count="0">
            <input
              name="laserEngravingMessageInput1ForZone0"
              id="laserEngravingMessageInput1ForZone0"
              autoComplete="off"
              placeholder=""
              type="text"
              className="form-control"
              aria-label="laserEngravingMessageInput1ForZone0"
              value={value}
              onChange={(e) => handleTextChange(index, e.target.value)}
              onFocus={(e) => {
                setActiveInputIndex(index);
                setCursorPosition(e.target.selectionStart);
              }}
              onClick={(e) => {
                setCursorPosition(e.target.selectionStart);
                setisInputNotSelected(false);
              }}
              onKeyUp={(e) => setCursorPosition(e.target.selectionStart)}
            />
            <span className="counter">
              <span className="current-counter">{currentLength}</span>/
              <span className="current-total-counter">{maxLength}</span>
            </span>
          </div>

          <div
            className={`cyo-error-block cyo-error-message ${!errorMessage && "d-none"}`}
          >
            {errorMessage}
          </div>

          
            <div className={`cyo-error-block cyo-unsupported-error-message ${!unsupportedError && "d-none"}`}>
              <span className="unsupported-error-text">
                
                To continue further, please remove unsupported characters
              </span>
              <span
                className="info-icon unsupported-info-icon"
                data-content-asset-id="CYO_standard_supported-characters"
                data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
              ></span>
            </div>
          
        </div>
      </div>
    </>
  );
};

export default FontInputs;
