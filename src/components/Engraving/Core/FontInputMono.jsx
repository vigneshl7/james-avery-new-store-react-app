import React from "react";

const FontInputMono = ({
  text,
  activeSide,
  index,
  handleMonoTextChange,
  value,
}) => {
  return (
    <>
      <div className="input-container">
        <input
          name={`engravingMessageInput${index}ForZone${index}`}
          id={`engravingMessageInput${index}ForZone${index}`}
          autoComplete="off"
          placeholder=""
          maxLength="1"
          type="text"
          className="mono-form-control"
          // onKeyDown="return /[a-zA-Z]/i.test(event.key)"
          data-zone-code={activeSide.toUpperCase()}
          data-template-code="MONO_11x8"
          value={value}
          onChange={(e) => handleMonoTextChange(index, text, e.target.value)}
        />
        <div
          className={`input-text ${["first", "middle"].includes(text.toLowerCase()) ? "adjust-position" : ""}`}
        >
          {text}
        </div>
      </div>
    </>
  );
};

export default FontInputMono;
