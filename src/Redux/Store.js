import { configureStore } from "@reduxjs/toolkit";

import storingData from './Action';

export const Store = configureStore({
  reducer: {
    display: storingData
  },
});
