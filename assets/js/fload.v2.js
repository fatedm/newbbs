(function(){var b=KISSY,d=b.DOM,c=b.Event,a=b.Cookie;b.ready(function(){var f=a.get("showPopup");var h=window.location.hostname;(f)?"":a.set("showPopup","0",1,h,"/");if(f=="3"){return true}var e=document.getElementsByTagName("HEAD").item(0);var g=document.createElement("link");g.href="http://a.tbcdn.cn/app/matrix/css/fload.v2.css";g.rel="stylesheet";g.type="text/css";e.appendChild(g);var i=function(){var j=d.get("#J_popup");var k=function(l,n,m){if(!d.hasClass(l,n)&&(m=="add")){d.addClass(l,n)}else{if(d.hasClass(l,n)&&(m=="remove")){d.removeClass(l,n)}}};if(f=="1"){k(j,"collapsed","add");k(d.get("#J_collapse"),"hidden","add");k(d.get("#J_expand"),"hidden","remove")}else{if(f=="2"){k(j,"collapsed","remove");k(d.get("#J_expand"),"hidden","add");k(d.get("#J_collapse"),"hidden","remove")}else{if(f=="3"){k(j,"hidden","add")}}}c.on(j,"click",function(m){var l=m.target;switch(l.id){case"J_close":k(j,"hidden","add");a.set("showPopup","3",1,h,"/");break;case"J_expand":k(j,"collapsed","remove");k(l,"hidden","add");k(d.get("#J_collapse"),"hidden","remove");TCookie.set("showPopup","2",1,h,"/");break;case"J_collapse":k(j,"collapsed","add");k(l,"hidden","add");k(d.get("#J_expand"),"hidden","remove");a.set("showPopup","1",1,h,"/");break}})};YAHOO.util.Connect.asyncRequest("GET",f_url,{success:function(j){var k=document.createElement("div");document.body.appendChild(k);k.innerHTML=j.responseText;i();c.on(window,"scroll",function(){if("\v"=="v"&&d.get("#J_popup")){d.get("#J_popup").className=d.get("#J_popup").className}})}})})})();
