// ==UserScript==
// @name         Torrent Link Regularaty
// @namespace    http://tampermonkey.net/
// @version      0.3.5
// @description  Change the torrent links in the given page for downloading easily
// @author       You
//
// @match        https://rarbgprx.org/torrents.php?search=KLEENEX*
// @match        hdchina.org/torrents.php*
// @match        https://www.limetorrents.lol/search/all/*
//
// @icon         https://www.google.com/s2/favicons?sz=64&domain=limetorrents.lol
// @grant        none
// @updateURL    http://192.168.119.47/scripts/Torrent.Link.Regularaty.user.js
// @downloadURL  http://192.168.119.47/scripts/Torrent.Link.Regularaty.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function handleRarbgLinks()
    {
        var interestingKeys = [
            'RealityJunkies',
            'blacked',
            'BlacksOnBlondes',
            'CasualTeenSex',
            'deeper',
            'hegre',
            'hotwifexxx',
            'Hunt4K',
            'joymii',
            'MyDaughtersHotFriend',
            'MomsTeachSex',
            'nubilefilm',
            'Penthouse',
            'PornFidelity',
            'PureTaboo',
            'sexart',
            'sweetsinner',
            'TeenFidelity',
            'TeenyLovers',
            'TheWhiteBoxxx',
            'tushy',
            'ultrafilms',
            'vixen',
            'wicked',
            'wowgirls',
            'xart',
        ];
        var trs = document.getElementsByClassName('lista2');
        for (var i=0; i< trs.length; i++)
        {
            var tr = trs[i];
            if (tr.tagName.toLowerCase() != 'tr')
            {
                continue;
            }
            //console.log(i);
            var needHide = true;
            var tagAs = tr.getElementsByTagName('a');
            for (var j = 0; j < tagAs.length; j++)
            {
                var a = tagAs[j];
                if (a.href.toLowerCase().indexOf('torrents.php?category=') >= 0)
                {
                    continue;
                }
                console.log(a.title);
                for (var k = 0; k < interestingKeys.length; k++)
                {
                    if (a.title.toLowerCase().indexOf(interestingKeys[k].toLowerCase()) >= 0)
                    {
                        needHide = false;
                        console.log('*** Need Show ***: ' + a.title);
                        break;
                    }
                }
            }
            if (needHide)
            {
                tr.style = "display:none;";
            }
        }
    }

    function handleHdchinaLinks()
    {
        var uidPara = '&uid=255034';
        var download_imgs = document.getElementsByClassName('download');
        for ( var i = 0; i < download_imgs.length; i++ )
        {
            var torrentLinkElem = download_imgs[i].parentElement;
            console.log(torrentLinkElem.href);
            torrentLinkElem.href = torrentLinkElem.href + uidPara;
        }
    }

    function handleLimeLinks()
    {
        var torrentAs = document.getElementsByClassName('csprite_dl14');
        for (var i = 0; i < torrentAs.length; i++)
        {
            var t = torrentAs[i];
            t.href = t.href.split('?')[0];
            t.href = t.href.replace('http://', 'https://');
        }
    }

    var currentUrl = window.location.href;
    if (currentUrl.indexOf('rarbgprx.org/torrents.php?search=KLEENEX') >= 0)
    {
        handleRarbgLinks();
    }
    else if (currentUrl.indexOf('hdchina.org/torrents.php') >= 0)
    {
        handleHdchinaLinks();
    }
    else if (currentUrl.indexOf('www.limetorrents.lol/search/all/') >= 0)
    {
        handleLimeLinks();
    }
    else
    {
        console.log('Url [' + currentUrl + '] is not supported.');
    }
})();
