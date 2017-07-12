try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}


const getComments = function _getComments( targets ) {
    extractComment(targets);    
    return targets;
}



function extractComment( links ) {
    var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        links.forEach( (link) =>  spooky.start(link) );

        spooky.then(function () {
            this.emit('title', this.evaluate(function () {
                return document.title;
            }));
        });

        spooky.run(function() {
            this.echo('So the whole suite ended.');
            this.exit(); // <--- don't forget me!
        });
    });

    spooky.on('error', function (e, stack) {
        console.error(e);

        if (stack) {
            console.log(stack);
        }
    });


    spooky.on('title', function (greeting) {
        console.log(greeting);
    });

    spooky.on('log', function (log) {
        if (log.space === 'remote') {
            console.log(log.message.replace(/ \- .*/, ''));
        }
    });

    /*// Uncomment this block to see all of the things Casper has to say.
    // There are a lot.
    // He has opinions.
    spooky.on('console', function (line) {
        console.log(line);
    });*/

}



module.exports = { getComments }