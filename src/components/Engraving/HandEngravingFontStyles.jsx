import React, { useEffect, useState, useMemo } from "react";
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
} from "../../redux/features/engraving/engravingSlice";
import { badWords } from "../../utlis/constants";
const HandEngravingFontStyles = ({
  activeSide,
  handEngravingFontsData,
  allHandSymbolsObjects,
  activeZoneData,
  engravingType,
  currentEngravingData,
  activeSideText
}) => {
 
  const dispatch = useDispatch();
  const { maxRowHand } = activeZoneData;
  const selectedFontCode = currentEngravingData?.fontCode;
  const inputText = currentEngravingData?.text || [];
  const [fullInput, setFullInput] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isInputNotSelected, setisInputNotSelected] = useState(false);
  const [charLimit, setCharLimit] = useState(2);
  const [symbolCharLimits, setSymbolCharLimits] = useState({});
  const [seeMore, setseeMore] = useState(false);



  useEffect(() => {
    setFullInput(inputText);
  }, [activeSide]);

  //getMax length of each font select
  const getMaxLengthForFont = (font) => {
    if (!font) return 10;

    const numericPart = font.replace(/^[A-Z]+/, ""); // remove leading letters like "S"
    const legacyKey = `maxColumns${font}`; // e.g. maxColumnsS3
    const modernKey = `maxColumns${numericPart}`; // e.g. maxColumns18

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
      const lineLength = getCustomLength(line);
      if (lineLength > newMaxLength) {
        return "To continue, please remove extra character(s) or try a different font.";
      }
      return "";
    });

    // Update local error state for UI
    setErrorMessages(updatedErrors);

    // Dispatch global error flag to Redux (only once)
    const hasAnyError = updatedErrors.some((msg) => msg !== "");
    dispatch(updateHasError({ isError: hasAnyError }));
  };

  const getCustomLength = (text) => {
    let length = 0;

    for (let char of text) {
      if (/[\w\s]/.test(char)) {
        length += 1;
      } else if (symbolCharLimits[char]) {
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

    // Calculate new text array and update fullInput
    const updatedFullInput = [...fullInput];
    updatedFullInput[index] = cleanedValue;
    setFullInput(updatedFullInput);

    // Join all lines to check for split bad words
    const combinedString = updatedFullInput.join("").toLowerCase();

    const containsBadWord = badWords.some((word) =>
      cleanedValue.toLowerCase().includes(word.toLowerCase())
    );

    const containsBadWordCombined = badWords.some((word) =>
      combinedString.includes(word.toLowerCase())
    );
    // Truncate based on max character length
    const truncatedValue = truncateByCustomLength(cleanedValue, maxLength,symbolCharLimits);
    // Validate text
    let errorMessage = "";
    const charLength = getCustomLength(cleanedValue);

    if (containsBadWord || containsBadWordCombined) {
      errorMessage =
        "To continue, please remove any profane, inappropriate, or trademarked content.";
    } else if (charLength > maxLength) {
      errorMessage =
        "To continue, please remove extra character(s) or try a different font.";
    }

    // Update local error state
    setErrorMessages((prev) => {
      const next = [...prev];
      next[index] = errorMessage;
      return next;
    });
    // Global error status
    dispatch(updateHasError({ isError: !!errorMessage }));

    // Update Redux only if valid
    if (!containsBadWord && !containsBadWordCombined) {
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
    setCharLimit(charLimit);
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
    const newLength = getCustomLength(newText);
    setFullInput((prev) => {
      const updated = [...prev];
      updated[activeInputIndex] = newText;
      return updated;
    });
    if (newLength > maxLength) {
      setErrorMessages((prevErrors) => {
        const updated = [...prevErrors];
        updated[activeInputIndex] =
          "To continue, please remove extra character(s) or try a different font.";
        return updated;
      });
      return;
    }
    setSymbolCharLimits((prev) => ({
      ...prev,
      [symbol]: charLimit,
    }));
    dispatch(
      updatEngravingText({
        side: activeSide,
        type:engravingType,
        value: newText,
        index: activeInputIndex,
        symbol: {
          [symbol]: scene7code,
          charLimit
        },
        
      })
    );

    
    // dispatch(
    //   setEngravingData({
    //     side: activeSide,
    //     symbol: {
    //       [symbol]: scene7code,
    //       charLimit
    //     },
    //   })
    // );

  

    setErrorMessages((prevErrors) => {
      const updated = [...prevErrors];
      updated[activeInputIndex] = "";
      return updated;
    });

    setCursorPosition((prev) => prev + charLimit);
  };
  const currentLengths = useMemo(() => {
    return fullInput.map((val) => getCustomLength(val || ""));
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
      id="nav-laser-0"
      role="tabpanel"
      aria-labelledby="nav-laser-tab"
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
            data-content-asset-id="CYO_laser_engraving-details"
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
              errorMessage={errorMessages[index]}
              value={fullInput[index]}
              handleTextChange={handleTextChange}
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
