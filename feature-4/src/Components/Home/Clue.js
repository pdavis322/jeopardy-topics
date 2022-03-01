const Clue = (props) => {
    return (
        <div class="clue">
            <h2>Category name: {props.catName} Air date: {props.airDate}</h2>
            <br />
            <h2>
            Clue: {props.answer}
            </h2>
        </div>
    );
}
export default Clue;