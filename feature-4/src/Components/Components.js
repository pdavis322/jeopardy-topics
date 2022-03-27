import Header from "./Common/Header.js"
import HomeModule from "./Home/Home.js";
import StatsModule from "./Stats/Stats.js";
import Auth from "./Auth/AuthRegister.js";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
  } from "react-router-dom";

//route between different modules
const Components = () => {
    return (
        <Router>
            <Header />
            <hr />
            <Switch>
                <Route path="/" exact component={HomeModule} />
                <Route path="/register" render={() => <Auth registering={true} />} />
                <Route path="/login" render={() => <Auth registering={false} />} />
                <Route path="/stats" component={StatsModule} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default Components;