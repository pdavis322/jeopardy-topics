const express = require("express")
const needle = require('needle');
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;


const token = "AAAAAAAAAAAAAAAAAAAAAPyvbAEAAAAAzD2CXLuy1YPuWIDGUJxDq0oYqac%3DIl7eE0gT7YDespLdlnblN6DxlWyYXvoHaJ3s3JGYhXnhAEL2Ej";
const id = "1514259296745402372";

const endpointURL = `https://api.twitter.com/2/lists/${id}/tweets`;

async function getRequest() {
  // These are the parameters for the API request
  // by default, only the Tweet ID and text are returned
  const params = {
    "tweet.fields": "lang,author_id", // Edit optional query parameters here
    expansions: "author_id", // expansions is used to include the user object
    "user.fields": "created_at", // Edit optional query parameters here
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2ListTweetsLookupJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

let tweets = null;

(async () => {
  try {
    // Make request
    const response = await getRequest();
    tweets = response.data.map(x => x.id)
    console.log(tweets);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
})();

app.get("/", (request, response) => {
  response.send("TwitterServ");
});

app.get("/tweetFetch", (req, res) => {
  console.log(tweets);
  res.send(tweets);
});

// app.use("/tweetfetch", tweetFetch);

app.listen(port, () => 
  console.log(`server is listening at http://localhost:${port}`)
);