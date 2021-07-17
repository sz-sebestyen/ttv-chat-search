module.exports = (duration) => {
  const hours = parseInt(duration.match(/(\d+)h/)[1]);
  const minutes = parseInt(duration.match(/(\d+)m/)[1]);
  const seconds = parseInt(duration.match(/(\d+)s/)[1]);

  return hours * 3600 + minutes * 60 + seconds;
};
