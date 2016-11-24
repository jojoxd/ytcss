// ==UserScript==
// @name         YTCSS
// @description  Stylesheet for youtube (w/ YT+ support)
// @namespace    http://jojoxd.nl/ytcss
// @version      0.3.3
// @encoding     utf-8
// @license      https://creativecommons.org/licenses/by-sa/4.0/
// @updateURL    https://raw.githubusercontent.com/jojoxd/ytcss/master/ytcss.user.js
// @downloadURL  https://raw.githubusercontent.com/jojoxd/ytcss/master/ytcss.user.js
// @author       Joey Vos <joeyvos@outlook.com> (jojoxd.nl)
// @include      /https?://apis\.google\.com/.*internalcard.*/
// @include      /https?://((.*\.|)www\.|)youtube\.com/.*/
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     _css        https://raw.githubusercontent.com/jojoxd/ytcss/master/youtube.css
// @resource     _css_hc     https://raw.githubusercontent.com/jojoxd/ytcss/master/youtube_hc.css
// @resource     _css_s_em   https://raw.githubusercontent.com/jojoxd/ytcss/master/youtube_s_em.css
// @require      https://raw.githubusercontent.com/jojoxd/ytcss/master/lib/arrive.min.js
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle( GM_getResourceText('_css') );

    if( window.location.href.indexOf('hovercard') != -1 ){
        console.log('hovercard detected, adding _css_hc');
        GM_addStyle( GM_getResourceText('_css_hc') );
    }
    else if( window.location.href.indexOf('subscribe_embed') != -1 ){
        console.log('hovercard internals detected, adding _css_s_em');
        GM_addStyle( GM_getResourceText('_css_hc') );
    }
    else {
        if( /(opera|OPR)/i.test(navigator.userAgent) ) {
            console.log("Opera Detected!");

            document.arrive('video', function(){
                console.log('video arrived');

                document.documentElement.style.setProperty("--player-height", document.querySelector('.player-height').getClientRects()[0].height + "px");

                window.addEventListener("resize", function(){
                    var height = document.querySelector('.player-height').getClientRects()[0].height;
                    console.log("player height might've changed ( =" + height + "px )");
                    document.documentElement.style.setProperty("--player-height", height + "px");
                });

                document.querySelectorAll('.html5-main-video').forEach( elem => {

                    var switchSelector = document.querySelector('body');

                    switchSelector.setAttribute("data-ytcss-opr-detached", elem.operaDetachedView ? "yes" : "no");

                    elem.onoperadetachedviewchange = function(){
                        if(elem.operaDetachedView) {
                            switchSelector.setAttribute("data-ytcss-opr-detached", "yes");

                            // change margin-top (of .watch-main-col) to -player.height
                            // add onresize to .html5-main-video and resize .watch-main-col's margin-top to the right size
                        }
                        else {
                            switchSelector.setAttribute("data-ytcss-opr-detached", "no");
                        }
                    };
                });
            });
        }
    }
})();
