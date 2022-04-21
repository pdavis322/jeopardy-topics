import Parse, { User } from "parse";

// Get category given topic name
export const GetCategory = async (topicName) => {
  // Get topic first
  const Topic = Parse.Object.extend("Topics");
  const topicQuery = new Parse.Query(Topic);
  topicQuery.equalTo("Name", topicName);
  return topicQuery.find().then((topicResult) => {
    const Category = Parse.Object.extend("Category");
    // Pointer for topic to get category
    const topicPointer = {
        __type: 'Pointer',
        className: 'Topics',
        objectId: topicResult[0] ? topicResult[0].id : ""
    };
    const catQuery = new Parse.Query(Category);
    catQuery.equalTo("Topic", topicPointer);
    return catQuery.find().then((result) => {
        return {airDate: result[0].get('AirDate'), catName: result[0].get('Name'), catID: result[0].id, clues: result[0].get('Clues').map(e => e.answer)};
    });
  });
};

// User has finished category (called from HomeParent)
export const CategoryFinished = async (catID, clueIndex) => {
  const UserRecord = Parse.Object.extend("UserRecord");
  // First check if record for this category exists
  const query = new Parse.Query(UserRecord);
  query.equalTo("Category", catID);
  let result = await query.find();
  if (result.length < 1) {
    const catPointer = {
      __type: 'Pointer',
      className: 'Category',
      objectId: catID
    };
    const userRecord = new UserRecord();
    userRecord.set("User", Parse.User.current());
    userRecord.set("Category", catPointer);
    userRecord.set("ClueIndex", clueIndex);
    userRecord.save();
  }
  else {
    console.log('yup');
    console.log(result);

  }
};