import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import FontCard from "./Core/FontCard";
import FontInputs from "./Core/FontInputs";
import Symbols from "./Core/Symbols";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFont,
  updateHasError,
  setModelOpen,
  updatEngravingText,
  updatEngravingMonoText,
  setMonoGramModelOpen,
  updateEngravingErrorMessage,
  updateErrorMessages,
} from "../../redux/features/engraving/engravingSlice";
import { badWords } from "../../utlis/constants";
import FontInputMono from "./Core/FontInputMono";
import {
  containsBadWordWholeWord,
  getEngravingPricePayload,
  isUnsupportedCharFound,
} from "../../utlis/helpers";
import { selectEngravingData } from "../../redux/features/engraving/selectors";
const LaserEngravingFontStyles = ({
  activeSide,
  laserEngravingFontsData,
  allLaserSymbolsObjects,
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
  const { maxRowsLaser } = activeZoneData;
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
  const [isMonoFont, setisMonoFont] = useState(false);
  const [monoText, setMonoText] = useState(["", "", ""]);

  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (hasMountedRef.current) {
      setFullInput(inputText);
    } else {
      hasMountedRef.current = true;
    }
  }, [activeSide]);

  useEffect(() => {
    const fontCode = currentEngravingData?.fontCode;
    if (fontCode === "M1" || fontCode === "M2") {
      setisMonoFont(true);
    } else {
      setisMonoFont(false);
    }
  }, [, currentEngravingData?.fontCode]);

  const fetchPriceFromAPI = async (
    engravingData,
    activeSide,
    engravingType
  ) => {
    const pid = "CM-1093-485374";
    const payload = getEngravingPricePayload({
      engravingData,
      activeSide,
      engravingType,
      pid,
    });
    const queryString = new URLSearchParams(payload).toString();
    const url = `https://www.jamesavery.com/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-CyoEngravingVariation?${queryString}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      // Optionally dispatch a Redux action to store this
      // dispatch(setEngravingPrice(data));
    } catch (err) {
      console.error("Engraving price fetch error:", err);
    }
  };

  //getMax length of each font select
  const getMaxLengthForFont = (font) => {
    return activeZoneData?.[`maxColumns${font}`] || 10;
  };

  const maxLength = getMaxLengthForFont(selectedFontCode);
  const handleFontSelect = (fontCode, fontLimitKey, templateType) => {
    setisMonoFont(templateType === "MONO");
    const font = laserEngravingFontsData.find((f) => f.fontCode === fontCode);
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

    // Update local error state for UI
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
        length += Number(symbolLimits[char]);
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

    const charLength = getCustomLength(cleanedValue, symbolCharLimits);

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
      // Truncate based on max character length
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
    const charLimit = Number(event.currentTarget?.dataset?.charlimit || 2);
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
    const newLength = getCustomLength(newText, tempSymbolLimits);
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

  useEffect(() => {
    setMonoText(currentEngravingData?.monoText || ["", "", ""]);
  }, [currentEngravingData, isMonoFont]);

  const handleMonoTextChange = (index, textLabel, value) => {
    // Only allow letters A-Z or a-z
    const sanitized = value.replace(/[^a-zA-Z]/g, "").toUpperCase();

    const updated = [...monoText];
    updated[index] = sanitized;

    setMonoText(updated);

    dispatch(
      updatEngravingMonoText({
        side: activeSide,
        type: engravingType,
        index,
        value: sanitized,
      })
    );
  };
  const currentLengths = useMemo(() => {
    return fullInput.map((val) => getCustomLength(val, symbolCharLimits));
  }, [fullInput, symbolCharLimits]);

  const sortedSymbols = allLaserSymbolsObjects.sort((a, b) =>
    a?.symbolName.localeCompare(b.symbolName)
  );
  const handleSeeMore = () => {
    setseeMore((pre) => !pre);
  };
  return (
    <div
      className={`tab-pane fade active show`}
      id="nav-laser-0"
      role="tabpanel"
      aria-labelledby="nav-laser-tab"
    >
      <div>
        <div className="d-flex font-container">
          {laserEngravingFontsData?.map((fontData) => {
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
            data-content-asset-id="CYO_laser_engraving-details"
            data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_laser_engraving-details&amp;isModal=true"
            tabIndex="0"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setModelOpen({ isOpen: true, type: "laser" }));
            }}
          >
            <span className="info-icon"></span>
            <span className="info-icon-text">Laser Engraving Details</span>
          </a>
        </div>
        <div
          className={`std-inputs ${isMonoFont ? "d-none" : ""} `}
          data-total-count="0"
          data-engraving-type="laser"
        >
          <strong className="font-proxima-bold select-zone-name">
            Add {activeSideText} Message
          </strong>
          <div className="col-lg-11 cyoeng-restriction-errmsg d-none pl-0 mb-2 mt-2"></div>
          {Array.from({ length: maxRowsLaser }).map((_, index) => (
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
            className={`mono-inputs position-relative row ${isMonoFont ? "" : "d-none"}`}
            data-engraving-type="laser"
          >
            <strong className="font-proxima-bold d-flex align-items-center mono-enter-initials">
              Enter Initials
              <a
                tabIndex="0"
                href=""
                className="info-icon monogram-info-icon"
                data-content-asset-id="CYO_monogram_engraving-details"
                data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_monogram_engraving-details&amp;isModal=true"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setMonoGramModelOpen({ isOpen: true }));
                }}
              ></a>
            </strong>
            <div className="col-lg-11 cyoeng-restriction-errmsg d-none  mb-2 mt-2"></div>
            <div className="input-form d-flex">
              {["First", "Last", "Middle"].map((font, index) => {
                return (
                  <FontInputMono
                    text={font}
                    activeSide={activeSide}
                    index={index}
                    handleMonoTextChange={handleMonoTextChange}
                    value={monoText[index]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaserEngravingFontStyles;
