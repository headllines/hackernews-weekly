const dayjs = require('dayjs');
const getHeadlines = require('./utils/getHeadlines');
const issue = require('./utils/issue');

// run every day at 00:01 UTC
const yesterday = dayjs().subtract(1, 'day').toDate();
generateHeadlinesOfDate(yesterday);

const run = async () => {
  const contents = await getHeadlines();
  issue.open({
    owner: 'headllines',
    repo: 'hackernews-weekly',
    title: 'Hacker News Weekly Top 10 @${new Date().toISOString().slice(0, 10)}',
    body: contents
  })
}

run()