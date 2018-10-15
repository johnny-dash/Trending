const NewsAPI = require('newsapi');
const config = require('./api-config');
const newsapi = new NewsAPI(config.apiKey);

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'localhost';

const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

async function main() {
  try {
    // connect to local mongo database
    const client = await MongoClient.connect(url);
    const db = client.db(dbName)

    // execute immediately
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

  // const backGroundKey = config.backgroundKey;
  // await processData(backGroundKey, from, to, db);

  const specificKey = config.specificKey;
  await processData(specificKey, from, to, db);
}

async function processData(keys, from, to, db) {
  for(let key of keys) {
    let buffer = [];
    const results = await queryNews(key, from, to);

    if(results.totalResults > 0) {
      const articles = results.articles;
      for(let i =0; i < articles.length; i++){

        const { source, description, title, publishAt, url } = articles[i];
        const sentiment = await getSentiment(description);
        const article = {
          description,
          title,
          publishAt,
          url,
          source: source.name,
          sentiment
        }
        buffer.push(article);
      }
      await db.collection(key).insertMany(buffer);
      console.log('insert success', key);
    }
  }
}


async function queryNews(queryKey, from, to) {
  const result = await newsapi.v2.everything({
    q: queryKey,
    sources: config.sources,
    from: from,
    to: to,
    language: config.en,
    sortBy: 'relevancy',
    page: 2
  });
  return result;
}

async function getSentiment(feeds) {
  const document = {
    content: feeds,
    type: 'PLAIN_TEXT',
  };
  const results = await client.analyzeSentiment({document: document});

  const sentiment = results[0].documentSentiment;
  console.log(`Document sentiment:`);
  console.log(`  Score: ${sentiment.score}`);
  console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = results[0].sentences;
  sentences.forEach(sentence => {
    console.log(`Sentence: ${sentence.text.content}`);
    console.log(`  Score: ${sentence.sentiment.score}`);
    console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  })

  return sentiment.score;
}












main();

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