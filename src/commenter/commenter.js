
var moment = require('moment');

const { getTargets, postComments } = require('./bot');
const { getComments } = require('./scraper');



const reComment = function _reComment() {
  console.log(" ");
  console.log(moment().format());
  console.log("Initializing commenter...");


  getTargets()
  .then( (targets) => getComments(targets) )
  .then( (comments) => {
      //const comment = comments[Math.floor( Math.random() * comments.length)];
      //postComments( comments );
  } )
  .catch( (e) => {
      console.log(e);
  } );
}


module.exports = { reComment }