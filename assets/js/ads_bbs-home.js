(function(){var g=YAHOO.util,b=g.Dom,a=g.Event,e=g.Connect,d=g.Command,c=d.Behavior;var f=TB.namespace("UserCenter.SilverCoin");f.ImageCropper={_init:function(h,i){if(!b.get("ad-cropper")){return}f.load("imagecropper",function(){var j=f.ImageCropper.decorate(h);f.ImageCropper.main(h,i,j)})},main:function(p,m,k){var i=b.get("img-cropper");var q=b.get(m.id+"-wrapper"),n=q.clientWidth,l=q.clientHeight,j=i.clientWidth,o=i.clientHeight;f.ImageCropper.setForm(k);k.on("moveEvent",function(){var r=k.getCropCoords(),h=n/r.width;b.setStyle(m,"left","-"+r.left*h+"px");b.setStyle(m,"top","-"+r.top*h+"px");b.setStyle(m,"width",j*h+"px");f.ImageCropper.setForm(k)})},setForm:function(i){var j=i.getCropCoords();var h={"field-pic-url":b.get("img-cropper").src,"field-width":j.width,"field-height":j.height,"field-left":j.left,"field-top":j.top};for(var k in h){b.get(k).value=h[k]}},decorate:function(h){var i={ratio:1,initialXY:[0,0],status:false,minHeight:75,minWidth:75,initHeight:75,initWidth:75};return f.ImageCropper.oldCrop=(new YAHOO.widget.ImageCropper(h,i))},oldCrop:null};f.PopUpMgr={_init:function(j){var i;if(!(i=b.get(j))){return}var h=b.getElementsByClassName("full-mask","div")[0];c.show(h);a.on(i,"click",d.init({func:function(k){c.hide([k,h])},filter:function(k){return b.hasClass(k,"cancel")},target:i}))}};f.FormMgr={validationMethods:{},fieldTranslator:{fieldMap:{}},addListener:function(m,k){for(var j=0,h=k.length;j<h;j++){var n=k[j];a.on(n,"focus",d.init({func:function(i){b.removeClass(i,"error");b.removeClass(i,"ok");b.addClass(i,"attention")},getTarget:function(i){return b.getAncestorByClassName(i,"form-field")}}));a.on(n,"blur",(function(){var i=n;return d.init({func:function(o){b.removeClass(o,"attention");var l=f.FormMgr.validationMethods[i](i);l&&(b.addClass(o,"ok"));!l&&(b.addClass(o,"error"))},getTarget:function(l){return b.getAncestorByClassName(l,"form-field")}})})())}(function(){var s=b.get("img-upload-form"),o=b.get("ad-img"),r=b.getAncestorByClassName(o,"form-field"),q=s.getElementsByTagName("button")[0],i=b.get("img-cropper"),p=b.get("img-preview");var l="\u4e0a\u4f20\u6587\u4ef6\u51fa\u9519\uff0c\u8bf7\u91cd\u65b0\u4e0a\u4f20\uff01";a.on(o,"click",function(){b.removeClass(r,"error");b.removeClass(r,"ok");b.addClass(r,"attention")});a.on(q,"click",d.init({func:function(u){!f.CookieMgr.isLogin()&&f.CookieMgr.redirect(true);try{f.FormMgr.uploadFile(u,true,{upload:function(x){var v={};if(!x.responseText){return}try{v=YAHOO.lang.JSON.parse(x.responseText)}catch(w){}if(v.success&&v.success=="true"){f.ImageCropper.oldCrop&&(f.ImageCropper.oldCrop.destroy());a.on(p,"load",function(){b.setStyle(p,"left","0");b.setStyle(p,"top","0");b.setStyle(p,"width","auto");b.setStyle(p,"height","auto");b.setStyle("img-cropper_wrap","width","auto");b.setStyle("img-cropper_wrap","height","auto")});i.src=p.src=v.picUrl;b.removeClass(r,"attention");b.removeClass(r,"error");b.addClass(r,"ok");f.ImageCropper.oldCrop=f.ImageCropper._init(i,p);if(YAHOO.env.ua.ie){o.focus();o.blur()}}else{alert(v.message||l);b.removeClass(r,"attention");b.removeClass(r,"ok");b.addClass(r,"error")}}})}catch(t){b.addClass(r,"error");b.removeClass(r,"ok");b.removeClass(r,"attention")}},target:s}))})();(function(){var l=b.get("img-preview-container"),i=l.getElementsByTagName("button")[0];var o=b.get("img-cropper").src;a.on(i,"click",d.init({func:function(r){var p="\u4fdd\u5b58\u56fe\u7247\u51fa\u9519\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5",q=b.get("img-preview");!f.CookieMgr.isLogin()&&f.CookieMgr.redirect(true);if(b.get("img-cropper").src==o){alert("\u8bf7\u5148\u4e0a\u4f20\u56fe\u7247");return}f.FormMgr.uploadFile(r,true,{upload:function(u){var s={};if(!u.responseText){return}try{s=YAHOO.lang.JSON.parse(u.responseText)}catch(t){}if(s.success&&s.success=="true"){b.get("field-final-pic-url").value=s.picUrl;alert("\u4fdd\u5b58\u56fe\u7247\u6210\u529f\uff01")}else{alert(s.message||p)}}})},target:l}))})();(function(){var l=b.get("ad-cropper-submit"),i=l.getElementsByTagName("button")[0];a.on(i,"click",d.init({func:function(){var o={"field-ad-text":b.get("ad-text").value,"field-ad-href":b.get("ad-href").value};for(var v in o){b.get(v).value=o[v]}var t=true;for(var q=0,p=k.length;q<p;q++){var u=k[q];if(!f.FormMgr.validationMethods[u](u)){var s=b.getAncestorByClassName(u,"form-field");b.addClass(s,"error");b.removeClass(s,"ok");t=false}}var r=b.get("img-preview-container").getElementsByTagName("button")[0];if(t&&!b.get("field-final-pic-url").value){t=false;alert("\u8bf7\u4fdd\u5b58\u4e0a\u4f20\u56fe\u7247\uff01")}t&&l.submit()}}))})()},uploadFile:function(j,i,k){var h=j.getAttribute("action");e.setForm(j,i);e.asyncRequest("POST",h,k)}};f.CookieMgr={isLogin:function(){return !!TB.bom.getCookie("_l_g_")},redirect:function(n){var l=window.location.href,m=window.location.protocol+"//",h=window.location.host,i="/member/login.jhtml";var j=h.split(".");j.shift(j[0]);j.unshift("login");h=j.join(".");var k=m+h+i;if(n){k+="?redirectURL="+encodeURIComponent(l)}window.location.href=k}};f.load=function(i,m,j){var k={base:"http://a.tbcdn.cn/s/yui/2.8.1/build/",require:[],loadOptional:true},n,h;switch(typeof i){case"string":n=YAHOO.lang.merge(k,{require:[i]});break;case"object":if(i instanceof Array){n=YAHOO.lang.merge(k,{require:i})}else{n=undefined}break}try{h=new YAHOO.util.YUILoader(n);if(i.name){h.addModule(i);h.require(i.name)}h.onSuccess=m;h.onFailure=j;h.insert()}catch(l){throw new Error(l)}finally{delete h}};f._init=function(){var h=document.body,j=b.get("popup-container"),i=b.get("ad-form");f.PopUpMgr._init(j);f.FormMgr.validationMethods={"ad-text":function(k){k=b.get(k);var l=/^.+$/i;return l.test(k.value)},"ad-href":function(k){k=b.get(k);var l=/^http:\/\/.*\.(taobao|tmall)\.com.*$/i;return l.test(k.value)},"ad-img":function(k){k=b.get(k);return k.value}};f.FormMgr.fieldTranslator.fieldMap={"ad-text":"","ad-href":"","img-preview":""};f.FormMgr.addListener(i,["ad-text","ad-href"])};a.onDOMReady(f._init)})();
