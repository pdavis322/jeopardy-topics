import { TwitterTweetEmbed } from "react-twitter-embed";

const TwitterFeed = () => {
  let ids = ["1507432127498907650", "1507560471678750724", "1508489092584988677"];

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