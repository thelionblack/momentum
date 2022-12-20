import React, {useEffect} from 'react';
import {useOwnDispatch, useOwnSelector} from "../../store/store";
import {setDate, setGreeting, setTime, setName, setHours} from "../../store/slices/welcomeSlice/welcomeSlice";
import {setUrl} from "../../store/slices/sliderSlice/sliderSlice";

const Welcome = () => {
    const state = useOwnSelector(state => state.welcomeReducer);
    const { time, date, currentGreeting, name, hours } = state;
    const dispatch = useOwnDispatch();

    useEffect(() => {
        changeDate();
        const timerId = setInterval(changeDate, 1000);

        return () => clearInterval(timerId);
    },[]);

    useEffect(() => {
        dispatch(setUrl(currentGreeting));
    }, [currentGreeting])

    function changeDate() {
        const date: Date = new Date();
        const day: number = date.getDate();
        const currentHours: number = date.getHours();
        if (!(new Date().getHours() === hours)) {
            dispatch(setHours(new Date().getHours()));
            dispatch(setDate({day, weekDay: date.getDay(), monthDay: date.getMonth()}));
            dispatch(setGreeting(date.getHours()));
        }
        dispatch(setTime({hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()}));
    }

    function handlerChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setName(event.target.value));
    }

    function handlerChanhedBlur(event: React.FocusEvent<HTMLInputElement>) {
        localStorage.setItem('name', event.target.value);
        event.preventDefault();
    }

    return (
        <>
            <time>{ time }</time>
            <data>{ date }</data>
            <div className='Greeting-container'>
                <span>{`Good ${currentGreeting}, `}</span>
                <input
                    type='text' value={name} placeholder='ENTER NAME'
                    onChange={handlerChangeName}
                    onBlur={handlerChanhedBlur}
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        localStorage.setItem('name', e.currentTarget.value);
                        e.preventDefault();
                    }}
                />
            </div>
        </>
    );
};

export default Welcome;