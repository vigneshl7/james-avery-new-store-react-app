export const selectZoneData = (state, zone) => ({
  fullInput: state.engraving.fullInput[zone],
  lines: state.engraving.lines[zone],
  selectedFont: state.engraving.selectedFont[zone],
  errors: state.engraving.errorMessages[zone],
  activeInputIndex: state.engraving.activeInputIndex[zone],
  cursorPosition: state.engraving.cursorPosition[zone],
  engravingType: state.engraving.engravingTypeByZone[zone],
});

export const selectModel = (state) => state.engraving.isModelOpen;
export const errorModel = (state) => state.engraving.iserrorModelOpen;
export const monoInitialModel = (state) => state.engraving.ismonoGramModelOpen;
export const unsupportedCharModel = (state) => state.engraving.isUnSupportedCharacterModelOpen;


export const selectEngravingData = (state) => state.engraving.engravingData;
export const hasErrorMessage = (state) => state.engraving.hasErrorMessage;
export const selectEngravingCurrentType = (state) =>
  state.engraving?.engravingCurrentType;
