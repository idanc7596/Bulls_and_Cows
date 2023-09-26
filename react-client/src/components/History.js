
// This component is responsible for the history table (the list of the user's previous guesses).
function History({guesses}) {

    // create a row for each guess.
    let rows = [];
    guesses.forEach((guess, i) => {
        rows.push(<tr key={i}>
                    <td>{guess.numbers}</td>
                    <td>{guess.bulls}</td>
                    <td>{guess.cows}</td>
                  </tr>)
    });
    return (
        <div className="row d-flex justify-content-center mt-3">
            <div className="col-md-8">
                <table className="table table-primary">
                    <thead>
                    <tr>
                        <th scope="col">Guess</th>
                        <th scope="col">Bulls</th>
                        <th scope="col">Cows</th>
                    </tr>
                    {rows}
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default History;