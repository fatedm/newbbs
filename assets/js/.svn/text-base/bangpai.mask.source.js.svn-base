 if (typeof Flower_MaskLayer == "undefined" || !Flower_MaskLayer) {
    var Flower_MaskLayer = {};
}
var Flower_MaskLayer =function(option){
	var $=document,$$= function (id) {
		return "string" == typeof id ? document.getElementById(id) : id;
	};
	var _option={
		color:"#000",
		timer:1000,
		zindex:9991,
		opacity:0.2,
		MaskDIV:'_flowerDiv',
		MaskIFRAME:'_flowIFRAME',
		openDiv:function(){}
	};
	var _Extend=function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	};
	_Extend(_option,option);
	var _height=Math.max($.documentElement.scrollHeight,$.documentElement.clientHeight) + 'px';
	var _width=$.documentElement.scrollWidth + 'px';
	var _cssText="margin:0px;background:"+_option.color+";opacity:"+_option.opacity+";filter:alpha(opacity="+_option.opacity*100+");position:absolute;left:0;top:0;overflow:hidden;display:none";
	if($$(_option.MaskIFRAME) || $$(_option.MaskDIV)){return};
	var _Div=$.createElement("div");
			_Div.id = _option.MaskDIV;
			$.getElementsByTagName("body")[0].appendChild(_Div);
			_Div.style.cssText = _cssText;
			_Div.style.zIndex =_option.zindex;
			_Div.style.height=_height;
			_Div.style.width=_width;
	var _Iframe=$.createElement("iframe");
			_Iframe.id = _option.MaskIFRAME;
			$.getElementsByTagName("body")[0].appendChild(_Iframe);
			_Iframe.style.cssText = _cssText;
			_Iframe.style.zIndex =_option.zindex-1;
			_Iframe.style.height=_height;
			_Iframe.style.width=(parseInt(_width)-5)+"px";
	_option.openDiv();
	//处理窗口大小变化时的bug
	YAHOO.util.Event.on(window,'resize',function(){
		$$(_option.MaskIFRAME).style.height=$$(_option.MaskDIV).style.height=Math.max($.documentElement.scrollHeight,$.documentElement.clientHeight) + 'px';
		$$(_option.MaskIFRAME).style.width=$$(_option.MaskDIV).style.width=$.documentElement.scrollWidth -5 + 'px';
	});
	return {
		show:function(_method){
			$$(_option.MaskIFRAME).style.height=$$(_option.MaskDIV).style.height=Math.max($.documentElement.scrollHeight,$.documentElement.clientHeight) + 'px';
			//if(document.all){
			$$(_option.MaskIFRAME).style.width=$$(_option.MaskDIV).style.width=$.documentElement.scrollWidth -5 + 'px';
			//}
			$$(_option.MaskIFRAME).style.display=$$(_option.MaskDIV).style.display='block';
			_method&&_method();
		},
		showInterval:function(speed,_method){
			var a=$$(_option.MaskIFRAME),b=$$(_option.MaskDIV),ts=0.1;
			$$(_option.MaskIFRAME).style.display=$$(_option.MaskDIV).style.display='block';
			if (!document.all) {  b.style.opacity =a.style.opacity =ts;}
				else {  b.filters.Alpha.opacity=a.filters.Alpha.opacity = 1; }
			$$(_option.MaskIFRAME).style.display=$$(_option.MaskDIV).style.display='block';
			var t= setInterval(function(){
				if (!document.all)  { b.style.opacity = a.style.opacity = ts;}
				else { b.filters.Alpha.opacity=a.filters.Alpha.opacity = ts*100;}
				if(ts>=1.00){
					clearInterval(t);
					ts=0.01;
					eval(acc.OK)();
				}
				 ts=ts+0.1 
			},speed);
			
		},
		hide:function(_method){
			$$(_option.MaskIFRAME).style.display=$$(_option.MaskDIV).style.display='none';
			_method&&_method();
		},
		hideInterval:function(speed,_method){
			var a=$$(_option.MaskIFRAME);
			var b=$$(_option.MaskDIV);
			var x=speed||250;var x2=x/4;
			var t= setInterval(function(){
				b.style.width=a.style.width=a.offsetWidth-x+"px";
				b.style.height=a.style.height=a.offsetHeight-x+"px";
				b.style.marginLeft=a.style.marginLeft=parseInt(a.style.marginLeft)+(x/2)+"px";
				b.style.marginTop=a.style.marginTop=parseInt(a.style.marginTop)+(x/2)+"px";
				if(a.offsetWidth<500){x=x2};
				if(a.offsetWidth<(x/4)){
					clearInterval(t);
					$$(_option.MaskIFRAME).style.display=$$(_option.MaskDIV).style.display='none';
					_method&&_method();
				}
			},10)
		},
		color:function(col){
			$$(_option.MaskIFRAME).style.backgroundColor=$$(_option.MaskDIV).style.backgroundColor=col;
		}
	}
}
