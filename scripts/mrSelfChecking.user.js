// ==UserScript==
// @name         MR self checking
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  This is a self-checking tools for mzoam MR
// @author       Kevin Zhang
// @match        https://gitlabe2.ext.net.nokia.com/mzoam*/*/merge_requests/*
// @updateURL    https://fullrss.ddns.net/scripts/mrSelfChecking.user.js
// @downloadURL  https://fullrss.ddns.net/scripts/mrSelfChecking.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var CG_NAME_LIST = [
{mail: "welly.wu@nokia-sbell.com", name: "Wu Welly"},
{mail: "ke-kevin.zhang@nokia-sbell.com", name: "Zhang Ke-Kevin"},
{mail: "bob.chen@nokia-sbell.com", name: "Chen Bob"},
{mail: "yaoting.liu@nokia-sbell.com", name: "Liu Yaoting"},
{mail: "dongyi.fan@nokia-sbell.com", name: "Fan Dongyi"},
{mail: "yueqiang.guo@nokia-sbell.com", name: "Guo Yueqiang"},
{mail: "jianxing.liu@nokia-sbell.com", name: "Liu Jianxing"},
{mail: "zhi.yuan@nokia-sbell.com", name: "Yuan Zhi"},
{mail: "fengya.yan@nokia-sbell.com", name: "Yan Fengya"},
{mail: "zhiyuan.xu@nokia-sbell.com", name: "Xu Zhiyuan"},
{mail: "xianbiao.cheng@nokia-sbell.com", name: "Cheng Xianbiao"},
{mail: "wentao.mao@nokia-sbell.com", name: "Mao Wentao"},
{mail: "shire.shen@nokia-sbell.com", name: "Shen Shire"}
    ];
    var MR_REVIEW_MAIL_SUBJECT = "[MR Review Requst]";
    var THUMBUP_MIN_LIMIT = 2;
    var COMMIT_MAX_LIMIT = 1;

    function checkThumbUp() {
        var thumbUpElems = document.getElementsByClassName(" award-control btn has-tooltip js-emoji-btn");
        if (thumbUpElems.length <= 0) {
            return "No thumb up button found.";
        }
        var spans = thumbUpElems[0].getElementsByClassName("award-control-text js-counter");
        if (parseInt(spans[0].innerText) < THUMBUP_MIN_LIMIT ) {
            return `Less thumbups than ${THUMBUP_MIN_LIMIT}.`;
        }
        if (spans.length <= 0) {
            return "No thumb up count found./n";
        }
        var reviewers = thumbUpElems[0].getAttribute("data-title");
        var cgReviewer = CG_NAME_LIST.find(function(cg) {
            return reviewers.indexOf(cg.name) >= 0;
        });
        if (cgReviewer === undefined) {
            return "No thumb up from code guardian.\n";
        }
        return "";
    }

    function checkCommitCount() {
        var commitTabs = document.getElementsByClassName("commits-tab");
        if (commitTabs.length <= 0) {
            return "No commit tab found.";
        }
        var spans = commitTabs[0].getElementsByClassName("badge");
        if (spans.length <= 0) {
            return "No commit count found.";
        }
        if (parseInt(spans[0].innerText) > COMMIT_MAX_LIMIT) {
            return `Commit count exceeds ${COMMIT_MAX_LIMIT}.`;
        }
        return ""
    }
    function getMailReceiver() {
        var select = document.getElementById("mailSelect");
        var idx = select.selectedIndex;
        var ops = select.getElementsByTagName("option");
        return ops[idx].getAttribute("value");
    }
    function generateMailBodyStr() {
        var body = "MR URL: " + document.URL;
        if (document.getElementById("skipPipeline").checked) {
            body = body + "%0d%0aI NEED SKIP PIPELINE."
        }
        return body;
    }
    function generateMailToStr(receiver, subject, body) {
        return "mailto:" + receiver + "?subject=" + subject + "&body=" + body;
    }
    function updateMailToContext() {
        var receiver = getMailReceiver();
        var mailToStr = generateMailToStr(receiver, MR_REVIEW_MAIL_SUBJECT, generateMailBodyStr())
        var sendMail = document.getElementById("sendMail");
        sendMail.setAttribute("href", mailToStr);
    }
    var htmlText = "<div>"+
        "<table border='2' width='50%'>"+
"<tr>"+
"<td align='center' width='40%'><b>Checking Item</b></td>"+
"<td align='center'><b>Status</b></td>"+
"</tr>"+
"<tr>"+
"<td align='center'>Thumb Up Checking</td>"+
"<td align='center'><font id='thumbUpStatus' color='green'>PASS</font></td>"+
"</tr>"+
"<tr>"+
"<td align='center'>Commit Count Checking</td>"+
"<td align='center'><font id='CommitCountStatus' color='green'>PASS</font></td>"+
"</tr>"+
"</table>"+
"</div>"+
"<div>&nbsp"+
"</div>"+
"<div>"+
"<button><a id='sendMail' href='mailto:?subject=[MR+review+request]&body=http://mysite.com/file.pdf' title='[MR review request]'>Send Mail</a></button>&nbsp&nbsp to &nbsp"+
"<select id='mailSelect' onchange='selectChangedCB()'>"+
"</select>&nbspfor MR Review&nbsp&nbsp&nbsp(&nbsp&nbsp"+
"<input type='checkbox'id='skipPipeline'>&nbsp I need skip pipeline &nbsp)"+
"</div>"

    var parentDiv = document.getElementsByClassName("merge-request-details issuable-details");
    var refDiv = document.getElementsByClassName("js-tabs-affix merge-request-tabs-holder");
    var newDiv = document.createElement("div");
    var div=document.createElement("div");
    div.innerHTML = htmlText;
    var insertedDiv = parentDiv[0].insertBefore(div, refDiv[0]);
    var thumbStatus = checkThumbUp();
    var commitCountStatus = checkCommitCount();
    if (thumbStatus !== "") {
        document.getElementById("thumbUpStatus").setAttribute('color', 'red');
        document.getElementById("thumbUpStatus").innerText = thumbStatus;
    }
    else {
        document.getElementById("thumbUpStatus").innerText = "PASS";
    }

    if (commitCountStatus !== "") {
        document.getElementById("CommitCountStatus").setAttribute('color', 'red');
        document.getElementById("CommitCountStatus").innerText = commitCountStatus;
    }
    else {
        document.getElementById("CommitCountStatus").innerText = "PASS";
    }
    var mailSelect = document.getElementById("mailSelect");
    mailSelect.addEventListener("change", updateMailToContext);
    CG_NAME_LIST.map(function(cg) {
        var op = document.createElement("option");
        op.setAttribute("value", cg.mail);
        op.innerText = cg.name;
        mailSelect.appendChild(op);
    });
    var skipPipeline = document.getElementById("skipPipeline");
    skipPipeline.addEventListener("change", updateMailToContext);
    updateMailToContext();
})();
