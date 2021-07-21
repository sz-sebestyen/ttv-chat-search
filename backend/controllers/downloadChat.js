const fetch = require("node-fetch");
const asyncHandler = require("express-async-handler");

const downloadChat = async (req, res, next) => {
  const { id } = req.params;

  // TODO: check user is authenticated, if so, then save the vod request

  const chatDownloaderResponse = await fetch(`http://localhost:5000/${id}`, {
    method: "POST",
  });

  if (chatDownloaderResponse.status === 200) {
    res.json({ message: "Vod request registered" });
  } else {
    res.stauts(404).json({ message: "Vod not found" });
  }
};

module.exports = asyncHandler(downloadChat);
