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

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.post('/notes', (req, res) => {
    
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
        fs.writeFile(`./db/repos.json`, notesStrings, (err) =>
          err
            ? console.error(err)
            : console.log(
                `Note named "${note.title}" has been written to JSON file`
              )
        );

        res.status(201).json(res);
        
      } else {
        res.status(500).json('Error in posting review');
      }



}
  
);

app.listen(4000);