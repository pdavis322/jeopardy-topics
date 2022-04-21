import Parse from "parse";

const ForgotModule = () => {
    const submitHandle = (e) => {
        //prevent immediately reloading the page
        e.preventDefault();
        //get the email from the form and request the password reset, then redirect back to the home page
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