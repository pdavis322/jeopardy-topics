import AuthForm from "./AuthForm";
import { useState } from "react";
import { RegisterUser, LoginUser } from "../../Services/AuthService";
import { Redirect } from "react-router-dom";
import { checkUser } from "../../Services/AuthService";

const Auth = (props) => {
    
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [register, setRegister] = useState(props.registering);
    // Used to display errors from the service
    const [result, setResult] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        if (register) {
            setResult(await RegisterUser(user));
        }
        else {
            setResult(await LoginUser(user));
        }
    }
    function handleChange(e) {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }
    const childProps = {handleSubmit: handleSubmit, onChange: handleChange, result: result, changeRegister: setRegister};
    // Redirect after success

    // check if the user is already logged in/authenticated
    const authenticated = checkUser();
    //if authenticated, don't show the register/login pages, redirect to home page
    if(authenticated) {
        return (
            <div>
                <Redirect to="/" />
            </div>
          );
    //otherwise, render the auth components as usual
    } else {
        return (
            result === "success" ? <Redirect to={"/"} /> : <AuthForm register={register} {...childProps} />
        );
    }
};
export default Auth;