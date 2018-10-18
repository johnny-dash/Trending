"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cronJob = cronJob;

var _processData = require("./processData");

const config = require('../../api-config');

async function executeTask(db) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 1);
  const backGroundKey = config.backgroundKey;
  await (0, _processData.processNews)(backGroundKey, from, to, db);
  const specificKey = config.specificKey;
  await (0, _processData.processNews)(specificKey, from, to, db);
}

async function cronJob(db) {
  // fetch news
  await executeTask(db);
  setInterval(async () => {
    await executeTask(db);
  }, 1000 * 60 * 60);
}