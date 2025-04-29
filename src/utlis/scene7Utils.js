
export const encodeScene7Safe = (char) => {
    const map = {
      "#": "%23",
      "%": "%25",
      "&": "%26",
      "(": "%28",
      ")": "%29",
      "{": "%5C%7B",
      "}": "%5C%7D",
      "\\": "%5C%5C",
      "+":"%2B",
    };
    return map[char] || char;
  };
  
  export const getScene7Text = (text = "", symbolMap = {}) => {
    let result = "";
  
    for (const char of text) {
      if (symbolMap[char]) {
        result += `\\f1${symbolMap[char]}\\f0+`; // Symbol
      } else {
        result += encodeScene7Safe(char); // Special chars escaped here
      }
    }
  
    return result;
  };
  