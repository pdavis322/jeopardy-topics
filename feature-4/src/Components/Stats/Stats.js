import StatsParent from "./StatsParent";
import {checkUser} from "../../Services/AuthService";
import ProtectedRoute from "../Common/AppTools/ProtectedRoute";

const StatsModule = () => {
    //check if the user is authenticated using the checkUser service and set a flag
    const authenticated = checkUser();

    //return a protected route component with the flag being the user's authentication status
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