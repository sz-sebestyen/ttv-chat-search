import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function Chat() {
  const { id, term } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  const search = async () => {
    const res = await fetch(`${backendHost}/vod/${id}/chat?search=${term}`);
    setSearchResults(await res.json());
  };

  useEffect(() => {
    search();
  }, []); // eslint-disable-line

  return (
    <div>
      {searchResults.map((comment) => (
        <div>
          <span style={{ color: comment.message.user_color }}>
            {comment.commenter.display_name}
          </span>
          <span>: {comment.message.body}</span>
        </div>
      ))}
    </div>
  );
}

export default Chat;
