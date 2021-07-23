const fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

const SUCCESS = 200;
const NOT_FOUND = 404;

const { CHAT_DOWNLOADER_HOST } = process.env;

const downloadChat = async (req, res, next) => {
  const { id } = req.params;

  // TODO: check user is authenticated, if so, then save the vod request

  const chatDownloaderResponse = await fetch(
    `${CHAT_DOWNLOADER_HOST}/vod/${id}`,
    {
      method: "POST",
    }
  );

  if (chatDownloaderResponse.status === SUCCESS) {
    res.json({ message: "Vod request registered" });
  } else {
    res.stauts(NOT_FOUND).json({ message: "Vod not found" });
  }
};

module.exports = asyncHandler(downloadChat);
