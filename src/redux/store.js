import { configureStore } from '@reduxjs/toolkit';
import engravingReducer from './features/engraving/engravingSlice';

export const store = configureStore({
  reducer: {
    engraving: engravingReducer,
  },
});
