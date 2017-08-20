module.exports = {
    commenter: {
        redditCredentials: {
            userAgent:  process.env.USER_AGENT,
            clientId:  process.env.CLIENT_ID,
            clientSecret:  process.env.CLIENT_SECRET,
            username:  process.env.USERNAME,
            password:  process.env.PASSWORD,
        },
        targetDomains: [
            "www.lanacion.com.ar",
            "www.infobae.com",
            "www.ambito.com",
            // "www.clarin.com",
        ],
        targetSubreddit: "argentina",
    }
}