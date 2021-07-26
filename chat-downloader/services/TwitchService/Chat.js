const ChatMessage = require("../../models/ChatMessage");
const VodInfo = require("../../models/VodInfo");
const getSecondsFromDuration = require("./getSecondsFromDuration");
const ChatPiece = require("./ChatPiece");

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

const setChatStatus = async (id, chatStatus) => {
  await VodInfo.updateOne({ id }, { chatStatus });
};

const checkForDownloadedChat = async (content_id) => {
  const hasDownloadStartedElsewhere = await ChatMessage.findOne({
    content_id,
  });

  if (hasDownloadStartedElsewhere) {
    throw Error(`The chat of VOD ${content_id} is already downloaded`);
  }
};

class Chat {
  constructor(vodInfo, numberOfThreads) {
    checkForDownloadedChat(vodInfo.id);

    const vodLength = getSecondsFromDuration(vodInfo.duration);

    const chatSections = getChatSections(vodLength, numberOfThreads);

    const chatPieces = chatSections.map(
      ({ start, end }) => new ChatPiece(vodInfo.id, start, end)
    );

    this.download = async () => {
      try {
        setChatStatus(vodInfo.id, "downloading");

        await Promise.all(chatPieces.map((chatPiece) => chatPiece.download()));

        setChatStatus(vodInfo.id, "downloaded");

        console.log("chat download finished of vod: ", vodInfo.id);
      } catch (error) {
        console.log("errer when downloading chat: ", error);

        setChatStatus(vodInfo.id, "error");
      }
    };

    this.getProgress = () => {
      const proportion =
        chatPieces
          .map((chatPiece) => chatPiece.getProgress())
          .reduce((acc, cur) => acc + cur, 0) / numberOfThreads;

      const percentage = proportion * 100;

      return `${Math.floor(percentage)}%`;
    };
  }
}

module.exports = Chat;
