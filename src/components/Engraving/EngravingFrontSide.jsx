import React, { useEffect, useState } from "react";

const EngravingFrontSide = ({ side, setActiveSide, onUpdate }) => {
  const [engravingType, setEngravingType] = useState("laser"); // 'laser' or 'hand'
  const [selectedFont, setSelectedFont] = useState("Lucida Calligraphy");
  const [lines, setLines] = useState(["", "", ""]); // Supports up to 2 lines
  const [fullInput, setFullInput] = useState(["", "", ""]); // Stores full input
  const maxLength = 10; // Set maximum character length
  const [errorMessages, setErrorMessages] = useState(["", "", ""]);
  const [activeInputIndex, setActiveInputIndex] = useState(null);
const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(side, lines, selectedFont, engravingType);
    }, 500);

    return () => clearTimeout(timer);
  }, [lines, selectedFont, engravingType, onUpdate]);
  const toggleEngravingType = () => {
    setEngravingType((prev) => (prev === "laser" ? "hand" : "laser"));
    // onUpdate(side, lines, selectedFont, engravingType);
  };
  const handleFontSelect = (font) => {
    setSelectedFont(font);
    // onUpdate(side, lines, font, engravingType);
  };
  const handleTextChange = (index, value) => {
    // Update full input state so users can see full text
    setFullInput((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });

    // Extract only the first 10 characters for storing
    const truncatedValue = value.slice(0, maxLength);

    // Update error messages separately for each input
    setErrorMessages((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] =
        value.length > maxLength
          ? "To continue, please remove extra character(s) or try a different font."
          : "";
      return newErrors;
    });

    // Store only first 10 characters
    setLines((prevLines) => {
      const newLines = [...prevLines];
      newLines[index] = truncatedValue;
      return newLines;
    });
  };
  const handleSymbolClick = (event) => {
    if (activeInputIndex === null) return; 
  
    let symbolImgSrc = event.target.src; 
  
    if (!symbolImgSrc) {
      const imgElement = event.currentTarget.querySelector("img");
      if (imgElement) {
        symbolImgSrc = imgElement.src;
      }
    }
  
    if (!symbolImgSrc) {
      console.error("Symbol image not found!");
      return;
    }
  
    const newSymbol = `<img src="${symbolImgSrc}" class="inserted-symbol"/>`; 
    console.log("@newsymbol",newSymbol)
    setLines((prev) => {
      const updatedLines = [...prev];
  
      // Insert symbol at cursor position
      const currentText = updatedLines[activeInputIndex] || "";
      const beforeCursor = currentText.slice(0, cursorPosition);
      const afterCursor = currentText.slice(cursorPosition);
  
      // New text with inserted image
      const newHtml = beforeCursor + newSymbol + afterCursor;
      console.log("@@new html",newHtml)
  
      // Ensure max 10 elements (text + images)
      const textOnlyLength = newHtml.replace(/<img[^>]*>/g, "").length;
      if (textOnlyLength > 10) return prev;
  
      updatedLines[activeInputIndex] = newHtml;
  
      return updatedLines;
    });
  console.log("@")
    // Move cursor forward after inserting symbol
    setCursorPosition(cursorPosition + newSymbol.length);
  };
  
  
  
  

  return (
    <div
      className="engraving-zone active"
      data-scene7-zone=""
      data-eng-zone-code="FR"
    >
      <nav aria-label="Engraving Zone navigation">
        <ul className="pagination">
          <li className="page-item previous-page-item disabled">
            <a
              tabIndex="0"
              className="page-link previous-page-link gtm-nextpage-btn"
              href="#"
              aria-label="Previous"
            ></a>
          </li>
          <span className="zone-name">Front</span>
          <span className="pagination-number">1/2</span>
          <li className="page-item next-page-item">
            <a
              tabIndex="0"
              className="page-link next-page-link gtm-nextpage-btn"
              href="#"
              aria-label="Next"
              onClick={() => setActiveSide("bk")}
            ></a>
          </li>
        </ul>
      </nav>

      <nav>
        <ul className="nav" id="nav-tab" role="tablist">
          <strong className="font-proxima-bold select-font-name">
            Select Front Font Style
          </strong>
          <li className="nav-item" role="tab">
            <a
              tabIndex="0"
              href="#"
              className="nav-link p-0"
              id="nav-laser-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-laser-0"
              role="tab"
              aria-controls="#nav-laser-0"
              aria-selected={false}
            >
              {/* Switch to Laser Engraving */}
              <span className="d-none d-lg-inline-block">-</span>
              <span
                className="text-decoration-underline gtm-switch-laser-engraving-btn"
                onClick={toggleEngravingType}
              >
                Switch to {engravingType === "laser" ? "Hand" : "Laser"}{" "}
                Engraving
              </span>
            </a>
          </li>
          <li className="nav-item active" role="tab">
            <a
              tabIndex={0}
              href="#"
              className={`nav-link p-0 active`}
              id={`nav-hand-tab`}
              data-bs-toggle={`tab`}
              data-bs-target={`#nav-hand-0`}
              role={`tab`}
              aria-controls={`#nav-hand-0`}
            >
              Switch Hand Engraving Btn
            </a>
          </li>
        </ul>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className={`tab-pane fade ${engravingType === "laser" && "active show"}`}
          id="nav-laser-0"
          role="tabpanel"
          aria-labelledby="nav-laser-tab"
        >
          <div>
            <div className="d-flex font-container">
              <a
                href="javascript:void(0)"
                data-fontlimit="7"
                data-fontname="Rotwang Classic"
                data-templatetype="STD"
                tabindex="0"
                onClick={() => handleFontSelect("Lucida Calligraphy B2")}
                className={`laser-font-click ${selectedFont === "Lucida Calligraphy" ? "active" : ""}`}
              >
                <img
                  src="https://jamesavery.scene7.com/is/image/JamesAvery/Swatch_Font-B2?$sfcc_eng_font$"
                  className={`font-images img-fluid  ${selectedFont === "Lucida Calligraphy" ? "active" : ""} gtm-laserengrave-btn`}
                  alt="Rotwang Classic"
                  data-font-id="B2"
                  itemprop="image"
                />
                <span
                  className="font-code gtm-laserengrave-btn"
                  data-font-id="B2"
                >
                  B2
                </span>
              </a>

              <a
                href="javascript:void(0)"
                className="laser-font-click "
                data-fontlimit="9"
                data-fontname="Optima LT"
                data-templatetype="STD"
                tabindex="0"
                onClick={() => handleFontSelect("Lucida Calligraphy B3")}
              >
                <img
                  src="https://jamesavery.scene7.com/is/image/JamesAvery/Swatch_Font-B3?$sfcc_eng_font$"
                  className="font-images img-fluid  gtm-laserengrave-btn"
                  alt="Optima LT"
                  data-font-id="B3"
                  itemprop="image"
                />
                <span
                  className="font-code gtm-laserengrave-btn"
                  data-font-id="B3"
                >
                  B3
                </span>
              </a>
            </div>
            <div className="content-cta">
              <a
                href="javascript:void(0)"
                className="get-content-details d-inline-flex align-items-center gtm-cyo-laserdetails-btn"
                data-is-laser-engraving="true"
                data-content-asset-id="CYO_laser_engraving-details"
                data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_laser_engraving-details&amp;isModal=true"
                tabindex="0"
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

              <div className="position-relative row m-0 mt-3">
                <div className="col-lg-1 p-0 font-line">Line 1</div>
                <div
                  className={`col-lg-11 input-form ${errorMessages[0] && "error-danger"}`}
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
                      value={fullInput[0]}
                      onChange={(e) => handleTextChange(0, e.target.value)}
                      onFocus={(e) => {
                        setActiveInputIndex(0);
                        setCursorPosition(e.target.selectionStart);
                      }}
                      onClick={(e) => setCursorPosition(e.target.selectionStart)} 

                    />
                    <span className="counter">
                      <span className="current-counter">
                        {fullInput[0].length}
                      </span>
                      /
                      <span className="current-total-counter">{maxLength}</span>
                    </span>
                  </div>

                  <div
                    className={`cyo-error-block cyo-error-message ${!errorMessages[0] && "d-none"}`}
                  >
                    To continue, please remove extra character(s) or try a
                    different font.
                  </div>

                  <div className="cyo-error-block cyo-unsupported-error-message d-none">
                    <span className="unsupported-error-text"></span>
                    <span
                      className="info-icon unsupported-info-icon"
                      data-content-asset-id="CYO_standard_supported-characters"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
                    ></span>
                  </div>
                </div>
              </div>

              <div className="position-relative row m-0 mt-3">
                <div className="col-lg-1 p-0 font-line">Line 2</div>
                <div
                  className={`col-lg-11 input-form ${errorMessages[1] && "error-danger"}`}
                >
                  <div className="input-counter" data-line-count="1">
                    <input
                      name="laserEngravingMessageInput2ForZone0"
                      id="laserEngravingMessageInput2ForZone0"
                      autocomplete="off"
                      placeholder=""
                      data-maxlength="10"
                      type="text"
                      className="form-control"
                      aria-label="laserEngravingMessageInput2ForZone0"
                      data-zone-code="FR"
                      data-template-code="STD_11x8"
                      data-scene7-text=""
                      data-order-line-text=""
                      value={lines[1]}
                      onChange={(e) => handleTextChange(1, e.target.value)}
                      onFocus={(e) => {
                        setActiveInputIndex(1);
                        setCursorPosition(e.target.selectionStart);
                      }}
                      onClick={(e) => setCursorPosition(e.target.selectionStart)} 

                    />
                    <span className="counter">
                      <span className="current-counter">
                        {fullInput[1].length}
                      </span>
                      /
                      <span className="current-total-counter">{maxLength}</span>
                    </span>
                  </div>
                  <div
                    className={`cyo-error-block cyo-error-message ${!errorMessages[1] && "d-none"}`}
                  >
                    To continue, please remove extra character(s) or try a
                    different font.
                  </div>
                  <div className="cyo-error-block cyo-unsupported-error-message d-none">
                    <span className="unsupported-error-text"></span>
                    <span
                      className="info-icon unsupported-info-icon"
                      data-content-asset-id="CYO_standard_supported-characters"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
                    ></span>
                  </div>
                </div>
              </div>

              <div className="position-relative row m-0 mt-3">
                <div className="col-lg-1 p-0 font-line">Line 3</div>
                <div className="col-lg-11 input-form">
                  <div className="input-counter" data-line-count="0">
                    <input
                      name="laserEngravingMessageInput3ForZone0"
                      id="laserEngravingMessageInput3ForZone0"
                      autocomplete="off"
                      placeholder=""
                      data-maxlength="10"
                      type="text"
                      className="form-control"
                      aria-label="laserEngravingMessageInput3ForZone0"
                      data-zone-code="FR"
                      data-template-code="STD_11x8"
                      data-scene7-text=""
                      data-order-line-text=""
                      value=""
                    />
                    <span className="counter">
                      <span className="current-counter">0</span>/
                      <span className="current-total-counter">10</span>
                    </span>
                  </div>
                  <div className="cyo-error-block cyo-error-message d-none"></div>
                  <div className="cyo-error-block cyo-unsupported-error-message d-none">
                    <span className="unsupported-error-text"></span>
                    <span
                      className="info-icon unsupported-info-icon"
                      data-content-asset-id="CYO_standard_supported-characters"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
                    ></span>
                  </div>
                </div>
              </div>

              <div className="position-relative row m-0 mt-3">
                <div className="col-lg-1 p-0 font-line">Line 4</div>
                <div className="col-lg-11 input-form">
                  <div className="input-counter" data-line-count="0">
                    <input
                      name="laserEngravingMessageInput4ForZone0"
                      id="laserEngravingMessageInput4ForZone0"
                      autocomplete="off"
                      placeholder=""
                      data-maxlength="10"
                      type="text"
                      className="form-control"
                      aria-label="laserEngravingMessageInput4ForZone0"
                      data-zone-code="FR"
                      data-template-code="STD_11x8"
                      data-scene7-text=""
                      data-order-line-text=""
                      value=""
                    />
                    <span className="counter">
                      <span className="current-counter">0</span>/
                      <span className="current-total-counter">10</span>
                    </span>
                  </div>
                  <div className="cyo-error-block cyo-error-message d-none"></div>
                  <div className="cyo-error-block cyo-unsupported-error-message d-none">
                    <span className="unsupported-error-text"></span>
                    <span
                      className="info-icon unsupported-info-icon"
                      data-content-asset-id="CYO_standard_supported-characters"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
                    ></span>
                  </div>
                </div>
              </div>

              <div className="symbols-container hide-row">
                <div className="d-flex symbol-objects">
                  <div className="symbol-text">Symbols</div>
                  <div className="symbols">
                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="9875"
                      data-symbol-id="SY101"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="C"
                      onClick={handleSymbolClick}

                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY101?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Anchor"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10504"
                      data-symbol-id="SY102"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="T"
                      onClick={handleSymbolClick}

                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY102?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Anchor Cross"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="65228"
                      data-symbol-id="SY103"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="R"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY103?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Awareness Ribbon"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="1046"
                      data-symbol-id="SY104"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="I"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY104?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Butterfly"
                        itemprop="image"
                      />
                    </a>

                   

                   

                   

               

                 

                   
                  </div>
                  <a
                    tabindex="0"
                    href="javascript:void(0)"
                    className="see-more-symbols gtm-seemore-symbols"
                    data-hide="true"
                    data-see-more="See More"
                    data-see-less="See Fewer"
                  >
                    See More
                  </a>
                </div>
                <div className="col-lg-11 cyo-selection-error-message d-none p-0"></div>
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
                    tabindex="0"
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
                      maxlength="1"
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
                      maxlength="1"
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
                      maxlength="1"
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

        <div
          className={`tab-pane fade ${engravingType === "hand" && "active show"}`}
          id="nav-hand-0"
          role="tabpanel"
          aria-labelledby="nav-hand-tab"
        >
          <div>
            <div className="d-flex font-container">
              <a
                tabindex="0"
                href="javascript:void(0)"
                className="hand-font-click active"
                data-fontlimit="4"
                data-fontname="S18"
                data-templatetype="STD"
              >
                <img
                  src="https://jamesavery.scene7.com/is/image/JamesAvery/Swatch_Font-S18?$sfcc_eng_font$"
                  className="font-images gtm-handengrave-btn img-fluid active"
                  alt="S18"
                  data-font-id="S18"
                  itemprop="image"
                />
                <span
                  className="font-code gtm-handengrave-btn"
                  data-font-id="S18"
                >
                  S18
                </span>
              </a>

              <a
                tabindex="0"
                href="javascript:void(0)"
                className="hand-font-click "
                data-fontlimit="2"
                data-fontname="S20"
                data-templatetype="STD"
              >
                <img
                  src="https://jamesavery.scene7.com/is/image/JamesAvery/Swatch_Font-S20?$sfcc_eng_font$"
                  className="font-images gtm-handengrave-btn img-fluid "
                  alt="S20"
                  data-font-id="S20"
                  itemprop="image"
                />
                <span
                  className="font-code gtm-handengrave-btn"
                  data-font-id="S20"
                >
                  S20
                </span>
              </a>
            </div>
            <div className="content-cta">
              <a
                tabindex="0"
                href="javascript:void(0)"
                className="get-content-details d-inline-flex align-items-center gtm-cyo-handdetails-btn"
                data-is-hand-engraving="true"
                data-content-asset-id="CYO_hand_engraving-details"
                data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_hand_engraving-details&amp;isModal=true"
              >
                <span className="info-icon"></span>
                <span className="info-icon-text">Hand Engraving Details</span>
              </a>
            </div>
            <div
              className="std-inputs "
              data-total-count="0"
              data-engraving-type="hand"
            >
              <strong className="font-proxima-bold select-zone-name">
                Add Front Message
              </strong>
              <div className="col-lg-11 cyoeng-restriction-errmsg d-none pl-0 mb-2 mt-2"></div>

              <div className="position-relative row m-0 mt-3">
                <div className="col-lg-1 p-0 font-line">Line 1</div>
                <div className="col-lg-11 input-form">
                  <div className="input-counter" data-line-count="0">
                    <input
                      name="handEngravingMessageInput1ForZone0"
                      id="handEngravingMessageInput1ForZone0"
                      autocomplete="off"
                      placeholder=""
                      data-maxlength="4"
                      type="text"
                      aria-label="handEngravingMessageInput1ForZone0"
                      className="form-control"
                      value=""
                    />
                    <span className="counter">
                      <span className="current-counter">0</span>/
                      <span className="current-total-counter">4</span>
                    </span>
                  </div>
                  <div className="cyo-error-block cyo-error-message d-none"></div>
                  <div className="cyo-error-block cyo-unsupported-error-message d-none">
                    <span className="unsupported-error-text"></span>
                    <span
                      className="info-icon unsupported-info-icon"
                      data-content-asset-id="CYO_standard_supported-characters"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
                    ></span>
                  </div>
                </div>
              </div>

              <div className="position-relative row m-0 mt-3">
                <div className="col-lg-1 p-0 font-line">Line 2</div>
                <div className="col-lg-11 input-form">
                  <div className="input-counter" data-line-count="0">
                    <input
                      name="handEngravingMessageInput2ForZone0"
                      id="handEngravingMessageInput2ForZone0"
                      autocomplete="off"
                      placeholder=""
                      data-maxlength="4"
                      type="text"
                      aria-label="handEngravingMessageInput2ForZone0"
                      className="form-control"
                      value=""
                    />
                    <span className="counter">
                      <span className="current-counter">0</span>/
                      <span className="current-total-counter">4</span>
                    </span>
                  </div>
                  <div className="cyo-error-block cyo-error-message d-none"></div>
                  <div className="cyo-error-block cyo-unsupported-error-message d-none">
                    <span className="unsupported-error-text"></span>
                    <span
                      className="info-icon unsupported-info-icon"
                      data-content-asset-id="CYO_standard_supported-characters"
                      data-href="/on/demandware.store/Sites-JamesAvery-Site/en_US/Product-GetContentAssetDetails?contentAssetID=CYO_standard_supported-characters&amp;isModal=true"
                    ></span>
                  </div>
                </div>
              </div>

              <div className="symbols-container hide-row">
                <div className="d-flex symbol-objects">
                  <div className="symbol-text">Symbols</div>
                  <div className="symbols">
                    <a
                      tabindex="0"
                      href="javascript:void(0)"
                      data-symbol-id="SY201"
                      className="hand-symbol-click"
                      data-active-input=""
                      data-decimalcode="9875"
                      data-charlimit="2"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY201?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-handengrave-symbols"
                        alt="Anchor"
                        itemprop="image"
                      />
                    </a>

                    <a
                      tabindex="0"
                      href="javascript:void(0)"
                      data-symbol-id="SY202"
                      className="hand-symbol-click"
                      data-active-input=""
                      data-decimalcode="10504"
                      data-charlimit="2"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY202?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-handengrave-symbols"
                        alt="Anchor Cross"
                        itemprop="image"
                      />
                    </a>
                  </div>
                  <a
                    tabindex="0"
                    href="javascript:void(0)"
                    className="see-more-symbols gtm-seemore-symbols"
                    data-hide="true"
                    data-see-more="See More"
                    data-see-less="See Fewer"
                  >
                    See More
                  </a>
                </div>
                <div className="col-lg-11 cyo-selection-error-message d-none p-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EngravingFrontSide;
