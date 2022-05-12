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

    function getNewCategory() {
        GetCategory(clueData.topic).then((results) => {
            setClues(prevClues => {
                return {
                    ...prevClues,
                    airDate: results?.airDate,
                    catName: results?.catName,
                    catID: results?.catID,
                    clues: results?.clues,
                    clueIndex: results ? results.clueIndex : -1
                };
            });
        });
    }

    // Only retrieve topic list at beginning
    useEffect(() => {
        GetAllTopics().then((results) => {
            setClues(prevClues => {
                return {...prevClues, topicList: results};
            });
        });
    }, []);

    // Update clue whenever topic is changed
    useEffect(getNewCategory, [clueData.topic]);


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

    // Pass to Answer component to go to next clue or get new category if done 
    function nextClue(finished) {
        if (!finished) {
            setClues({...clueData, clueIndex: clueData.clueIndex + 1});
        }
        else {
            getNewCategory();
        }
    }

    return (
        <>
            <Topics topics={clueData.topicList} currentTopic={clueData.topic} onTopicChange={switchTopic} />
            <div className="content">
                {clueData.clueIndex !== -1 ? 
                    (<><Clue catName={clueData.catName} airDate={clueData.airDate} clue={clueData.clues[clueData.clueIndex]} /><Answer clueData={{ catID: clueData.catID, clueIndex: clueData.clueIndex, topic: clueData.topic }} nextClue={nextClue} /></>) : <h1>You've run out of clues for this topic! Try a different one.</h1>
                }
            </div>
        </>
    );
};