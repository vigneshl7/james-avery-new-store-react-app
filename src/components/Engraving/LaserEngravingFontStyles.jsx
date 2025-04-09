import React, { useCallback, useEffect, useState } from "react";
import FontCard from "./Laser/FontCard";
import FontInputs from "./Laser/FontInputs";
import Symbols from "./Laser/Symbols";


 
const LaserEngravingFontStyles = ({
  onUpdate,
  side,
  laserEngravingFontsData,
  engravingSkuAttributesData,
  setSymbolMapInImage,
  allLaserSymbolsObjects,
  setisModelOpen
}) => {
  const { maxRowsLaser, standardDefaultFont } = engravingSkuAttributesData;
  const [selectedFont, setSelectedFont] = useState(standardDefaultFont);
  const [selectedFontName, setSelectedFontName] = useState("");
  const [lines, setLines] = useState([]);
  const [fullInput, setFullInput] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isInputNotSelected, setisInputNotSelected] = useState(false);
  const [charLimit, setCharLimit] = useState(2);
  const memoizedOnUpdate = useCallback(onUpdate, []);
  const [seeMore, setseeMore] = useState(false)
  console.log("@@@fullinput",fullInput,side)
  console.log("engravingSkuAttributesData", engravingSkuAttributesData);
  useEffect(() => {
    const fontName = laserEngravingFontsData?.find(
      (data) => data.fontCode === selectedFont
    )?.fontName;
    setSelectedFontName(fontName);
  }, [selectedFont]);

  useEffect(() => {
    const rows = Number(maxRowsLaser) || 0;
    if (rows > 0) {
      setFullInput(Array(rows).fill(""));
      setLines(Array(rows).fill(""));
      setErrorMessages(Array(rows).fill(""));
    }
  }, [maxRowsLaser]);

  const getMaxLengthForFont = (font) => {
    return engravingSkuAttributesData?.[`maxColumns${font}`] || 10;
  };

  const maxLength = getMaxLengthForFont(selectedFont);
  useEffect(() => {
    const timer = setTimeout(() => {
      memoizedOnUpdate(side, lines, selectedFontName, "laser");
    }, 500);

    return () => clearTimeout(timer);
  }, [lines, selectedFont, memoizedOnUpdate, selectedFontName]);

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    const newMaxLength = getMaxLengthForFont(font);

    setErrorMessages((prevErrors) => {
      return lines.map((line, index) => {
        const lineLength = getCustomLength(line);
        if (lineLength > newMaxLength) {
          return "To continue, please remove extra character(s) or try a different font.";
        }
        return "";
      });
    });

    // onUpdate(side, lines, font, engravingType);
  };
  const badWords = [
    "Pedo",
    "Pedo+Minor",
    "Fuck",
    "Shit",
    "Damn",
    "Ass",
    "Bitch",
    "Putita",
    "Titties",
    "MUFUKA",
    "Chingona",
    "Bish",
    "Puta",
    "Cunt",
    "Azz",
    "Cuca",
    "F*ck",
    "Pendejos",
    "HEB",
    "SHIITAKE",
    "Fuckin",
    "Fucking",
    "bitch",
    "Sico",
    "Butt",
    "Negra",
    "BICHOTA",
    "TXST",
    "Bruja",
    "Perra",
    "Lucifer",
    "Cabrona",
    "WTAMU",
    "UMASS",
    "Coochie",
    "Retard",
    "Boeing",
    "Nigga",
    "Stupid",
    "Shank",
    "Crackhead",
    "Tits",
    "IDGAF",
    "F**K",
    "Nalgona",
    "FKN",
    "Unfuckwitable",
    "ATM",
    "UT",
    "SMU",
    "LSU",
    "OU",
    "OKC",
    "Baylor",
    "Slut",
    "Gay",
    "UTSA",
    "TCU",
    "SHSU",
    "UCLA",
    "OSU",
    "Suck",
    "Beaner",
    "Beaners",
    "Shitt",
    "Sancho",
    "Gayyyyy",
    "Gay",
    "Hoebag",
    "Hoodrat",
    "Nazi",
    "Anal",
    "Smut",
    "Pinchesca",
    "Tits",
    "STFU",
    "Guey",
    "Coochie",
    "C**chie",
    "Fuk",
    "Ballbuster",
    "Hoes",
    "Shaddup",
    "Bish",
  ];
  const getCustomLength = (text) => {
    let length = 0;
    for (let char of text) {
      // Simple logic: count 1 for normal characters, 2 for special ones
      if (/[\w\s]/.test(char)) {
        length += 1;
      } else {
        length += charLimit;
      }
    }
    return length;
  };
  const truncateByCustomLength = (text, max) => {
    let result = "";
    let length = 0;

    for (const char of text) {
      const charLength = /[\w\s]/.test(char) ? 1 : charLimit;
      if (length + charLength > max) break;
      result += char;
      length += charLength;
    }

    return result;
  };
  const handleTextChange = (index, value) => {
    // Step 1: Store full input for user visibility
    setFullInput((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return [...newInputs];
    });

    // Step 2: Check if this input field contains a bad word
    const containsBadWord = badWords.some((word) =>
      value.toLowerCase().includes(word.toLowerCase())
    );

    // Step 3: Combine all inputs to check for split-word bad words
    const combinedText = [...fullInput];
    combinedText[index] = value; // Update with latest input
    const combinedString = combinedText.join("").toLowerCase();

    const containsBadWordCombined = badWords.some((word) =>
      combinedString.includes(word.toLowerCase())
    );

    // Step 4: Extract only the characters for storing
    const truncatedValue = truncateByCustomLength(value, maxLength);
    // Step 5: Determine the correct error message
    let errorMessage = "";
    if (containsBadWord || containsBadWordCombined) {
      errorMessage =
        "To continue, please remove any profane, inappropriate, or trademarked content.";
    } else if (getCustomLength(value) > maxLength) {
      errorMessage =
        "To continue, please remove extra character(s) or try a different font.";
    }
    // Step 6: Update error messages separately for each input
    setErrorMessages((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = errorMessage;
      return [...newErrors];
    });
    // Step 7: Store only first 10 valid characters if no bad words are found
    if (!containsBadWord && !containsBadWordCombined) {
      setLines((prevLines) => {
        const newLines = [...prevLines];
        newLines[index] = truncatedValue;
        return newLines;
      });
    }
  };
  const handleSymbolClick = (event) => {
    
    if (activeInputIndex === null) {
      setisInputNotSelected(true);
      return;
    }

    const decimalCode = event.currentTarget?.dataset?.decimalcode;
    const scene7code = event.currentTarget?.dataset?.scene7code;
    const charLimit = Number(event?.currentTarget?.dataset?.charlimit || 2);
    console.log("charlimit",charLimit)
    setCharLimit(charLimit);
    if (!decimalCode || !scene7code) return;

    const symbol = String.fromCodePoint(decimalCode);

    const currentText = fullInput[activeInputIndex] || "";
    console.log("@@@currenttext",currentText)
    const newLength = getCustomLength(currentText) + charLimit;

    console.log("@@@newlen",newLength)

    if (newLength > maxLength) {
      // Set error message if limit exceeded
      setErrorMessages((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[activeInputIndex] =
          "To continue, please remove extra character(s) or try a different font.";
        return newErrors;
      });
      return;
    }

    // Insert symbol at cursor position
    const beforeCursor = currentText.slice(0, cursorPosition);
    const afterCursor = currentText.slice(cursorPosition);
    const newText = beforeCursor + symbol + afterCursor;

    // Update fullInput with symbol inserted
    setFullInput((prev) => {
      const updated = [...prev];
      updated[activeInputIndex] = newText;
      return updated;
    });

    // Update lines with truncated value
    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      updatedLines[activeInputIndex] = newText.slice(0, maxLength);
      return updatedLines;
    });
    // Track scene7code used for this symbol
    setSymbolMapInImage((prev) => ({
      ...prev,
      [symbol]: scene7code,
    }));
    // Clear any existing error
    setErrorMessages((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[activeInputIndex] = "";
      return newErrors;
    });

    // Move cursor forward
    setCursorPosition((prev) => prev + charLimit);
  };


  const sortedSymbols = allLaserSymbolsObjects.sort((a, b) => 
    a?.symbolName.localeCompare(b.symbolName)
  );
  const handleSeeMore=()=>{
      setseeMore((pre)=>!pre)
  }
  return (
    <div
      className={`tab-pane fade active show`}
      id="nav-laser-0"
      role="tabpanel"
      aria-labelledby="nav-laser-tab"
    >
      <div>
        <div className="d-flex font-container">
          {laserEngravingFontsData?.map((data) => {
            return (
              <FontCard
                handleFontSelect={handleFontSelect}
                selectedFont={selectedFont}
                data={data}
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
            onClick={(e)=>{
              e.preventDefault();
              setisModelOpen({
                isOpen:true,
                type:"laser"
              })
            }}
          >
            <span className="info-icon"></span>
            <span className="info-icon-text">Laser Engraving Details</span>
          </a>
        </div>
        <div
          className="std-inputs "
          data-total-count="0"
          data-engraving-type="laser"
        >
          <strong className="font-proxima-bold select-zone-name">
            Add Front Message
          </strong>
          <div className="col-lg-11 cyoeng-restriction-errmsg d-none pl-0 mb-2 mt-2"></div>
          {Array.from({ length: maxRowsLaser }).map((_, index) => (
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
              currentLength={getCustomLength(fullInput[index] || "")}
            />
          ))}

          <div className={`symbols-container ${!seeMore && "hide-row"}`}>
            <div className="d-flex symbol-objects">
              <div className="symbol-text">Symbols</div>
              <div className="symbols">
                {sortedSymbols.map((symbol,i) => {
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
                {seeMore ?"See Fewer" :"See More"}
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
                href="javascript:void(0)"
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
                  autocomplete="off"
                  placeholder=""
                  maxLength="1"
                  type="text"
                  className="mono-form-control"
                  onkeydown="return /[a-zA-Z]/i.test(event.key)"
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
                  autocomplete="off"
                  placeholder=""
                  maxLength="1"
                  type="text"
                  className="mono-form-control"
                  onkeydown="return /[a-zA-Z]/i.test(event.key)"
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
                  autocomplete="off"
                  placeholder=""
                  maxLength="1"
                  type="text"
                  className="mono-form-control"
                  onkeydown="return /[a-zA-Z]/i.test(event.key)"
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

export default LaserEngravingFontStyles;
