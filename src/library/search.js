const Pornsearch = require('pornsearch');

const searchVideos = async (query) => {
  const searcher = new Pornsearch(query, 'xvideos');
  const response = await searcher.videos();
  return response;
};

module.exports.searchVideos = searchVideos;
