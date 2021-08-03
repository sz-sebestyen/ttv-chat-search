import React from "react";
import useVodInfo from "../hooks/useVodInfo";

function VodInfoPreview({ vodId }) {
  const [vodInfo, vodInfoError] = useVodInfo(vodId);

  const getThumbnailUrl = () =>
    vodInfo.thumbnail_url
      .replace("%{width}", "320")
      .replace("%{height}", "180");

  return (
    <div className="border">
      {vodInfo && (
        <div>
          <img src={getThumbnailUrl()} alt="Vod thumbnail" />
          <p className="truncate" title={vodInfo.title}>
            {vodInfo.title}
          </p>
        </div>
      )}

      {vodInfoError?.message}
    </div>
  );
}

export default VodInfoPreview;
