(function(){var c=YAHOO,b=c.util.Dom,a=c.util.Event;TB.namespace("CheckAllBox");TB.CheckAllBox=function(f,d){var g=function(){var i=this.checked;b.batch(d,function(j){j.checked=i})};var h;var e=function(){var k=0;for(var j=0;j<d.length;j++){if(!d[j].checked){h=false;break}else{k++}}if(k==d.length){h=true}b.get(f).checked=h};a.on(f,"click",g);a.on(d,"click",e)}})();