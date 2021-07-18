const VodInfo = require("../../models/VodInfo");
const getSecondsFromDuration = require("./getSecondsFromDuration");
const downloadChatPiece = require("./downloadChatPiece");

const NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES = 4;

const getChatSections = (numberOfSections, end) => {
  const partLength = Math.floor(end / numberOfSections);

  const parts = Array(numberOfSections)
    .fill()
    .map((_, index) => ({
      start: index * partLength,
      end: (index + 1) * partLength,
    }));

  parts.push({
    start: parts[parts.length - 1].end,
    end,
  });

  return parts;
};

module.exports = async (vodId) => {
  const vodInfo = await VodInfo.findOne({ id: vodId });

  const vodLengthInSeconds = getSecondsFromDuration(vodInfo.duration);

  const chatSections = getChatSections(
    NUMBER_OF_CHAT_DOWNLOAD_PROCESSSES,
    15 // vodLengthInSeconds when I set up a local DB
  );

  const downloadProcesses = chatSections.map((chatSection) =>
    downloadChatPiece(vodId, chatSection.start, chatSection.end)
  );

  await Promise.all(downloadProcesses);

  // TODO: update VOD request in DB
  console.log("chat download finished");
};
