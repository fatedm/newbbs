(function(){TB.namespace("bbsDetail");var c=YAHOO.util.Dom,b=YAHOO.util.Event,a=YAHOO.util.Anim;TB.bbsDetail=(function(){var e=function(g){if(!g){return}var f=c.getElementsByClassName("menu-bd","div",g)[0];if(!f){return}g.menulist=f;b.on(g,"mouseover",function(){c.addClass(g,"hover");c.addClass(g.parentNode,"phover")});b.on(g,"mouseout",function(){c.removeClass(g,"hover");c.removeClass(g.parentNode,"phover")});b.on(f,"mouseover",function(){c.addClass(g,"hover")});b.on(f,"mouseout",function(){c.removeClass(g,"hover")})};var d=function(){var k=!window.XMLHttpRequest;var j=c.get("J_weiwang");j.style.position=k?"absolute":"fixed";var h=c.getElementsByClassName("pop-up");if(k){var f=parseInt((c.getDocumentScrollTop()+(c.getViewportHeight()/2)),10)+"px";if(j){c.setStyle(j,"top",f)}if(h.length>0){for(var g=0;g<h.length;g++){c.setStyle(h[g],"top",f);h[g].style.position=k?"absolute":"fixed"}}window.onscroll=function(){var l=parseInt((c.getDocumentScrollTop()+(c.getViewportHeight()/2)),10)+"px";if(j){c.setStyle(j,"top",l)}if(h.length>0){for(var m=0;m<h.length;m++){c.setStyle(h[m],"top",l)}}}}};return{init:function(){e("J_publish");var h=c.getElementsByClassName("J_sort");for(var g=0;g<h.length;g++){e(h[g])}e("J_sort");var f=c.getElementsByClassName("J_userHead");for(var g=0;g<f.length;g++){e(f[g])}d()}}})()})();