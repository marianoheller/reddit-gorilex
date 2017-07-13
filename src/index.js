var CronJob = require('cron').CronJob;
var moment = require('moment');

const { getTargets, postComments } = require('./bot');
const { getComments } = require('./crawler');



/* 
var job = new CronJob({
  cronTime: '00 * * * * *',
  onTick: reComment,
  start: true,
  timeZone: 'America/Argentina/Buenos_Aires'
});
job.start();

 */
reComment();


function reComment() {
  console.log(" ");
  console.log(moment().format());
  console.log("Initializing gorilex...");


  getTargets()
  .then( (targets) => getComments(targets) )
  .then( (comments) => {
      const comment = comments[Math.floor( Math.random() * comments.length)];
      //postComments( [comment] );
  } )
  .catch( (e) => {
      console.log(e);
  } );
}
