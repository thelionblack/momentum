import aquaCaelestis from './../../../assets/sounds/assets_sounds_AquaCaelestis.mp3';
import summerWind from "./../../../assets/sounds/assets_sounds_Summer Wind.mp3";
import riverFlowsInYou from "./../../../assets/sounds/assets_sounds_River Flows In You.mp3";
import lofiStudy from "./../../../assets/sounds/lofi-study.mp3";
import ennioMorricone from "./../../../assets/sounds/assets_sounds_Ennio Morricone.mp3";
import calmBackgroundForVideo from "./../../../assets/sounds/calm-background-for-video.mp3";
import pleaseCalmMyMind from "./../../../assets/sounds/please-calm-my-mind.mp3";
import theBeatOfNature from './../../../assets/sounds/the-beat-of-nature.mp3';

type TrackType = {
     readonly title: string;
     readonly path: string;
}

interface IInitialState {
    trackList: TrackType[];
    currentTrack: {
        id: number,
        isPlaying: boolean,
        title: string,
        path: string,
        currentTime: string,
        duration: string,
        progress: string | 0,
        isVolume: boolean,
        volumeProgress: number,
        saveVolumeProp: number,
    };
}

const initialState: IInitialState = {
    trackList: [
        {
            title: 'Aqua Caelestis',
            path: aquaCaelestis,
        },
        {
            title: 'Summer Wind',
            path: summerWind,
        },
        {
            title: 'River Flows In You',
            path: riverFlowsInYou,
        },
        {
            title: 'Lofi Study',
            path: lofiStudy,
        },
        {
            title: 'Ennio Morricone',
            path: ennioMorricone,
        },
        {
            title: 'Calm Background For Video',
            path: calmBackgroundForVideo,
        },
        {
            title: 'Please Calm My Mind',
            path: pleaseCalmMyMind,
        },
        {
            title: 'the Beat Of Nature',
            path: theBeatOfNature,
        },
    ],
    currentTrack: {
        id: 0,
        isPlaying: false,
        title: 'Aqua Caelestis',
        path: aquaCaelestis,
        currentTime: '00:00',
        duration: '00:00',
        progress: 0,
        isVolume: true,
        volumeProgress: 0.01,
        saveVolumeProp: 0,
    }
}

export default initialState;