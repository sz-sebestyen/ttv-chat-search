import React from "react";
import useVodInfo from "../hooks/useVodInfo";

function VodInfoPreview({ vodId }) {
  const [vodInfo, vodInfoError] = useVodInfo(vodId);

  const getThumbnailUrl = () =>
    vodInfo.thumbnail_url
      .replace("%{width}", "320")
      .replace("%{height}", "180");

  return (
    <div className="">
      {vodInfo && (
        <div className="bg-surface rounded max-w-sm">
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

          <p className="truncate px-3 py-1" title={vodInfo.title}>
            {vodInfo.title}
          </p>
        </div>
      )}

      {vodInfoError?.message}
    </div>
  );
}

export default VodInfoPreview;
