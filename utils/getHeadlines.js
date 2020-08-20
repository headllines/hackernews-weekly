const axios = require('axios');
const timeago = require('timeago.js');

const getHeadlines = async (date) => {
  console.log('start fetching headlines')
  try {
    // end of the week
    const endTime = Math.round(new Date(date).getTime() / 1000);
    // 12 hour before start of the week (save missed posts)
    const startTime = Math.round(new Date(date).getTime() / 1000) - (7 * 24 * 60 * 60 + 12 * 60 * 60);
    const res = await axios.get(`https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`);
    const top10Objs = res.data.hits.slice(0, 10);
    const contents = top10Objs
      .map((obj, i) => {
        const { title, created_at, url, author, points, objectID, num_comments } = obj;
        return `${i + 1}. **[${title}](${url})**
${points} points by [${author}](https://news.ycombinator.com/user?id=${author}) ${timeago.format(created_at)} | [${num_comments} comments](https://news.ycombinator.com/item?id=${objectID})

`;
      }).join('');
    return contents;
  } catch (error) {
    console.log(error);
    throw error
  }

}

module.exports = getHeadlines;


// getHeadlines(new Date())
