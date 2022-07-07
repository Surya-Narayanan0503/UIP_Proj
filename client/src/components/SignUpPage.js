import React from "react";
import NavBar from "./NavBar";
import Form from "./Form";

const SignUpPage = () => {
  return (
    <div>
      <NavBar active="signup" />
      <Form isSignUp={true} />
    </div>
  );
};

export default SignUpPage;
