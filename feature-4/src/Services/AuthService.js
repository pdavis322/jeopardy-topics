import Parse from "parse";

// Register user given user object
export const RegisterUser = async (user) => {
    const newUser = new Parse.User(); 
    newUser.set("username", user.username);
    newUser.set("password", user.password);
    newUser.set("email", user.email);
    try {
        await newUser.signUp();
        return "success";
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// Login user given user object
export const LoginUser = async (user) => {
    try {
        await Parse.User.logIn(user.username, user.password);
        return "success";
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

// Get current user
export const getUser = () => {
    return Parse.User.current();
};

// check that the current user is authenticated
export const checkUser = () => {
    const user = Parse.User.current();
    return user ? user.authenticated() : false;
};