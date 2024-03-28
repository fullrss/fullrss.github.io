function setSelfDefinedProxy(url, host) {
    var vpnProxy = "PROXY 192.168.119.47:8080";

    var outGfwDomainPattern = [
        "t66y.com",
        "*18p2p.me",
        "*bt4g.org",
        "*zhwenpg.com",
        "*noip.com",
        "*hdchina.org",
        "pro.autojs.org",
        "*ping.pe",
        "*magnet2torrent.com",
        "*ifixit.com",
        "*limetorrents.lol",
        "*guowenku.com",
        "*throwawaymail.com",
        "*cloudfront.net",
        "*javbus.com"
    ];

    var googleDomainPattern = [
        "*1e100.net",
        "*466453.com",
        "*abc.xyz",
        "*about.google",
        "*admob.com",
        "*adsense.com",
        "*advertisercommunity.com",
        "*agoogleaday.com",
        "*ai.google",
        "*ampproject.org",

        "*android.com",
        "*androidify.com",
        "*androidtv.com",
        "*api.ai",
        "*appspot.com",
        "*autodraw.com",
        "*blog.google",
        "*blogblog.com",
        "*blogspot.com",
        "*blogspot.hk",
        "*blogspot.jp",
        "*blogspot.tw",
        "*business.page",
        "*capitalg.com",
        "*certificate-transparency.org",
        "*chrome.com",
        "*chromecast.com",
        "*chromeenterprise.google",
        "*chromeexperiments.com",
        "*chromercise.com",
        "*chromestatus.com",
        "*chromium.org",
        "*cloudfunctions.net",
        "*com.google",
        "*crbug.com",
        "*creativelab5.com",
        "*crisisresponse.google",
        "*crrev.com",
        "*data-vocabulary.org",
        "*debug.com",
        "*deepmind.com",
        "*deja.com",
        "*design.google",
        "*digisfera.com",
        "*dns.google",
        "*hub.docker.com",
        "*domains.google",
        "*duck.com",
        "*environment.google",
        "*feedburner.com",
        "*firebaseio.com",
        "*g.co",
        "*gcr.io",
        "*get.app",
        "*get.dev",
        "*get.how",
        "*get.page",
        "*getmdl.io",
        "*getoutline.org",
        "*ggpht.com",
        "*gmail.com",
        "*gmodules.com",
        "*godoc.org",
        "*golang.org",
        "*goo.gl",
        "*goo.gle",
        "*google.co.jp",
        "*google.com",
        "*google.com.hk",
        "*google.com.tw",
        "*google.dev",
        "*google-analytics.com",
        "*googleadservices.com",
        "*googleapis.cn",
        "*googleapis.com",
        "*googleapps.com",
        "*googleartproject.com",
        "*googleblog.com",
        "*googlebot.com",
        "*googlecapital.com",
        "*googlechinawebmaster.com",
        "*googlecode.com",
        "*googlecommerce.com",
        "*googledomains.com",
        "*googlearth.com",
        "*googleearth.com",
        "*googledrive.com",
        "*googlefiber.net",
        "*googlegroups.com",
        "*googlehosted.com",
        "*googleideas.com",
        "*googleinsidesearch.com",
        "*googlelabs.com",
        "*googlemail.com",
        "*googlemashups.com",
        "*googlepagecreator.com",
        "*googleplay.com",
        "*googleplus.com",
        "*googlescholar.comUSA",
        "*googlesource.com",
        "*googlesyndication.com",
        "*googletagmanager.com",
        "*googletagservices.com",
        "*googleusercontent.com",
        "*googlevideo.com",
        "*googlevideo.com",
        "*googleweblight.com",
        "*googlezip.net",
        "*groups.google.cn",
        "*grow.google",
        "*gstatic.com",
        "*gv.com",
        "*gvt0.com",
        "*gvt1.com",
        "*gvt3.com",
        "*gwtproject.org",
        "*html5rocks.com",
        "*iam.soy",
        "*igoogle.com",
        "*itasoftware.com",
        "*lers.google",
        "*like.com",
        "*madewithcode.com",
        "*material.io",
        "*nic.google",
        "*on2.com",
        "*opensource.google",
        "*panoramio.com",
        "*picasaweb.com",
        "*pki.goog",
        "*plus.codes",
        "*polymer-project.org",
        "*pride.google",
        "*questvisual.com",
        "*admin.recaptcha.net",
        "*api.recaptcha.net",
        "*api-secure.recaptcha.net",
        "*api-verify.recaptcha.net",
        "*redhotlabs.com",
        "*registry.google",
        "*research.google",
        "*safety.google",
        "*savethedate.foo",
        "*schema.org",
        "*shattered.io",
        "*stories.google",
        "*sustainability.google",
        "*synergyse.com",
        "*teachparentstech.org",
        "*tensorflow.org",
        "*tfhub.dev",
        "*thinkwithgoogle.com",
        "*tiltbrush.com",
        "*translate.goog",
        "*tv.google",
        "*urchin.com",
        "*waveprotocol.org",
        "*waymo.com",
        "*web.dev",
        "*webmproject.org",
        "*webpkgcache.com",
        "*webrtc.org",
        "*whatbrowser.org",
        "*widevine.com",
        "*withgoogle.com",
        "*withyoutube.com",
        "*x.company",
        "*xn--ngstr-lra8j.com",
        "*youtu.be",
        "*youtube.com",
        "*youtube-nocookie.com",
        "*youtubeeducation.com",
        "*youtubegaming.com",
        "*youtubekids.com",
        "*yt.be",
        "*ytimg.com",
        "*zynamics.com",
    ];

    var twitterDomainPattern = [
        "*periscope.tv",
        "*pscp.tv",
        "*t.co",
        "*tweetdeck.com",
        "*twimg.com",
        "*twitpic.com",
        "*twitter.com",
        "*twitter.jp",
        "*vine.co"
    ];

    var telegramDomainPattern = [
        "*cdn-telegram.org",
        "*comments.app",
        "*graph.org",
        "*quiz.directory",
        "*t.me",
        "*updates.tdesktop.com",
        "*telegram.dog",
        "*telegram.me",
        "*telegram.org",
        "*telegram.space",
        "*telegram-cdn.org",
        "*telegramdownload.com",
        "*telegra.ph",
        "*telesco.pe"
    ];

    for(let i = 0; i < outGfwDomainPattern.length; i++)
    {
        if ( shExpMatch(host, outGfwDomainPattern[i]) ) { return vpnProxy; }
    }

    for(let i = 0; i < googleDomainPattern.length; i++)
    {
        if ( shExpMatch(host, googleDomainPattern[i]) ) { return vpnProxy; }
    }

    for(let i = 0; i < twitterDomainPattern.length; i++)
    {
        if ( shExpMatch(host, twitterDomainPattern[i]) ) { return vpnProxy; }
    }

    for(let i = 0; i < telegramDomainPattern.length; i++)
    {
        if ( shExpMatch(host, telegramDomainPattern[i]) ) { return vpnProxy; }
    }

    return "";
}

function FindProxyForURL(url, host) {
    var retProxy = setSelfDefinedProxy(url, host);
    if (retProxy != "")
    {
        return retProxy;
    }
    else
    {
        return "DIRECT";
    }
}


