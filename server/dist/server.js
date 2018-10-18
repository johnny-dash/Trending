"use strict";

var _index = require("./model/news/index");

var _index2 = require("./twitter/index");

var _index3 = require("./cronjob/index");

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

var cors = require('cors');

var http = require('http').Server(app);

var io = require('socket.io')(http);

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'localhost';
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.get('/news', async function (req, res) {
  // This is very very ugly
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const news = await (0, _index.getNews)(db);
  res.send(news);
});
app.get('/newsSentiment', async function (req, res) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const sentiment = await (0, _index.getNewsSentiment)(db);
  res.send(sentiment);
});
app.listen(3001, () => {
  console.log('listening on *:3000');
});
http.listen(3000, function () {
  console.log('listening on *:3000');
});

async function main() {
  try {
    // connect to local mongo database
    const client = await MongoClient.connect(url);
    const db = client.db(dbName); // start cron job

    (0, _index3.cronJob)(db); // start twitter stream
    // await twitterTrackKeyWord(['finance', 'economy'], io, db);
  } catch (error) {
    console.log(error);
  }
}

main();