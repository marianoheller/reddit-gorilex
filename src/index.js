var CronJob = require('cron').CronJob;
var { reComment } = require('./commenter/commenter');


console.log("Running script...\n");
/* 
var commenterTask = new CronJob({
  cronTime: '0 0 * * * *',
  onTick: reComment,
  start: true,
  timeZone: 'America/Argentina/Buenos_Aires'
});

commenterTask.start(); */

reComment();