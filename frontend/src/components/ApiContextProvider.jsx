import { ApiContext } from "../contexts";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function ApiContextProvider({ children }) {
  const [shouldSignIn, setShouldSignIn] = useState(false);

  const request = async (path, options = {}) => {
    try {
      const res = await fetch(`${backendHost}${path}`, {
        ...options,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      if (res.status === 401) {
        setShouldSignIn(true);
      }

      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const getVodInfo = async (vodId) => {
    const res = await request(`/vod/${vodId}`);

    if (res.status === 200) {
      return res.json();
    } else {
      return null;
    }
  };

  const downloadChat = (vodId) =>
    request(`/vod/${vodId}/chat`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

  const searchInChat = async (vodId, term) => {
    const res = await request(`/vod/${vodId}/chat?search=${term}`);

    if (res.status === 200) {
      return res.json();
    } else {
      return [];
    }
  };

  const signIn = async (code) => {
    const res = await request(`/code?code=${code}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    const { token } = await res.json();

    localStorage.setItem("token", token);

    return jwt_decode(token);
  };

  const signOut = () => localStorage.removeItem("token");

  if (shouldSignIn) return <Redirect to="/login" />;

  return (
    <ApiContext.Provider
      value={{ signOut, signIn, searchInChat, downloadChat, getVodInfo }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiContextProvider;
