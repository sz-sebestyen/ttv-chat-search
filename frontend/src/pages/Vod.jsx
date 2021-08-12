import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { InputWithLabel, SearchTerm } from "../components/UI";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function Vod() {
  const { id } = useParams();
  const [vodInfo, setVodInfo] = useState({ chatStatus: "waiting" });
  const intervalRef = useRef(null);

  const poll = async () => {
    const res = await fetch(`${backendHost}/vod/${id}`);
    setVodInfo(await res.json());
  };

  const startPolling = () => {
    intervalRef.current = setInterval(poll, 1500);
  };

  const startChatDownload = async () => {
    await fetch(`${backendHost}/vod/${id}/chat`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    startPolling();
  };

  const shouldStopPolling = (chatStatus) =>
    !chatStatus || chatStatus === "error" || chatStatus === "downloaded";

  useEffect(() => {
    startChatDownload();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (shouldStopPolling(vodInfo?.chatStatus)) {
      clearInterval(intervalRef.current);
    }
  }, [vodInfo]);

  return (
    <div className="bg-background p-4">
      {vodInfo?.chatStatus}

      <InputWithLabel
        type="text"
        id="searchTermInput"
        spellCheck="false"
        label="Search term:"
        invalidMessage=""
      />
    </div>
  );
}

export default Vod;
