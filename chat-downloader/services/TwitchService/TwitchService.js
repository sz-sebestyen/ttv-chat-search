const getVodInfo = require("./getVodInfo");
const Chat = require("./Chat");
const ChatMessage = require("../../models/ChatMessage");

const downloadChat = async (vodInfo) => {
  const hasDownloadStartedElsewhere = await ChatMessage.findOne({
    content_id: vodInfo.id,
  });

  if (hasDownloadStartedElsewhere) {
    return Promise.reject(
      Error(`The chat of VOD ${vodInfo.id} is already downloaded`)
    );
  }

  const chat = new Chat(vodInfo, 4);

  const intervalId = setInterval(() => {
    console.log(chat.getProgress());
  }, 1000);

  await chat.download();

  clearInterval(intervalId);
};

module.exports = { downloadChat, getVodInfo };
