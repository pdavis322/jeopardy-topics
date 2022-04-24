import { TwitterTweetEmbed } from "react-twitter-embed";
import { getTweets } from "../../Services/TweetService";
import { useEffect, useState } from "react";
import { TwitterShareButton } from "react-twitter-embed";


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
    });
  }, []);

  const options = {
    "text": `I'm getting smarter by using @JeopardyTrainer\nTry it out with me!`,
    "data-size": "large"
}
  
  return (
    <>
    <div className="twitterFeed">
      <p>Share us with your friends!</p>
      <TwitterShareButton className="share" options={options}/>
    </div>
    {ids.length > 0 && (
    <div className="twitterFeed">
      {ids.map((id) => (<TwitterTweetEmbed key={id} tweetId={id}/>))}
    </div>)}
    </>
  );
};

export default TwitterFeed;