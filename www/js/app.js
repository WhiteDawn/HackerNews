
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');

    // Write your app here.

    function readjustHeight(elem){
        $(elem).height($(window).height()-50);
    }

    function sharedClick(){
        $('.icon').removeClass("icon-close").addClass("icon-back");
        window.location = "#slide";
    }

    function articleClick(elem){
        sharedClick();
    }

    function commentClick(elem){
        sharedClick();
    }

    function cornerClick(elem){
        if($('.icon').hasClass("icon-close")){
            close();
        }

        $('.icon').removeClass("icon-back").addClass("icon-close");
    }

    function createArticleBlock(title, points, user, time, comments){
        var block = '<tr><td class="left"><p><span class="title">' + title + 
                    '</span><br /><span class="subtitle">' + points + 
                    ' points by ' + user + ' ' + time + 
                    ' ago</span></p></td><td class="right"><p class="rightSide">' + comments + 
                    ' Comments</p></td></tr>';
        $("#articleTable").after(block);
    }

    function displayArticles(titles){
        for (var i = 0; i < titles.length; i++){
            createArticleBlock(titles[i], '30', 'csmajorfive', '2 hours', '13');
        }
    }

    function parseHomepage() {
        var page = this.responseXML;

        var titleClasses = page.getElementsByClassName('title');

        var titles = new Array();

        for (var i = 1; i < titleClasses.length; i = i + 2){
            titles.push(titleClasses[i].childNodes[0].textContent);
        }

        displayArticles(titles);
    }

    function getHTML(url, parseFunction){
        var request = new XMLHttpRequest({mozSystem: true});

        request.onload = parseFunction;

        request.open("GET", url);
        request.responseType = "document";
        request.send();
    }

    readjustHeight('.content');
    readjustHeight('.fulltext');

    $(".left").click(function() {
        articleClick($(this));
    });
    $(".right").click(function() {
        commentClick($(this));
    });
    $(".icon-box").click(function() {
        cornerClick($(this));
    });

    getHTML("https://news.ycombinator.com/", parseHomepage);
});

