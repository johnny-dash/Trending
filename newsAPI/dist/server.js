"use strict";

const express = require('express');

const app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', client => {
  setInterval(() => {
    client.emit('timer', {
      time: new Date(),
      value: 0.5 - Math.random()
    });
  }, 5000);
});
app.get('/news', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
http.listen(3000, function () {
  console.log('listening on *:3000');
}); // const config = require('../api-config');
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';
// const dbName = 'localhost';
// import { processData } from './processData';
// async function main() {
//   try {
//     // connect to local mongo database
//     const client = await MongoClient.connect(url);
//     const db = client.db(dbName)
//     // execute immediately
//     await executeTask(db);
//     setInterval(async () => {
//       await executeTask(db);
//     }, 1000 * 60 * 60);
//   } catch(error) {
//     console.log(error);
//   }
// }
// async function executeTask(db) {
//   const to = new Date();
//   const from = new Date();
//   from.setDate(to.getDate() - 1);
//   const backGroundKey = config.backgroundKey;
//   await processData(backGroundKey, from, to, db);
//   const specificKey = config.specificKey;
//   await processData(specificKey, from, to, db);
// }
// main();
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
// newsapi.v2.topHeadlines({
//   sources: 'bbc-news,the-verge',
//   q: 'bitcoin',
//   category: 'business',
//   language: 'en',
//   country: 'us'
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// }).catch(error => {
//     console.log(error);
// });