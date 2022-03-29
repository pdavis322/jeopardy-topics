import AuthForm from "./AuthForm";
import { useState } from "react";
import { RegisterUser, LoginUser } from "../../Services/AuthService";
import { Redirect } from "react-router-dom";

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
    return (
        result === "success" ? <Redirect to={"/"} /> : <AuthForm register={register} {...childProps} />
    );
};
export default Auth;