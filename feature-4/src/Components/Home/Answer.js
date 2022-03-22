import { useState } from "react";
import { PostAnswer, UpdateStats } from "../../Services/CluesService";

const Answer = (props) => {
    const [state, setState] = useState({
      response: "",
      correctAnswer: "",
      userCorrect: "",
      firstAttempt: true
    });

    function submitAnswer(response) {
        PostAnswer(props.clueData.catID, props.clueData.clueIndex, props.userID, response, state.firstAttempt).then((result) => {
            if (result.status === "ok") {
              UpdateStats(props.clueData.userID);
              setState({...state, correctAnswer: result.correct, userCorrect: result.answer, response: result.answer === "incorrect" ? "" : state.response, firstAttempt: false});
            }
        });
    }

    return (
      <div className="answer">
            {state.userCorrect === "incorrect" && <h2 style={{margin: 0}}><span style={{color: 'red'}}>Incorrect!</span> <br />Try again?</h2>}
            {state.userCorrect === "correct" && <h2 style={{margin: 0}}><span style={{color: '#d59f4a'}}>Correct!</span> <br /> Answer: {state.correctAnswer}</h2>}
            <input type="text" placeholder="Enter answer here" value={state.response ? state.response : ""}onChange={e => setState({...state, response: e.target.value})} />
            <br />
            <button style={{margin: '5px'}} onClick={() => submitAnswer(state.response)}>Submit</button>
            {state.userCorrect === "incorrect" && <button style={{margin: '5px'}} onClick={() => submitAnswer(state.response)}>Give up</button>}             
            {(state.userCorrect === "correct" || state.userCorrect === "showingAnswer") && <button style={{margin: '5px'}} onClick={() => submitAnswer()}>Next</button>}
      </div>
    );
}
export default Answer;