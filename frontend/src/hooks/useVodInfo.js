import { useState, useEffect } from "react";
import useApi from "./useApi";

const useVodInfo = (vodId) => {
  const [vodInfo, setVodInfo] = useState();
  const [error, setError] = useState();

  const api = useApi();

  const getVodInfo = async () => {
    const res = await api.getVodInfo(vodId);

    setVodInfo(res);

    if (res) {
      setError();
    } else {
      setError(Error("Vod not found"));
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
