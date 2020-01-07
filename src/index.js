const express = require('express');
const path = require('path');
const morgan = require('morgan');

const xvideos = require('./library/xvideos');
const search = require('./library/search');

require('dotenv').config();

const PORT = process.env.PORT || 80;

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/search', async (req, res) => {
  const response = await search.searchVideos(req.body.query);
  res.json(response);
});

app.post('/api/details', async (req, res) => {
  const response = await xvideos.getVideoDetais(req.body.url);
  res.json(response);
});


app.post('/api/best', async (req, res) => {
  const response = await xvideos.getBestVideos(req);
  res.json(response);
});

app.post('/api/dashboard', async (req, res) => {
  const response = await xvideos.getDashboardVideos(req.body.page);
  res.json(response);
});

app.post('/api/fresh', async (req, res) => {
  const response = await xvideos.getFreshVideos(req.body.page);
  res.json(response);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
