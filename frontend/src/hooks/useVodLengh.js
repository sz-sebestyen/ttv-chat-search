import { useState, useEffect } from "react";
import getSecondsFromDuration from "../getSecondsFromDuration";

const useVodLengh = (vodInfo) => {
  const [vodLength, setVodLength] = useState(0);

  useEffect(() => {
    vodInfo && setVodLength(getSecondsFromDuration(vodInfo.duration));
  }, [vodInfo]); // eslint-disable-line

  return vodLength;
};

export default useVodLengh;
