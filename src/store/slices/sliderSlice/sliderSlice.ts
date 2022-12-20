import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "./initialState";

export const sliderSlice = createSlice({
    name: 'welcome',
    initialState,
    reducers: {
        setUrl ( state, action:PayloadAction<string>) {
            if (action.payload) {
                state.url = `https://raw.githubusercontent.com/thelionblack/momentum-img/main/images/${action.payload}/`;
            }
        },
        setId (state, action: PayloadAction<number>) {
            if (action.payload === 21) state.id = 1;
            else if (action.payload === 0) state.id = 20;
            else state.id = action.payload;
        },
        isButton ( state, action: PayloadAction<string> ) {
            if (action.payload === 'isButtonPrev') state.isButtonPrev = !state.isButtonPrev;
            else if (action.payload === 'isButtonNext') state.isButtonNext = !state.isButtonNext;
            else {
                state.isButtonPrev = false;
                state.isButtonNext = false;
            }
        }
    }
});

export const { setUrl, setId, isButton } = sliderSlice.actions;

export default sliderSlice.reducer;