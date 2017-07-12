//import myCrawler from './main'
const { getTargets } = require('./redditBot');
const { getComments } = require('./crawler');


getTargets()
.then( (targets) => {
    const comments = getComments(targets);
})
.catch( (e) => {
    console.log(e)
    throw new Error(e)
} );