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