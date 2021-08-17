import React, { useState, useEffect } from "react";
import { useApi } from "../hooks";

function SearchHistory() {
  const api = useApi();
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
      {searches.map((search) => (
        <div className="px-4 py-2 bg-surface my-1 flex">
          <span>{search.vodId}</span>
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
