import React, { useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InputWithLabel } from "../components/UI";
import { ChatDownloadStatus, VodInfoPreview } from "../components";
import { HiArrowLeft } from "react-icons/hi";
import { useVodInfo } from "../hooks";

function Vod() {
  const { id } = useParams();
  const history = useHistory();
  const [vodInfo, vodInfoError] = useVodInfo(id);

  const [term, setTerm] = useState("");
  const [isDownloaded, setIsDownloaded] = useState(false);

  const isValidTerm = (searchTerm) => searchTerm.length > 3;

  const storeTerm = ({ target }) => {
    setTerm(target.value);

    if (isValidTerm(target.value)) {
      target.setCustomValidity("");
    } else {
      target.setCustomValidity("too short");
    }
  };

  const doneHandler = useCallback((chatStatus) => {
    chatStatus === "downloaded" && setIsDownloaded(true);
  }, []);

  return (
    <div className="bg-background p-4">
      <button
        className="text-xs p-2 hover:text-violet-400"
        title="back"
        onClick={history.goBack}
      >
        <HiArrowLeft />
      </button>

      {vodInfo && <VodInfoPreview {...{ vodInfo }} />}
      {vodInfoError && <div>VOD not found</div>}

      <ChatDownloadStatus vodId={id} onDone={doneHandler} />

      <InputWithLabel
        type="text"
        id="searchTermInput"
        spellCheck="false"
        label="Search term:"
        invalidMessage="Must be at least 4 letters long."
        value={term}
        onChange={storeTerm}
      />

      {isDownloaded && isValidTerm(term) && (
        <button
          className="m-auto block py-2 px-3 bg-green-500 text-black text-md rounded mt-6"
          onClick={() => history.push(`/vod/${id}/chat-search-result/${term}`)}
        >
          Search
        </button>
      )}

      <div className="text-sm text-center p-2 my-2">
        While the server is downloading the chat, ready the term that you want
        to search for.
      </div>
    </div>
  );
}

export default Vod;
