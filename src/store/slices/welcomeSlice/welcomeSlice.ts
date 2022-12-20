import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "./initialState";

type TTimer = {
    hours: number;
    minutes: number;
    seconds: number;
}

type TDate = {
    day: number;
    weekDay: number;
    monthDay: number;
}

export const welcomeSlice = createSlice({
    name: 'welcome',
    initialState,
    reducers: {
        setHours(state, action: PayloadAction<number>) {
            state.hours = new Date().getHours();
        },
        setTime(state, action: PayloadAction<TTimer>) {
            const { hours: h, minutes: m, seconds: s } = action.payload;
            const hours: string = `${h < 10 ? '0' + h : h}`;
            const minutes: string = `${m < 10 ? '0' + m : m}`;
            const seconds: string = `${s < 10 ? '0' + s : s}`;

            state.time = `${hours} : ${minutes} : ${seconds}`;
        },
        setDate(state, action: PayloadAction<TDate>) {
            const listMonthDay: string[] = [
                'January', 'February', 'March',
                'April', 'May', 'June', 'July',
                'August', 'September', 'October',
                'November', 'December'
            ];
            const listWeekDay: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const { day, weekDay, monthDay } = action.payload;

            state.date = `${listWeekDay[weekDay]}, ${listMonthDay[monthDay]} ${day}`;
        },
        setGreeting(state, action: PayloadAction<number>) {
            if (action.payload >= 0 && action.payload < 6) {
                state.currentGreeting = `night`;
            }
            else if (action.payload >= 6 && action.payload < 12) {
                state.currentGreeting = `morning`;
            }
            else if (action.payload >= 12 && action.payload < 18) {
                state.currentGreeting = `afternoon`;
            }
            else {
                state.currentGreeting = `evening`;
            }
        },
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        }
    }
});

export const { setTime, setDate, setGreeting, setName, setHours } = welcomeSlice.actions;

export default welcomeSlice.reducer;