import axios from "axios";

export function getTweets() {
    return axios.get("http://localhost:3001/tweetFetch").then((response) => {
        console.log("axios fetching", response);
      return response.data;
    });
}