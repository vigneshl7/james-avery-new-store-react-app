import React, { useEffect, useState, useMemo, useRef } from "react";
import FontCard from "./Core/FontCard";
import FontInputs from "./Core/FontInputs";
import Symbols from "./Core/Symbols";
import { useDispatch, useSelector } from "react-redux";
import { selectEngravingData } from "../../redux/features/engraving/selectors";
import {
  updateFont,
  setDefaultEngravingForZone,
  updateHasError,
  setModelOpen,
  setEngravingData,
  updatEngravingText,
  updateEngravingErrorMessage,
  updateErrorMessages,
} from "../../redux/features/engraving/engravingSlice";
import { badWords } from "../../utlis/constants";
import {
  containsBadWordWholeWord,
  getEngravingPricePayload,
  isUnsupportedCharFound,
} from "../../utlis/helpers";
const HandEngravingFontStyles = ({
  activeSide,
  handEngravingFontsData,
  allHandSymbolsObjects,
  activeZoneData,
  engravingType,
  currentEngravingData,
  activeSideText,
  symbolCharLimits,
  setSymbolCharLimits,
  fullInput,
  setFullInput,
}) => {
  const dispatch = useDispatch();
  const { maxRowHand } = activeZoneData;
  const engravingData = useSelector(selectEngravingData);

  const selectedFontCode = currentEngravingData?.fontCode;
  const inputText = currentEngravingData?.text || [];
  const errorMessages = useSelector(
    (state) =>
      state.engraving.errorMessages?.[activeSide]?.[engravingType] || []
  );
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isInputNotSelected, setisInputNotSelected] = useState(false);
  const [seeMore, setseeMore] = useState(false);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (hasMountedRef.current) {
      setFullInput(inputText);
    } else {
      hasMountedRef.current = true;
    }
  }, [activeSide]);

  const fetchPriceFromAPI = async (
    engravingData,
    activeSide,
    engravingType
  ) => {
    console.log("insde");
    const pid = "CM-1093-485374";
    const payload = getEngravingPricePayload({
      engravingData,
      activeSide,
      engravingType,
      pid,
    });
    console.log("payload", payload);
    const queryString = new URLSearchParams(payload).toString();
    console.log("querystirng", queryString);
    const url = `https://www.jamesavery.com/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-CyoEngravingVariation?${queryString}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Fetched Price:", data);
      // Optionally dispatch a Redux action to store this
      // dispatch(setEngravingPrice(data));
    } catch (err) {
      console.error("Engraving price fetch error:", err);
    }
  };

  //getMax length of each font select
  const getMaxLengthForFont = (font) => {
    if (!font) return 10;

    const numericPart = font.replace(/^[A-Z]+/, "");
    const legacyKey = `maxColumns${font}`;
    const modernKey = `maxColumns${numericPart}`;

    return (
      Number(activeZoneData?.[legacyKey]) ||
      Number(activeZoneData?.[modernKey]) ||
      10
    );
  };

  const maxLength = getMaxLengthForFont(selectedFontCode);
  const handleFontSelect = (fontCode) => {
    const font = handEngravingFontsData.find((f) => f.fontCode === fontCode);
    const newMaxLength = getMaxLengthForFont(fontCode);
    dispatch(
      updateFont({
        side: activeSide,
        type: engravingType,
        fontCode,
        fontName: font?.fontName,
      })
    );

    // Validate input and generate error messages
    const updatedErrors = fullInput.map((line) => {
      const lineLength = getCustomLength(line, symbolCharLimits);
      let errors = [];

      if (lineLength > newMaxLength) {
        errors.push(
          "To continue, please remove extra character(s) or try a different font."
        );
      }
      return errors;
    });

    dispatch(
      updateErrorMessages({
        side: activeSide,
        type: engravingType,
        messages: updatedErrors,
      })
    );
    const hasAnyError = updatedErrors.some(
      (msgArr) =>
        Array.isArray(msgArr) &&
        msgArr.some((msg) => msg && msg.trim().length > 0)
    );
    dispatch(updateHasError({ isError: hasAnyError }));
  };
  const getCustomLength = (text, symbolLimits) => {
    let length = 0;

    for (let char of text) {
      if (/[\w\s]/.test(char)) {
        length += 1;
      } else if (symbolLimits && symbolLimits[char]) {
        length += Number(symbolCharLimits[char]);
      } else {
        length += 1;
      }
    }

    return length;
  };

  const truncateByCustomLength = (text, max, symbolCharLimits) => {
    let result = "";
    let length = 0;

    for (const char of text) {
      const isNormalChar = /[\w\s]/.test(char);
      const charLength = isNormalChar ? 1 : symbolCharLimits[char] || 1;

      if (length + charLength > max) break;

      result += char;
      length += charLength;
    }

    return result;
  };
  const handleTextChange = (index, value) => {
    const cleanedValue = value || "";

    const updatedFullInput = [...fullInput];
    updatedFullInput[index] = cleanedValue;
    setFullInput(updatedFullInput);

    // Join all lines to check for split bad words
    const combinedString = updatedFullInput.join("").toLowerCase();

    const containsBadWord = containsBadWordWholeWord(cleanedValue, badWords);
    const containsBadWordCombined = containsBadWordWholeWord(
      combinedString,
      badWords
    );

    const isUnsupported = isUnsupportedCharFound(
      cleanedValue,
      symbolCharLimits
    );
   
    // Validate text
    const charLength = getCustomLength(cleanedValue,symbolCharLimits);
    let errorMessage = [];

    if (containsBadWord || containsBadWordCombined) {
      errorMessage.push(
        "To continue, please remove any profane, inappropriate, or trademarked content."
      );
    }
    if (isUnsupported) {
      errorMessage.push(
        "To continue further, please remove unsupported characters."
      );
    }
    if (charLength > maxLength) {
      errorMessage.push(
        "To continue, please remove extra character(s) or try a different font."
      );
    }

    dispatch(
      updateEngravingErrorMessage({
        side: activeSide,
        type: engravingType,
        index,
        errorMessage,
      })
    );
    dispatch(
      updateHasError({
        isError: errorMessage?.some((msg) => msg.trim().length > 0),
      })
    );
    if (errorMessage?.length === 0) {
      const truncatedValue = truncateByCustomLength(
        cleanedValue,
        maxLength,
        symbolCharLimits
      );
      dispatch(
        updatEngravingText({
          side: activeSide,
          type: engravingType,
          value: truncatedValue,
          index,
        })
      );
    }
  };
  const handleSymbolClick = (event) => {
    event.preventDefault();

    if (activeInputIndex === null) {
      setisInputNotSelected(true);
      return;
    }

    const decimalCode = event.currentTarget?.dataset?.decimalcode;
    const scene7code = event.currentTarget?.dataset?.scene7code;
    const charLimit = Number(event?.currentTarget?.dataset?.charlimit || 2);
    if (!decimalCode || !scene7code) return;

    const symbol = String.fromCodePoint(decimalCode);
    const baseText =
      fullInput[activeInputIndex] ??
      currentEngravingData.text?.[activeInputIndex] ??
      "";

    //Insert symbol at the current cursor position
    const beforeCursor = baseText.slice(0, cursorPosition);
    const afterCursor = baseText.slice(cursorPosition);
    const newText = beforeCursor + symbol + afterCursor;
    const tempSymbolLimits = {
      ...symbolCharLimits,
      [symbol]: charLimit,
    };
    const newLength = getCustomLength(newText,tempSymbolLimits);
    setFullInput((prev) => {
      const updated = [...prev];
      updated[activeInputIndex] = newText;
      return updated;
    });
    if (newLength > maxLength) {
      dispatch(
        updateEngravingErrorMessage({
          side: activeSide,
          type: engravingType,
          index: activeInputIndex,
          errorMessage: [
            "To continue, please remove extra character(s) or try a different font.",
          ],
        })
      );
      return;
    }
    setSymbolCharLimits((prev) => ({
      ...prev,
      [symbol]: charLimit,
    }));
    dispatch(
      updatEngravingText({
        side: activeSide,
        type: engravingType,
        value: newText,
        index: activeInputIndex,
        symbol: {
          [symbol]: scene7code,
          charLimit,
        },
      })
    );

    dispatch(
      updateEngravingErrorMessage({
        side: activeSide,
        type: engravingType,
        index: activeInputIndex,
        errorMessage: [],
      })
    );

    setCursorPosition((prev) => prev + charLimit);
  };
  const currentLengths = useMemo(() => {
    return fullInput.map((val) => getCustomLength(val,symbolCharLimits));
  }, [fullInput, symbolCharLimits]);

  const sortedSymbols = allHandSymbolsObjects.sort((a, b) =>
    a?.symbolName.localeCompare(b.symbolName)
  );
  const handleSeeMore = () => {
    setseeMore((pre) => !pre);
  };
  return (
    <div
      className={`tab-pane fade active show`}
      id="nav-hand-0"
      role="tabpanel"
      aria-labelledby="nav-hand-tab"
    >
      <div>
        <div className="d-flex font-container">
          {handEngravingFontsData?.map((fontData) => {
            return (
              <FontCard
                handleFontSelect={handleFontSelect}
                selectedFontCode={selectedFontCode}
                fontData={fontData}
              />
            );
          })}
        </div>
        <div className="content-cta">
          <a
            href="#"
            className="get-content-details d-inline-flex align-items-center gtm-cyo-laserdetails-btn"
            data-is-laser-engraving="true"
            data-content-asset-id="CYO_hand_engraving-details"
            data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_laser_engraving-details&amp;isModal=true"
            tabIndex="0"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setModelOpen({ isOpen: true, type: "hand" }));
            }}
          >
            <span className="info-icon"></span>
            <span className="info-icon-text">Hand Engraving Details</span>
          </a>
        </div>
        <div
          className="std-inputs"
          data-total-count="0"
          data-engraving-type="laser"
        >
          <strong className="font-proxima-bold select-zone-name">
            Add {activeSideText} Message
          </strong>
          <div className="col-lg-11 cyoeng-restriction-errmsg d-none pl-0 mb-2 mt-2"></div>
          {Array.from({ length: maxRowHand }).map((_, index) => (
            <FontInputs
              key={index}
              index={index}
              errorMessage={errorMessages[index] || []}
              value={fullInput[index]}
              handleTextChange={handleTextChange}
              handleTextBlur={() =>
                fetchPriceFromAPI(engravingData, activeSide, engravingType)
              }
              setActiveInputIndex={setActiveInputIndex}
              setCursorPosition={setCursorPosition}
              setisInputNotSelected={setisInputNotSelected}
              maxLength={maxLength}
              currentLength={currentLengths[index] || 0}
            />
          ))}

          <div className={`symbols-container ${!seeMore && "hide-row"}`}>
            <div className="d-flex symbol-objects">
              <div className="symbol-text">Symbols</div>
              <div className="symbols">
                {sortedSymbols.map((symbol, i) => {
                  return (
                    <Symbols
                      handleSymbolClick={handleSymbolClick}
                      symbol={symbol}
                      index={i}
                    />
                  );
                })}
              </div>
              <a
                tabIndex="0"
                href="#"
                className="see-more-symbols gtm-seemore-symbols"
                data-hide="true"
                data-see-more="See More"
                data-see-less="See Fewer"
                onClick={handleSeeMore}
              >
                {seeMore ? "See Fewer" : "See More"}
              </a>
            </div>
            <div
              className={`col-lg-11 cyo-selection-error-message ${!isInputNotSelected && "d-none"} p-0`}
            >
              Please select a line first to add a symbol.
            </div>
          </div>
        </div>
        <div>
          <div
            className="mono-inputs position-relative row d-none"
            data-engraving-type="hand"
          >
            <strong className="font-proxima-bold d-flex align-items-center mono-enter-initials">
              Enter Initials
              <a
                tabIndex="0"
                href=""
                className="info-icon monogram-info-icon"
                data-content-asset-id="CYO_monogram_engraving-details"
                data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_monogram_engraving-details&amp;isModal=true"
              ></a>
            </strong>
            <div className="col-lg-11 cyoeng-restriction-errmsg d-none  mb-2 mt-2"></div>
            <div className="input-form d-flex">
              <div className="input-container">
                <input
                  name="engravingMessageInput0ForZone0"
                  id="engravingMessageInput0ForZone0"
                  autoComplete="off"
                  placeholder=""
                  maxLength="1"
                  type="text"
                  className="mono-form-control"
                  onKeyDown="return /[a-zA-Z]/i.test(event.key)"
                  data-zone-code="FR"
                  data-template-code="MONO_11x8"
                  value=""
                />
                <div className="adjust-position input-text">First</div>
              </div>
              <div className="input-container">
                <input
                  name="engravingMessageInput1ForZone0"
                  id="engravingMessageInput1ForZone0"
                  autoComplete="off"
                  placeholder=""
                  maxLength="1"
                  type="text"
                  className="mono-form-control"
                  onKeyDown="return /[a-zA-Z]/i.test(event.key)"
                  data-zone-code="FR"
                  data-template-code="MONO_11x8"
                  value=""
                />
                <div className="input-text">Last</div>
              </div>
              <div className="input-container">
                <input
                  name="engravingMessageInput2ForZone0"
                  id="engravingMessageInput2ForZone0"
                  autoComplete="off"
                  placeholder=""
                  maxLength="1"
                  type="text"
                  className="mono-form-control"
                  onKeyDown="return /[a-zA-Z]/i.test(event.key)"
                  data-zone-code="FR"
                  data-template-code="MONO_11x8"
                  value=""
                />
                <div className="adjust-position input-text">Middle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandEngravingFontStyles;
