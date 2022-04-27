import Parse from "parse";

// Submit answer to Parse cloud code
export const PostAnswer = async (catID, clueIndex, userID, userAnswer, firstAttempt) => {
  const params = {catID: catID, clueIndex: clueIndex, userID: userID, userAnswer: userAnswer, firstAttempt: firstAttempt};
  return Parse.Cloud.run("postAnswer", params);
}
