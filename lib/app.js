const parseUrl = require('./utils/parseURL');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');

const teams = require('./routes/teams');

app.use('/api/teams', teams); //the url path for the brwsr to access the sports rt




module.exports = app;