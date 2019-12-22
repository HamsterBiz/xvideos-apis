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
  }

  video.autoplay = false;
  video.controls = true;
  video.poster = json.image;

  views.innerHTML = `Views ${json.views}`;

  document.querySelector('#spinners').innerHTML = '';

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

  content.innerHTML = '';

  loadSpinners();

  const videoUrl = e.target.href;

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

  renderVideo(json);
};

const loadVideos = async () => {
  loadSpinners();

  const response = await fetch('/api/fresh');
  const json = await response.json();

  const { videos } = json;

  document.querySelector('.content').innerHTML = '';

  videos.forEach((video, index) => {
    // container for each video
    const container = document.createElement('div');
    container.className = 'video';

    // link to video
    const name = document.createElement('a');
    name.text = `[${index + 1}] - ${video.title}`;
    name.href = video.url;
    name.target = '__blank';
    name.addEventListener('click', getVideoDetails);

    container.appendChild(name);

    content.appendChild(container);
  });
};

window.addEventListener('load', loadVideos);
