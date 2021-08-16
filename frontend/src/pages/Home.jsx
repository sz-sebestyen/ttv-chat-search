import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { VodInfoPreview } from "../components";
import { InputWithLabel } from "../components/UI";
import { useVodInfo } from "../hooks";

const vodIdCaptureRegex =
  /^((https:\/\/www\.)?twitch\.tv\/videos\/)?(?<vodId>\d+).*$/;

function Home() {
  const history = useHistory();
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
    }, 1000);
  };

  const goToDownload = () => {
    history.push(`/vod/${vodId}`);
  };

  return (
    <div className="bg-background p-4">
      <InputWithLabel
        type="text"
        id="vodLinkInput"
        value={input}
        onChange={storeInput}
        spellCheck="false"
        placeholder="https://www.twitch.tv/videos/0000000000"
        label="VOD url/id:"
        invalidMessage="Must be either the url or the id of the vod."
      />

      <div className="text-sm text-center p-2 my-2">
        Submit the id or the url of the VOD.
      </div>

      {vodInfo && <VodInfoPreview {...{ vodInfo }} />}

      {vodInfoError?.message}

      {vodInfo && (
        <button
          className="m-auto block py-2 px-3 bg-green-500 text-black text-md rounded mt-6"
          onClick={goToDownload}
        >
          Continue
        </button>
      )}
    </div>
  );
}

export default Home;
