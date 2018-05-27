const webdriver = require('selenium-webdriver');
const { URL } = require('url');

const { By, until } = webdriver;


function laNacionGetter(link) {
  const driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

  driver.get(link);

  return driver.findElement(By.id('livefyre')).getLocation()
    .then(({ x, y }) => driver.executeScript(`window.scrollTo(${x},${y})`))
    .then(() => driver.wait(until.elementLocated(By.className('fyre-comment-body')), 15000))
    .then(commentObj => commentObj.getText(), () => null)
    .then((commentText) => {
      driver.quit();
      if (!commentText) { return commentText; }
      return {
        comment: commentText,
        url: link,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
}


function infobaeGetter(link) {
  const driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

  driver.get(link);

  return driver.wait(until.elementLocated(By.xpath("//*[@title='Facebook Social Plugin']")), 15000)
    .then(commentObj => commentObj.getAttribute('src'))
    .then(facebookUrl => driver.navigate().to(facebookUrl))
    .then(() => driver.wait(until.elementLocated(By.xpath("//*[@class='_5mdd']/span")), 5000))
    .then(commentObj => commentObj.getText(), () => null)
    .then((commentText) => {
      driver.quit();
      if (!commentText) { return commentText; }
      return {
        comment: commentText,
        url: link,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
}

function ambitoGetter(link) {
  const driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

  driver.get(link);

  return driver.wait(until.elementLocated(By.xpath("//div[@id='divComentarios']/div[@class='row']/article/p")), 15000)
    .then(commentObj => commentObj.getText(), () => null)
    .then((commentText) => {
      driver.quit();
      if (!commentText) { return commentText; }
      return {
        comment: commentText,
        url: link,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
}

function clarinGetter(link) {
  const driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

  driver.get(link);


  return driver.findElement(By.id('activateComments'))
    .then(activateComments => driver.actions().mouseMove(activateComments).click().perform())
    .then(() => driver.wait(until.elementLocated(By.className('gig-comment-body')), 20000))
    .then(commentObj => commentObj.getText(), (e) => {
      console.log('Error: ', e);
      return null;
    })
    .then((commentText) => {
      driver.quit();
      if (!commentText) { return commentText; }
      return {
        comment: commentText,
        url: link,
      };
    })
    .catch((e) => {
      throw new Error(e);
    });
}


const getters = [
  {
    hostname: 'www.lanacion.com.ar',
    getter: laNacionGetter,
  },
  {
    hostname: 'www.clarin.com',
    getter: clarinGetter,
  },
  {
    hostname: 'www.infobae.com',
    getter: infobaeGetter,
  },
  {
    hostname: 'www.ambito.com',
    getter: ambitoGetter,
  },
];


const getCommentByDomain = function _getCommentByDomain(link) {
  const url = new URL(link);
  const domain = url.hostname;

  if (!getters.map(getter => getter.hostname).includes(domain)) {
    throw new Error('Domain getter does not exist');
  }
  return getters.find(g => g.hostname === domain).getter(link);
};


module.exports = { getCommentByDomain };
