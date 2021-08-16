import React, { useState, useEffect, useRef } from "react";
import { useApi } from "../hooks";

function ChatDownloadStatus({ vodId, onDone }) {
  const [vodInfo, setVodInfo] = useState({ chatStatus: "waiting" });
  const intervalRef = useRef(null);

  const api = useApi();

  const poll = async () => {
    const freshVodInfo = await api.getVodInfo(vodId);

    setVodInfo(freshVodInfo);
  };

  const startPolling = () => {
    intervalRef.current = setInterval(poll, 1000);
  };

  const startChatDownload = async () => {
    await api.downloadChat(vodId);
    startPolling();
  };

  const shouldStopPolling = (chatStatus) =>
    !chatStatus || chatStatus === "error" || chatStatus === "downloaded";

  useEffect(() => {
    startChatDownload();

    return () => {
      console.log("stop polling");
      clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (shouldStopPolling(vodInfo?.chatStatus)) {
      clearInterval(intervalRef.current);
      onDone(vodInfo?.chatStatus);
    }
  }, [vodInfo]); // eslint-disable-line

  return (
    <div className="text-center p-2 my-2">
      {vodInfo?.chatStatus === "downloading" && (
        <div>Chat is downloading: {vodInfo.downloadProgress}</div>
      )}

      {vodInfo?.chatStatus === "downloaded" && <div>Chat is downloaded</div>}

      {vodInfo?.chatStatus === "waiting" && <div>...</div>}

      {vodInfo?.chatStatus === "error" && <div>Chat download failed</div>}
    </div>
  );
}

export default ChatDownloadStatus;
