
interface IInitialState {
    hours: number;
    time: string;
    date: string;
    currentGreeting: string;
    name: string;
}

const userName: string | null = localStorage.getItem('name');

const initialState: IInitialState = {
    hours: 343,
    time: ``,
    date: ``,
    currentGreeting: ``,
    name: userName ? userName : '',
}



export default initialState;