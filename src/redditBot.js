'use strict';
const snoowrap = require('snoowrap');
const { redditCredentials, targetDomains } = require('../app.config');
const { URL } = require('url');


const getTargets = function f_getTargets() {
    const r = new snoowrap( redditCredentials );

    const getBotComments = r.getUser(redditCredentials.username).getComments();
    const getUltimosPosts = r.getSubreddit('argentina').getNew();

    Promise.all( [getUltimosPosts, getBotComments] )
    .then( ([posts, comments]) => {

        const possibleTargets = posts.filter( (post) => {
            const url = new URL(post.url);
            return targetDomains.includes(url.host);
        })
        console.log("=================");
        console.log("All Targets")
        console.log( possibleTargets.map( (post, index) => {
            const url = new URL(post.url);
            return `${post.id} | ${post.title} | ${url.host}`
        }) );
        
        console.log("=================");
        console.log("Current Targets");
        console.log(comments.map( comment => comment.link_url));
    } )
    .catch( (e) => console.log(e) )
}

module.exports = { getTargets }