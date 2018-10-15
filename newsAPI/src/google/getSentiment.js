const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

export async function getSentiment(feeds) {
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


