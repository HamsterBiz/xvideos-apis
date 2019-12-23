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

app.post('/api/best', async (req, res) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const { page } = req.body;

  const bestList = await xvideos.videos.best({ year, month, page });
  res.json(bestList);
});

app.post('/api/dashboard', async (req, res) => {
  const { page } = req.body;
  const dashboardList = await xvideos.videos.dashboard({ page });
  res.send(dashboardList);
});

app.post('/api/fresh', async (req, res) => {
  const { page } = req.body;
  const fresh = await xvideos.videos.fresh({ page });
  res.json(fresh);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
