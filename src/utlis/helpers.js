// Returns true if any bad word appears as a whole word (case-insensitive)
  export function containsBadWordWholeWord(text, badWords) {
    return badWords.some((word) => {
      // Escape regex special chars in bad word
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // Create regex to match whole word, case-insensitive
      const regex = new RegExp(`\\b${escapedWord}\\b`, "i");
      return regex.test(text);
    });
  }
  // Checks if there are unsupported characters, allowing symbols in symbolCharLimits
  export function isUnsupportedCharFound(str, allowedSymbols = {}) {
    for (let char of str) {
      if (allowedSymbols[char]) continue; // allowed symbol
      if (/^[\x20-\x7E]$/.test(char)) continue; // allowed by our regex
      return true; // unsupported character found
    }
    return false; // all characters are supported
  }

  export const getEngravingPricePayload = ({ engravingData, activeSide, engravingType, pid }) => {
    const laserCharacters = [];
    const handCharacters = [];
  
    const oppositeSide = activeSide === "fr" ? "bk" : "fr";
  
    // Utility to flatten text lines into one string
    const flattenText = (lines = []) => lines.filter(Boolean).join("");
  
    if (engravingType === "laser") {
      // Front or back laser
      const laserText = flattenText(engravingData[activeSide]?.laser?.text);
      if (laserText) laserCharacters.push(laserText);
  
      const oppositeHand = flattenText(engravingData[oppositeSide]?.hand?.text);
      if (oppositeHand) handCharacters.push(oppositeHand);
    }
  
    if (engravingType === "hand") {
      // Both sides hand text
      const frontHand = flattenText(engravingData["fr"]?.hand?.text);
      const backHand = flattenText(engravingData["bk"]?.hand?.text);
  
      if (frontHand) handCharacters.push(frontHand);
      if (backHand) handCharacters.push(backHand);
    }
  
    return {
      pid,
      laserCharacters: laserCharacters.join(""),
      laserMonoCharacters: "",
      handCharacters: handCharacters.join(""),
      handMonoCharacters: "",
    };
  };
  
  