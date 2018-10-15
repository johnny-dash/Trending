const NewsAPI = require('newsapi');
const config = require('../../api-config');
const newsapi = new NewsAPI(config.apiKey);

export async function queryNews(queryKey, from, to) {
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
