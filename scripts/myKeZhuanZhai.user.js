// ==UserScript==
// @name         KeZhuanZhaiFilter
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.jisilu.cn/data/cbnew/
// @updateURL    https://fullrss.ddns.net/scripts/myKeZhuanZhai.user.js
// @downloadURL  https://fullrss.ddns.net/scripts/myKeZhuanZhai.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var myCookieKey = 'selfSavedList=';
    var intervalId;
    function filterById()
    {
        /*
        var label = document.getElementById('selfSavedListLabel');
        //console.log(label.textContent);
        var myKeZhuanZhai = [];
        if (label.textContent.split(':').length != 2)
        {
            console.log("No symbol got from the label");
            return;
        }
        else
        {
            myKeZhuanZhai = label.textContent.split(':')[1].split(',');
        }
        */
        var myKeZhuanZhai = loadSelfSavedListFromCookie();

        var table = document.getElementById('flex_cb');
        var tbody = table.getElementsByTagName('tbody')[0];
        var trs = tbody.getElementsByTagName('tr');
        console.log(trs.length);
        var checkBox = document.getElementById("filterCheckBox");
        var needFilter = checkBox.checked;
        for (var i = 0; i < trs.length; i++)
        {
            //console.log(trs[0].style);
            if (needFilter)
            {
                if (myKeZhuanZhai.indexOf(trs[i].id) < 0)
                {
                    trs[i].style = "display:none;";
                }
            }
            else
            {
                trs[i].removeAttribute("style");
            }
        }
    }
    function operateSymbolIntoCookie(elem, symbol)
    {
        symbol = symbol.toString();
        var checkedState = elem.checked;
        var symbols = loadSelfSavedListFromCookie();
        console.log("original symbols: " + symbols);
        if (checkedState)
        {
            symbols.push(symbol);
            symbols.sort();
        }
        else
        {
            var idx = symbols.indexOf(symbol);
            symbols.splice(idx, 1);
            symbols.sort();
        }
        console.log("updated symbols: " + symbols);
        //var lable = document.getElementById("selfSavedListLabel");
        document.cookie = 'selfSavedList=' + symbols.join();

    }

    addJS_Node (filterById);
    addJS_Node (operateSymbolIntoCookie);
    addJS_Node (loadSelfSavedListFromCookie);

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

    function loadSelfSavedListFromCookie()
    {
        //return ['113562', '123040', '123041', '128092', '128098', '123049'];
        var cookieValue = document.cookie.split('; ').find(row => row.startsWith('selfSavedList='));
        if (!cookieValue || cookieValue.indexOf('=') == cookieValue.length - 1)
        {
            return [];
        }
        else
        {
            return cookieValue.split('=')[1].split(',');
        }
    }

    function extendTableHeader()
    {
        var table = document.getElementById('flex_cb');
        var theadList = table.getElementsByTagName('thead');
        if (theadList.length == 0 || !theadList[0].lastChild)
        {
            console.log("No valid thead found");
            return;
        }
        var tr = theadList[0].lastChild;
        var th = document.createElement('th');
        th.style = "width: 39px; white-space: nowrap;";
        th.className = "header sticky";
        th.textContent = "浏览器端操作";
        tr.appendChild(th);

    }
    function extendCookieSaveButtonForOneTr(tr)
    {
        var td = document.createElement('td');
        td.style = "width:15px;white-space: nowrap";
        td.innerHTML = '<input onclick="operateSymbolIntoCookie(this, ' + tr.id + ');" id="filterCheckBox"  type="checkbox">'
        tr.appendChild(td);
        var symbols = loadSelfSavedListFromCookie();
        if (symbols.indexOf(tr.id) >= 0)
        {
            td.lastChild.checked = true;
        }
        else
        {
            td.lastChild.checked = false;
        }
    }

    function extendCookieSaveButtons()
    {
        var table = document.getElementById('flex_cb');
        var tbodyList = table.getElementsByTagName('tbody');
        if (tbodyList.length == 0 || tbodyList[0].children.length == 0)
        {
            console.log("No valid tbody found");
            return;
        }
        var trs = tbodyList[0].getElementsByTagName('tr');
        for (var i = 0; i < trs.length; i++)
        {
            extendCookieSaveButtonForOneTr(trs[i]);
        };

    }

    function extendTableContent()
    {
        var table = document.getElementById('flex_cb');
        if (table.children.length == 0)
        {
            console.log("table has no content, wait for another 1 second");
            return;
        }
        console.log("cancel interval id");
        clearInterval(intervalId);
        extendTableHeader();
        extendCookieSaveButtons();
    }

    function extendTable()
    {
        var symbols = loadSelfSavedListFromCookie();
        var showText = '浏览器端自选';
        if (symbols.length > 0)
        {
            showText = showText + ":" + symbols.join();
        }
        var span = document.getElementById('convertBondCount');
        var label = document.createElement('label');
        label.id = "selfSavedListLabel"
        label.style="display: inline-block; margin-left: 20px;"
        label.value = "selfFilter";
        label.innerHTML = '<input onclick="filterById();" id="filterCheckBox"  type="checkbox">' + showText
        span.parentNode.insertBefore(label, span);

        intervalId = window.setInterval(extendTableContent, 1000);
    }
    //document.cookie = myCookieKey;
    console.log(document.cookie);
    extendTable();
})();
