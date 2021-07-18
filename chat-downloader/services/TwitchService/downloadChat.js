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

  const sections = Array.from({ length: numberOfSections }).map(createSection);

  sections[sections.length - 1].end = end;

  return sections;
};

module.exports = async (vodId) => {
  const vodInfo = await VodInfo.findOne({ id: vodId });

  const vodLengthInSeconds = getSecondsFromDuration(vodInfo.duration);

  const chatSections = getChatSections(
    15, // vodLengthInSeconds when I set up a local DB
    NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES
  );

  const downloadProcesses = chatSections.map(({ start, end }) =>
    downloadChatPiece(vodId, start, end)
  );

  await Promise.all(downloadProcesses);

  // TODO: update VOD request in DB
  console.log("chat download finished");
};
