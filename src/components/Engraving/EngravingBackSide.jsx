import React, { useState } from "react";

const EngravingBackSide = ({ setActiveSide }) => {
  const [engravingType, setEngravingType] = useState("laser"); // 'laser' or 'hand'
  const toggleEngravingType = () => {
    setEngravingType((prev) => (prev === "laser" ? "hand" : "laser"));
    // onUpdate(side, text, selectedFont, engravingType);
  };
  console.log("engravingType",engravingType)
  return (
    <div
      className="engraving-zone active"
      data-scene7-zone=""
      data-eng-zone-code="FR"
    >
      <nav aria-label="Engraving Zone navigation">
        <ul className="pagination">
          <li className="page-item previous-page-item ">
            <a
              tabIndex="0"
              className="page-link previous-page-link gtm-nextpage-btn"
              href="#"
              aria-label="Previous"
              onClick={() => setActiveSide("fr")}
            ></a>
          </li>
          <span className="zone-name">Back</span>
          <span className="pagination-number">2/2</span>
          <li className="page-item next-page-item disabled">
            <a
              tabIndex="0"
              className="page-link next-page-link gtm-nextpage-btn disabled"
              href="#"
              aria-label="Next"
            ></a>
          </li>
        </ul>
      </nav>

      <nav>
        <ul className="nav" id="nav-tab" role="tablist">
          <strong className="font-proxima-bold select-font-name">
            Select Back Font Style
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
                className="laser-font-click "
                data-fontlimit="7"
                data-fontname="Rotwang Classic"
                data-templatetype="STD"
                tabindex="0"
              >
                <img
                  src="https://jamesavery.scene7.com/is/image/JamesAvery/Swatch_Font-B2?$sfcc_eng_font$"
                  className="font-images img-fluid  gtm-laserengrave-btn"
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
                <div className="col-lg-11 input-form">
                  <div className="input-counter" data-line-count="0">
                    <input
                      name="laserEngravingMessageInput1ForZone0"
                      id="laserEngravingMessageInput1ForZone0"
                      autocomplete="off"
                      placeholder=""
                      data-maxlength="10"
                      type="text"
                      className="form-control"
                      aria-label="laserEngravingMessageInput1ForZone0"
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
                <div className="col-lg-1 p-0 font-line">Line 2</div>
                <div className="col-lg-11 input-form">
                  <div className="input-counter" data-line-count="0">
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

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10535"
                      data-symbol-id="SY105"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="B"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY105?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Crossed Arrows"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="8910"
                      data-symbol-id="SY106"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="P"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY106?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Dove"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10593"
                      data-symbol-id="SY107"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="D"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY107?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Fish Hook"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10025"
                      data-symbol-id="SY108"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="J"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY108?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Five Point Star"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10013"
                      data-symbol-id="SY109"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="E"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY109?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Flared Cross"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="9884"
                      data-symbol-id="SY110"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="K"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY110?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Fleur de Lis"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10047"
                      data-symbol-id="SY111"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="M"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY111?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Flower"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="9752"
                      data-symbol-id="SY112"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="A"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY112?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Four Leaf Clover"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10084"
                      data-symbol-id="SY113"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="S"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY113?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Heart"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="8733"
                      data-symbol-id="SY114"
                      tabindex="0"
                      data-charlimit="3"
                      data-scene7code="F"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY114?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Ichthus"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="8734"
                      data-symbol-id="SY115"
                      tabindex="0"
                      data-charlimit="4"
                      data-scene7code="O"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY115?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Infinity"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10083"
                      data-symbol-id="SY116"
                      tabindex="0"
                      data-charlimit="3"
                      data-scene7code="N"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY116?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Interlocking Hearts"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="9825"
                      data-symbol-id="SY117"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="L"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY117?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Mother's Love"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10017"
                      data-symbol-id="SY118"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="G"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY118?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Star of David"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="9837"
                      data-symbol-id="SY119"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="H"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY119?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Treble Clef"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="8258"
                      data-symbol-id="SY120"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="Q"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY120?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Trinity"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="10086"
                      data-symbol-id="SY121"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="U"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY121?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Heart with Arrow"
                        itemprop="image"
                      />
                    </a>

                    <a
                      href="javascript:void(0)"
                      className="laser-symbol-click"
                      data-active-input=""
                      data-decimalcode="932"
                      data-symbol-id="SY122"
                      tabindex="0"
                      data-charlimit="2"
                      data-scene7code="V"
                    >
                      <img
                        src="https://jamesavery.scene7.com/is/image/JamesAvery/SYMBOL_SY122?$engrave_symbol_wide_2x$"
                        className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
                        alt="Texas"
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

export default EngravingBackSide;
