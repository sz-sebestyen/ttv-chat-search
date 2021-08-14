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
    intervalRef.current = setInterval(poll, 1000);
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

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [vodInfo, onDone]);

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
