const content = document.querySelector('#content');

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

  videoDiv.appendChild(description);
  videoDiv.appendChild(video);
  videoDiv.appendChild(views);

  content.appendChild(videoDiv);
};

const getVideoDetails = async (e) => {
  e.preventDefault();

  content.innerHTML = '';

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
  const response = await fetch('/api/best');
  const json = await response.json();

  const { videos } = json;

  videos.forEach((video) => {
    const container = document.createElement('div');
    container.className = 'video';

    const channel = document.createElement('a');
    channel.href = video.profile.url;
    channel.text = video.profile.name;
    channel.target = '__blank';

    const name = document.createElement('a');
    name.href = video.url;
    name.text = video.title;
    name.addEventListener('click', getVideoDetails);

    const views = document.createElement('p');
    views.innerHTML = video.views.split('-').join('').trim();

    const duration = document.createElement('p');
    duration.innerHTML = video.duration;

    container.appendChild(channel);
    container.appendChild(document.createElement('br'));
    container.appendChild(name);
    container.appendChild(views);
    container.appendChild(duration);

    content.appendChild(container);
  });

};

window.addEventListener('load', loadBest);
