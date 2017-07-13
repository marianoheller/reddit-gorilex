'use strict';
const snoowrap = require('snoowrap');
const { redditCredentials, targetDomains, targetSubreddit } = require('../app.config');
const { URL } = require('url');


const getTargets = function _getTargets() {
    console.log("Getting targets...");
    console.log(" ");
    if ( !redditCredentials ) {   throw new Error("Credentials not found.")   }
    if ( !targetDomains ) {   throw new Error("Target domains not found.")   }
    if ( !targetSubreddit ) {   throw new Error("Target subreddit not found.")   }

    const r = new snoowrap( redditCredentials );

    const getBotComments = r.getUser(redditCredentials.username).getComments();
    const getUltimosPosts = r.getSubreddit(targetSubreddit).getNew();

    return Promise.all( [getUltimosPosts, getBotComments] )
    .then( ([posts, comments]) => {
        console.log(`> Got posts (${posts.length})`)

        //Filtro los dominios no designados
        const possibleTargets = posts.filter( (post) => {
            const url = new URL(post.url);
            return targetDomains.includes(url.host);
        });
        console.log(`> Got possible targets (${possibleTargets.length})`)
        
        //Filtro los targets ya comentados
        const commentsUrls = comments.map( (comment) => comment.link_url );
        const targets = possibleTargets.filter( (post) => {
            return !commentsUrls.includes(post.url);
        })
        console.log(`> Got already made comments (${comments.length})`)
        console.log(`> Got targets (${targets.length})`);
        console.log(" ");
        
        if ( !targets.length ) {   throw new Error( "No targets! Targets array empty" );   }
        return targets.map( (post, index) => {
            const url = new URL(post.url);
            return url.href;
        });
    } )
    .catch( (e) => {
        throw new Error(e);
    } )
}




const postComments = function _postComments(comments) {

    console.log(comments);
    const r = new snoowrap( redditCredentials );

    r.getSubreddit(targetSubreddit).getNew()
    .then( (posts) => {
        //Filtro los new por si alguno aparecio antes y ahora ya no.
        const targets = posts.filter( (post) => comments.map( (comment) => comment.url ).includes(post.url) );
        return targets.map( (target) => {
            const comment = comments.find( (comment) => comment.url === target.url);
            return target.reply(comment.comment);
        } )
    })
    .then( (replies) => {
        replies.forEach( (reply) => {
            console.log(reply);
        });
    })
    .catch( (e) => {
        throw new Error(e);
    })
}

module.exports = { getTargets, postComments }