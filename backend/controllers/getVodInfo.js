const fetch = require("node-fetch");

const SUCCESS = 200;
const NOT_FOUND = 404;

const { CHAT_DOWNLOADER_HOST } = process.env;

const getVodInfo = async (req, res, next) => {
  const { id } = req.params;

  const chatDownloaderResponse = await fetch(
    `${CHAT_DOWNLOADER_HOST}/vod/${id}`
  );

  if (chatDownloaderResponse.status === SUCCESS) {
    const vodInfo = await chatDownloaderResponse.json();

    res.json(vodInfo);
  } else {
    res.status(NOT_FOUND).json({ message: "Vod not found" });
  }
};

module.exports = getVodInfo;
