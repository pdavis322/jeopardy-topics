import { useEffect, useState } from "react";

/*import Topics from "./Topics.js";
import Clue from "./Clue.js";
import Answer from "./Answer.js";*/

import { GetUserStats } from "../../Services/CluesService";

export default function StatsParent() {
    let myUserID = 'CMnzc2Myuq'
    const [userData, setUserData] = useState([]);

    // Only retrieve topic list at beginning
    useEffect(() => {
        GetUserStats(myUserID).then((results) => {
            setUserData(results);
        });
    }, [myUserID]);

    console.log(userData)

    return (
        <>
            <div className="content">
                <h2>Hello!</h2>
            </div>
        </>
    );
};