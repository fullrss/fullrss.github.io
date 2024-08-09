// ==UserScript==
// @name         cl link transfer
// @namespace    http://tampermonkey.net/
// @version      0.2.7
// @description  try to take over the world!
// @author       You
// @match        t66y.com/*
// @updateURL    http://192.168.119.47/scripts/clLinkTransfer.user.js
// @downloadURL  http://192.168.119.47/scripts/clLinkTransfer.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function triggerRemoteDownload(hashCode)
    {
        var input = document.getElementById("input_id_" + hashCode);
        //alert(hashCode + "\n" + input.value);
        var request = new XMLHttpRequest()
        request.onreadystatechange = function()
        {
            if (request.readyState === 4)
            {
                if (request.status === 200 || request.status === 304)
                {
                    alert("Remote download status:\n --> " + request.responseText);
                }
            }
        }
        request.open("POST", "https://totototot.asuscomm.com/cmd/rmdown");
	request.setRequestHeader('content-type', 'application/json');
	var formData = {'hashcode': hashCode, 'filename': input.value}
        request.send(JSON.stringify(formData));
    }

    addJS_Node (triggerRemoteDownload);

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

    var a_s = document.getElementsByTagName('a');
    for ( var i = 0; i < a_s.length; i++ )
    {
        if (a_s[i].target != undefined && a_s[i].target == "_blank")
        {
            if (a_s[i].href.indexOf("viidii") >= 0 || a_s[i].href.indexOf("redircdn") >= 0)
            {
                var hrefStr = a_s[i].href;
                var firstIdx = hrefStr.indexOf('?')
                hrefStr = hrefStr.substr(firstIdx + 1)
                var lastIdx = hrefStr.indexOf('&')
                hrefStr = hrefStr.substr(0, lastIdx)
                a_s[i].href = hrefStr.replace(/_+/g, '.')
            }
        }
        if (a_s[i].href.indexOf("rmdown.com") >= 0)
        {
            var hashCode = a_s[i].href.split("=")[1];
            //alert(hashCode);
            var div = document.createElement("div");
            div.innerHTML = "<input type=\"text\" id=\"input_id_" + hashCode + "\" name=\"fname\">" +
                "<button type=\"button\" onclick=\"triggerRemoteDownload('" + hashCode + "')\">远程下载</button>";
            a_s[i].parentNode.insertBefore(div, a_s[i].nextSibling);
        }
    }
})();
