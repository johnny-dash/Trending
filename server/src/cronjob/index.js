import { processNews } from './processData';
const config = require('../../api-config');

async function executeTask(db) {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 1);

    const backGroundKey = config.backgroundKey;
    await processNews(backGroundKey, from, to, db);

    const specificKey = config.specificKey;
    await processNews(specificKey, from, to, db);
}


export async function cronJob(db) {
    // fetch news
    await executeTask(db);
    setInterval(async () => {
        await executeTask(db);
    }, 1000 * 60 * 60);
}