import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { InputWithLabel, SearchTerm } from "../components/UI";
import { ChatDownloadStatus } from "../components";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function Vod() {
  const { id } = useParams();
  const history = useHistory();

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
    chatStatus === "error" && setIsDownloaded(null);
  }, []);

  return (
    <div className="bg-background p-4">
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

      {isDownloaded === null && <div>something went wrong</div>}
    </div>
  );
}

export default Vod;
