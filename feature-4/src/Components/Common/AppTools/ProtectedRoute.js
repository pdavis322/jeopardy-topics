import React from "react";
import { Redirect } from "react-router-dom";

// You can pass props using the spread operator to throw them on an object if there are too many to break out
const ProtectedRoute = ({ component: Component, flag, ...rest }) => {
  
  // if the flag is true, return the passed component, otherwise, redirect to the login page (Auth compoenents)
  return (
    <div>
      {flag ? (
        <Component />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default ProtectedRoute;