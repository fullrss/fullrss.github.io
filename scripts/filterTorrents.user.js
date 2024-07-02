// ==UserScript==
// @name         filter interesting torrents
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       You
// @match        https://rarbgprx.org/torrents.php?search=KLEENEX*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rarbgprx.org
// @updateURL    https://fullrss.ddns.net/scripts/filterTorrents.user.js
// @downloadURL  https://fullrss.ddns.net/scripts/filterTorrents.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var interestingKeys = [
        'blacked', 'vixen', 'tushy', 'joymii', 'nubilefilm', 'sexart',
        'xart', 'ultrafilms', 'wowgirls', 'wicked', 'sweetsinner',
        'deeper', 'hotwifexxx', 'TeenFidelity', 'TheWhiteBoxxx',
        'CasualTeenSex', 'Hunt4K', 'MyDaughtersHotFriend', 'hegre',
        'PureTaboo', 'BlacksOnBlondes', 'Penthouse'
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
})();