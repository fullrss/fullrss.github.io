// ==UserScript==
// @name         挂课加速
// @namespace    http://tampermonkey.net/
// @version      2024-01-31
// @description  try to take over the world!
// @author       You
// @match        https://www.zfwx.com/member/DjStucw/play.do?stucwid=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zfwx.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var StringUtil = new function() {
        this.Base64Encode = function(str) {
            return base64encode(utf16to8(str));
        };

        this.Base64Decode = function(str) {
            return utf8to16(base64decode(str))
        };

        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var base64DecodeChars = new Array( - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, - 1, 62, - 1, - 1, - 1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, - 1, - 1, - 1, - 1, - 1, - 1, - 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, - 1, - 1, - 1, - 1, - 1, - 1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, - 1, - 1, - 1, - 1, - 1);
        var base64encode = function(str) {
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        };

        var base64decode = function(str) {
            var c1, c2, c3, c4;
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == - 1);
                if (c1 == - 1) break;
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == - 1);
                if (c2 == - 1) break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61) return out;
                    c3 = base64DecodeChars[c3];
                } while (i < len && c3 == - 1);
                if (c3 == - 1) break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61) return out;
                    c4 = base64DecodeChars[c4];
                } while (i < len && c4 == - 1);
                if (c4 == - 1) break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        };
        var utf16to8 = function(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        };
        var utf8to16 = function(str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        }
    }

    // Your code here...
    var mm = 1;
    var limit = 0;
    var spans = document.getElementsByClassName("mulutime mulutimehover");
    if (spans.length == 1)
    {
        console.log(spans[0].textContent);
        limit = parseInt(spans[0].textContent.replace("分钟", ""));
    }

    function timerCallback()
    {
        var stucwidInput = document.getElementById("stucwid");
        var stucwid = stucwidInput.value;
        var memStasticInput = document.getElementById("memStastic");
        var memStastic = memStasticInput.value;
        var userNameInput = document.getElementById("userName");
        var userName = userNameInput.value;
        var csHourInput = document.getElementById("csHour");
        var csHour = csHourInput.value;
        var cwHourInput = document.getElementById("cwHour");
        var cwHour = cwHourInput.value;
        var cwareIdInput = document.getElementById("coursewareId");
        var cwareId = cwareIdInput.value;
        var acIdInput = document.getElementById("acId");
        var acId = acIdInput.value;
        var multiple = "2.0";
        var x = limit * 60;
        if (mm <= limit)
        {
            x = mm * 60;
            mm = mm + 1;
        }
        
        var sysNewTime = x.toString();
        console.log(sysNewTime);

        var pramdencode = "stucwid=" + stucwid
            + "&memStastic=" + memStastic
            + "&curtime=" + sysNewTime
            + "&userName=" + userName
            + "&csHour=" + csHour
            + "&cwHour=" + cwHour
            + "&cwareId=" + cwareId
            + "&accountId=" + acId
            + "&multiple=" + multiple;
	    var pramencode = StringUtil.Base64Encode(pramdencode);
        console.log(pramdencode);
        console.log(pramencode);
        //ßconsole.log(StringUtil.Base64Decode("c3R1Y3dpZD05NTkxOTQzNTgxMTkxMzcyODYmbWVtU3Rhc3RpYz0mY3VydGltZT05MDAmdXNlck5hbWU9MTMzMDEyMDExMTE2NDczMDYmY3NIb3VyPTAuMCZjd0hvdXI9MC4wJmN3YXJlSWQ9Mzk1NTEmYWNjb3VudElkPTMyNzczNiZtdWx0aXBsZT0yLjA="));

        //return;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function()
        {
            if (request.readyState === 4)
            {
                if (request.status === 200 || request.status === 304)
                {
                    console.log("Remote download status:\n --> " + request.responseText);
                }
            }
        }
        var url = "https://www.zfwx.com/cwUpdateTime.do?stucwid=" + pramencode;
        request.open("GET", url);
        request.setRequestHeader('content-type', 'application/json');
        var formData = {};
        request.send(JSON.stringify(formData));

    }
    //setTimeout(timerCallback, 90000);
    setInterval(timerCallback, 15000);
    
})();