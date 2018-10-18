"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryNews = queryNews;

const NewsAPI = require('newsapi');

const config = require('../../api-config');

const newsapi = new NewsAPI(config.apiKey);

async function queryNews(queryKey, from, to) {
  console.log(from, to);
  const result = await newsapi.v2.everything({
    q: queryKey,
    sources: config.sources,
    from: from,
    to: to,
    language: config.en,
    sortBy: 'relevancy',
    page: 3
  });
  return result;
}