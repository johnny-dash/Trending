import { getSentiment } from './google/getSentiment';
import { queryNews } from './newsAPI/fetchNews';

export async function processData(keys, from, to, db) {
  for(let key of keys) {
    let buffer = [];
    const results = await queryNews(key, from, to);

    if(results.totalResults > 0) {
      const articles = results.articles;
      for(let i =0; i < articles.length; i++){
        const { source, description, title, publishedAt, url } = articles[i];
        const sentiment = await getSentiment(description);
        const article = {
          description,
          title,
          publishedAt,
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