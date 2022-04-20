const express = require("express")
const socketIo = require("socket.io");
const http = require('http');
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3001;

const needle = require("needle");
// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

const token = "AAAAAAAAAAAAAAAAAAAAAPyvbAEAAAAAzD2CXLuy1YPuWIDGUJxDq0oYqac%3DIl7eE0gT7YDespLdlnblN6DxlWyYXvoHaJ3s3JGYhXnhAEL2Ej";
const id = "1514259296745402372";

const endpointURL = `https://api.twitter.com/2/lists/${id}/tweets`;

app.get("/", (request, response) => {
  let tweets = null;
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

  response.send(String(tweets));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => 
  console.log(`server is listening at http://localhost:${port}`)
);