// eslint-disable-next-line import/extensions
import { loadSpinners, renderResult } from './UI.js';

const content = document.querySelector('.content');

// eslint-disable-next-line import/no-mutable-exports
let currentPage = 1;

/**
 * This function fetches data from a provided
 * url in the backend along with the options
 * @param {*} url path to get
 * @param {*} options passed along with the url
 */
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  return response.json();
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

  const videoUrl = element.target.href;

  const options = createOptions({ url: videoUrl });

  return fetchData('/api/details', options);
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
 * This function loads the fresh video
 */
export const loadFreshVideos = async () => {
  loadSpinners(content);

  const data = { page: currentPage };

  // eslint-disable-next-line no-console
  console.log(data);

  const options = createOptions(data);

  const json = await fetchData('/api/fresh', options);

  document.querySelector('.content').innerHTML = '';

  const linkContainer = document.createElement('p');
  const strong = document.createElement('strong');

  linkContainer.className = 'video';

  createVideoList(json, linkContainer);

  strong.appendChild(linkContainer);
  content.appendChild(strong);
};

/**
 * This functions allows a user to search videos
 * on the xvideos api.
 */
export const search = async () => {
  const phrase = document.querySelector('.form-control').value;
  document.querySelector('.form-control').value = '';

  document.querySelector('.content').innerHTML = '';

  loadSpinners();

  const options = createOptions({ query: phrase });

  const json = await fetchData('/api/search', options);

  renderResult(json, getVideoDetails);
};

/**
 * This function load best videos.
 */
export const loadBest = async () => {
  content.innerHTML = '';
  loadSpinners();

  const options = createOptions({ page: currentPage });

  const json = await fetchData('/api/best', options);

  content.innerHTML = '';

  createVideoList(json, content);
};

/**
 * This function loads dashboard vides
 */
export const loadDashboard = async () => {
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
export const handleBack = () => {
  if (currentPage > 0) {
    currentPage -= 1;
    loadFreshVideos();
  }
};

/**
 * This function decrements the page
 *  and shows videos on that page
 */
export const handleNext = () => {
  currentPage += 1;
  loadFreshVideos();
};
