const express = require('express');
const path = require('path');
const morgan = require('morgan');
const xvideos = require('@rodrigogs/xvideos');

const PORT = 3000;
const app = express();
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/best', async (req, res) => {
  const bestList = await xvideos.videos.best({ year: '2019', month: '12', page: 1 });
  res.json(bestList);
});

app.get('/api/dashboard', async (req, res) => {
  const dashboardList = await xvideos.videos.dashboard({ page: 1 });
  res.send(dashboardList);
});

app.get('/api/fresh', async (req, res) => {
  // Retrieve fresh videos
  const fresh = await xvideos.videos.fresh({ page: 1 });
  res.json(fresh);
  // console.log(fresh.videos); // { url, path, title, duration, profile: { name, url }, views, }
  // console.log(fresh.pagination.current); // 1 
  // console.log(fresh.pagination.pages); // [1, 2, 3, 4, 5...]
  // console.log(fresh.hasNext()); // true
  // console.log(fresh.hasPrevious()); // false
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// async function loadVideos() {

//   // Retrieve fresh videos
//   const fresh = await xvideos.videos.fresh({ page: 1 });
//   console.log(fresh.videos); // { url, path, title, duration, profile: { name, url }, views, }
//   console.log(fresh.pagination.current); // 1 
//   console.log(fresh.pagination.pages); // [1, 2, 3, 4, 5...]
//   console.log(fresh.hasNext()); // true
//   console.log(fresh.hasPrevious()); // false

//   // const nextPage = await fresh.next();
//   // console.log(nextPage.pagination.current); // 2
//   // console.log(nextPage.hasNext()); // true
//   // console.log(nextPage.hasPrevious()); // true

//   // const previousPage = await fresh.previous();
//   // console.log(previousPage.pagination.current); // 1
//   // console.log(previousPage.hasNext()); // true
//   // console.log(previousPage.hasPrevious()); // tfalse
// }