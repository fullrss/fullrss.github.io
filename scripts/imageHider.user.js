// ==UserScript==
// @name         ImageHider
// @namespace    http://tampermonkey.net/
// @version      0.2.2
// @description  try to take over the world!
// @author       You
// @match        https://bloghz.ddns.net/j/*
// @match        https://totototot.asuscomm.com/j/*
// @match        https://rarbgprx.org/torrent/*
// @updateURL    http://192.168.119.47/scripts/imageHider.user.js
// @downloadURL  http://192.168.119.47/scripts/imageHider.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function cssAppend(cssText){
        console.log("call cssAppend()")
        let style = document.createElement('style')
        let head = document.head || document.getElementsByTagName('head')[0]
        style.type = 'text/css'

        let textNode = document.createTextNode(cssText)
        style.appendChild(textNode)

        head.appendChild(style)
    }

    function setAllImgsVisiblity(visible) {
        console.log("call setAllImgsVisiblity")
        var imgs = document.getElementsByTagName("img")
        for(var i = 0; i < imgs.length; i++)
        {
            //console.log(imgs[i])
            if (visible){
                //imgs[i].className = ""
                imgs[i].src = imgs[i].title
            }
            else {
                //imgs[i].className = "image-hide"
                imgs[i].title = imgs[i].src
                imgs[i].src = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAIAAAAHaf8HAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRTM4OTczODZFNjgxMUU1ODc5QUZBQUIyQzFGRDgxNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRTM4OTczOTZFNjgxMUU1ODc5QUZBQUIyQzFGRDgxNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNFMzg5NzM2NkU2ODExRTU4NzlBRkFBQjJDMUZEODE0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNFMzg5NzM3NkU2ODExRTU4NzlBRkFBQjJDMUZEODE0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv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"
                //imgs[i].className = ""
            }
        }
    }

    function changeImageVisibility() {
        console.log("call changeImageVisibility")
        var btn = document.getElementById("__btnToChangeImageVisibility")
        if (btn)
        {
            if (btn.innerHTML == "show") {
                setAllImgsVisiblity(true)
                btn.innerHTML = "hide"
            }
            else {
                setAllImgsVisiblity(false)
                btn.innerHTML = "show"
            }
        }
    }

    addJS_Node (changeImageVisibility);
    addJS_Node (setAllImgsVisiblity);

    function addJS_Node (text, s_URL, funcToRun, runOnLoad)
    {
        var scriptNode = document.createElement ('script');
        if (runOnLoad) {
            scriptNode.addEventListener ("load", runOnLoad, false);
        }
        scriptNode.type = "text/javascript";
        if (text)
        {
            scriptNode.textContent = text;
        }
        if (s_URL)
        {
            scriptNode.src = s_URL;
        }
        if (funcToRun)
        {
            scriptNode.textContent = '(' + funcToRun.toString() + ')()';
        }

        var targ = document.getElementsByTagName ('head')[0] || document.body || document.documentElement;
        targ.appendChild (scriptNode);
    }

    //cssAppend(".image-hide { opacity: 0;outline-width: 0;}");
    //cssAppend(".image-pattern-bg-img { background-repeat: repeat !important; text-indent: 0 !important; }");
    //cssAppend(".image-shade-0 { background-image: url('https://bloghz.ddns.net/us/pattern-light0.png') }");
    setAllImgsVisiblity(false)
    var div = document.createElement("div");
    div.width = "100%"
    div.align = "right"
    div.innerHTML = "<button id=\"__btnToChangeImageVisibility\" type=\"button\" onclick=\"changeImageVisibility()\">show</button>";
    var imgs = document.getElementsByTagName("img")
    if (imgs.length > 0) {
        document.body.insertBefore(div, document.body.firstChild)
    }

    //setTimeout(function() {setAllImgsVisiblity(true)}, 5000);

})();
