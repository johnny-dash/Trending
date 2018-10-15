"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processData = processData;

var _getSentiment = require("./google/getSentiment");

var _fetchNews = require("./newsAPI/fetchNews");

async function processData(keys, from, to, db) {
  for (let key of keys) {
    let buffer = [];
    const results = await (0, _fetchNews.queryNews)(key, from, to);

    if (results.totalResults > 0) {
      const articles = results.articles;

      for (let i = 0; i < articles.length; i++) {
        const _articles$i = articles[i],
              source = _articles$i.source,
              description = _articles$i.description,
              title = _articles$i.title,
              publishAt = _articles$i.publishAt,
              url = _articles$i.url;
        const sentiment = await (0, _getSentiment.getSentiment)(description);
        const article = {
          description,
          title,
          publishAt,
          url,
          source: source.name,
          sentiment
        };
        buffer.push(article);
      }

      await db.collection(key).insertMany(buffer);
      console.log('insert success', key);
    }
  }
}