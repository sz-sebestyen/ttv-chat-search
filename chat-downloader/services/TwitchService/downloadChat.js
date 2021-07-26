const ChatMessage = require("../../models/ChatMessage");
const VodInfo = require("../../models/VodInfo");
const getSecondsFromDuration = require("./getSecondsFromDuration");
const downloadChatPiece = require("./downloadChatPiece");
const DownloadTracker = require("./DownloadTracker");

const NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES = 4;

const getSectionMaker = (length) => (_, index) => ({
  start: index * length,
  end: (index + 1) * length,
});

const getChatSections = (end, numberOfSections) => {
  const sectionLength = Math.floor(end / numberOfSections);

  const sections = Array.from(
    { length: numberOfSections },
    getSectionMaker(sectionLength)
  );

  sections[sections.length - 1].end = end;

  return sections;
};

const setChatStatus = (id, chatStatus) => {
  VodInfo.updateOne({ id }, { chatStatus });
};

const downloadChat = async (vodInfo) => {
  const hasDownloadStartedElsewhere = await ChatMessage.findOne({
    content_id: vodInfo.id,
  });

  if (hasDownloadStartedElsewhere) {
    return;
  }

  const vodLengthInSeconds = getSecondsFromDuration(vodInfo.duration);

  const chatSections = getChatSections(
    vodLengthInSeconds,
    NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES
  );

  const progressTracker = new DownloadTracker(
    NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES
  );

  try {
    setChatStatus(vodInfo.id, "downloading");

    const downloadProcesses = chatSections.map(({ start, end }) =>
      downloadChatPiece(vodInfo.id, start, end, progressTracker)
    );

    await Promise.all(downloadProcesses);

    setChatStatus(vodInfo.id, "downloaded");

    console.log("chat download finished");
  } catch (error) {
    console.log("errer when downloading chat: ", error);

    setChatStatus(vodInfo.id, "error");
  }
};

module.exports = downloadChat;
