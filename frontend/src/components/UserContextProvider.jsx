import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts";
import { useApi } from "../hooks";

function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  const api = useApi();

  const signIn = async (code) => {
    const { token } = await api.signIn(code);

    localStorage.setItem("token", token);

    setUser(jwt_decode(token));
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // TODO: check that token is still valid

    token && setUser(jwt_decode(token));
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
