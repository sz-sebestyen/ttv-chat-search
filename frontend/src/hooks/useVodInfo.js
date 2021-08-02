import { useState, useEffect } from "react";

const SUCCESS = 200;

const backendHost = process.env.REACT_APP_BACKEND_HOST;

const useVodInfo = (vodId) => {
  const [vodInfo, setVodInfo] = useState();
  const [error, setError] = useState();

  const getVodInfo = async () => {
    try {
      const res = await fetch(`${backendHost}/vod/${vodId}`);

      if (res.status === SUCCESS) {
        const parsed = await res.json();

        setVodInfo(parsed);
        setError();
      } else {
        setVodInfo();
        setError(Error("Vod not found"));
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (vodId) {
      getVodInfo();
    } else {
      setVodInfo();
    }
  }, [vodId]); // eslint-disable-line

  return [vodInfo, error];
};

export default useVodInfo;
