import Parse from "parse";
import { Redirect } from "react-router-dom";

const ForgotModule = () => {
    const submitHandle = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        Parse.User.requestPasswordReset(email);
        window.location.href="/";
    }

    return(
        <div>
            <form className="auth" onSubmit={submitHandle}>
                <h1>Please enter the email for your account:</h1>
                <h3>If the email matches an account, you will receive an email to reset your password.</h3>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" required />
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default ForgotModule;