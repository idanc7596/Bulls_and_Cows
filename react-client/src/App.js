import React, {useState} from 'react';
import Header from './components/Header';
import GameMenu from "./components/GameMenu";
import WinForm from "./components/WinForm";
import GameForm from "./components/GameForm";
import History from "./components/History";

// The main component of the app.
function App() {

    const NUM_OF_NUMBERS = 4;

    // This function generates the numbers for the user to guess.
    // It returns an array of 4 unique numbers.
    function generateNumbers() {
        const numbers = new Set();
        while (numbers.size < NUM_OF_NUMBERS) {
            numbers.add(Math.floor(Math.random() * 10));
        }
        console.log(numbers);
        return [...numbers]; // 4 unique numbers
    }

    // the generated numbers
    const [realNumbers, setRealNumbers] = useState(() => generateNumbers());

    // the numbers that the user guesses
    const [guessNumbers, setGuessNumbers] = useState({});

    // the guesses history that the user made
    const [guesses, setGuesses] = useState([]);

    const [score, setScore] = useState(0);
    const [isWin, setIsWin] = useState(false);

    return (
        <div className="App">
            <div className="container-fluid">
                <Header />
                <GameMenu generateNumbers={generateNumbers}
                          setRealNumbers={setRealNumbers}
                          setGuessNumbers={setGuessNumbers}
                          setGuesses={setGuesses}
                          setScore={setScore}
                          setIsWin={setIsWin}/>
                { isWin ?
                    <WinForm score={score}/> :
                    <>
                        <GameForm realNumbers={realNumbers}
                                  guessNumbers={guessNumbers}
                                  setGuessNumbers={setGuessNumbers}
                                  guesses={guesses}
                                  setGuesses={setGuesses}
                                  setScore={setScore}
                                  setIsWin={setIsWin}/>
                        <History guesses={guesses}/>
                    </>
                }
            </div>
        </div>
    );
}

export default App;
