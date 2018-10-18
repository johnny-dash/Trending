"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twitterTrackKeyWord = twitterTrackKeyWord;

require("core-js/modules/web.dom.iterable");

var _getSentiment = require("../google/getSentiment");

var config = require('../../api-config').twitter;

var tw = require('node-tweet-stream')(config);

async function twitterTrackKeyWord(keys, io, db) {
  keys.forEach(key => {
    tw.track(key);
  });
  let tweets = [];
  tw.on('tweet', async function (tweet) {
    if (preProcessTweet(tweet)) {
      const tweetContent = {
        text: tweet.text,
        created_at: tweet.created_at,
        sentiment: await (0, _getSentiment.getSentiment)(tweet.text),
        user: {
          name: tweet.user.name,
          location: tweet.user.location,
          profile_image: tweet.user.profile_image_url,
          profile_banner_url: tweet.user.profile_banner_url
        }
      };
      tweets.push(tweet);
      io.emit('twitter', tweetContent);

      if (tweets.length > 100) {
        await db.collection('twitter').insertMany(tweets);
        tweets = [];
      }
    }
  });
  tw.on('error', function (err) {
    console.log('Oh no');
  });
}

function preProcessTweet(tweet) {
  return tweet.text.length > 10 && tweet.lang === 'en';
}