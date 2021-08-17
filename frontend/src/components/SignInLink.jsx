import React from "react";
import { useLocation } from "react-router-dom";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function SignInLink() {
  const location = useLocation();

  return (
    <a href={`${backendHost}/login?state=${location.pathname}`}>Sign in</a>
  );
}

export default SignInLink;
