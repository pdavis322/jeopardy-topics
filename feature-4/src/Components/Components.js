import { useEffect, useState } from "react";

import Header from "./Common/Header.js";
import Topics from "./Home/Topics.js";
import Clue from "./Home/Clue.js";
import Answer from "./Home/Answer.js";

import { GetAllTopics, GetCategory } from "../Services/CluesService";

export default function Components() {
    const [clueData, setClues] = useState({
        topic: "History",
        clue: "",
        airDate: "",
        catName: "",
        topicList: []
    });

    // Only retrieve topic list at beginning
    useEffect(() => {
        GetAllTopics().then((results) => {
            setClues(prevClues => {
                return {...prevClues, topicList: results.map((e) => e.get("Name"))};
            });
        });
    }, []);

    // Update clue whenever topic is changed
    useEffect(() => {
        GetCategory(clueData.topic).then((results) => {
            setClues(prevClues => {
                return {
                    ...prevClues,
                    airDate: results.airDate,
                    catName: results.catName,
                    clue: results.clue
                };
            });
        });
    }, [clueData.topic]);

    function switchTopic(e) {
        let topic = e.target.innerHTML;
        if (clueData.topic !== topic) {
            setClues(prevClues => {
                return {
                    ...prevClues,
                    topic: topic
                }
            });
        }
    }


    return (
        <>
            <Header />
            <hr />
            <Topics topics={clueData.topicList} currentTopic={clueData.topic} onTopicChange={switchTopic} />
            <div className="content">
                <Clue catName={clueData.catName} airDate={clueData.airDate} clue={clueData.clue} />
                <Answer />
            </div>
        </>
    );
};
