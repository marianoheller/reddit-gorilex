var CronJob = require('cron').CronJob;
var { reComment } = require('./commenter/commenter');


console.log("Running script...\n");

var job = new CronJob({
  cronTime: '0 0 7-23/2 * * *',
  onTick: reComment,
  start: true,
  timeZone: 'America/Argentina/Buenos_Aires'
});

job.start();