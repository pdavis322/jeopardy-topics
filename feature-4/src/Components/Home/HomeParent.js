import { useEffect, useState } from "react";

import Topics from "./Topics.js";
import Clue from "./Clue.js";
import Answer from "./Answer.js";

import { GetCategory } from "../../Services/CategoriesService.js";
import { GetAllTopics } from "../../Services/TopicsService.js";

export default function HomeParent() {
    const [clueData, setClues] = useState({
        topic: "History",
        clues: [],
        clueIndex: 0,
        airDate: "",
        catName: "",
        catID: "",
        topicList: []
    });

    // Only retrieve topic list at beginning
    useEffect(() => {
        GetAllTopics().then((results) => {
            setClues(prevClues => {
                return {...prevClues, topicList: results};
            });
        });
    }, []);

    // Update clue whenever topic is changed
    // Add Parse.current.user() later
    useEffect(() => {
        GetCategory(clueData.topic).then((results) => {
            setClues(prevClues => {
                return {
                    ...prevClues,
                    airDate: results.airDate,
                    catName: results.catName,
                    catID: results.catID,
                    clues: results.clues,
                    clueIndex: 0
                };
            });
        });
    }, [clueData.topic]);

    // Pass to Topics component to switch topic
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

    // Pass to Answer component for going to the next clue
    function nextClue() {
        
    }

    return (
        <>
            <Topics topics={clueData.topicList} currentTopic={clueData.topic} onTopicChange={switchTopic} />
            <div className="content">
                <Clue catName={clueData.catName} airDate={clueData.airDate} clue={clueData.clues[clueData.clueIndex]} />
                <Answer clueData={{catID: clueData.catID, clueIndex: clueData.clueIndex, topic: clueData.topic, userID: 'CMnzc2Myuq'}} />
            </div>
        </>
    );
};