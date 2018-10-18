const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);

const config = require('../api-config');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'localhost';


import { getNews, getNewsSentiment} from './model/news/index';
import { twitterTrackKeyWord } from './twitter/index';
import { processNews } from './processData';

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(cors())

app.get('/news', async function (req, res) {
  // This is very very ugly
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  const news = await getNews(db);

  res.send(news);
});

app.get('/newsSentiment', async function(req, res) {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const sentiment = await getNewsSentiment(db);

  res.send(sentiment);
})

app.listen(3001, () => {
  console.log('listening on *:3000');
})


http.listen(3000, function(){
  console.log('listening on *:3000');
});


async function main() {
  try {

    // connect to local mongo database
    const client = await MongoClient.connect(url);
    const db = client.db(dbName)

    // start twitter stream
    await twitterTrackKeyWord(['finance', 'economy'], io, db);

    // fetch news
    await executeTask(db);
    setInterval(async () => {
      await executeTask(db);
    }, 1000 * 60 * 60);

  } catch(error) {
    console.log(error);
  }
}

async function executeTask(db) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 1);

  const backGroundKey = config.backgroundKey;
  await processNews(backGroundKey, from, to, db);

  const specificKey = config.specificKey;
  await processNews(specificKey, from, to, db);
}

// main();