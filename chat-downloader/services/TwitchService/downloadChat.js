const ChatMessage = require("../../models/ChatMessage");
const getSecondsFromDuration = require("./getSecondsFromDuration");
const downloadChatPiece = require("./downloadChatPiece");

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

  try {
    const downloadProcesses = chatSections.map(({ start, end }) =>
      downloadChatPiece(vodInfo.id, start, end)
    );

    vodInfo.chatStatus = "downloading";
    vodInfo.save();

    await Promise.all(downloadProcesses);

    vodInfo.chatStatus = "downloaded";
    vodInfo.save();

    console.log("chat download finished");
  } catch (error) {
    console.log("errer when downloading chat: ", error);

    vodInfo.chatStatus = "error";
    vodInfo.save();
  }
};

module.exports = downloadChat;
