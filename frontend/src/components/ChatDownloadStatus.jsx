import React, { useState, useEffect, useRef } from "react";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function ChatDownloadStatus({ vodId, onDone }) {
  const [vodInfo, setVodInfo] = useState({ chatStatus: "waiting" });
  const intervalRef = useRef(null);

  const poll = async () => {
    const res = await fetch(`${backendHost}/vod/${vodId}`);
    setVodInfo(await res.json());
  };

  const startPolling = () => {
    intervalRef.current = setInterval(poll, 1500);
  };

  const startChatDownload = async () => {
    await fetch(`${backendHost}/vod/${vodId}/chat`, {
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
      onDone(vodInfo?.chatStatus);
    }
  }, [vodInfo, onDone]);

  return <div className="bg-surface">{vodInfo?.chatStatus}</div>;
}

export default ChatDownloadStatus;
