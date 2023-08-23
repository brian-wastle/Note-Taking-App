const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const repos = require("./db/repos.json")
const PORT = process.env.PORT || 4000;

let repoIndex;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// app.use('/api', api);



app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, './public/notes.html')),
);



app.get('/api/notes', (req, res) => {
  res.json(repos);
});


app.post('/api/notes', (req, res) => {
    
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const note = {
        title,
        text,
        id: uuid(),
      };
    repos.push(note);

    // Convert the data to a string so we can save it
    const notesStrings = JSON.stringify(repos, null, 2);

    // Write the string to a file
    fs.writeFile(`./db/repos.json`, notesStrings, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json('Error in writing note to JSON file');
      } else {
        res.status(201).json('Note added successfully');
      }
    })
  }
});

app.delete('/api/notes/:id', (req, res) => {
  // console.log(req.params.id);

  repos.forEach(function (repo) {
    repoIndex = repos.findIndex((repo) => {
      
      // console.log(repo.id);
      repo.id === req.params.id;
    })
    
  });
  console.log(repoIndex);
  repos.splice(repoIndex, 1);
  const notesStrings = JSON.stringify(repos, null, 2);
  fs.writeFile(`./db/repos.json`, notesStrings, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json('Error in writing note to JSON file');
    } else {
      res.status(201).json('Note added successfully');
    }
  })

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT);



