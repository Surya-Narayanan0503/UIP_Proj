import React from "react";
import Form from "./Form";
import NavBar from "./NavBar";

const LoginPage = ({ onSignInComplete }) => {
  return (
    <div>
      <NavBar active="login" />
      <Form isSignUp={false} onSignInComplete={onSignInComplete} />
    </div>
  );
};

export default LoginPage;
