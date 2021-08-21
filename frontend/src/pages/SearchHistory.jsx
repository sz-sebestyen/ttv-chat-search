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

      {searches
        .map((search, index) => (
          <div className="px-4 py-2 bg-surface my-1 flex text-sm" key={index}>
            <span className="mr-2 text-gray-500">
              {new Date(search.created_at).toLocaleDateString("en-GB")}
            </span>
            <a
              href={`/vod/${search.vodId}`}
              className="underline hover:text-violet-400"
            >
              {search.vodId}
            </a>
            <span className="truncate mr-2">: {search.term}</span>
            <a
              href={`/vod/${search.vodId}/chat-search-result/${search.term}`}
              className="ml-auto hover:text-violet-400"
            >
              View
            </a>
          </div>
        ))
        .reverse()}
    </div>
  );
}

export default SearchHistory;
