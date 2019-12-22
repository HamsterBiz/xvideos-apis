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
  const response = await fetch('/api/fresh');
  const json = await response.json();

  const { videos } = json;

  videos.forEach((video) => {
    // container for each video
    const container = document.createElement('div');
    container.className = 'video';

    const channel = document.createElement('a');
    channel.text = video.profile.name;
    channel.href = video.profile.url;
    channel.target = '__blank';

    // link to video
    const name = document.createElement('a');
    name.text = video.title;
    name.href = video.url;
    name.target = '__blank';
    name.className = 'video_url';
    name.addEventListener('click', getVideoDetails);

    // view for video
    const views = document.createElement('p');
    views.innerHTML = video.views.split('-').join('').trim();

    container.appendChild(channel);
    container.appendChild(document.createElement('br'));
    container.appendChild(name);
    container.appendChild(views);

    content.appendChild(container);
  });
};

window.addEventListener('load', loadVideos);
