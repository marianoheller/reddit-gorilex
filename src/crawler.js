var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


function extractComments(link) {

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
    .then( (comment) => {
        return comment.getText();
    })
    .catch( (e) => {
        throw new Error(e);
    })
}



const getComments = function _getComments( targets ) {
    console.log("Getting comments...");
    console.log(" ");

    const commentsPromises = targets.map( (targetUrl) => extractComments(targetUrl) );
    return Promise.all( commentsPromises )
    .then( (comments) => {
        return comments.map( (comment, index) => {
            return {
                comment: comment,
                url: targets[index],
            }
        })
    } )
    .catch( (e) => {
        throw new Error(e)
    });
}


module.exports = { getComments }