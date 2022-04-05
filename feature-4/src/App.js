import Components from "./Components/Components.js"
import * as Env from "./environments";
import './App.css';

import Parse from "parse";
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;
function App() {
  return (
    <Components />
  );
}

export default App;
