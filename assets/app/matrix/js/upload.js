var uploadObj={};KISSY.ready(function(b){var f=b.DOM,c=b.Event;var e=f.get("#pic-list"),d=f.query("input.selectAll",e),a=f.get("#iframe-upload");uploadObj={removeFirstEndLi:function(){var k=KISSY,g=k.DOM,i=g.get("#pic-list"),m,o,l=g.query("p.control",i);if(l.length>0){var j=g.get("a.up",l[0]),h=g.get("a.down",l[l.length-1]);k.each(l,function(p){m=g.get("a.up",p);o=g.get("a.down",p);if(m!==j){g.css(m,{opacity:"1",height:"42px"})}if(o!==h){g.css(o,{opacity:"1",height:"42px"})}});k.Anim(j,{opacity:"0",height:"0"},0.3,"easeOut").run();k.Anim(h,{opacity:"0",height:"0"},0.3,"easeOut").run();var n=g.query("p.control",i);g.addClass(g.parent(g.get(n[n.length-1]),1),"last")}uploadObj.statisticsRemainingNum()},statisticsRemainingNum:function(){var g=KISSY,k=g.DOM,j=k.get("#pic-list"),m=k.query("p.pic-status"),i=k.query("li","#picListItem"),l=k.get("#iframe-upload"),h=i.length;if(h===0){k.addClass(j,"hidden")}else{k.removeClass(j,"hidden")}if(h==30){k.addClass(l,"hidden")}else{k.removeClass(l,"hidden")}if(!k.hasClass(j,"hidden")){g.all("p.pic-status").animate({opacity:"0",height:"0"},0.2,"easeOut",function(){if(h===30){k.html(m,"\u5df2\u8fbe\u5230\u4e0a\u4f20\u6570\u91cf 30 \u5f20\u7684\u9650\u5236")}else{k.html(m,"\u8fd8\u53ef\u4ee5\u4e0a\u4f20\uff1a"+(30-h)+" \u5f20\u56fe\u7247")}g.all("p.pic-status").animate({opacity:"1",height:"33px"},0.2)})}},resetCharactor:function(){var g=KISSY,i=g.DOM,h=i.get("#pic-list");g.each(i.query("p.des",h),function(l){var m=i.get("textarea",l),k=i.get("b",l),j=i.get("em",l);currentCharactor=m.value.length;if(currentCharactor>150){m.value=m.value.substring(0,150)}currentCharactor=m.value.length;k.innerHTML=currentCharactor;j.innerHTML=150-currentCharactor})},selectAllPicCheckbox:function(g){b.each(f.query("input.del",e),function(h){h.checked=g});uploadObj.keepChkStatus()},keepChkStatus:function(){var h=f.query("input.del",e),g=true,k=h.length;if(k>0){for(var j=0;j<k;j++){if(!h[j].checked){g=false;break}}}else{g=false}b.each(d,function(i){i.checked=g})},saveDesValue:function(){b.each(f.query("p.des",e),function(h){var i=f.get("textarea",h),g=f.get("input.des",h);g.value=i.value.substring(0,150)})}};c.on(e,"click",function(v){var y=v.target;if(y.nodeName==="A"&&(f.hasClass(y,"up")||f.hasClass(y,"down"))){var i=f.parent(y,2),g;if(f.hasClass(y,"up")){g=f.prev(i)}if(f.hasClass(y,"down")){g=f.next(i)}if(g){var w=f.get("input.del",g),k=f.get("input.address",g),m=f.get("textarea",g),z=f.get("img",g),p=f.get("del.sensitive-words",g),q=f.get("input.del",i),o=f.get("input.address",i),u=f.get("textarea",i),r=f.get("img",i),j=f.get("del.sensitive-words",i),n=w.checked,x=m.value,h=z.src,t=k.value,s,l;w.checked=q.checked;m.value=u.value;z.src=r.src;k.value=o.value;q.checked=n;u.value=x;r.src=h;o.value=t;if(p&&j){s=f.html(p);f.html(p,f.html(j));f.html(j,s)}else{if(p&&!j){l=f.create('<del class="sensitive-words">'+f.html(p)+"</del>");f.insertBefore(l,u);f.remove(p)}else{if(!p&&j){l=f.create('<del class="sensitive-words">'+f.html(j)+"</del>");f.insertBefore(l,m);f.remove(j)}}}}uploadObj.resetCharactor();v.halt(true)}if(y.nodeName==="DEL"||f.parent(y).nodeName==="DEL"){if(y.nodeName!=="DEL"){y=f.parent(y)}b.one(y).fadeOut(0.1,function(){f.remove(y)});f.next(y).focus()}});c.on(e,"keydown change focusout",function(g){var h=g.target;if(h.nodeName==="TEXTAREA"){window.setTimeout(function(){var k=f.next(h),j=f.get("b",k),i=f.get("em",k);currentCharactor=h.value.length;if(currentCharactor>150){uploadObj.resetCharactor()}else{j.innerHTML=currentCharactor;i.innerHTML=150-currentCharactor}},0)}});uploadObj.resetCharactor();c.on(d,"click",function(){uploadObj.selectAllPicCheckbox(this.checked)});c.on(e,"click",function(g){var h=g.target;if(h.nodeName==="INPUT"&&f.hasClass(h,"del")){uploadObj.keepChkStatus()}});uploadObj.keepChkStatus();c.on(e,"click",function(g){var j=g.target,h=f.parent(j);if(h.nodeName=="P"&&f.hasClass(h,"pic")&&f.hasClass(j,"del")){var h=f.parent(g.target,2);f.addClass(h,"del-confirm");if(confirm("\u786e\u8ba4\u5220\u9664\u6b64\u5f20\u56fe\u7247\uff1f")){b.one(f.get("p.control",h)).slideUp(0.2);b.one(h).slideUp(0.25,function(){f.remove(h);uploadObj.removeFirstEndLi()})}else{f.removeClass(h,"del-confirm");g.halt(true)}}else{if(j.nodeName=="A"&&f.hasClass(j,"del")){var i=[];b.each(f.query("input.del",e),function(k){if(k.checked){i.push(k)}});if(i.length<1){alert("\u60a8\u8fd8\u6ca1\u6709\u9009\u62e9\u56fe\u7247\uff01")}else{b.each(i,function(k){f.addClass(f.parent(k,2),"del-confirm")});if(confirm("\u786e\u8ba4\u5220\u9664\u9009\u4e2d\u7684 "+i.length+" \u5f20\u56fe\u7247\uff1f")){b.each(i,function(l){var k=f.parent(l,2);b.one(k).slideUp(0.25,function(){f.remove(k);uploadObj.removeFirstEndLi()})})}else{b.each(i,function(k){f.removeClass(f.parent(k,2),"del-confirm")});g.halt(true)}}}}});c.on(document.forms.tupianji,"submit",function(h){uploadObj.saveDesValue();var i=f.get("#checkCodeInput"),g=f.get("#submit-info");if(f.query("li",e).length<7){f.removeClass(g,"hidden");f.html(f.get("p",g),"\u6700\u5c11\u8981 7 \u5f20\u56fe\u7247\u624d\u80fd\u591f\u53d1\u8868\u5662\uff01");h.halt(true);return false}else{f.addClass(g,"hidden")}});f.attr(a,"src",f.attr(a,"dealySrc"));uploadObj.removeFirstEndLi();if(f.get("#checkCodeInput")){TB.widget.InputHint.decorate("checkCodeInput",{hintMessage:"\u70b9\u51fb\u8f93\u5165\u9a8c\u8bc1\u7801"})}});
