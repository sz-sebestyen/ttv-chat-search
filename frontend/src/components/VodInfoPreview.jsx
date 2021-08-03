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
      {vodInfo && <img src={getThumbnailUrl()} alt="Vod thumbnail" />}
      {vodInfoError?.message}
    </div>
  );
}

export default VodInfoPreview;
