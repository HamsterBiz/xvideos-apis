const button = document.querySelector('.btn');
const content = document.querySelector('.content');

const renderVideo = (json) => {
  const videoDiv = document.createElement('div');
  videoDiv.className = 'one_video';

  const description = document.createElement('h4');
  description.innerHTML = json.title;

  const views = document.createElement('p');

  const video = document.createElement('video');


  // eslint-disable-next-line no-undef
  if (Hls.isSupported()) {
    // eslint-disable-next-line no-undef
    const hls = new Hls();
    hls.loadSource(json.files.HLS);
    hls.attachMedia(video);
    // // eslint-disable-next-line no-undef
    video.addEventListener('play', () => {
      hls.startLoad();
    });
  }

  video.autoplay = false;
  video.controls = true;
  video.poster = json.image;

  views.innerHTML = `Views ${json.views}`;

  document.querySelector('.content').innerHTML = '';

  videoDiv.appendChild(description);
  videoDiv.appendChild(video);
  videoDiv.appendChild(views);

  content.appendChild(videoDiv);
};

const loadSpinners = () => {
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
};

const getVideoDetails = async (e) => {
  e.preventDefault();

  document.querySelector('.content').innerHTML = '';

  loadSpinners();

  const data = {
    url: e.target.href,
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

  renderVideo(json);
};

const renderResult = (json) => {
  document.querySelector('.content').innerHTML = '';

  json.forEach((item, index) => {
    // index 0 is just garbage
    if (index > 0) {
      const container = document.createElement('div');

      const link = document.createElement('a');
      link.href = item.url;
      link.text = `[${index}] - ${item.title}`;
      link.addEventListener('click', getVideoDetails);

      container.appendChild(link);
      content.appendChild(container);
    }
  });
};

const search = async () => {
  const query = document.querySelector('.form-control').value;
  query.value = '';

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

  console.log(json);

  renderResult(json);
};

button.addEventListener('click', search);
