import { TwitterTweetEmbed } from "react-twitter-embed";
import { getTweets } from "../../Services/TweetService";
import { useEffect, useState } from "react";


const TwitterFeed = () => {
  const [ids, setIDs] = useState([]);

  // the useEffect hook is used here to load user data asynchronously
  // we will discuss async data in class, for now you can utilize the pattern
  // useEffect(function, array)
  useEffect(() => {
    console.log("fetching tweets");
    getTweets().then((data) => {
      setIDs(data);
      console.log("got tweets");
      console.log(ids);
    });
  }, []);

  const options = {
    width: "500"
  };
  
  return (
    <div className="twitterFeed">
      {ids.map((id) => (<TwitterTweetEmbed tweetId={id}/>))}
    </div>
  );
};

export default TwitterFeed;