class DownloadTracker {
  constructor(numberOfDownloadProcesses) {
    const progressContainer = {};

    this.track = (start, progress) => {
      progressContainer[start] = progress;

      const newProgress =
        Object.values(progressContainer).reduce((acc, cur) => acc + cur, 0) /
        numberOfDownloadProcesses;

      console.log("download progress: ", newProgress);
    };
  }
}

module.exports = DownloadTracker;
