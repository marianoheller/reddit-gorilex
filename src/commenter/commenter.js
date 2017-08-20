var moment = require('moment');
const { commenter} = require('../../app.config');
const { getTargets, postComments } = require('./bot');
const { getComments } = require('./scraper');



const reComment = function _reComment() {
  console.log(" ");
  console.log(moment().format());
  console.log("Initializing commenter...");
  checkConfigFile();


  getTargets()
  .then( (targets) => getComments(targets) )
  .then( (comments) => postComments( comments ) )
  .catch( (e) => {
      console.log(e);
  } );
}


function checkConfigFile() {
    if ( !commenter ) {   throw new Error("Config file not found.")}
    const { redditCredentials, targetDomains, targetSubreddit } = commenter;
    if ( !redditCredentials ) {   throw new Error("Credentials not found.")   }
    if ( !targetDomains ) {   throw new Error("Target domains not found.")   }
    if ( !targetSubreddit ) {   throw new Error("Target subreddit not found.")   }
    console.log("Config files OK");
}


module.exports = { reComment }