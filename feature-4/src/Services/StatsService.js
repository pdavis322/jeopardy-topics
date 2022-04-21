import Parse from "parse";

// Get user stats given user ID
/*
    Usage:
    GetUserStats(userID).then((results) => {
        console.log(results);
    });
*/
export const GetUserStats = async () => {
    // Use Parse.User.current() later
    let userID = Parse.User.current().id;
    const query = new Parse.Query(Parse.User);
    return query.get(userID).then((results) => {
        return results.get('Stats');
    });
}

// Update user's stats for given topic
export const UpdateStats = async(topic, correct, override) => {
    let stats = await GetUserStats();
    let index = stats.findIndex(e => e.topic === topic);
    if (index < 0) {
        stats.push({topic: topic, correct: correct === "correct" ? 1 : 0, total: 1});
    }
    else {
        if (!override) {
            stats[index].total++;
        }
        if (correct === "correct") {
            stats[index].correct++;
        }
    }
    Parse.User.current().set("Stats", stats);
    Parse.User.current().save();
}