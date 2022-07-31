const express = require('express');
const axios = require('axios');

const app = express();

app.set('json spaces', 2);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/movies', async (req, res) => {
  await axios({
    method: 'get',
    url: 'https://tender-mclean-00a2bd.netlify.app/web/movies.json',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      return res.status(500).json({ type: 'error', message: err.message });
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
