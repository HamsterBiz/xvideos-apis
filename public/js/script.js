const content = document.querySelector('#content');

const loadVideos = async () => {
  const response = await fetch('/api/videos');
  const json = await response.json();

  const { videos } = json;

  for (let index = 0; index < videos.length; index += 1) {
    // container for each video
    const videoDiv = document.createElement('div');

    // link to video
    const video = document.createElement('a');
    video.text = videos[index].title;
    video.href = videos[index].url;
    video.target = '__blank';

    // view for video
    const views = document.createElement('p');
    views.innerHTML = videos[index].views.split('-').join('').trim();

    const channel = document.createElement('a');
    channel.text = videos[index].profile.name;
    channel.href = videos[index].profile.url;
    channel.target = '__blank';

    videoDiv.appendChild(channel);
    videoDiv.appendChild(document.createElement('br'));
    videoDiv.appendChild(video);
    videoDiv.appendChild(views);

    content.appendChild(videoDiv);

    console.log(videos[index]);
  }
};

window.addEventListener('load', loadVideos);
