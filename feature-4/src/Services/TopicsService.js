import Parse from "parse";

// Get list of topics
export const GetAllTopics = async () => {
  const Topic = Parse.Object.extend("Topics");
  const query = new Parse.Query(Topic);
  return query.find().then((results) => {
    return results.map((e) => e.get("Name"));
  });
};