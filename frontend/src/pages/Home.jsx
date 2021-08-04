import React, { useState, useRef } from "react";
import VodInfoPreview from "../components/VodInfoPreview";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

function Home() {
  const [input, setInput] = useState("");
  const [vodId, setVodId] = useState();

  const timeoutRef = useRef(null);

  const scheduleValidityReport = (target) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      target.reportValidity();
    }, 2000);
  };

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
      scheduleValidityReport(target);
    }
  };

  return (
    <div className="text-center">
      <p className="text-violet-400">
        Copy paste the link or id of the VOD below
      </p>
      <input
        type="text"
        className={[
          "bg-surface",
          "rounded",
          "focus:outline-none",
          "focus:ring",
          "focus:ring-violet-400",
          "invalid:bg-primary",
        ].join(" ")}
        value={input}
        onChange={storeInput}
      />

      {vodId && <VodInfoPreview {...{ vodId }} />}
    </div>
  );
}

export default Home;
