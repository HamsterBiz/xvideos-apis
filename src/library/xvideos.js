const xvideos = require('@rodrigogs/xvideos');

const getVideoDetais = async (url) => {
  const response = await xvideos.videos.details(url);
  return response;
};

const getBestVideos = async (req) => {
  const { page } = req.body;
  let response;

  if (req.body.month || req.body.year) {
    const { year, month } = req.body;
    response = await xvideos.videos.best({ year, month, page });
  } else {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    response = await xvideos.videos.best({ year, month, page });
  }

  return response;
};

const getDashboardVideos = async (page) => {
  const response = await xvideos.videos.dashboard(page);
  return response;
};

const getFreshVideos = async (options) => {
  const { next, page, previous } = options;
  console.log(next, page, previous);

  if (!next && !previous) {
    const response = await xvideos.videos.fresh({ page: 1 });
    return response;
  }

  if (!next && previous) {
    const response = await xvideos.videos.fresh({ page });
    if (response.hasPrevious()) {
      const videos = await response.previous();
      return videos;
    }

    console.log('Previous page not found');
  }

  if (next && !previous) {
    const response = await xvideos.videos.fresh({ page });
    if (response.hasNext()) {
      const videos = await response.next();
      return videos;
    }

    console.log('Next page could not be found!');
  }
  // const response = await xvideos.videos.fresh({ page });
  // return response;
};

module.exports.getBestVideos = getBestVideos;
module.exports.getDashboardVideos = getDashboardVideos;
module.exports.getVideoDetais = getVideoDetais;
module.exports.getFreshVideos = getFreshVideos;
