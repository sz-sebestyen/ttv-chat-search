import React, { useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";

import { useUserContext } from "../hooks";

function Login() {
  const userContext = useUserContext();
  const query = new URLSearchParams(useLocation().search);
  const code = query.get("code");

  useEffect(() => {
    !userContext.user && userContext.signIn(code);
  }, []); // eslint-disable-line

  if (userContext.user) return <Redirect to="/" />;

  return <div className="text-center">Signing in...</div>;
}

export default Login;
