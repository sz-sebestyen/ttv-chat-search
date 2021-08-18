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

    try {
      setUser(jwt_decode(token));
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const checkAuthentication = async (token) => {
    const isValid = await api.checkAuthentication();

    try {
      isValid && setUser(jwt_decode(token));
    } catch (error) {
      console.log("bad token:", token);
      console.error(error);

      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    token && checkAuthentication(token);
  }, []); // eslint-disable-line

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
