const getHeadlines = require('../utils/getHeadlines');

test('addFolder', async () => {
  const headlines = await getHeadlines(new Date());
  console.log(headlines)
});
