import React, { useState, useEffect } from "react";
import { InputWithLabel } from "../components/UI";

function Search() {
  return (
    <div className="bg-background p-4">
      <InputWithLabel
        type="text"
        id="searchTermInput"
        spellCheck="false"
        placeholder="widePepOMEGAKEKHappyChampHands"
        label="Search term:"
        invalidMessage=""
      />
    </div>
  );
}

export default Search;
