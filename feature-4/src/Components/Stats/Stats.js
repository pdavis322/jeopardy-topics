import StatsParent from "./StatsParent";
import {checkUser} from "../../Services/AuthService";
import {useState, useEffect} from "react";
import ProtectedRoute from "../Common/AppTools/ProtectedRoute";

const StatsModule = () => {
    // const [flag, setFlag] = useState(false);

    // Use Parse.authenticated() instead of flag
    // useEffect(() => {
    //     console.log(checkUser());
    //     if (checkUser()) {
    //     setFlag(true);
    //     } else {
    //     setFlag(false);
    //     }
    // }, []);

    const authenticated = checkUser();
    console.log("Flag is ", authenticated);

    return (
        <div>
        <ProtectedRoute
          exact
          path="/stats"
          flag={authenticated}
          component={StatsParent}
        />
        </div>
    )
};

export default StatsModule;