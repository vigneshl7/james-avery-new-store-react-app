import React from "react";

const Symbols = ({ handleSymbolClick, symbol, index }) => {
  const {
    charCount,
    decimalCode,
    hexCode,
    scene7SymbolCode,
    symbolID,
    symbolName,
    symbolScene7Url,
    templateType,
  } = symbol;
  return (
    <>
      <a
        href="#"
        className="laser-symbol-click"
        data-active-input=""
        data-decimalcode={decimalCode}
        data-symbol-id={symbolID}
        tabIndex={index}
        data-charlimit={charCount}
        data-scene7code={scene7SymbolCode}
        onClick={(e) => {
          e.preventDefault();
          handleSymbolClick(e);
        }}
      >
        <img
          src={symbolScene7Url}
          className="symbol-images img-fluid gtm-cyo-laserengrave-symbols"
          alt={symbolName}
          itemProp="image"
        />
      </a>
    </>
  );
};

export default Symbols;
