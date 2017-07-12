
const redditCredentials = {
    userAgent: 'put your user-agent string here',
    clientId: 'put your client id here',
    clientSecret: 'put your client secret here',
    username: 'put your username here',
    password: 'put your password here'
};

// OR
//
// const redditCredentials = {
//     userAgent: 'put your user-agent string here',
//     clientId: 'put your client id here',
//     clientSecret: 'put your client secret here',
//     refreshToken: 'put your refresh token here'
// }


const targetDomains = [
    "www.clarin.com",
    "www.infobae.com"
]


module.exports = { redditCredentials, targetDomains }