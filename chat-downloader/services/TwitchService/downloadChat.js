const VodInfo = require("../../models/VodInfo");
const getSecondsFromDuration = require("./getSecondsFromDuration");
const downloadChatPiece = require("./downloadChatPiece");

const NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES = 4;

const getChatSections = (end, numberOfSections) => {
  const sectionLength = Math.floor(end / numberOfSections);

  const createSection = (_, index) => ({
    start: index * sectionLength,
    end: (index + 1) * sectionLength,
  });

  const sections = Array.from({ length: numberOfSections }, createSection);

  sections[sections.length - 1].end = end;

  return sections;
};

module.exports = async (vodInfo) => {
  const vodLengthInSeconds = getSecondsFromDuration(vodInfo.duration);

  const chatSections = getChatSections(
    15, // vodLengthInSeconds when I set up a local DB
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
