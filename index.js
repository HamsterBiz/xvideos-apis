const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Pornsearch = require('pornsearch');
const xvideos = require('@rodrigogs/xvideos');

// const searcher = new Pornsearch('deepthroat');

// searcher.videos()
//   .then((video) => {
//     console.log(video);
//   });

require('dotenv').config();

const PORT = process.env.PORT || 80;
const app = express();
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/search', async (req, res) => {
  const { query } = req.body;

  const driver = 'xvideos';

  const searcher = new Pornsearch(query, driver);

  const response = await searcher.videos();
  res.json(response);
});

app.post('/api/details', async (req, res) => {
  const url = req.body;

  const details = await xvideos.videos.details(url);
  res.json(details);
});

app.get('/api/best', async (req, res) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  console.log(year, month);

  const bestList = await xvideos.videos.best({ year: year, month: month, page: 1 });
  res.json(bestList);
});

app.get('/api/dashboard', async (req, res) => {
  const dashboardList = await xvideos.videos.dashboard({ page: 1 });
  res.send(dashboardList);
});

app.get('/api/fresh', async (req, res) => {
  const fresh = await xvideos.videos.fresh({ page: 1 });
  res.json(fresh);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
