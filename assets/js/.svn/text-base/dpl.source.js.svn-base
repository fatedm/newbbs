(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('BPGraphPic');
	
	/* BPGraphPic 淘宝帮派内部组件，直接给容器加载头像图片圈图的功能
	 * 
	 * Parameters:
	 * imgID <ele> 需要加载圈图的imgID
	 * minH <number> 圈图的最小高度
	 * minW <number> 圈图的最小宽度
	 * 
	 * Returns:
	 * imagecropper <object> 对象
	 * 
	 * 需要依赖YUI的imagecropper组件，不需要外部加载，组件内部使用getscript方法自己获取。
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.BPGraphPic=function(imgID,minH,minW){
		this.imgID=imgID;
		this.minH=minH;
		this.minW=minW;
		this.img=D.get(imgID);
	};
	
	TB.BPGraphPic.load=false;
	
	TB.BPGraphPic.prototype={
		//触发装备圈图的事件
		'_EquipCropper':function(){
		//创建crop默认对象
			
			var _self=this,
				h = _self.img.offsetHeight,
				w = _self.img.offsetWidth;
			
			if(h<=_self.minH && w<=_self.minW){
				return null;
			}
			
			var minh=_self.minH,
				minw=_self.minW,
				inth=_self.minH,
				intw=_self.minW;
			
			if(h<=_self.minH || w<=_self.minW){
				minh=minh=inth=intw=Math.min(h,w);
			};

			var _config={
					initialXY:[0, 0],
					minHeight:minh,
					minWidth:minh,
					initHeight:inth,
					initWidth:intw,
					status:false,
					ratio:true,
					shiftKeyTick:10
			};
			return new YAHOO.widget.ImageCropper(_self.imgID,_config);
			
		},
		//远程加载圈图
		'GetCropper':function(){
			var _self=this;
			//LOADER IMAGECROPPER
			var _config={
					require : ["imagecropper"],
					loadOptional:true,
					onSuccess:function(){
						TB.BPGraphPic.load=true;
						TB.BPGraphPic.Crop=_self._EquipCropper();
					},
					timeout :10000,
					combine :true
			};
			if(!TB.BPGraphPic.load){
				var loader = new YAHOO.util.YUILoader(_config);
				loader.insert();
			}else{
				_self.img.onload=function(){
					TB.BPGraphPic.Crop=_self._EquipCropper();
				}
			}
		},
		/*圈图后的操作图片预览 为帮派统一通用
		 * Parameters:
		 * o <object> 需要加载圈图的imgID
		 * previewlist <ary> 预览的图片ID数组
		 * postdata <ary> 需要相应改变的hidden变量数据数组
		 * 
		 */
		'TBBPpreview':function(o,previewlist,fun){
			var _self=this,
				h = _self.img.offsetHeight,
				w = _self.img.offsetWidth;
			
			var _init=function(){
				
				var _o=o.getCropCoords(),
				ch = _o.height,
				cw = _o.width,
				ct = _o.top,
				cl = _o.left,
				dh = (h * _self.minH)/ ch,
				dw = (w * _self.minH) / cw,
				dt = (dh * ct)/ h,
				dl = (dw * cl) / w;
				
				for(var i=0;i<previewlist.length;i++){
					D.get(previewlist[i]).style.cssText= "height:" + dh/(i+1)+ "px;width:" + dw/(i+1)+ "px;top:-" + dt/(i+1)+ "px;left:-" + dl/(i+1) + "px";
				};
				
				fun(_o);
			};
			
			_init();
			
			o.on('moveEvent',_init);

			o.on('resizeEvent',_init);
			
			o._resize.on('endResize', function() {
				var ev = arguments[0];
				if (ev.width != ev.height) {
					var adjustXY = Math.min(ev.width, ev.height);
					this.resize(null, adjustXY, adjustXY, 0, 0);
					if(!bugfix){
						bugfix = this.on('dragEvent',function(){
							imgCrop._setConstraints(true);
						})||true;
					}
				}
			});
		}
	};
})();(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('CheckAllBox');
	
	/* CheckAllBox 初始化全选全清checkbox功能
	 * 
	 * Parameters:
	 * btn <ele> 全选或者多选的按钮
	 * boxs <eles> 需要操作的按钮eles集合
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.CheckAllBox=function(btn,boxs){
		var _check=function(){
			var boole=this.checked;
			D.batch(boxs,function(i){
				i.checked = boole;
			});
		};
		var _F;
		var _callbtn=function(){
			var c=0;
			for(var i=0;i<boxs.length;i++){
				if(!boxs[i].checked) {
					_F=false;
					break;
				}else{
					c++;
				}
			}
			if(c==boxs.length) _F=true;
			D.get(btn).checked=_F;
		};
		E.on(btn,'click',_check);
		E.on(boxs,'click',_callbtn);
	};
})();(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('CheckFileType');
	
	/* CheckFileType 淘宝帮派内部组件,前端判断文件格式是否符合规定
	 * 
	 * Parameters:
	 * list <ary> 数组格式的文件格式名 
	 * 
	 * Returns:
	 * boole <true|false> 合法返回true，不合法返回false
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.CheckFileType=function(value,list){
		var s=value.lastIndexOf('.'),
		extension=value.substring(s+1,value.length).toLowerCase();
		
		for(var i=0;i<list.length;i++){
			if(extension==list[i]) return true;
		}
		
		return false;
	};
})();(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('CheckLG');
	
	/* CheckLG 淘宝帮派内部组件,判断cookie是否登录状态
	 * 
	 * Returns:
	 * boole <true|false> 合法返回true，不合法返回false
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.CheckLG=function(){
		return LG=TB.bom.getCookie('uc1').toQueryParams()['cookie15'] && TB.bom.getCookie('_nk_') != undefined ? true : false;
	};
})();/* Copyright (c) 2010, Taobao.com Inc. All rights reserved. */

/**
 * Particular script of DPL, Project UserCenter.
 *
 * @author      fahai
 * @version     1.0.0
 */

(function() {
    YAHOO.namespace("util.Command.Behavior");

    var U = YAHOO.util, Dom = U.Dom, Event = U.Event, Behavior = U.Command.Behavior;
    var NONE = "none", FALSE = "false", BLOCK = "block", MIN = "0", HIDDEN = "hidden", BLANK = "";

    YAHOO.util.Command.init = function(c) {
        var _config = {
            func:function() {
            },
            preventDefault:true,
            target:null,
            filter:function() {
                return true;
            },
            getTarget:function() {
            },
            extraFunc:function() {
            },
            beforeEnd:function() {
            }
        }, config = YAHOO.lang.merge(_config, c || {});

        return function(e) {
            var trigger, target;
            trigger = e.target || e.srcElement;

            if (config.filter(trigger)) {
                target = config.target || config.getTarget(trigger) || trigger;

                if (!(config.preventDefault === FALSE)) {
                    Event.preventDefault(e);
                }

                config.func(target, config.extraFunc);
            }
            config.beforeEnd();
        };
    };


    Behavior.hide = function(target, extraFunc) {
        return Dom.batch(target, Behavior._hide, extraFunc);
    };

    Behavior._hide = function(o, extraFunc) {
        if (Dom.getStyle(o, "display") != NONE) {
            Dom.setStyle(o, "display", NONE);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.show = function(target, extraFunc) {
        return Dom.batch(target, Behavior._show, extraFunc);
    };

    Behavior._show = function(o, extraFunc) {
        if (Dom.getStyle(o, "display") == NONE) {
            Dom.setStyle(o, "display", BLOCK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.toggleHide = function(target, extraFunc) {
        return Dom.batch(target, Behavior._toggleHide, extraFunc);
    };

    Behavior._toggleHide = function(o, extraFunc) {
        if (Dom.getStyle(o, "display") != NONE) {
            Dom.setStyle(o, "display", NONE);
        } else {
            Dom.setStyle(o, "display", BLOCK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.fold = function(target, extraFunc) {
        return Dom.batch(target, Behavior._fold, extraFunc);
    };

    Behavior._fold = function(o, extraFunc) {
        if (parseInt(Dom.getStyle(o, "height")) != parseInt(MIN)) {
            Dom.setStyle(o, "height", MIN);
            Dom.setStyle(o, "overflow", HIDDEN);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.unfold = function(target, extraFunc) {
        return Dom.batch(target, Behavior._unfold, extraFunc);
    };

    Behavior._unfold = function(o, extraFunc) {
        if (parseInt(Dom.getStyle(o, "height")) == parseInt(MIN)) {
            Dom.setStyle(o, "height", BLANK);
            Dom.setStyle(o, "overflow", BLANK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    Behavior.toggleFold = function(target, extraFunc) {
        return Dom.batch(target, Behavior._toggleFold, extraFunc);
    };

    Behavior._toggleFold = function(o, extraFunc) {
        if (parseInt(Dom.getStyle(o, "height")) != parseInt(MIN)) {
            Dom.setStyle(o, "height", MIN);
            Dom.setStyle(o, "overflow", HIDDEN);
        } else {
            Dom.setStyle(o, "height", BLANK);
            Dom.setStyle(o, "overflow", BLANK);
        }
        if (extraFunc) {
            extraFunc(o);
        }
    };

    U.Command.NodeWrapper = function(o) {
        var _config = {
            template:"",
            data:[],
            container:null
        }, config = YAHOO.lang.merge(_config, o || {});

        this.template = config.template;
        this.data = config.data;
        this.container = config.container;
        this.source = this.container.innerHTML;

        this.init();
    };

    U.Command.NodeWrapper.prototype = {
        render:function() {
            var result = [];
            for (var i = 0, l = this.data.length; i < l; i++) {
                if (!this.data[i]) {
                    continue;
                }
                result.push(YAHOO.lang.substitute(this.template, this.data[i]));
            }
            this.container.innerHTML = result.join("");
        },
        parse:function() {

        },
        init:function() {
            this.parse();
            this.render();
        }
    };

})();

// applied
(function() {
    var U = YAHOO.util, Dom = U.Dom, Event = U.Event, Behavior = U.Command.Behavior;

    // folding sidebar
    Event.onDOMReady(function() {
        var TRIGGER_EVENT = "click";
        var triggers = Dom.getElementsByClassName("sidebar", "div");

        if (triggers) {
            Event.addListener(triggers, TRIGGER_EVENT, U.Command.init({
                func:function(target) {
                    if (Dom.hasClass(target, "folding")) {
                        Dom.removeClass(target, "folding");
                    } else {
                        Dom.addClass(target, "folding");
                    }
                },
                filter:function(target) {
                    return Dom.hasClass(target, "trigger");
                },
                getTarget:function(trigger) {
                    return Dom.getAncestorByClassName(trigger, "folder");
                }
            }));
        }
    });

    // close notice message
    Event.onDOMReady(function() {
        var TRIGGER_EVENT = "click";
        var triggers = Dom.getElementsByClassName("msg", "div");

        if (triggers) {
            Event.addListener(triggers, TRIGGER_EVENT, U.Command.init({
                func:Behavior.hide,
                filter:function(target) {
                    return Dom.hasClass(target, "trigger");
                },
                getTarget:function(trigger) {
                    return Dom.getAncestorByClassName(trigger, "msg");
                }
            }))
        }
    });

    // content tab
    Event.onDOMReady(function() {
        if (Dom.get("J_ContentTab")) {
            TB.widget.SimpleTab.decorate("J_ContentTab", {
                eventType: 'click',
                currentClass: 'current',
                tabClass: "J_tab",
                tabPanelClass: "tab-panel",
                autoSwitchToFirst: true,
                stopEvent: true
            });
        }
    });

})();
(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('CopyToClipboard');
	
	/* CopyToClipboard 复制到剪切板功能
	 * 
	 * Parameters:
	 * txt <str> 复制到剪切板的字符串
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.CopyToClipboard=function(txt){
		try{
			if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
            alert("成功复制链接到剪切板，可以进行Ctrl+V粘贴");
	        }else if (navigator.userAgent.indexOf("Opera") != -1) {
	            window.location = txt;
	        }else if (window.netscape){
	             try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	             }catch(e){
	                window.prompt("被浏览器拒绝！请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'\n请手动复制下方链接然后粘贴到您的聊天工具或论坛、博客中去！",txt);
	             }
	             var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
	             if (!clip)  return;
	             var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
	             if (!trans) return;
	             trans.addDataFlavor('text/unicode');
	             var str = new Object(),
	             	 len = new Object(),
	                 str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	             var copytext = txt;
	                 str.data = copytext;
	                 trans.setTransferData("text/unicode", str, copytext.length * 2);
	             var clipid = Components.interfaces.nsIClipboard;
	             if (!clip)  return false;
	                 clip.setData(trans, null, clipid.kGlobalClipboard);
	                 alert("成功复制链接到剪切板，可以进行Ctrl+V粘贴");
	        }else{
	        	window.prompt('您的浏览器不支持自动复制，请手动复制下方链接\n然后粘贴到您的聊天工具或论坛、博客中去！',txt);
	        }
		}catch(e){}
	};
})();(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('Customlabel');
	
	/* Customlabel 许多无ID的label处理
	 * 
	 * Parameters:
	 * target <eles> 被触发元素的集合
	 * trigger <eles> 触发label元素集合 
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.Customlabel=function(target,trigger){
		var i=0;
		for(;i<trigger.length;i++){
			(function(j){
			E.on(trigger[j],'click',function(){
				target[j].checked = !target[j].checked ?  true : false;
			});
			})(i);
			E.on(target[i],'click',function(ev){
				E.stopPropagation(ev);
			});
		}
	}
})();(function(){
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
})();(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	TB.namespace('popup');
	
	/* Popup 帮派通用浮层JS函数  || YAHOO.util.popup TB.popup
	 * 
	 * Parameters:
	 * trigger <string> 触发浮层显示的控件ID
	 * target <string> 浮层控件ID
	 * closebtn <ary|string> 关闭浮层的控件ID（可以是多个，数组或者单个字符串形式）
	 * 
	 * Return:
	 * int <fn> -> hide; 可以使用int方法初始化一个浮层，初始化后实力拥有hide方法
	 * close <fn> 初始化之后可以进行自身关闭的调用
	 * fire <fn> 初始化之后其他控件可以fire出浮层
	 * 
	 * @author longxiao
	 * @date 2010 12 21
	 */
	
	TB.popup=function(trigger,target,closebtn){
		//构造部分
		var self=this;
		this.trigger=trigger;
		this.target=target;
		this.closebtn=closebtn;
		
		this._offsettop = parseInt(D.getStyle(this.target, 'height')) / 2;
		this._offsetleft = parseInt(D.getStyle(this.target, 'width')) / 2;
		//私有不开放函数
		var _f={
			//对Trigger层处理
			'Target':function(){
				D.removeClass(self.target,'hidden');
				_f.Createshade();
				if (6 == YAHOO.env.ua.ie) {
					_f.Ie6fn();
				} else {
					D.addClass(self.target,'supernatant');
					if(YAHOO.env.ua.opera){
						var _offsettop = parseInt(D.getStyle(self.target, 'height')) / 2,_offsetleft = parseInt(D.getStyle(self.target, 'width')) / 2;
						D.get(self.target).style.cssText = 'margin-left:-'+ _offsetleft + 'px;margin-top:-' + _offsettop + 'px';
					}else{
						D.get(self.target).style.cssText = 'margin-left:-'+ self._offsetleft + 'px;margin-top:-' + self._offsettop + 'px';
					}
						
				}
			},
			//对Trigger处理
			'Trigger':function(ID){
				var ele = D.get(ID);
				E.on(ele, 'click', _f.Target);
			},
			//创建遮罩层
			'Createshade':function(){
				if (!D.get('mypopupshadeDiv')) {
					if (6 == YAHOO.env.ua.ie) {
						var shadeDiv = document.createElement('iframe');
							shadeDiv.allowtranseparency = true;
							shadeDiv.src="about:blank";
					}else{
						var shadeDiv = document.createElement('div');
						D.addClass(shadeDiv,'bigshade');
					}
					shadeDiv.id = "mypopupshadeDiv";
					document.body.appendChild(shadeDiv);
				}
			},
			//隐藏浮动层和背景层
			'Hide':function(){
				D.addClass(self.target,'hidden');
				var shade =document.getElementById('mypopupshadeDiv');
				if(shade) shade.parentNode.removeChild(shade);
			},
			//针对IE6的事件函数
			'Ie6fn':function(){
				_f.AdjustPostion(self.target,self._offsetleft);
				_f.AdjustBackground(D.getViewportHeight(),D.getDocumentScrollTop());
			},
			//不支持fixed的情况下，浮动层定位	
			'AdjustPostion':function(target,left){
				var target=D.get(target);
				if(target){
					//增加浮动层特有样式supernatant
					D.addClass(target,'supernatant');
					var top = D.getDocumentScrollTop() + (D.getViewportHeight()/ 2 - self._offsetleft);
					target.style.cssText = 'margin-left:-'+ left + 'px;top:' + top + 'px;';
				}
			},
			//不支持fixed的情况下，背景透明层定位
			'AdjustBackground':function(height,top){
				var myshade = D.get('mypopupshadeDiv');
				if (myshade) {
					var iframedoc=myshade.contentWindow.document;
						if(!iframedoc.body){
							iframedoc.designMode ='On';
							iframedoc.contentEditable = true;
							iframedoc.open(); 
							iframedoc.writeln('<body style="margin:0px;padding:0px;background:#000;"></body>');
							iframedoc.close();
						}
					D.addClass(myshade,'bigshade');
					myshade.style.cssText = 'height:'+ height + 'px;top:'+ top + 'px;';
				}
			}
		};
		
		//对外开放函数列表
		var P={
			//初始化对象
			'int':function(){
				//初始化之后对外暴露的接口
				var publicfn={
					'hide':_f.Hide	
				};
				//对按钮进行事件绑定
				_f.Trigger(self.trigger);
				//判断关闭按钮是否多个，并绑定事件
				if (typeof self.closebtn === 'string') {
					P.close(self.closebtn);
				} else {
					for ( var i = 0; i < self.closebtn.length; i++) {
						P.close(self.closebtn[i]);
					}
				};
				//判断是否是IE6，针对其进行专门处理
				if (6 == YAHOO.env.ua.ie) {
					E.onDOMReady(function() {
						E.on(window, 'resize',_f.Ie6fn);
						E.on(window, 'scroll',_f.Ie6fn);
					});
				}
				
				//初始化之后可使用hide方法隐藏自己
				return publicfn; 
			},
			//可以直接调用close方法关闭自己
			'close':function(trigger){
				var ele = D.get(trigger);
				E.on(ele,'click',_f.Hide);
			},
			//可以隐藏后使用fire方法使自己浮出
			'fire':function(){
				P['int']();
				_f.Createshade();
				_f.Target();
			}
		}
		
		return P;
	};
	
	YAHOO.util.popup=TB.popup;
	
})();(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event,DOC=document;
	TB.namespace('checknum');
	/*
	 * 检查邀请人数并限制
	 * 帮派邀请模块私用
	 * 只在旺旺邀请处和回调处使用
	 */
	TB.checknum=function(eles,num){
		var n=0;
		D.batch(eles,function(el){
			if(el.checked) n++;
		});
		
		if(n>=num){
			D.batch(eles,function(el){
				if(!el.checked){
					el.disabled=true;
					E.removeListener(el.parentNode.getElementsByTagName('label')[0]);
				}
			});
		}else{
			D.batch(eles,function(el){
				if(el.disabled){
					TB.Customlabel([el],[el.parentNode.getElementsByTagName('label')[0]]);
					E.on(el.parentNode.getElementsByTagName('label')[0],'click',function(){
						TB.checknum(eles,num);
					});
					el.disabled=false;
				} 
			});
		}
	};
})();(function() {
    var Y = YAHOO,D = Y.util.Dom,E = Y.util.Event;
    TB.namespace('iehover');
    /*
     * iehover |IE下hover模拟
     * parameter
     * eles,需要添加的eles
     * clsname 需要添加和移除的classname
     */
    TB.iehover=function(eles,clsname){
    	if (YAHOO.env.ua.ie==6) {
            var bangpais = D.getElementsByClassName(eles);
          
            E.on(bangpais, 'mouseover',function() {
                D.addClass(this, clsname);
            });

            E.on(bangpais, 'mouseout',function() {
                D.removeClass(this, clsname);
            });
        }
    }
})();(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('listenCallback');
	
	/* listenBack 淘宝帮派内部组件,轮询检查,监听异步响应等
	 * 
	 * Parameters:
	 * filter <function> return false | true;
	 * fun <function> 看filter返回值，如果为true则执行fun，否则500毫秒轮询一次
	 * 
	 * Returns:
	 * boole <true|false> 合法返回true，不合法返回false
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.listenBack=function(filter,fun){
		setTimeout(function(){
			if(filter()){
				fun();
			}else{
				TB.listenBack(filter,fun);
			}
		},200);
	};
})();(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('wordcountdown');
		/* wordcountdown 帮派字符标红函数
		 * 
		 * Parameters:
		 * ele <ele> 计数器所处在的input或者textarea
		 * target <ele> 显示字数的容器
		 * max <num> max字数
		 * 
		 * @author longxiao
		 * @date 2010 12 21
		 */
	TB.wordcountdown.bind=function(ele,target,max){
		//初始化字数
		var targetnum=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
		var targetparent=D.getAncestorByTagName(D.get(target),'span');
		D.get(target).innerHTML=targetnum;
		//change函数
		var _change=function(){
			var size=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
			targetparent.innerHTML= size>=0 ? '还能输入<em id="J_Bpnum">'+size+'</em>个字':'您的输入已超出<em id="J_Bpnum" class="cause">'+max+'</em>个字'
		};
		_change();
		//绑定事件
		E.on(ele,'keyup',_change);
	};
})();