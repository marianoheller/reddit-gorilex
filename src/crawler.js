const { getCommentByDomain } = require('./domains');



const getComments = function _getComments( targets ) {
    console.log("Getting comments...");
    console.log(" ");

    const commentsPromises = targets.map( (targetUrl) => getCommentByDomain(targetUrl) );
    return Promise.all( commentsPromises )
    .then( (comments) => {
        return comments.map( (comment, index) => {
            console.log(`> ${comment}`)
            return {
                comment: comment,
                url: targets[index],
            }
        })
    } )
    .catch( (e) => {
        throw new Error(e)
    });
}


module.exports = { getComments }