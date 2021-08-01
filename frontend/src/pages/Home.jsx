import React, { useState, useEffect } from "react";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

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

  const getVodInfo = (id) => {
    // TODO: fetch vodinfo from backend
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
