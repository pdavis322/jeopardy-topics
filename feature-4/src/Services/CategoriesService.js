import Parse from "parse";

// Get category given topic name
export const GetCategory = async (topicName) => {
  // First check if there is a UserRecord with clueIndex < 5
  const UserRecord = Parse.Object.extend("UserRecord");
  const Category = Parse.Object.extend("Category");
  const recordQuery = new Parse.Query(UserRecord);
  const catQuery = new Parse.Query(Category);
  recordQuery.equalTo("Topic", topicName);
  recordQuery.equalTo("User", Parse.User.current());
  recordQuery.descending("createdAt");
  let recordResult = await recordQuery.find();
  if (recordResult.length > 0 && recordResult[0].get("ClueIndex") < 4) {
    console.log(recordResult[0].get("ClueIndex"));
    catQuery.equalTo("objectId", recordResult[0].get("Category"));
    let catResult = await catQuery.find();
    return {airDate: catResult[0].get("AirDate"), catName: catResult[0].get("Name"), catID: catResult[0].id, clues: catResult[0].get('Clues').map(e => e.answer), clueIndex: recordResult[0].get("ClueIndex") + 1};
  }
  // Don't have a UserRecord with clueIndex < 5 so just look for any unplayed category in the topic
  const Topic = Parse.Object.extend("Topics");
  const topicQuery = new Parse.Query(Topic);
  topicQuery.equalTo("Name", topicName);
  return topicQuery.find().then((topicResult) => {
    // Pointer for topic to get category
    const topicPointer = {
        __type: 'Pointer',
        className: 'Topics',
        objectId: topicResult[0] ? topicResult[0].id : ""
    };
    catQuery.equalTo("Topic", topicPointer);
    // Don't return a played category
    catQuery.notContainedIn("objectId", recordResult.map(e => e.get("Category")));
    return catQuery.find().then((result) => {
        return result.length > 0 ? {airDate: result[0].get('AirDate'), catName: result[0].get('Name'), catID: result[0].id, clues: result[0].get('Clues').map(e => e.answer), clueIndex: 0} : null;
    });
  });
};

// User has finished category (called from HomeParent)
export const CategoryFinished = async (topic, catID, clueIndex) => {
  const UserRecord = Parse.Object.extend("UserRecord");
  // First check if record for this category exists
  const query = new Parse.Query(UserRecord);
  query.equalTo("Category", catID);
  query.equalTo("User", Parse.User.current());
  let result = await query.find();
  if (result.length < 1) {
    const userRecord = new UserRecord();
    userRecord.set("User", Parse.User.current());
    userRecord.set("Topic", topic);
    userRecord.set("Category", catID);
    userRecord.set("ClueIndex", clueIndex);
    userRecord.save();
  }
  else {
    result[0].increment("ClueIndex");
    result[0].save();
  }
};