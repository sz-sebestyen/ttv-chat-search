import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useVodInfo } from "../hooks";
import getSecondsFromDuration from "../getSecondsFromDuration";
import { ChatComment } from "../components/UI";
import { HiOutlineSearch } from "react-icons/hi";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function Chat() {
  const { id, term } = useParams();
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([]);
  const canvasRef = useRef(null);
  const commentListRef = useRef(null);

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

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvas_width, canvas_height);
  };

  const drawOnCanvas = (offsets, color) => {
    const ctx = canvasRef.current.getContext("2d");

    offsets.forEach((offset) => {
      ctx.fillStyle = color;
      ctx.fillRect(canvas_width * offset, 0, 1, canvas_height);
    });
  };

  const updateCanvas = () => {
    const vodLength = getSecondsFromDuration(vodInfo.duration);

    clearCanvas();

    // draw all
    const normalizedOffets = searchResults.map(
      (comment) => comment.content_offset_seconds / vodLength
    );

    drawOnCanvas(normalizedOffets, "rgba(200, 187, 0, 0.50)");

    // draw visible
    const listBox = commentListRef.current.getBoundingClientRect();

    const visibleComments = Array.from(commentListRef.current.children).filter(
      (child) => {
        const box = child.getBoundingClientRect();
        return listBox.y < box.y && listBox.bottom > box.bottom;
      }
    );

    const normalizedVisibleOffsets = visibleComments.map(
      (comment) => parseFloat(comment.dataset.offsetseconds) / vodLength
    );

    drawOnCanvas(normalizedVisibleOffsets, "#c81e00c7");
  };

  useEffect(() => {
    if (vodInfo) {
      updateCanvas();
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
      .getElementById(`_${closest.original_id}`)
      .scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div className="bg-background flex-auto flex flex-col">
      <div className="flex bg-surface">
        <button
          className="text-xs px-4"
          onClick={history.goBack}
          title="New search"
        >
          <HiOutlineSearch />
        </button>
        <h2 className="text-xl py-2 flex-1">Search term: {term}</h2>
      </div>

      <canvas
        ref={canvasRef}
        id="canvas"
        height={canvas_height}
        width={canvas_width}
        className="w-full flex-0 border-b-4 border-b-surface"
        onClick={scrollToComment}
      ></canvas>

      <div
        className="overflow-y-scroll flex-grow py-2"
        style={{ flexBasis: "0" }}
        onScroll={updateCanvas}
        ref={commentListRef}
      >
        {searchResults.map((comment) => (
          <ChatComment
            vodId={id}
            comment={comment}
            style={{
              scrollMargin: `${(() => {
                const listbox = commentListRef.current?.getBoundingClientRect();
                return Math.floor((listbox?.bottom - listbox?.y) / 2);
              })()}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Chat;
