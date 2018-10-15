"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSentiment = getSentiment;

require("core-js/modules/web.dom.iterable");

const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();

async function getSentiment(feeds) {
  const document = {
    content: feeds,
    type: 'PLAIN_TEXT'
  };
  const results = await client.analyzeSentiment({
    document: document
  });
  const sentiment = results[0].documentSentiment;
  console.log(`Document sentiment:`);
  console.log(`  Score: ${sentiment.score}`);
  console.log(`  Magnitude: ${sentiment.magnitude}`);
  const sentences = results[0].sentences;
  sentences.forEach(sentence => {
    console.log(`Sentence: ${sentence.text.content}`);
    console.log(`  Score: ${sentence.sentiment.score}`);
    console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  });
  return sentiment.score;
}