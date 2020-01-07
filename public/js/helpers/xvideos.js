// eslint-disable-next-line import/extensions
import { loadSpinners, renderResult } from './UI.js';

const content = document.querySelector('.content');

// eslint-disable-next-line import/no-mutable-exports
let page = 1;

/**
 * This function fetches data from a provided
 * url in the backend
 * @param {*} url path to get
 * @param {*} options passed along with the url
 */
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  return response.json();
};

/**
 * This function gets details about a
 *  a specific videos a user selected.
 * @param {*} element This is the element that is clicked on.
 */
export const getVideoDetails = async (element) => {
  element.preventDefault();

  content.innerHTML = '';

  loadSpinners(content);

  const videoUrl = element.target.href;

  const data = {
    url: videoUrl,
  };

  // these are options to passed along
  // to fetch function
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return fetchData('/api/details', options);
};

/**
 * This function loads the fresh video
 */
export const loadFreshVideos = async () => {
  loadSpinners(content);

  const data = { page };

  // eslint-disable-next-line no-console
  console.log(data);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const json = await fetchData('/api/fresh', options);

  const { videos } = json;

  document.querySelector('.content').innerHTML = '';

  const linkContainer = document.createElement('p');
  const strong = document.createElement('strong');

  linkContainer.className = 'video';

  videos.forEach((video) => {
    const span = document.createElement('span');

    // link to video
    const name = document.createElement('a');
    name.text = video.title;
    name.className = 'video';
    name.href = video.url;
    name.target = '__blank';
    name.addEventListener('click', getVideoDetails);

    span.appendChild(name);
    linkContainer.appendChild(span);
  });

  strong.appendChild(linkContainer);
  content.appendChild(strong);
};

/**
 * This functions allows a user to search videos
 * on the xvideos api.
 */
export const search = async () => {
  const query = document.querySelector('.form-control').value;
  document.querySelector('.form-control').value = '';

  document.querySelector('.content').innerHTML = '';

  loadSpinners();

  const data = {
    query,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const json = await fetchData('/api/search', options);

  renderResult(json, getVideoDetails);
};

/**
 * This function load best videos.
 */
export const loadBest = async () => {
  content.innerHTML = '';
  loadSpinners();

  const data = { page };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const json = await fetchData('/api/best', options);

  content.innerHTML = '';

  const { videos } = json;

  videos.forEach((video, index) => {
    const container = document.createElement('div');
    container.className = 'video';

    const name = document.createElement('a');
    name.href = video.url;
    name.text = `[${index + 1}] - ${video.title}`;
    name.addEventListener('click', getVideoDetails);

    const duration = document.createElement('p');
    duration.innerHTML = video.duration;

    container.appendChild(name);

    content.appendChild(container);
  });
};

/**
 * This function loads dashboard vides
 */
export const loadDashboard = async () => {
  loadSpinners(content);

  const data = {
    page,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const json = await fetchData('/api/dashboard', options);

  const { videos } = json;

  document.getElementById('spinners').innerHTML = '';

  const linkContainer = document.createElement('p');
  const strong = document.createElement('strong');

  videos.forEach((video) => {
    const span = document.createElement('span');

    // link to video
    const name = document.createElement('a');
    name.text = video.title;
    name.className = 'video';
    name.href = video.url;
    name.target = '__blank';
    name.addEventListener('click', getVideoDetails);

    span.appendChild(name);
    linkContainer.appendChild(span);
  });

  strong.appendChild(linkContainer);
  content.appendChild(strong);
};

/**
 * This function increments the page
 *  and shows videos on that page
 */
export const handleBack = () => {
  if (page > 0) {
    page -= 1;
    loadFreshVideos();
  }
};

/**
 * This function decrements the page
 *  and shows videos on that page
 */
export const handleNext = () => {
  page += 1;
  loadFreshVideos();
};
