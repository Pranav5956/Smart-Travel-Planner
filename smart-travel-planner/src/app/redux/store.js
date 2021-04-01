import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./features/Map";
import themeReducer from "./features/Theme";

export default configureStore({
  reducer: {
    map: mapReducer,
    theme: themeReducer,
  },
});
