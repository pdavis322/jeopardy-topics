import { useEffect, useState } from "react";
import UserBar from "./UserBar.js"
import UserDoughnut from "./UserDoughnut.js"
import { GetUserStats } from "../../Services/StatsService";

export default function StatsParent() {
    //example userID
    const [userData, setUserData] = useState([]);

    // get the users stats asynchronously
    useEffect(() => {
        GetUserStats().then((results) => {
            setUserData(results);
            console.log(userData);
        });
    }, [userData]);

    return (
        <>
            <h1 className="statsHead">User Statistics</h1>
            <div className="content">
                <UserBar userStats={userData}/>
                <UserDoughnut userStats={userData}/>
            </div>
        </>
    );
};