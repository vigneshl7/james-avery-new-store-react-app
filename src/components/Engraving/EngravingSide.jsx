import React, { useState } from "react";

const EngravingSide = ({ side, onUpdate }) => {
  const [engravingType, setEngravingType] = useState("laser"); // 'laser' or 'hand'
  const [selectedFont, setSelectedFont] = useState(null);
  const [text, setText] = useState("");

  const handleFontSelect = (font) => {
    setSelectedFont(font);
    onUpdate(side, text, font, engravingType);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    onUpdate(side, event.target.value, selectedFont, engravingType);
  };

  const toggleEngravingType = () => {
    setEngravingType((prev) => (prev === "laser" ? "hand" : "laser"));
    onUpdate(side, text, selectedFont, engravingType);
  };

  return (
    <div className="engraving-zone" data-eng-zone-code={side.toUpperCase()}>
      <nav aria-label="Engraving Zone navigation">
        <ul className="pagination">
          <span className="zone-name">{side === "fr" ? "Front" : "Back"}</span>
        </ul>
      </nav>

      <div>
        <strong>Select {side === "fr" ? "Front" : "Back"} Font Style</strong>
        <button onClick={toggleEngravingType}>
          Switch to {engravingType === "laser" ? "Hand" : "Laser"} Engraving
        </button>
      </div>

      <div className="font-container">
        {engravingType === "laser" ? (
          <button onClick={() => handleFontSelect("Lucida Calligraphy")}>Lucida Calligraphy</button>
        ) : (
          <button onClick={() => handleFontSelect("Hand Script")}>Hand Script</button>
        )}
      </div>

      <div>
        <strong>Add {side === "fr" ? "Front" : "Back"} Message</strong>
        <input type="text" value={text} onChange={handleTextChange} maxLength={10} />
      </div>
    </div>
  );
};

export default EngravingSide;
