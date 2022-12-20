import {createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import initialState from "./initialState";



export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        initialDuration(state, action) {
            state.currentTrack.duration = transformationTimer(action.payload);
        },
        changeIsPlaying(state) {
            state.currentTrack.isPlaying = !state.currentTrack.isPlaying;
        },
        changeCurrentTime(state, action) {
            state.currentTrack.progress = ((action.payload.currentTime / action.payload.duration) * 100) + '%';
            state.currentTrack.currentTime = transformationTimer(action.payload.currentTime);
        },
        changeVolume(state, action) {
            let mouseX = Math.floor(action.payload.pageX - action.payload.offsetLeft);
            let progress = mouseX / (action.payload.offsetWidth / 100);
            state.currentTrack.volumeProgress = 1 * (progress / 100);
        },
        toogleVolume(state) {
            state.currentTrack.isVolume = !state.currentTrack.isVolume;

            if (!state.currentTrack.isVolume) {
                state.currentTrack.saveVolumeProp = state.currentTrack.volumeProgress;
                state.currentTrack.volumeProgress = 0;
            }
            else state.currentTrack.volumeProgress = state.currentTrack.saveVolumeProp;
        }
        ,
        changeTrack(state, action) {

            if (action.payload.className === 'next-song') {
                state.currentTrack.id < state.trackList.length - 1 ? state.currentTrack.id += 1 : state.currentTrack.id = 0;
            }
            else if (action.payload.className === 'previouse-song') {
                state.currentTrack.id === 0 ? state.currentTrack.id = state.trackList.length - 1 : state.currentTrack.id -= 1;
            }
            else {
                state.currentTrack.id = action.payload.id;
            }
            state.currentTrack = {
                ...state.currentTrack,
                ...state.trackList[state.currentTrack.id],
            };
        }
    }
})

function transformationTimer (time: number) {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time - minutes * 60);
    const minutesString: string = minutes < 10 ? '0' + minutes : String(minutes);
    const secondsString: string = seconds < 10 ? '0' + seconds : String(seconds);

    return `${minutesString}:${secondsString}`;
}

export const { initialDuration, changeIsPlaying, changeCurrentTime, changeTrack, changeVolume, toogleVolume } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.playerReducer;

export default playerSlice.reducer;