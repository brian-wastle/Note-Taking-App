const express = require('express');
const path = require('path');
const fs = require('fs');
const repos = require("./db/repos.json")
const PORT = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// app.use('/api', api);

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, './public/notes.html')),
);



app.get('/api/notes', (req, res) => {
  fs.readFile('./db/repos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });  
});


app.post('/api/notes', (req, res) => {
    
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const note = {
        title,
        text,
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

app.listen(4000);