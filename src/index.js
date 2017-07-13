//import myCrawler from './main'
const { getTargets, postComments } = require('./bot');
const { getComments } = require('./crawler');

console.log(" ");
console.log("Initializing gorilex...");


getTargets()
.then( (targets) => getComments(targets) )
.then( (comments) => {
    const comment = comments[Math.floor( Math.random() * comments.length)];
    postComments( [comment] );
} )
.catch( (e) => {
    console.log(e);
} );



/*


var CronJob = require('cron').CronJob;


var job = new CronJob({
  cronTime: '00 * * * * *',
  onTick: function() {
    const now = new Date();
    console.log( now.getSeconds() );
  },
  start: true,
  timeZone: 'America/Argentina/Buenos_Aires'
});
job.start();


*/