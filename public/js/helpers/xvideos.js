// eslint-disable-next-line import/extensions
import { loadSpinners, renderResult, renderVideo } from './UI.js';

const content = document.querySelector('.content');

// eslint-disable-next-line import/no-mutable-exports
let currentPage = 1;

/**
 * This function fetches data from a provided
 * url in the backend along with the options
 * @param {*} url path to get
 * @param {*} options passed along with the url
 */
const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
};

/**
 * These options are used to create
 * a post request on the server.
 * @param {*} data This is the data to be passed along
 * with the post request.
 */
const createOptions = (data) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return options;
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

  const options = createOptions({ url: element.target.href });

  const json = await fetchData('/api/details', options);

  renderVideo(json, content);
};

/**
 * This function appends videos to an
 *  existing parent element.
 * @param {*} json This is the data with videos
 * @param {*} parentElement  This is an element to append videos.
 */
const createVideoList = (json, parentElement) => {
  json.videos.forEach((video) => {
    const span = document.createElement('span');

    // link to video
    const name = document.createElement('a');
    name.text = video.title;
    name.className = 'video';
    name.href = video.url;
    name.target = '__blank';
    name.addEventListener('click', getVideoDetails);

    span.appendChild(name);
    parentElement.appendChild(span);
  });
};

/**
 * This functions allows a user to search videos
 * on the xvideos api.
 */
export const search = async () => {
  const phrase = document.querySelector('.form-control').value;
  document.querySelector('.form-control').value = '';

  document.querySelector('.content').innerHTML = '';

  loadSpinners(content);

  const options = createOptions({ query: phrase });

  const json = await fetchData('/api/search', options);

  renderResult(json, getVideoDetails);
};

/**
 * This function loads the fresh video
 */
const loadFreshVideos = async (paging) => {
  loadSpinners(content);

  // eslint-disable-next-line no-console
  console.log(paging);

  const options = createOptions(paging);

  const json = await fetchData('/api/fresh', options);

  console.log(json.videos);

  document.querySelector('.content').innerHTML = '';

  const linkContainer = document.createElement('p');
  const strong = document.createElement('strong');

  linkContainer.className = 'video';

  createVideoList(json, linkContainer);

  strong.appendChild(linkContainer);
  content.appendChild(strong);
};

/**
 * This function load best videos.
 */
const loadBestVideos = async (paging) => {
  content.innerHTML = '';
  loadSpinners(content);

  const options = createOptions(paging);

  const json = await fetchData('/api/best', options);

  content.innerHTML = '';

  createVideoList(json, content);
};

/**
 * This function loads dashboard vides
 */
const loadDashboard = async () => {
  loadSpinners(content);

  const options = createOptions({ page: currentPage });

  const json = await fetchData('/api/dashboard', options);

  document.getElementById('spinners').innerHTML = '';

  const linkContainer = document.createElement('p');
  const strong = document.createElement('strong');

  createVideoList(json, linkContainer);

  strong.appendChild(linkContainer);
  content.appendChild(strong);
};

/**
 * This function increments the page
 *  and shows videos on that page
 */
export const loadPrevious = () => {
  if (currentPage > 0) {
    loadFreshVideos({ next: false, page: currentPage, previous: true });
    currentPage -= 1;
  }
};

/**
 * This function decrements the page
 *  and shows videos on that page
 */
export const loadNext = () => {
  loadFreshVideos({ next: true, page: currentPage, previous: false });
  currentPage += 1;
};

export const loadCurrentFresh = () => {
  loadFreshVideos({ next: false, page: currentPage, previous: false });
};

export const loadCurrentBest = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  loadBestVideos({
    next: false,
    page: currentPage,
    previous: false,
    year,
    month,
  });
};

export const loadCurrentDashboard = () => {
  loadDashboard({ next: false, page: currentPage, previous: false });
};
