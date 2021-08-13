import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useVodInfo } from "../hooks";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

const canvas_width = 2000;
const canvas_height = 20;

function Chat() {
  const { id, term } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const canvasRef = useRef(null);

  const [vodInfo, vodInfoError] = useVodInfo(id);

  const search = async () => {
    const res = await fetch(`${backendHost}/vod/${id}/chat?search=${term}`);
    setSearchResults(await res.json());
  };

  useEffect(() => {
    search();
  }, []); // eslint-disable-line

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.fillStyle = "rgba(200, 187, 0, 0.50)";
    ctx.fillRect(1000, 0, 100, canvas_height);
    ctx.fillRect(1000, 0, 1, canvas_height);
    ctx.fillRect(1001, 0, 1, canvas_height);
  }, []); // eslint-disable-line

  return (
    <div className="bg-background py-4">
      <canvas
        ref={canvasRef}
        id="canvas"
        height={canvas_height}
        width={canvas_width}
        className="w-full"
      ></canvas>

      {searchResults.map((comment) => (
        <div className="text-sm px-4 leading-6">
          <span
            className="font-semibold"
            style={{ color: comment.message.user_color }}
          >
            {comment.commenter.display_name}
          </span>
          <span className=" font-light">: {comment.message.body}</span>
        </div>
      ))}
    </div>
  );
}

export default Chat;
