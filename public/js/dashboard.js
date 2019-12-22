const content = document.querySelector('#content');

const loadDashboard = async () => {
  const response = await fetch('/api/dashboard');
  const json = await response.json();

  const { videos } = json;

  videos.forEach(video => {
    // container for each video
    const container = document.createElement('div');
    container.className = 'video'

    const channel = document.createElement('a');
    channel.text = video.profile.name;
    channel.href = video.profile.url;
    channel.target = '__blank';

    // link to video
    const name = document.createElement('a');
    name.text = video.title;
    name.href = video.url;
    name.target = '__blank';

    // view for video
    const views = document.createElement('p');
    views.innerHTML = video.views.split('-').join('').trim();

    container.appendChild(channel);
    container.appendChild(document.createElement('br'));
    container.appendChild(name);
    container.appendChild(views);

    content.appendChild(container);

    console.log(video);
  });
  // console.log(videos);
};

window.addEventListener('load', loadDashboard);
