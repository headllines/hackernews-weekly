const dayjs = require('dayjs');
const getHeadlines = require('./utils/getHeadlines');
const issue = require('./utils/issue');

// run every Monday at 00:01 UTC
const run = async (date) => {
  const contents = await getHeadlines(date);
  console.log(contents)
  const res = await issue.open({
    owner: 'headllines',
    repo: 'hackernews-weekly',
    title: `Hacker News Weekly Top 10 @${new Date(date).toISOString().slice(0, 10)}`,
    body: contents
  });
  const issueNumber = res.data.number;

  await issue.lock({
    owner: 'headllines',
    repo: 'hackernews-weekly', 
    issueNumber,
  });
}

run(new Date());

// run(dayjs().subtract(3, 'days').toDate());
// run(dayjs().subtract(10, 'days').toDate());
// run(dayjs().subtract(17, 'days').toDate());
// run(dayjs().subtract(24, 'days').toDate());
// run(dayjs().subtract(31, 'days').toDate());
// run(dayjs().subtract(38, 'days').toDate());
// run(dayjs().subtract(45, 'days').toDate());
// run(dayjs().subtract(7 * 7 + 3, 'days').toDate());
// run(dayjs().subtract(7* 8 + 3, 'days').toDate());
// run(dayjs().subtract(7* 9 + 3, 'days').toDate());
// run(dayjs().subtract(7* 10 + 3, 'days').toDate());