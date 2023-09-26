
// This component is used to display the number selector.
function NumberSelector({id, guessNumbers, setGuessNumbers}) {

    // update the state when the user selects a number.
    const handleChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        setGuessNumbers(values => ({...values, [name]: value}));
    }

    return (
        <div className="col-3">
            <select className="form-select"
                    aria-label="select"
                    name={id}
                    value={guessNumbers[id] || ""}
                    onChange={handleChange}>
                <option>Guess...</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
        </div>
    );
}

export default NumberSelector;