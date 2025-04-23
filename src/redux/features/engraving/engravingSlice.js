import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  engravingData: {},
  engravingCurrentType: "laser",
  isModelOpen: { isOpen: false, type: "laser" },
  hasErrorMessage: false,
  iserrorModelOpen: false,
  ismonoGramModelOpen: false,
  isUnSupportedCharacterModelOpen: false,

};

// Initializes engravingData based on zone attributes
const getInitialEngravingData = (attributes = []) => {
  const initial = {};

  attributes.forEach((side) => {
    const zoneKey = side.itemZoneCode.toLowerCase();
    initial[zoneKey] = {};

    if (side.maxRowsLaser && side.maxRowsLaser.length > 0) {
      initial[zoneKey].laser = {
        text: [],
        monoText: [],
        fontName: "",
        fontCode: "",
        symbol: {},
        sortedEngravingSkuAttributes: side,
      };
    }

    if (side.maxRowHand && side.maxRowHand.length > 0) {
      initial[zoneKey].hand = {
        text: [],
        monoText: [],
        fontName: "",
        fontCode: "",
        symbol: {},
        sortedEngravingSkuAttributes: side,
      };
    }
  });

  return initial;
};

const engravingSlice = createSlice({
  name: "engraving",
  initialState,
  reducers: {
    // Initializes the state from backend attributes
    initializeEngravingData: (state, action) => {
      const attributes = action.payload || [];
      state.engravingData = getInitialEngravingData(attributes);
    },

    // Sets default values for a zone and engraving type
    setDefaultEngravingForZone: (state, { payload }) => {
      const { side, type, text, fontName, fontCode, monoText } = payload;

      if (!state.engravingData[side]) {
        state.engravingData[side] = {};
      }

      if (!state.engravingData[side][type]) {
        state.engravingData[side][type] = {
          text: [],
          monoText: [],
          fontName: "",
          fontCode: "",
          symbol: {},
          sortedEngravingSkuAttributes: {},
        };
      }

      state.engravingData[side][type] = {
        ...state.engravingData[side][type],
        text,
        monoText,
        fontName,
        fontCode,
      };
    },

    // Updates partial engraving data like text, fontName, fontCode, or symbols
    setEngravingData: (state, { payload }) => {
      const { side, type, text, monoText, fontName, fontCode, symbol } =
        payload;

      if (!state.engravingData[side]?.[type]) return;

      if (text) state.engravingData[side][type].text = text;
      if (monoText) state.engravingData[side][type].monoText = monoText;

      if (fontName) state.engravingData[side][type].fontName = fontName;
      if (fontCode) state.engravingData[side][type].fontCode = fontCode;
      if (symbol) {
        state.engravingData[side][type].symbol = {
          ...state.engravingData[side][type].symbol,
          ...symbol,
        };
      }
    },

    // Updates only font info for a specific zone and type
    updateFont: (state, { payload }) => {
      const { side, type, fontCode, fontName } = payload;

      if (!state.engravingData[side]?.[type]) return;

      state.engravingData[side][type].fontCode = fontCode;
      state.engravingData[side][type].fontName = fontName;
    },

    // Updates a specific line of text for a zone/type/line index
    updatEngravingText: (state, { payload }) => {
      const { side, type, value, index, symbol } = payload;

      if (!state.engravingData[side]?.[type]?.text) return;

      state.engravingData[side][type].text[index] = value;
      if (symbol) {
        state.engravingData[side][type].symbol = {
          ...state.engravingData[side][type].symbol,
          ...symbol,
        };
      }
    },
    updatEngravingMonoText: (state, { payload }) => {
      const { side, type, value, index } = payload;

      if (!state.engravingData[side]?.[type]?.monoText) return;

      state.engravingData[side][type].monoText[index] = value;
    },

    // Model open state for engraving details
    setModelOpen: (state, { payload }) => {
      state.isModelOpen = payload;
    },

    // Error modal open/close
    setErrorModelOpen: (state, { payload }) => {
      state.iserrorModelOpen = payload.isOpen;
    },
    setMonoGramModelOpen: (state, { payload }) => {
      state.ismonoGramModelOpen = payload.isOpen;
    },
    setUnSupportedCharacterModelOpen: (state, { payload }) => {
      state.isUnSupportedCharacterModelOpen = payload.isOpen;
    },

    // Global error flag
    updateHasError: (state, { payload }) => {
      state.hasErrorMessage = payload.isError;
    },
    setEngravingCurrentType: (state, { payload }) => {
      state.engravingCurrentType = payload;
    },
  },
});

export const {
  initializeEngravingData,
  setDefaultEngravingForZone,
  setEngravingData,
  updateFont,
  updatEngravingText,
  updatEngravingMonoText,
  setModelOpen,
  setErrorModelOpen,
  setMonoGramModelOpen,
  setUnSupportedCharacterModelOpen,
  updateHasError,
  setEngravingCurrentType,
} = engravingSlice.actions;

export default engravingSlice.reducer;
