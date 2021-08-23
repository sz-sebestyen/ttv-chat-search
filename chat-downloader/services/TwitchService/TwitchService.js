const getVodInfo = require("./getVodInfo");
const Chat = require("./Chat");
const { ChatMessage, VodInfo } = require("../../models");
const getSecondsFromDuration = require("./getSecondsFromDuration");

const numberOfDefaultThreads = 4;
const numberOfSecondsInAnHour = 3600;

const getNumberOfDownloadThreads = (vodLengthInSeconds) => {
  if (vodLengthInSeconds < numberOfSecondsInAnHour * 9)
    return numberOfDefaultThreads;

  return Math.floor(vodLengthInSeconds / numberOfSecondsInAnHour / 2);
};

const downloadChat = async (vodInfo) => {
  const hasDownloadStartedElsewhere = await ChatMessage.findOne({
    content_id: vodInfo.id,
  });

  if (hasDownloadStartedElsewhere) {
    return Promise.reject(
      Error(`The chat of VOD ${vodInfo.id} is already downloaded`)
    );
  }

  const vodLength = getSecondsFromDuration(vodInfo.duration);

  const chat = new Chat(vodInfo, getNumberOfDownloadThreads(vodLength));

  const intervalId = setInterval(async () => {
    const downloadProgress = chat.getProgress();
    console.log(downloadProgress);

    await VodInfo.updateOne({ id: vodInfo.id }, { downloadProgress });
  }, 1000);

  await chat.download();

  clearInterval(intervalId);
};

module.exports = { downloadChat, getVodInfo };
