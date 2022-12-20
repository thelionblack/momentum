import React, {useEffect, useRef} from 'react';
import {useOwnDispatch, useOwnSelector} from "../../store/store";
import {setId, setUrl, isButton} from "../../store/slices/sliderSlice/sliderSlice";

const Slider = () => {
    const { url, id, isButtonPrev, isButtonNext } = useOwnSelector(state => state.sliderReducer);
    const img = useRef<HTMLImageElement>(null);
    const dispatch = useOwnDispatch();

    const setBackGround = (index: number | null = null) => {
        if(img.current) {
            img.current.src = `${url}${id < 10 ? `0${id}` : `${id}`}.jpg`;

            img.current.onload = () => {
                document.body.style.backgroundImage = `url(${img.current?.src})`;

                if (index) dispatch(setId(index));
                dispatch(isButton(''));
            }
        }
    }
    setBackGround();
    useEffect( () => {
        const intervalID = setInterval(() => {
            setBackGround(id + 1);
        }, 1000);
        return () => clearInterval(intervalID);
    }, []);

    const handlerPrevId = (event: React.MouseEvent) => {
        dispatch(isButton('isButtonPrev'));
        dispatch(setId(id - 1));
        setBackGround();
    }

    const handlerNextId = (event: React.MouseEvent) => {
        dispatch(isButton('isButtonNext'));
        dispatch(setId(id + 1));
        setBackGround();
    }

    return (
        <div className='slider'>
            <img ref={img} />
            <button onClick={handlerPrevId} disabled={isButtonPrev}>{`<`}</button>
            <button onClick={handlerNextId} disabled={isButtonNext}>{`>`}</button>
        </div>
    );
};

export default Slider;