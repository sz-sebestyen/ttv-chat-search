const fetch = require("node-fetch");

const SUCCESS = 200;
const NOT_FOUND = 404;

const { CHAT_DOWNLOADER_HOST } = process.env;

const downloadChat = async (req, res, next) => {
  const { id } = req.params;

  const chatDownloaderResponse = await fetch(
    `${CHAT_DOWNLOADER_HOST}/vod/${id}/chat`,
    {
      method: "POST",
    }
  );

  if (chatDownloaderResponse.status === SUCCESS) {
    res.json({ message: "Vod request registered" });
  } else {
    res.status(NOT_FOUND).json({ message: "Vod not found" });
  }
};

module.exports = downloadChat;
