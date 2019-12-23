const content = document.querySelector('.content');
const back = document.querySelector('.back');
const next = document.querySelector('.next');

let page = 1;

const renderVideo = (json) => {
  console.log(json);

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

  spinners.remove();

  videoDiv.appendChild(description);
  videoDiv.appendChild(video);
  videoDiv.appendChild(views);

  content.appendChild(videoDiv);
};

const getVideoDetails = async (e) => {
  e.preventDefault();
  content.innerHTML = '';

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

const loadDashboard = async () => {
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

window.addEventListener('load', loadDashboard);
back.addEventListener('click', () => {
  if (page > 0) {
    page -= 1;
    loadDashboard();
  }
});

next.addEventListener('click', () => {
  page += 1;
  loadDashboard();
});
