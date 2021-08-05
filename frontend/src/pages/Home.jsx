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
      target.setCustomValidity("Neither a vod id or a link");
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
      scheduleValidityReport(target);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col m-4 bg-background gap-1.5 rounded p-2">
        <input
          type="text"
          id="vodLinkInput"
          className={[
            "bg-surface",
            "rounded",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-violet-400",
            "invalid:ring-2",
            "invalid:ring-red-400",
            "order-1",
            "peer",
            "px-2",
            "py-1",
            "text-sm",
          ].join(" ")}
          value={input}
          onChange={storeInput}
        />

        <label htmlFor="vodLinkInput" className="">
          VOD link/id:
        </label>
        <div
          data-content="Must be either the link or the id of the vod."
          className="peer-invalid:before:content-[attr(data-content)] order-last text-red-400 text-xs"
        ></div>
      </div>

      {vodId && <VodInfoPreview {...{ vodId }} />}
    </div>
  );
}

export default Home;
