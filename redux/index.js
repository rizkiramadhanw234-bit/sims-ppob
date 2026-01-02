import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import balanceReducer from "./balanceSlice";
import servicesReducer from "./servicesSlice";
import bannerReducer from "./bannerSlice";
import topupReducer from "./topUpSlice"; 
import pembayaranReducer from "./pembayaranSlice";
import historyReducer from "./historySlice";
import uiSlice from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    balance: balanceReducer,
    services: servicesReducer,
    banner: bannerReducer,
    topup: topupReducer,   
    pembayaran: pembayaranReducer,
    history: historyReducer,
    ui: uiSlice,
  },
});
