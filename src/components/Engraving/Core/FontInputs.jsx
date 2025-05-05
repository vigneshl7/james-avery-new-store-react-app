import React from "react";
import { setUnSupportedCharacterModelOpen } from "../../../redux/features/engraving/engravingSlice";
import { useDispatch } from "react-redux";

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
  handleTextBlur,
}) => {
  const dispatch = useDispatch();
  const hasErrors = errorMessage?.length > 0;
  const hasUnsupportedError = errorMessage?.some((msg) =>
    msg.includes("unsupported")
  );
  const hasOtherErrors = errorMessage?.some(
    (msg) =>
      msg.includes("extra character") ||
      msg.includes("profane") ||
      msg.includes("trademarked")
  );
  const errorClass = [
    hasErrors && hasUnsupportedError && "error-unsupported-danger",
    hasErrors && hasOtherErrors && "error-danger",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div className="position-relative row m-0 mt-3">
        <div className="col-lg-1 p-0 font-line">Line {index + 1}</div>
        <div className={`col-lg-11 input-form ${errorClass}`}>
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
              onBlur={handleTextBlur}
            />
            <span className="counter">
              <span className="current-counter">{currentLength}</span>/
              <span className="current-total-counter">{maxLength}</span>
            </span>
          </div>

          {hasErrors &&
            errorMessage.map((msg, i) =>
              msg.includes("unsupported") ? (
                <div
                  key={i}
                  className="cyo-error-block cyo-unsupported-error-message"
                >
                  <span className="unsupported-error-text">{msg}</span>
                  <span
                    className="info-icon unsupported-info-icon"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        setUnSupportedCharacterModelOpen({ isOpen: true })
                      );
                    }}
                    data-content-asset-id="CYO_standard_supported-characters"
                    data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
                  ></span>
                </div>
              ) : (
                <div className={`cyo-error-block cyo-error-message `}>
                  {msg}
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default FontInputs;
