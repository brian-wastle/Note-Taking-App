const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
const repos = require("./db/repos.json")


app.use(express.static('public'));

app.listen(4000);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.post('/notes', (req, res) =>
  {console.log(req.body);}
);