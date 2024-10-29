// ==UserScript==
// @name         Sehuatang Highlight Wish List
// @namespace    http://tampermonkey.net/
// @version      2024-05-20
// @description  try to take over the world!
// @author       You
// @match        https://www.sehuatang.net/forum-103-*.html
// @match        https://www.sehuatang.net/forum-36-*.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sehuatang.net
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @updateURL    http://192.168.119.47/scripts/myKeZhuanZhai.user.js
// @downloadURL  http://192.168.119.47/scripts/myKeZhuanZhai.user.js
// ==/UserScript==

(function() {
    'use strict';

    function splitSymbolStr(str)
    {
        str = str.replace(/^\s+|\s+$/g, '');
        var symbols = str.split("\n");
        return symbols;
    }

    function highlightSymbols(symbols, highlightStr)
    {
        var topicTagAs = document.getElementsByClassName("s xst");
        for (var i = 0; i< topicTagAs.length; i++)
        {
            var tag = topicTagAs[i];
            console.log(tag);
            for (var j=0; j<symbols.length; j++)
            {
                if (tag.text.indexOf(symbols[j]) >=0)
                {
                    var strstr = tag.text.split("***");
                    if (strstr.length ==3)
                    {
                        tag.text = strstr[0] + "***" + highlightStr + strstr[1] + "***" + strstr[2];
                    }
                    else
                    {
                        tag.text = "***" + highlightStr + "***" + tag.text;
                    }

                    var elemB = document.createElement("b");
                    tag.parentNode.insertBefore(elemB, tag.nextElementSibling);
                    elemB.appendChild(tag);
                }
            }
        }
    }

    // Your code here...
    GM_xmlhttpRequest
    ({
        method: "GET",
        url: "https://totototot.asuscomm.com/j/static/input.txt",
        onload: function(response)
        {
            //console.log(response.responseText);
            var str = response.responseText;
            var symbols = splitSymbolStr(str);
            var ExistButNoSub = [];
            var NoneExist = [];
            for (var i = 0; i<symbols.length; i++)
            {
                var s = symbols[i];
                if (s.indexOf("---None") > 0)
                {
                    NoneExist.push(s.replace("---None", ""));
                }
                if (s.indexOf("-Nosub") > 0)
                {
                    ExistButNoSub.push(s.replace("-Nosub", ""));
                }
            }
            highlightSymbols(NoneExist, "[NotExist]");
            highlightSymbols(ExistButNoSub, "[ExistWithoutSub]");
        }
    });
    GM_xmlhttpRequest
    ({
        method: "GET",
        url: "https://totototot.asuscomm.com/j/static/videoExist.txt",
        onload: function(response)
        {
            //console.log(response.responseText);
            var str = response.responseText;
            var symbols = splitSymbolStr(str);
            highlightSymbols(symbols, "[Existing]");
        }
    });
    GM_xmlhttpRequest
    ({
        method: "GET",
        url: "https://totototot.asuscomm.com/j/static/videoExtSub.txt",
        onload: function(response)
        {
            //console.log(response.responseText);
            var str = response.responseText;
            var symbols = splitSymbolStr(str);
            highlightSymbols(symbols, "[WrongSub]");
        }
    });
    GM_xmlhttpRequest
    ({
        method: "GET",
        url: "https://totototot.asuscomm.com/j/static/videoGg5.txt",
        onload: function(response)
        {
            //console.log(response.responseText);
            var str = response.responseText;
            var symbols = splitSymbolStr(str);
            highlightSymbols(symbols, "[GG5]");
        }
    });


})();