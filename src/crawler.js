// var casper = require('casper').create();


// const getComments = function _getComments( targets ) {

//     var links;

//     function getLinks() {
//     // Scrape the links from top-right nav of the website
//         var links = document.querySelectorAll('ul.navigation li a');
//         return Array.prototype.map.call(links, function (e) {
//             return e.getAttribute('href')
//         });
//     }

//     // Opens casperjs homepage
//     casper.start('http://casperjs.org/');

//     casper.then(function () {
//         links = this.evaluate(getLinks);
//     });

//     casper.run(function () {
//         for(var i in links) {
//             console.log(links[i]);
//         }
//         casper.done();
//     });

//     return targets
// }

var casper = require('casper').create();

casper.start('http://casperjs.org/', function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});

casper.run();


// module.exports = { getComments: (e)=>e }