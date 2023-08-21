const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
const repos = require("./db/repos.json")


app.use(express.static('public'));