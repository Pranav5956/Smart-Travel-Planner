import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./features/Map";
import themeReducer from "./features/Theme";
import authReducer from "./features/Auth";

export default configureStore({
  reducer: {
    map: mapReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});
