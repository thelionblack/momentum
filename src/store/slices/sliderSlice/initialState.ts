interface IInitialState {
    url: string;
    id: number;
    isButtonPrev: boolean;
    isButtonNext: boolean;
}

const initialState: IInitialState = {
    url: '',
    id: 1,
    isButtonPrev: false,
    isButtonNext: false,
}



export default initialState;