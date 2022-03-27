import Parse from "parse";

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
    }
    const catQuery = new Parse.Query(Category);
    catQuery.equalTo("Topic", topicPointer);
    return catQuery.find().then((result) => {
        return {airDate: result[0].get('AirDate'), catName: result[0].get('Name'), clues: result[0].get('Clues').map(e => e.answer)};
    });
  });
};
