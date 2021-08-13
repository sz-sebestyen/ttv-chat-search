import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useVodInfo } from "../hooks";
import getSecondsFromDuration from "../getSecondsFromDuration";
import getVodLink from "../getVodLink";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

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

  const canvas_width = window.screen.width;

  const canvas_height = 20;

  useEffect(() => {
    if (vodInfo) {
      const vodLength = getSecondsFromDuration(vodInfo.duration);

      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvas_width, canvas_height);
      ctx.fillStyle = "rgba(200, 187, 0, 0.50)";

      const normalizedOffets = searchResults.map(
        (comment) => comment.content_offset_seconds / vodLength
      );

      normalizedOffets.forEach((offset) => {
        ctx.fillRect(canvas_width * offset, 0, 1, canvas_height);
      });
    }
  }, [vodInfo, searchResults]); // eslint-disable-line

  const scrollToComment = (event) => {
    const box = canvasRef.current.getBoundingClientRect();
    const normalized = (event.clientX - box.x) / (box.right - box.x);
    const time = getSecondsFromDuration(vodInfo.duration) * normalized;
    const closest = searchResults.reduce((acc, cur) =>
      Math.abs(acc.content_offset_seconds - time) <
      Math.abs(cur.content_offset_seconds - time)
        ? acc
        : cur
    );

    document
      .getElementById(`_${closest.content_offset_seconds}`)
      .scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div className="bg-background py-4 flex-auto flex flex-col">
      <canvas
        ref={canvasRef}
        id="canvas"
        height={canvas_height}
        width={canvas_width}
        className="w-full flex-0"
        onClick={scrollToComment}
      ></canvas>

      <div className="overflow-y-scroll flex-grow" style={{ flexBasis: "0" }}>
        {searchResults.map((comment) => (
          <div
            className="text-sm px-4 leading-6"
            id={`_${comment.content_offset_seconds}`}
          >
            <a
              href={getVodLink(id, comment.content_offset_seconds)}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 underline visited:text-gray-400"
            >
              {new Date(comment.created_at)
                .toLocaleTimeString()
                .replace(/\s(AM|PM)/, "")}
            </a>{" "}
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
    </div>
  );
}

export default Chat;
