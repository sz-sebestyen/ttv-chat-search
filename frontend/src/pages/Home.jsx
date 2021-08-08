import React, { useState, useRef } from "react";
import VodInfoPreview from "../components/VodInfoPreview";
import useVodInfo from "../hooks/useVodInfo";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+$)/;

function Home() {
  const [input, setInput] = useState("");
  const [vodId, setVodId] = useState(null);
  const [vodInfo, vodInfoError] = useVodInfo(vodId);

  const timeoutRef = useRef(null);

  const getValidityText = (match) =>
    match ? "" : "Neither a vod id or a link";

  const storeInput = ({ target }) => {
    const newInputValue = target.value.trim();
    setInput(newInputValue);

    const match = newInputValue.match(vodIdCaptureRegex);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      target.setCustomValidity(getValidityText(match));

      setVodId(match?.groups.vodId);
    }, 1500);
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
            "placeholder-gray-700",
          ].join(" ")}
          value={input}
          onChange={storeInput}
          spellCheck="false"
          placeholder="https://www.twitch.tv/videos/0000000000"
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
