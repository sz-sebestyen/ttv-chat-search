import React, { useState } from "react";
import useVodInfo from "../hooks/useVodInfo";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

function Home() {
  const [input, setInput] = useState("");
  const [vodId, setVodId] = useState();
  const [vodInfo, vodInfoError] = useVodInfo(vodId);

  const storeInput = ({ target }) => {
    const newInputValue = target.value.trim();
    setInput(newInputValue);

    const match = newInputValue.match(vodIdCaptureRegex);

    if (match) {
      setVodId(match.groups.vodId);
      target.setCustomValidity("");
    } else {
      setVodId();
      target.setCustomValidity("Neither a vod id or a link");
    }

    target.reportValidity();
  };

  const getThumbnailUrl = () =>
    vodInfo.thumbnail_url
      .replace("%{width}", "320")
      .replace("%{height}", "180");

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
        {vodInfoError?.message}
      </div>
    </div>
  );
}

export default Home;
