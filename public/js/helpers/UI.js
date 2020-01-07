const spinner = `<div id="spinners">
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

// eslint-disable-next-line import/prefer-default-export
export const renderVideo = (json, parentElement) => {
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

  parentElement.appendChild(videoDiv);
};

export const loadSpinners = (parentElement) => {
  const spinners = document.createElement('div');
  spinners.innerHTML = spinner;

  spinners.className = 'spinners';

  parentElement.appendChild(spinners);
};

export const renderResult = (json, getVideoDetails) => {
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
      document.querySelector('.content').appendChild(container);
    }
  });
};
