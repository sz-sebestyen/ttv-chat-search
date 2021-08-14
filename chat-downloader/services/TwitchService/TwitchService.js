const getVodInfo = require("./getVodInfo");
const Chat = require("./Chat");
const ChatMessage = require("../../models/ChatMessage");
const VodInfo = require("../../models/VodInfo");

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

  const intervalId = setInterval(async () => {
    const downloadProgress = chat.getProgress();
    console.log(downloadProgress);

    await VodInfo.updateOne({ id: vodInfo.id }, { downloadProgress });
  }, 1000);

  await chat.download();

  clearInterval(intervalId);
};

module.exports = { downloadChat, getVodInfo };
