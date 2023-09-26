
// Alert box for displaying the guess and the number of bulls and cows.
function AlertBoxGuess({guess}) {
    return (
        <div className="row d-flex justify-content-center mt-2">
            <div className="col-md-8">
                <div className="alert alert-warning" role="alert">
                    Your guess is: {guess.numbers},&nbsp;&nbsp;&nbsp;
                    bulls: {guess.bulls}, cows: {guess.cows }
                </div>
            </div>
        </div>
    )
}

export default AlertBoxGuess;