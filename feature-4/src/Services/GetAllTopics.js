import * as Env from "./environments";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const GetAllTopics = async () => {
  const Topic = Parse.Object.extend("Topics");
  const query = new Parse.Query(Topic);
  return query.find().then((results) => {
    return results;
  });
};
export default GetAllTopics;
