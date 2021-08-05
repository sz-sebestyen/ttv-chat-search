import React, { useState, useRef } from "react";
import VodInfoPreview from "../components/VodInfoPreview";
import useVodInfo from "../hooks/useVodInfo";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

function Home() {
  const [input, setInput] = useState("");
  const [vodId, setVodId] = useState();
  const [vodInfo, vodInfoError] = useVodInfo(vodId);

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
      clearTimeout(timeoutRef.current);
      target.setCustomValidity("");
    } else {
      setVodId();
      scheduleValidityReport(target);
    }
  };

  return (
    <div className="bg-background p-4">
      <div className="flex flex-col bg-surface rounded px-3 py-2 mx-auto mb-4 max-w-sm">
        <input
          type="text"
          id="vodLinkInput"
          className={[
            "bg-background",
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
            "text-gray-500",
          ].join(" ")}
          value={input}
          onChange={storeInput}
          spellCheck="false"
        />

        <label htmlFor="vodLinkInput" className="text-sm mb-1">
          VOD link/id:
        </label>
        <div
          data-content="Must be either the link or the id of the vod."
          className="peer-invalid:before:content-[attr(data-content)] order-last text-red-400 text-xs pt-1"
        ></div>
      </div>

      {vodInfo && <VodInfoPreview {...{ vodInfo }} />}

      {vodInfoError?.message}

      {vodInfo && (
        <button className="m-auto block py-2 px-3 bg-green-500 text-black text-md rounded mt-6">
          Continue
        </button>
      )}
    </div>
  );
}

export default Home;
