import {useState} from "react";
import HighscoresTable from "./HighscoresTable";

// This component is used to display the win form at the end of the game.
// It allows the user to enter his name and submit his score.
function WinForm({score}) {

    const [name, setName] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [highscores, setHighscores] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const url = "/api/highscores";

    // handle the response from the server.
    function handleResponse(response) {
        // if the response is not ok, throw an error.
        if (!response.ok) {
            return response.text().then((text) => {
                throw new Error(`${response.status} ${response.statusText} - ${text}`);
            });
        }
        // if the response is ok, return the response as json.
        if(response.headers.get('content-length') !== '0') {
            return response.json();
        }
    }

    // handle the error from the server.
    function handleError(error) {
        setIsError(true);
        setErrorMessage(error.toString());
    }

    // post the name and score to the server.
    function handleSubmit(ev) {
        ev.preventDefault();
        setIsError(false);
        let record = {
            name: name,
            score: score
        };
        fetch(url,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            },
            body: new URLSearchParams(record).toString()
        })
            .then(handleResponse)
            .then(getTopHighScores)
            .catch(handleError);
    }

    // get the top-5 highscores from the server.
    function getTopHighScores() {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(handleResponse)
            .then(showHighscoresTable)
            .catch(handleError);
    }

    // set the highscores table state.
    function showHighscoresTable(records) {
        setShowTable(true);
        setHighscores(records);
    }


    return (
        <div className="row d-flex justify-content-center mt-4">
            { showTable ?
                <HighscoresTable highscores={highscores}/> :
                <div className="col-md-8">
                    <div className="alert alert-success" role="alert">
                        <h3>You won! your score is: {score}</h3>
                        <p>You may enter your name below to record your score.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type="text" className="form-control" id="username"
                               placeholder="Enter your name..." required maxLength="32"
                               onChange={(ev) => setName(ev.target.value)}/>
                        <button type="submit" className="btn btn-primary mt-2 mb-3">Submit</button>
                    </form>

                    {isError &&
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default WinForm;