import React from 'react';
import Player from "./components/Player/Player";
import Welcome from "./components/Welcome/Welcome";
import Slider from "./components/Slider/Slider";
import Quotes from "./components/Quotes/Quotes";

function App() {
  return (
    <>
        <header>
            <Player />
        </header>
        <main>
            <Welcome />
            <Slider />
        </main>
        <footer>
            <Quotes />
        </footer>
    </>
  )
}

export default App;
