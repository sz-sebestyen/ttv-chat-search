import React, { useState, useEffect } from "react";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

const backendHost = process.env.REACT_APP_BACKEND_HOST;

const SUCCESS = 200;

function Home() {
  const [input, setInput] = useState("");
  const [vodId, setVodId] = useState();
  const [vodInfo, setVodInfo] = useState();

  const storeInput = (event) => {
    const newInputValue = event.target.value.trim();
    setInput(newInputValue);

    const match = newInputValue.match(vodIdCaptureRegex);

    if (match) {
      setVodId(match.groups.vodId);
    } else {
      setVodId();
      // TODO: warn user
    }
  };

  const getVodInfo = async (id) => {
    const res = await fetch(`${backendHost}/vod/${vodId}`);

    if (res.status === SUCCESS) {
      const parsed = await res.json();

      setVodInfo(parsed);
    } else {
      // TODO: show some not found message
      setVodInfo();
    }
  };

  useEffect(() => {
    if (vodId) {
      getVodInfo(vodId);
    } else {
      setVodInfo();
    }
  }, [vodId]); // eslint-disable-line

  const getThumbnailUrl = () => {
    return vodInfo.thumbnail_url
      .replace("%{width}", "320")
      .replace("%{height}", "180");
  };

  return (
    <div>
      <p>Copy paste the link or id of the VOD below</p>
      <input
        type="text"
        className="border"
        value={input}
        onChange={storeInput}
      />

      <div className="border">
        {vodInfo && <img src={getThumbnailUrl()} alt="Vod thumbnail" />}
      </div>
    </div>
  );
}

export default Home;
