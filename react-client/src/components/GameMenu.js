
// This component is responsible for the game menu, which includes the game rules and the start new game button.
function GameMenu({generateNumbers, setRealNumbers, setGuessNumbers,
                      setGuesses, setScore, setIsWin}) {

    // This function starts a new game and resets the states.
    function startNewGame() {
        setRealNumbers(generateNumbers());
        setGuessNumbers({});
        setGuesses([]);
        setScore(0);
        setIsWin(false);
    }
    return (
        <div className="text-center mt-2">
            <button type="button" className="btn btn-success"
                    data-bs-toggle="collapse" data-bs-target="#collapseRules"
                    aria-expanded="false" aria-controls="collapseRules">Game rules</button>
            <button type="button" className="btn btn-primary ms-2" onClick={startNewGame}>Start new game</button>

            <div className="collapse mt-1" id="collapseRules">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <div className="card card-body" style={{background: '#d1e7dd'}}>
                            The program generates a 4 digit number, while the player tries to guess it.
                            Each digit appears at most once. e.g. 1234 is valid, but 1233 is not valid.
                            For every guess that the player makes, we display 2 values:
                            the number of bulls: 1 bull means the guess contains and the target number have 1 digit in common, and in the correct position.
                            the number of cows: 1 cow means the guess and the target have 1 digit in common, but not in correct position.
                            For example if the number to guess is 1234. Guessing 4321 will give 0 bulls and 4 cows.
                            3241 will give 1 bull and 3 cows. 4 bulls means that the user won the game.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default GameMenu;