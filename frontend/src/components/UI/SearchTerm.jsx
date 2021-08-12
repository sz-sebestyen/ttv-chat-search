import React from "react";

function SearchTerm({ term }) {
  return (
    <div className="flex justify-between p-1">
      <span>{term}</span>

      <button>View</button>
    </div>
  );
}

export default SearchTerm;
