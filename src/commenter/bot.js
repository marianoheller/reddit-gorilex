'use strict';
const snoowrap = require('snoowrap');
const { commenter} = require('../../app.config');
const { URL } = require('url');


const getTargets = function _getTargets() {
    console.log("Getting targets...");
    console.log(" ");
    const { redditCredentials, targetDomains, targetSubreddit } = commenter;

    const r = new snoowrap( redditCredentials );

    const getBotComments = r.getUser(redditCredentials.username).getComments();
    const getUltimosPosts = r.getSubreddit(targetSubreddit).getNew();

    return Promise.all( [getUltimosPosts, getBotComments] )
    .then( ([posts, comments]) => {
        console.log(`> Got posts (${posts.length})`);

        //Filtro los dominios no designados
        const possibleTargets = posts.filter( (post) => {
            const url = new URL(post.url);
            return targetDomains.includes(url.host);
        });
        console.log(`> Filtered by domain. Got possible targets (${possibleTargets.length})`)
        
        //Filtro los targets ya comentados
        const commentsUrls = comments.map( (comment) => comment.link_url );
        const targets = possibleTargets.filter( (post) => {
            return !commentsUrls.includes(post.url);
        })
        console.log(`> Got already made comments (${comments.length})`)
        console.log(`> Filtered by already commented. Got targets (${targets.length})`);
        console.log(" ");
        
        if ( !targets.length ) {   throw "> No targets! Targets array empty.\n";   }
        return targets.map( (post, index) => {
            const url = new URL(post.url);
            return url.href;
        });
    } )
    .catch( (e) => {
        if ( typeof(e)==="string" ) {   throw e;   }
        throw new Error(e);
    } )
}




const postComments = function _postComments(comments) {
    const { redditCredentials, targetSubreddit } = commenter;

    if ( !comments.length ) {
        console.log("Got no comments.\n");
        return;
    }

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
        /*replies.forEach( (reply) => {
            console.log(reply);
        });*/
        console.log(" ");
        console.log("Replied succesfully!\n");
    }) 
    .catch( (e) => {
        throw new Error(e);
    })
}

module.exports = { getTargets, postComments }