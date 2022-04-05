import HomeParent from "./HomeParent";
import {checkUser} from "../../Services/AuthService";
import ProtectedRoute from "../Common/AppTools/ProtectedRoute";

const HomeModule = () => {
    //check if the user is authenticated using the checkUser service and set a flag
    const authenticated = checkUser();

    //return a protected route component with the flag being the user's authentication status
    return (
        <div>
        <ProtectedRoute
          flag={authenticated}
          component={HomeParent}
        />
        </div>
    )
};

export default HomeModule;