import React, { useState, useEffect } from "react";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function Home() {
  const [input, setInput] = useState("");
  const [vodId, setVodId] = useState();

  const storeInput = (event) => {
    const newInputValue = event.target.value.trim();
    setInput(newInputValue);

    const match = newInputValue.match(vodIdCaptureRegex);

    if (match) {
      setVodId(match.groups.vodId);
    } else {
      // TODO: warn user
    }
  };

  const getVodInfo = async (id) => {
    // TODO: fetch vodinfo from backend
    const res = await fetch(`${backendHost}/vod/${vodId}`);

    const parsed = await res.json();

    console.log(parsed);
  };

  useEffect(() => {
    vodId && getVodInfo(vodId);
  }, [vodId]); // eslint-disable-line

  return (
    <div>
      <p>Copy paste the link or id of the VOD below</p>
      <input
        type="text"
        className="border"
        value={input}
        onChange={storeInput}
      />
    </div>
  );
}

export default Home;
