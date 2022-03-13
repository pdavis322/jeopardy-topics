import * as Env from "./environments";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

// Get list of topics
export const GetAllTopics = async () => {
  const Topic = Parse.Object.extend("Topics");
  const query = new Parse.Query(Topic);
  return query.find().then((results) => {
    return results;
  });
};

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
        return {airDate: result[0].get('AirDate'), catName: result[0].get('Name'), clue: result[0].get('Clues')[0].answer};
    });
  });
};