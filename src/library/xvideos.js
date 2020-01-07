const xvideos = require('@rodrigogs/xvideos');

/**
 * This function returns details about
 * a video at a specific url
 * @param { * } url This is the video to look for.
 */
module.exports.getVideoDetais = async (url) => {
  const response = await xvideos.videos.details(url);
  return response;
};

/**
 * This function returns best videos from
 * xvideos.
 * @param options These specifies dates and pages
 */
// eslint-disable-next-line consistent-return
module.exports.getBestVideos = async (options) => {
  const {
    next,
    previous,
    year,
    month,
    page,
  } = options;

  if (!next || !previous) {
    const videos = await xvideos.videos.best({ year, month, page });
    return videos;
  }

  if (!next || previous) {
    const response = await xvideos.videos.best({ year, month, page });
    if (response.hasPrevious()) {
      const videos = await response.previous();
      return videos;
    }
  }

  if (next || !previous) {
    const response = await xvideos.videos.best({ year, month, page });
    if (response.hasNext()) {
      const videos = await response.next();
      return videos;
    }
  }
};


/**
 * This function gets dashboard videos
 * from xvideos
 * @param {*} options these determines which page
 * to look for
 */
// eslint-disable-next-line consistent-return
module.exports.getDashboardVideos = async (options) => {
  const { next, page, previous } = options;

  if (!next && !previous) {
    const videos = await xvideos.videos.dashboard(page);
    return videos;
  }

  if (!next && previous) {
    const response = await xvideos.videos.dashboard(page);
    if (response.hasPrevious()) {
      const videos = await response.previous();
      return videos;
    }
  }

  if (previous && !next) {
    const response = await xvideos.videos.dashboard(page);
    if (response.hasNext()) {
      const videos = await response.next();
      return videos;
    }
  }
};

/**
 * This function gets fresh videos from xvideos
 * @param {*} options these determines the page
 * that we are looking for.
 */
// eslint-disable-next-line consistent-return
module.exports.getFreshVideos = async (options) => {
  const { next, page, previous } = options;

  if (!next && !previous) {
    const response = await xvideos.videos.fresh({ page });
    return response;
  }

  if (!next && previous) {
    const response = await xvideos.videos.fresh({ page });
    if (response.hasPrevious()) {
      const videos = await response.previous();
      return videos;
    }

    return 'not found';
  }

  if (next && !previous) {
    const response = await xvideos.videos.fresh({ page });
    if (response.hasNext()) {
      const videos = await response.next();
      return videos;
    }

    return 'not found';
  }
};
