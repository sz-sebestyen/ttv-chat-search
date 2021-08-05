import React from "react";

function VodInfoPreview({ vodInfo }) {
  const getThumbnailUrl = () =>
    vodInfo.thumbnail_url
      .replace("%{width}", "320")
      .replace("%{height}", "180");

  return (
    <div className="bg-surface rounded max-w-sm mx-auto">
      <p className="text-center p-1">{vodInfo.user_name}</p>

      <div
        style={{ backgroundImage: `url(${getThumbnailUrl()})` }}
        className="h-40 bg-center bg-no-repeat h-[180px] w-[320px] p-2 m-auto grid grid-cols-2"
      >
        <span className="bg-surface bg-opacity-75 p-1.5 text-xs place-self-start">
          {vodInfo.duration}
        </span>

        <span className="bg-surface bg-opacity-75 p-1.5 text-xs place-self-end">
          {new Date(vodInfo.created_at).toLocaleString()}
        </span>
      </div>

      <p
        className="truncate px-3 py-1 text-sm text-center"
        title={vodInfo.title}
      >
        {vodInfo.title}
      </p>
    </div>
  );
}

export default VodInfoPreview;
