import { useEffect, useState } from "react";

import Header from "./Common/Header.js";
import Topics from "./Home/Topics.js";
import Clue from "./Home/Clue.js";
import Answer from "./Home/Answer.js";

import GetAllTopics from "../Services/GetAllTopics.js";
import GetClue from "../Services/GetClue.js";

export default function Components() {
    const [clue, setClue] = useState([]);

    useEffect(() => {
        GetAllTopics().then((results) => {
            console.log(results);
            setClue(results);
        }, []);
        GetClue().then((results) => {
            console.log(results);
            setClue(results);
        });
    }, []);

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
