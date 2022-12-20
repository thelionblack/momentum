import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import playerReducer from "./slices/playerSlice/playerSlice";
import welcomeReducer from  "./slices/welcomeSlice/welcomeSlice";
import sliderReducer from  "./slices/sliderSlice/sliderSlice";
import { quotesApi } from "./slices/quotesSlice/quotesApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {weatherApi} from "./slices/weatherSlice/weatherApi";

const store = configureStore({
    reducer: {
        playerReducer,
        welcomeReducer,
        sliderReducer,
        quotesApi: quotesApi.reducer,
        weatherApi: weatherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(quotesApi.middleware, weatherApi.middleware),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useOwnDispatch: () => AppDispatch = useDispatch;
export const useOwnSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store