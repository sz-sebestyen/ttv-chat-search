const getVodInfo = require("./getVodInfo");
const Chat = require("./Chat");

const downloadChat = async (vodInfo) => {
  const chat = new Chat(vodInfo, 4);

  const intervalId = setInterval(() => {
    console.log(chat.getProgress());
  }, 1000);

  await chat.download();

  clearInterval(intervalId);
};

module.exports = { downloadChat, getVodInfo };
