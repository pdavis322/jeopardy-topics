import HomeParent from "./HomeParent";
import {checkUser} from "../../Services/AuthService";
import {useState, useEffect} from "react";
import ProtectedRoute from "../Common/AppTools/ProtectedRoute";

const HomeModule = () => {
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

    // not sure about this, was getting errors when trying to use useEffect, but everything works when doing it like this
    const authenticated = checkUser();
    console.log("Flag is ", authenticated);

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