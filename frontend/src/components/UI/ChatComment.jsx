import React from "react";
import getVodLink from "../../getVodLink";
import getTimeStamp from "../../getTimeStamp";

function ChatComment({ comment, vodId, style }) {
  return (
    <div
      className="text-sm px-4 leading-6"
      id={`_${comment.original_id}`}
      data-offsetseconds={comment.content_offset_seconds}
      style={style}
    >
      <a
        href={getVodLink(vodId, comment.content_offset_seconds)}
        target="_blank"
        rel="noreferrer"
        className="text-gray-600 underline visited:text-gray-400 text-xs"
      >
        {getTimeStamp(comment.content_offset_seconds)}
      </a>{" "}
      <span
        className="font-semibold"
        style={{ color: comment.message.user_color }}
      >
        {comment.commenter.display_name}
      </span>
      <span className=" font-light">: {comment.message.body}</span>
    </div>
  );
}

export default ChatComment;
