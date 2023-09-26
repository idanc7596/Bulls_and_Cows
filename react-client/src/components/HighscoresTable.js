
// This component is used to display the highscores table.
function HighscoresTable({highscores}) {
    let rows = [];
    // This loop creates a row for each highscore.
    highscores.forEach((highscore, i) => {
        rows.push(<tr key={i}>
                    <td>{i+1}</td>
                    <td>{highscore._name}</td>
                    <td>{highscore._score}</td>
                  </tr>)
    });

    return(
        <div className="row d-flex justify-content-center">
            <div className="col-md-8">
                <h4 className="text-secondary">High Scores</h4>
                <table className="table table-primary">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Score</th>
                    </tr>
                    {rows}
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default HighscoresTable;