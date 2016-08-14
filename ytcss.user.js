// ==UserScript==
// @name         YTCSS
// @description  Stylesheet for youtube (w/ YT+ support)
// @namespace    http://jojoxd.nl/ytcss
// @version      0.2
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
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle( GM_getResourceText('_css') );

    if( window.location.href.indexOf('hovercard') != -1 ){
        console.log('hovercard detected, adding _css_hc');
        GM_addStyle( GM_getResourceText('_css_hc') );
    }

    if( window.location.href.indexOf('subscribe_embed') != -1 ){
        console.log('hovercard detected, adding _css_s_em');
        GM_addStyle( GM_getResourceText('_css_hc') );
    }
})();
