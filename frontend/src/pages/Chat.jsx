import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HiOutlineSearch, HiArrowLeft } from "react-icons/hi";
import { ChatComment } from "../components/UI";
import { SearchResultsCanvas } from "../components";
import { useVodInfo, useApi, useVodLengh } from "../hooks";
import getSecondsFromDuration from "../getSecondsFromDuration";

function Chat() {
  const { id, term } = useParams();
  const history = useHistory();
  const api = useApi();
  const [vodInfo] = useVodInfo(id);
  const vodLength = useVodLengh(vodInfo);
  const canvasRef = useRef(null);
  const commentListRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const search = async () => {
    const freshSearchResults = await api.searchInChat(id, term);
    setSearchResults(freshSearchResults);
  };

  useEffect(() => {
    search();
  }, []); // eslint-disable-line

  const drawOnCanvas = (ctx, offsets, color) => {
    ctx.fillStyle = color;

    const { offsetWidth, offsetHeight } = canvasRef.current;

    offsets.forEach((offset) =>
      ctx.fillRect(offsetWidth * offset, 0, 1, offsetHeight)
    );
  };

  const getAllNormalizedOffests = () =>
    searchResults.map((comment) => comment.content_offset_seconds / vodLength);

  const getVisibleNormalizedOffests = () => {
    const listBox = commentListRef.current.getBoundingClientRect();

    const comments = Array.from(commentListRef.current.children);

    const visibleComments = comments.filter((child) => {
      const box = child.getBoundingClientRect();
      return listBox.y < box.y && listBox.bottom > box.bottom;
    });

    return visibleComments.map(
      (comment) => parseFloat(comment.dataset.offsetseconds) / vodLength
    );
  };

  const updateCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(
      0,
      0,
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight
    );

    drawOnCanvas(ctx, getAllNormalizedOffests(), "rgba(200, 187, 0, 0.50)");

    drawOnCanvas(ctx, getVisibleNormalizedOffests(), "#c81e00c7");
  };

  useEffect(() => {
    updateCanvas();
  }, [searchResults]); // eslint-disable-line

  const scrollToComment = (event) => {
    const box = event.target.getBoundingClientRect();
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
      <div className="flex bg-surface py-2">
        <button
          className="text-xs px-4 hover:text-violet-400"
          onClick={history.goBack}
          title="back"
        >
          <HiArrowLeft />
        </button>

        <button
          className="text-xs px-4 hover:text-violet-400"
          onClick={() => history.push(`/vod/${id}`)}
          title="New search"
        >
          <HiOutlineSearch />
        </button>

        <h2 className="text-xl py-2 flex-1">Search term: {term}</h2>
      </div>

      <SearchResultsCanvas ref={canvasRef} onClick={scrollToComment} />

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
            key={comment._id}
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
