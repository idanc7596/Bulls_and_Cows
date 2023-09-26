import NumberSelector from "./NumberSelector";
import React, {useState} from "react";
import AlertBoxGuess from "./AlertBoxGuess";

// This component is responsible for the form that the user fills in to make a guess.
function GameForm({realNumbers, guessNumbers, setGuessNumbers,
                   guesses, setGuesses, setScore, setIsWin}) {

    const NUM_OF_NUMBERS = 4;
    const selectors = createSelectors();
    const [doubleDigit, setDoubleDigit] = useState(false);

    // This function creates the selectors for the user to make a guess.
    function createSelectors() {
        const selectors = [];
        for (let i = 0; i < NUM_OF_NUMBERS; i++) {
            selectors.push(<NumberSelector key={i}
                                           id = {i}
                                           guessNumbers={guessNumbers}
                                           setGuessNumbers={setGuessNumbers} />);
        }
        return selectors;
    }

    // This function calculates the number of bulls.
    function calculateBulls() {
        let bulls = 0;
        for (let i = 0; i < NUM_OF_NUMBERS; i++) {
            if (Number(guessNumbers[i]) === realNumbers[i]) {
                bulls++;
            }
        }
        return bulls;
    }

    // This function calculates the number of cows.
    function calculateCows() {
        let cows = 0;
        for (let i = 0; i < NUM_OF_NUMBERS; i++) {
            if (Number(guessNumbers[i]) !== realNumbers[i] &&
                realNumbers.includes(Number(guessNumbers[i]))) {
                cows++;
            }
        }
        return cows;
    }

    // This function handles the submit event.
    function handleSubmit(ev) {
        ev.preventDefault();
        setDoubleDigit(false);

        // Check if there are double digits.
        const values = Object.values(guessNumbers);
        if(new Set(values).size !== values.length) {
            setDoubleDigit(true);
            return;
        }

        // Check if all the selectors have a number.
        if(Object.keys(guessNumbers).length === NUM_OF_NUMBERS &&
            Object.values(guessNumbers).every(value =>  value !== "Guess...")) {
            let guess = {
                numbers: Object.values(guessNumbers).join(" "),
                bulls: calculateBulls(),
                cows: calculateCows(),
            };
            setGuesses(guesses => [guess, ...guesses]);
            setScore(score => score + 1);
            if(guess.bulls === NUM_OF_NUMBERS) {
                setIsWin(true);
            }
        }
    }

    return (
        <form className="row gx-3 d-flex justify-content-center"
              onSubmit={handleSubmit}>
            <div className="col-md-8 col-lg-6">
                <div className="row mt-4">
                    {selectors}
                </div>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <button className="btn btn-warning" type="submit">Guess</button>
            </div>
            <div className="col-md-8 col-lg-6 mt-2">
                {doubleDigit &&
                    <div className="alert alert-danger" role="alert">
                        You can't have two identical numbers.
                    </div>
                }
            </div>
            {guesses.length > 0 && !doubleDigit ?
                <AlertBoxGuess guess={guesses[0]}/> : ""}
        </form>
    )
}

export default GameForm;