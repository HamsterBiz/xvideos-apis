const content = document.querySelector('.content');
const back = document.querySelector('.back');
const next = document.querySelector('.next');

let page = 1;

const renderVideo = (json) => {
  const videoDiv = document.createElement('div');
  videoDiv.className = 'one_video';

  const description = document.createElement('h4');
  description.innerHTML = json.title;

  const views = document.createElement('p');

  const video = document.createElement('video');

  console.log(json.files.HLS);

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

const loadBest = async () => {
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

window.addEventListener('load', loadBest);
back.addEventListener('click', () => {
  if (page > 0) {
    page += 1;
    loadBest();
  }
});

next.addEventListener('click', () => {
  page += 1;
  loadBest();
});
