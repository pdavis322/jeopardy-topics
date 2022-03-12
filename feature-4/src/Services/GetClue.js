import * as Env from "./environments";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const GetClue = async () => {
  const Category = Parse.Object.extend("Category");
  const query = new Parse.Query(Category);
  return query.find().then((results) => {
    return results;
  });
};
export default GetClue;
