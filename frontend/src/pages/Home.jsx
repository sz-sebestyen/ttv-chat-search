import React, { useState } from "react";
import VodInfoPreview from "../components/VodInfoPreview";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

function Home() {
  const [input, setInput] = useState("");
  const [vodId, setVodId] = useState();

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

  return (
    <div>
      <p className="">Copy paste the link or id of the VOD below</p>
      <input
        type="text"
        className="border"
        value={input}
        onChange={storeInput}
      />

      {vodId && <VodInfoPreview {...{ vodId }} />}
    </div>
  );
}

export default Home;
