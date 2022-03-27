import { useState } from "react";
import { Redirect } from "react-router-dom";

const AuthForm = (props) => {

    const [register, setRegister] = useState(true);
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
            register ? 
            (<div>
                <form className="auth" onSubmit={handleSubmit}>
                    <h1>{props.register ? "Register new account" : "Login to existing account"}</h1>
                    {props.register && 
                        <>
                            <label for="username">Username</label>
                            <input name="username" type="text" required />
                        </>
                    }
                    <label for="password">Email</label>
                    <input name="email" type="email" required />
                    <label for="password">Password (minimum 8 characters)</label>
                    <input name="password" type="password" required minlength="8" />
                    <br />
                    <button>Submit</button>
                </form>
            </div>) : <Redirect to={props.register ? '/login' : '/register'} />
    );
};
export default AuthForm;