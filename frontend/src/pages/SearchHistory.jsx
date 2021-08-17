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
        <div>
          {search.vodId}: {search.term}
        </div>
      ))}
    </div>
  );
}

export default SearchHistory;
