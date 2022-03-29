// Used for both register and login views
const AuthForm = (props) => {
    return (
        <div>
            <form className="auth" onSubmit={props.handleSubmit}>
                <h1>{props.register ? "Register new account" : "Login to existing account"}</h1>
                {props.register && 
                    <>
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" required onChange={props.onChange} />
                    </>
                }
                <label htmlFor="username">Username</label>
                <input name="username" type="text" required onChange={props.onChange} />
                <label htmlFor="password">Password (minimum 8 characters)</label>
                <input name="password" type="password" required minLength={8} onChange={props.onChange} />
                <br />
                <button>Submit</button>
                <h1>{props.result}</h1>
                <h2>{props.register ? "Already" : "Don't"} have an account? Go to <a href={props.register ? "/login" : "/register"}>{props.register ? "login" : "register"}</a></h2>
            </form>
        </div>
    );
};
export default AuthForm;