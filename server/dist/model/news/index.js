"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNews = getNews;
exports.getNewsSentiment = getNewsSentiment;

require("core-js/modules/web.dom.iterable");

async function getNews(db) {
  const financeNews = await db.collection('finance').find({}).sort({
    publishedAt: -1
  }).toArray();
  const businessNews = await db.collection('business').find({}).sort({
    publishedAt: -1
  }).toArray();
  const marketNews = await db.collection('market').find({}).sort({
    publishedAt: -1
  }).toArray();
  return {
    financeNews,
    businessNews,
    marketNews
  };
}

async function getNewsSentiment(db) {
  const financeNews = await db.collection('finance').find({}).toArray();
  const businessNews = await db.collection('business').find({}).toArray();
  const marketNews = await db.collection('market').find({}).toArray();
  return {
    finance: calculationSentiment(financeNews),
    business: calculationSentiment(businessNews),
    market: calculationSentiment(marketNews)
  };
}

function calculationSentiment(news) {
  let positive = 0;
  let negative = 0;
  let natural = 0;
  news.forEach(item => {
    if (item.sentiment === 0) {
      natural++;
    } else if (item.sentiment > 0) {
      positive++;
    } else {
      negative++;
    }
  });
  return [positive, natural, negative];
}