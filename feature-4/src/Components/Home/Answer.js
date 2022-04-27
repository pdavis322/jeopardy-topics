import { useState, useEffect } from "react";
import { PostAnswer } from  "../../Services/AnswerService";
import { UpdateStats } from "../../Services/StatsService";
import { CategoryFinished } from "../../Services/CategoriesService";

const Answer = (props) => {
    const [state, setState] = useState({
      response: "",
      correctAnswer: "",
      userCorrect: "",
      firstAttempt: true
    });

    // Clear state when clue gets updated
    useEffect(() => {
      setState({response: "", correctAnswer: "", userCorrect: "", firstAttempt: true});
    }, [props.clueData]);

    // Either add or update UserRecord once clue is finished
    // Needs to be async since we have to wait until CategoryFinished is done to go to the next clue
    async function next() {
      await CategoryFinished(props.clueData.topic, props.clueData.catID, props.clueData.clueIndex);
      props.nextClue(props.clueData.clueIndex >= 4);
    }


    function submitAnswer(response) {
        PostAnswer(props.clueData.catID, props.clueData.clueIndex, props.userID, response, state.firstAttempt).then((result) => {
            if (result.status === "ok") {
              if (state.firstAttempt) {
                UpdateStats(props.clueData.topic, result.answer, false);
              }
              setState({...state, correctAnswer: result.correct, userCorrect: result.answer, response: result.answer === "incorrect" ? "" : state.response, firstAttempt: false});
            }
        });
    }

    function override() {
      UpdateStats(props.clueData.topic, "correct", true);
      next();
    }

    return (
      <div className="answer">
            {state.userCorrect === "incorrect" && <h2 style={{margin: 0}}><span style={{color: 'red'}}>Incorrect!</span> <br />Try again?</h2>}
            {state.userCorrect === "correct" && <h2 style={{margin: 0}}><span style={{color: '#d59f4a'}}>Correct!</span> <br /> Answer: {state.correctAnswer}</h2>}
            {state.userCorrect === "showingAnswer" && <h2 style={{margin: 0}}><span style={{color: 'red'}}>Incorrect</span> <br /> Answer: {state.correctAnswer}</h2> }
            <input type="text" placeholder="Enter answer here" value={state.response ? state.response : ""}onChange={e => setState({...state, response: e.target.value})} />
            <br />
            {state.userCorrect !== "showingAnswer" && state.userCorrect !== "correct" && <button style={{margin: '5px'}} onClick={() => submitAnswer(state.response)}>Submit</button>}
            {state.userCorrect === "incorrect" && <button style={{margin: '5px'}} onClick={() => setState({...state, userCorrect: "showingAnswer"})}>Give up</button>}             
            {(state.userCorrect === "correct" || state.userCorrect === "showingAnswer") && <button style={{margin: '5px'}} onClick={() => next()}>Next</button>}
            {!state.firstAttempt && state.userCorrect === "showingAnswer" && <button style={{margin: '5px'}} onClick={() => override()}>Override - I was right!</button>}
      </div>
    );
}
export default Answer;