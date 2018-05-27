const { getCommentByDomain } = require('./domains');


const getComments = function _getComments(targets) {
  console.log('Getting comments...');
  console.log(' ');

  const commentsPromises = targets.map(targetUrl => getCommentByDomain(targetUrl));
  return Promise.all(commentsPromises)
    .then(comments =>
    // Antes de mapear, filtro los comments null (xq no se encontró el elemento en el scraper)
      comments.filter(c => c).map((commentObj) => {
        console.log(`> ${commentObj.comment}`);
        return commentObj;
      }))
    .catch((e) => {
      throw new Error(e);
    });
};


module.exports = { getComments };
