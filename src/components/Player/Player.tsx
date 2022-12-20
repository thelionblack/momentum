import React, {useEffect, useRef} from 'react';
import prevSong from "../../assets/img/playPrev.svg";
import playSong from "../../assets/img/play.svg";
import pauseSong from "../../assets/img/pause.svg";
import nextSong from "../../assets/img/playNext.svg";
import sound from  '../../assets/img/volume.svg';
import soundMute from '../../assets/img/volume-mute.svg'
import { useOwnDispatch, useOwnSelector } from "../../store/store";
import { initialDuration, changeIsPlaying, changeCurrentTime, changeTrack, changeVolume, toogleVolume } from './../../store/slices/playerSlice/playerSlice';

const Player = () => {
    const {trackList, currentTrack} = useOwnSelector(state => state.playerReducer);
    const dispatch = useOwnDispatch();
    const audioRef = useRef<HTMLAudioElement>(null);
    const playSongPath = playSong.toString();
    const pauseSongPath = pauseSong.toString();
    const soundPath =  sound.toString();
    const soundMutePath = soundMute.toString();
    const prevSongPath = prevSong.toString();
    const nextSongPath = nextSong.toString();

    const handlerOnPlaying = () => {
        dispatch(changeIsPlaying());

        if (currentTrack.isPlaying) audioRef.current?.pause();
        else audioRef.current?.play()

    }

    useEffect(() => {
        if (currentTrack.isPlaying) audioRef.current?.play();
    }, [currentTrack.path]);

    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.volume = currentTrack.volumeProgress
    }, [currentTrack.volumeProgress]);


    return (
        <div className="player">
            <audio
                ref={audioRef}
                src={currentTrack.path}
                onDurationChange={(event: React.ChangeEvent<HTMLAudioElement>) => dispatch(initialDuration(event.target.duration))}
                onTimeUpdate={(event: React.ChangeEvent<HTMLAudioElement>) => dispatch(changeCurrentTime({

                    currentTime: event.target.currentTime,
                    duration: event.target.duration,
                }))}
                onEnded={(event) => {
                    dispatch(changeTrack({id: currentTrack.id + 1}))
                }}
            ></audio>
            <div className='controls-panel'>
                <img className='previouse-song' src={prevSongPath}
                     alt='previous sound'
                     onClick={(event: React.MouseEvent<HTMLImageElement>) => {
                         dispatch(changeTrack({className: event.currentTarget.className}));
                     }}
                />
                <img
                    className='play-or-pause'
                    src={!currentTrack.isPlaying ? playSongPath : pauseSongPath}
                    alt='play or pause sound'
                    onClick={handlerOnPlaying}
                />
                <img className='next-song'
                     src={nextSongPath} alt='next sound'
                     onClick={(event: React.MouseEvent<HTMLImageElement>) => {

                         dispatch(changeTrack({className: event.currentTarget.className}));
                     }}
                />
                <h3 className='song-title'>{currentTrack.title}</h3>
                <div className='progress'>
                    <span>{currentTrack.currentTime}</span>
                    <div className='progress-bar'
                         onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                             if (!audioRef.current) return;
                             let mouseX = Math.floor(event.pageX - event.currentTarget.offsetLeft);
                             let progress = mouseX / (event.currentTarget.offsetWidth / 100);
                             audioRef.current.currentTime = audioRef.current.duration * (progress / 100);
                         }}
                    >
                        <span style={{width: currentTrack.progress}}></span>
                    </div>
                    <span>{currentTrack.duration}</span>
                </div>
                <div className='volume'>
                    <img src={currentTrack.isVolume ? soundPath : soundMutePath} alt='volume'
                        onClick={() => dispatch(toogleVolume())}
                    />
                    <progress value={currentTrack.volumeProgress} max="1"
                        onClick={(event: React.MouseEvent<HTMLProgressElement>) => dispatch(changeVolume({
                            pageX: event.pageX,
                            offsetLeft: event.currentTarget.offsetLeft,
                            offsetWidth: event.currentTarget.offsetWidth,
                        }))}
                    ></progress>
                </div>
            </div>
            <ul className='songs-list'>
                {trackList.map((track, id) => {return (
                    <li key={track.path} className={track.title === currentTrack.title ? 'songs-list__item active' : 'songs-list__item'}
                        onClick={() => dispatch(changeTrack({id: id}))}
                    >
                        <img
                            src={currentTrack.isPlaying && track.title === currentTrack.title ? pauseSongPath : playSongPath}
                            alt='play or pause sound'
                            onClick={() => {
                                if (track.title === currentTrack.title) handlerOnPlaying();
                                else {
                                    dispatch(changeTrack({id: id}))
                                }
                            }}
                        />
                        <span>{track.title}</span>
                    </li>
                )})}
            </ul>
        </div>
    );
};

export default Player;