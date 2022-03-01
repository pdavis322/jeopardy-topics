import Header from "./Common/Header.js";
import Topics from "./Home/Topics.js";
import Clue from "./Home/Clue.js";
import Answer from "./Home/Answer.js";

export default function Components() {
    return (
        <>
            <Header />
            <hr />
            <Topics />
            <div className="content">
                <Clue />
                <Answer />
            </div>
        </>
    );
};
