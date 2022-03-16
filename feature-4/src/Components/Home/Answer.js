import { useState } from "react";
import { PostAnswer } from "../../Services/CluesService";

const Answer = (props) => {
    const [state, setState] = useState({
      response: "",
      correctAnswer: "",
      userCorrect: ""
    });

    function submitAnswer(response) {
        PostAnswer(props.clueData.catID, props.clueData.clueIndex, props.clueData.sampleID, response).then((result) => {
            if (result.status === "ok") {
              setState({...state, correctAnswer: result.correct, userCorrect: result.answer, response: result.answer === "incorrect" ? "" : state.response});
            }
        });
    }

    return (
      <div className="answer">
            {state.userCorrect === "incorrect" && <h2 style={{margin: 0}}><span style={{color: 'red'}}>Incorrect!</span> <br />Try again?</h2>}
            <input type="text" placeholder="Enter answer here" value={state.response ? state.response : ""}onChange={e => setState({...state, response: e.target.value})} />
            <br />
            <button style={{margin: '5px'}} onClick={() => submitAnswer(state.response)}>Submit</button>
            {state.userCorrect === "incorrect" && <button style={{margin: '5px'}} onClick={() => submitAnswer(state.response)}>Give up</button>}             
      </div>
    );
}
export default Answer;