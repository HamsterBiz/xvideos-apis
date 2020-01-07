// eslint-disable-next-line import/extensions
import { loadSpinners, renderResult } from './UI.js';

const content = document.querySelector('.content');

// eslint-disable-next-line import/no-mutable-exports
export let page = 1;

/** This function gets details about a
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

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch('/api/details', options);
  const json = await response.json();
  return json;
  // renderVideo(json);
};

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

  const response = await fetch('/api/fresh', options);
  const json = await response.json();

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

  const response = await fetch('/api/search', options);
  const json = await response.json();

  renderResult(json, getVideoDetails);
};

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

  const response = await fetch('/api/best', options);
  const json = await response.json();

  content.innerHTML = '';

  console.log(json);

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

export const loadDashboard = async () => {
  const spinners = document.createElement('div');
  spinners.innerHTML = `<div id="spinners">
  <div class="spinner-grow text-primary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow text-secondary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow text-success" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow text-danger" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow text-warning" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow text-info" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow text-light" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div class="spinner-grow text-dark" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`;

  spinners.className = 'spinners';

  content.appendChild(spinners);

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

  const response = await fetch('/api/dashboard', options);
  const json = await response.json();

  console.log(json);

  const { videos } = json;

  spinners.remove();

  const linkContainer = document.createElement('p');
  const strong = document.createElement('strong');

  videos.forEach((video) => {
    // container for each video
    // const container = document.createElement('div');
    // container.className = 'video';

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

/** This function increments the page
 *  and shows videos on that particular
 *  page
 */
export const handleBack = () => {
  if (page > 0) {
    page -= 1;
    loadFreshVideos();
  }
};

export const handleNext = () => {
  page += 1;
  loadFreshVideos();
};
