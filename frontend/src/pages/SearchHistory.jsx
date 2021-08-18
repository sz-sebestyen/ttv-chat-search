import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApi } from "../hooks";
import { HiArrowLeft } from "react-icons/hi";

function SearchHistory() {
  const api = useApi();
  const history = useHistory();
  const [searches, setSearches] = useState([]);

  const getSearchHistory = async () => {
    const searchHistory = await api.getSearchHistory();
    setSearches(searchHistory);
  };

  useEffect(() => {
    getSearchHistory();
  }, []); // eslint-disable-line

  return (
    <div>
      <button
        className="text-xs p-2 hover:text-violet-400"
        title="back"
        onClick={history.goBack}
      >
        <HiArrowLeft />
      </button>

      {searches.map((search, index) => (
        <div className="px-4 py-2 bg-surface my-1 flex" key={index}>
          <a href={`/vod/${search.vodId}`} className="underline">
            {search.vodId}
          </a>
          <span className="truncate">: {search.term}</span>
          <a
            href={`/vod/${search.vodId}/chat-search-result/${search.term}`}
            className="ml-auto"
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
}

export default SearchHistory;
