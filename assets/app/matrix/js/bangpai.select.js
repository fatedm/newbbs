 (function(){YAHOO.namespace("TB");YAHOO.TB.select=(function(){var c=YAHOO.util.Dom,b=YAHOO.util.Event,a={config:{normal:2,min:2,max:60},init:function(f,e){var h,d=[];e?h=e:h=this.config;if(typeof f!="string"&&f.length){for(var g=0;g<f.length;g++){a.bind(f[g],h);d.push(c.get(f[g]))}return a.fn.apply(d)}else{a.bind(f,h);return a.fn.apply(c.get(f))}},bind:function(g,f){var e,d,h,f=f||this.config;e=c.getFirstChild(g);d=c.getNextSibling(e);h=c.getLastChild(g);if(typeof parseInt(e.value)!="number"||typeof parseInt(e.value)!=""){e.value=f.normal}b.on(d,"click",function(){a.plus(e,f)});b.on(h,"click",function(){a.minus(e,f)});b.on(e,"keydown",function(i){if(!(i.keyCode>47&&i.keyCode<58||i.keyCode>95&&i.keyCode<106||i.keyCode==8||i.keyCode==110)){i.preventDefault&&i.preventDefault();i.returnValue=false}})},plus:function(d,e){var e=e||this.config;if(typeof parseInt(d.value)=="number"&&parseInt(d.value)<e.max&&d.disabled==false){d.value=parseInt(d.value)+1}},minus:function(d,e){var e=e||this.config;if(typeof parseInt(d.value)=="number"&&parseInt(d.value)>e.min&&d.disabled==false){d.value=parseInt(d.value)-1}},fn:function(){var d=this;return{clear:function(f,e){if(d.length){if(e){for(var g=0;g<d.length;g++){if(e==g){c.getFirstChild(d[g]).value=f||0}}}else{for(var g=0;g<d.length;g++){c.getFirstChild(d[g]).value=f||0}}}else{c.getFirstChild(d).value=f||0}},bind:function(f,e){b.on(d,f,e)},close:function(e){if(d.length){if(e){for(var f=0;f<d.length;f++){if(e==f){c.getFirstChild(d[f]).disabled=true}}}else{for(var f=0;f<d.length;f++){c.getFirstChild(d[f]).disabled=true}}}else{c.getFirstChild(d).disabled=true}},getValue:function(){if(d.length){var e=[];for(var g=0;g<d.length;g++){e.push(c.getFirstChild(d[g]).value)}return e}else{var f=c.getFirstChild(d).value;return f}}}}};return a})()})();
