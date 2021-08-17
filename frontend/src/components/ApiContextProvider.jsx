import { ApiContext } from "../contexts";
import { useLocation } from "react-router-dom";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function ApiContextProvider({ children }) {
  const location = useLocation();

  const request = async (path, options = {}) => {
    try {
      const res = await fetch(`${backendHost}${path}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 401) {
        window.location.replace(
          `${backendHost}/login?state=${location.pathname}`
        );
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
    const res = await request(`/vod/${vodId}/chat-search?term=${term}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    if (res?.status === 200) {
      return res.json();
    } else {
      return [];
    }
  };

  const getSearchHistory = async () => {
    const res = await request("/search-history");

    if (res?.status === 200) {
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

    return res?.json();
  };

  return (
    <ApiContext.Provider
      value={{
        signIn,
        searchInChat,
        downloadChat,
        getVodInfo,
        getSearchHistory,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiContextProvider;
