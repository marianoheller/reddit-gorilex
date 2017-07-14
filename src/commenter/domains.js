var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const { URL } = require('url');


const getters = [
    {
        hostname: "www.lanacion.com.ar",
        getter: laNacionGetter
    },
    {
        hostname: "www.clarin.com",
        getter: clarinGetter
    }
]


const getCommentByDomain = function _getCommentByDomain( link ) {
    const url = new URL(link);
    const domain = url.hostname;

    if ( !getters.map( (getter) => getter.hostname).includes(domain) ) {   
        throw new Error("Domain getter does not exist")
    }
    return getters.find( (g) => g.hostname===domain ).getter(link);
}



function laNacionGetter(link) {
    var driver = new webdriver.Builder()
        .forBrowser('phantomjs')
        .build();

    driver.get(link);

    return driver.findElement(By.id('livefyre')).getLocation()
    .then( ( { x, y }) => {
        return driver.executeScript(`window.scrollTo(${x},${y})`)
    })
    .then ( () => {
        return driver.wait(until.elementLocated( By.className('fyre-comment-body') ), 15000);
    })
    .then( (commentObj) => {
        return commentObj.getText()
    }, (e) => {
        return null;
    })
    .then( (commentText) => {
        if ( !commentText ) {   return commentText;   }
        return {
            comment: commentText,
            url: link,
        }
    })
    .catch( (e) => {
        throw new Error(e);
    })
}

function clarinGetter(link) {
    var driver = new webdriver.Builder()
        .forBrowser('phantomjs')
        .build();

    driver.get(link);
    throw new Error("CLARIN NO!!");
}


module.exports = { getCommentByDomain }