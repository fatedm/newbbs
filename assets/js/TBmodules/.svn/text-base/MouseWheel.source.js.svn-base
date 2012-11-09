(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	
	TB.namespace('MouseWheel');
	
	/* MouseWheel 自定义滚动条，支持鼠标滑轮上下滑动
	 * 
	 * Parameters:
	 * 
	 * o <object> 详情参见下部的_o的参数;
	 * 
	 * Returns:
	 * slider <obj> 实例化后的Slider对象
	 * h <callback> 参数为返回滚动DIV的offsetHeight值
	 * 
	 * 需要依赖silder，加载完成后或者页面嵌入后才可以使用。
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.MouseWheel=function(o){
		
		var _o={
			sBGElId:'',
			sHandleElId:'',
			iUp:0,
			iDown:'',
			iTickSize:'',
			Direction:'vertical',
			Maxheight:'',
			Mousepx:50,
			DivTop:0,
			callback:function(){}
		}
		
		YAHOO.lang.augmentObject(_o,o,true); //合并默认值或者覆盖默认值

		_o.ScrollHeght=D.get(_o.sBGElId).scrollHeight;
		
		//鼠标滑轮私有相关函数
		var _MouseWheel={
			//绑定
			mousewheel:function(node, fn){
			    if (document.addEventListener) document.getElementById(node).addEventListener('DOMMouseScroll', fn, false); //W3C
			    document.getElementById(node).onmousewheel = fn; //IE/Opera/Chrome
			},
			//事件
			mousefunc:function(e,s){
				var direct = _MouseWheel.direction(e);
	            if (direct > 0) {
	               _MouseWheel.wheelup(s);
	            }else{
	               _MouseWheel.wheeldown(s);
	            }
	            E.stopEvent(e);
			},
			//方向
			direction:function(e){
			    var direct = 0;
			    if (e.wheelDelta) {
			        direct = e.wheelDelta > 0 ? 1 : -1;
			    }else if (e.detail) {
			        direct = e.detail < 0 ? 1 : -1;
			    }
				return direct;
			},
			//向上移动
			wheelup:function(s){
				_o.DivTop = _o.DivTop - _o.Mousepx;
				var v=_o.DivTop * _o.Maxheight / _o.ScrollHeght;
			    s.setValue(v);
			    if (_o.DivTop < 0) _o.DivTop = 0;
			},
			//向下移动
			wheeldown:function (s){
				_o.DivTop = _o.DivTop + _o.Mousepx;
				var v=_o.DivTop * _o.Maxheight / _o.ScrollHeght;
			    s.setValue(v);
			    if(_o.DivTop > _o.ScrollHeght) _o.DivTop = _o.ScrollHeght;
			}
		};
		
		var wrap=D.get(_o.sBGElId);
		var H=D.getFirstChild(wrap).offsetHeight;
		
		return function(){
			if(_o.ScrollHeght > _o.Maxheight){
				var slider = YAHOO.widget.Slider.getVertSlider(_o.sBGElId , _o.sHandleElId , _o.iUp , _o.iDown , _o.iTickSize);
				
				slider.backgroundEnabled=false;
				
				slider.subscribe("change", function(offsetFromStart){
	            	_o.DivTop = offsetFromStart * (_o.ScrollHeght / _o.Maxheight);
	            	//判断滚动条是否到达底部
	            	if(offsetFromStart==_o.iDown){
	            		D.get(_o.sBGElId).scrollTop=_o.ScrollHeght;
	            	}else{
	            		D.get(_o.sBGElId).scrollTop = _o.DivTop;
	            	}
	            });
				
				
				//实例化滚动条后绑定相关滑轮事件与操作
			    _MouseWheel.mousewheel(_o.sBGElId,function(e){
			    	e = e || window.event;
					_MouseWheel.mousefunc(e,slider);
				});
				
	            //成功后的回调
	            _o.callback(H);
	            return slider;
			}else{
				_o.callback(H);
			}
           
		}();
	};
})();