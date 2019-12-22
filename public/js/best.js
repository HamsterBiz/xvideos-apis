const content = document.querySelector('#content');

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

    console.log(video);
  });

};

window.addEventListener('load', loadBest);
