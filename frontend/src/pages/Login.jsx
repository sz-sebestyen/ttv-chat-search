import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function Login() {
  const { code } = useParams();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = async () => {
    const res = await fetch(`${backendHost}/code?code=${code}`);
    const resObj = await res.json();

    // TODO: jwt-decode

    setIsSignedIn(true);
  };

  useEffect(() => {
    signIn();
  }, []); // eslint-disable-line

  if (isSignedIn) return <Redirect to="/" />;

  return <div className="text-center">Signing in...</div>;
}

export default Login;
