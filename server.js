const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const path = require('path');
const http = require('http');
const app = express();
const passport = require('passport');
const social = require('./app/passport/passport')(app, passport);

const api = require('./server/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = database;
  console.log("Database connection ready");

server.listen(port, () => console.log(`Running on localhost:${port}`));
