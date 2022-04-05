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
    console.log(Parse.User.current().id);
    const query = new Parse.Query(Parse.User);
    return query.get(userID).then((results) => {
        return results.get('Stats');
    });
}