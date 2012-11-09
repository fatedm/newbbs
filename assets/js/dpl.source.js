(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('BPGraphPic');
	
	/* BPGraphPic �Ա������ڲ������ֱ�Ӹ���������ͷ��ͼƬȦͼ�Ĺ���
	 * 
	 * Parameters:
	 * imgID <ele> ��Ҫ����Ȧͼ��imgID
	 * minH <number> Ȧͼ����С�߶�
	 * minW <number> Ȧͼ����С���
	 * 
	 * Returns:
	 * imagecropper <object> ����
	 * 
	 * ��Ҫ����YUI��imagecropper���������Ҫ�ⲿ���أ�����ڲ�ʹ��getscript�����Լ���ȡ��
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
		//����װ��Ȧͼ���¼�
		'_EquipCropper':function(){
		//����cropĬ�϶���
			
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
		//Զ�̼���Ȧͼ
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
		/*Ȧͼ��Ĳ���ͼƬԤ�� Ϊ����ͳһͨ��
		 * Parameters:
		 * o <object> ��Ҫ����Ȧͼ��imgID
		 * previewlist <ary> Ԥ����ͼƬID����
		 * postdata <ary> ��Ҫ��Ӧ�ı��hidden������������
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
	
	/* CheckAllBox ��ʼ��ȫѡȫ��checkbox����
	 * 
	 * Parameters:
	 * btn <ele> ȫѡ���߶�ѡ�İ�ť
	 * boxs <eles> ��Ҫ�����İ�ťeles����
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
	
	/* CheckFileType �Ա������ڲ����,ǰ���ж��ļ���ʽ�Ƿ���Ϲ涨
	 * 
	 * Parameters:
	 * list <ary> �����ʽ���ļ���ʽ�� 
	 * 
	 * Returns:
	 * boole <true|false> �Ϸ�����true�����Ϸ�����false
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
	
	/* CheckLG �Ա������ڲ����,�ж�cookie�Ƿ��¼״̬
	 * 
	 * Returns:
	 * boole <true|false> �Ϸ�����true�����Ϸ�����false
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
	
	/* CopyToClipboard ���Ƶ����а幦��
	 * 
	 * Parameters:
	 * txt <str> ���Ƶ����а���ַ���
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.CopyToClipboard=function(txt){
		try{
			if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
            alert("�ɹ��������ӵ����а壬���Խ���Ctrl+Vճ��");
	        }else if (navigator.userAgent.indexOf("Opera") != -1) {
	            window.location = txt;
	        }else if (window.netscape){
	             try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	             }catch(e){
	                window.prompt("��������ܾ��������������ַ������'about:config'���س�\nȻ��'signed.applets.codebase_principal_support'����Ϊ'true'\n���ֶ������·�����Ȼ��ճ�����������칤�߻���̳��������ȥ��",txt);
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
	                 alert("�ɹ��������ӵ����а壬���Խ���Ctrl+Vճ��");
	        }else{
	        	window.prompt('�����������֧���Զ����ƣ����ֶ������·�����\nȻ��ճ�����������칤�߻���̳��������ȥ��',txt);
	        }
		}catch(e){}
	};
})();(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('Customlabel');
	
	/* Customlabel �����ID��label����
	 * 
	 * Parameters:
	 * target <eles> ������Ԫ�صļ���
	 * trigger <eles> ����labelԪ�ؼ��� 
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
	
	/* MouseWheel �Զ����������֧����껬�����»���
	 * 
	 * Parameters:
	 * 
	 * o <object> ����μ��²���_o�Ĳ���;
	 * 
	 * Returns:
	 * slider <obj> ʵ�������Slider����
	 * h <callback> ����Ϊ���ع���DIV��offsetHeightֵ
	 * 
	 * ��Ҫ����silder��������ɺ����ҳ��Ƕ���ſ���ʹ�á�
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
		
		YAHOO.lang.augmentObject(_o,o,true); //�ϲ�Ĭ��ֵ���߸���Ĭ��ֵ

		_o.ScrollHeght=D.get(_o.sBGElId).scrollHeight;
		
		//��껬��˽����غ���
		var _MouseWheel={
			//��
			mousewheel:function(node, fn){
			    if (document.addEventListener) document.getElementById(node).addEventListener('DOMMouseScroll', fn, false); //W3C
			    document.getElementById(node).onmousewheel = fn; //IE/Opera/Chrome
			},
			//�¼�
			mousefunc:function(e,s){
				var direct = _MouseWheel.direction(e);
	            if (direct > 0) {
	               _MouseWheel.wheelup(s);
	            }else{
	               _MouseWheel.wheeldown(s);
	            }
	            E.stopEvent(e);
			},
			//����
			direction:function(e){
			    var direct = 0;
			    if (e.wheelDelta) {
			        direct = e.wheelDelta > 0 ? 1 : -1;
			    }else if (e.detail) {
			        direct = e.detail < 0 ? 1 : -1;
			    }
				return direct;
			},
			//�����ƶ�
			wheelup:function(s){
				_o.DivTop = _o.DivTop - _o.Mousepx;
				var v=_o.DivTop * _o.Maxheight / _o.ScrollHeght;
			    s.setValue(v);
			    if (_o.DivTop < 0) _o.DivTop = 0;
			},
			//�����ƶ�
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
	            	//�жϹ������Ƿ񵽴�ײ�
	            	if(offsetFromStart==_o.iDown){
	            		D.get(_o.sBGElId).scrollTop=_o.ScrollHeght;
	            	}else{
	            		D.get(_o.sBGElId).scrollTop = _o.DivTop;
	            	}
	            });
				
				
				//ʵ���������������ػ����¼������
			    _MouseWheel.mousewheel(_o.sBGElId,function(e){
			    	e = e || window.event;
					_MouseWheel.mousefunc(e,slider);
				});
				
	            //�ɹ���Ļص�
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
	
	/* Popup ����ͨ�ø���JS����  || YAHOO.util.popup TB.popup
	 * 
	 * Parameters:
	 * trigger <string> ����������ʾ�Ŀؼ�ID
	 * target <string> ����ؼ�ID
	 * closebtn <ary|string> �رո���Ŀؼ�ID�������Ƕ����������ߵ����ַ�����ʽ��
	 * 
	 * Return:
	 * int <fn> -> hide; ����ʹ��int������ʼ��һ�����㣬��ʼ����ʵ��ӵ��hide����
	 * close <fn> ��ʼ��֮����Խ�������رյĵ���
	 * fire <fn> ��ʼ��֮�������ؼ�����fire������
	 * 
	 * @author longxiao
	 * @date 2010 12 21
	 */
	
	TB.popup=function(trigger,target,closebtn){
		//���첿��
		var self=this;
		this.trigger=trigger;
		this.target=target;
		this.closebtn=closebtn;
		
		this._offsettop = parseInt(D.getStyle(this.target, 'height')) / 2;
		this._offsetleft = parseInt(D.getStyle(this.target, 'width')) / 2;
		//˽�в����ź���
		var _f={
			//��Trigger�㴦��
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
			//��Trigger����
			'Trigger':function(ID){
				var ele = D.get(ID);
				E.on(ele, 'click', _f.Target);
			},
			//�������ֲ�
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
			//���ظ�����ͱ�����
			'Hide':function(){
				D.addClass(self.target,'hidden');
				var shade =document.getElementById('mypopupshadeDiv');
				if(shade) shade.parentNode.removeChild(shade);
			},
			//���IE6���¼�����
			'Ie6fn':function(){
				_f.AdjustPostion(self.target,self._offsetleft);
				_f.AdjustBackground(D.getViewportHeight(),D.getDocumentScrollTop());
			},
			//��֧��fixed������£������㶨λ	
			'AdjustPostion':function(target,left){
				var target=D.get(target);
				if(target){
					//���Ӹ�����������ʽsupernatant
					D.addClass(target,'supernatant');
					var top = D.getDocumentScrollTop() + (D.getViewportHeight()/ 2 - self._offsetleft);
					target.style.cssText = 'margin-left:-'+ left + 'px;top:' + top + 'px;';
				}
			},
			//��֧��fixed������£�����͸���㶨λ
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
		
		//���⿪�ź����б�
		var P={
			//��ʼ������
			'int':function(){
				//��ʼ��֮����Ⱪ¶�Ľӿ�
				var publicfn={
					'hide':_f.Hide	
				};
				//�԰�ť�����¼���
				_f.Trigger(self.trigger);
				//�жϹرհ�ť�Ƿ����������¼�
				if (typeof self.closebtn === 'string') {
					P.close(self.closebtn);
				} else {
					for ( var i = 0; i < self.closebtn.length; i++) {
						P.close(self.closebtn[i]);
					}
				};
				//�ж��Ƿ���IE6����������ר�Ŵ���
				if (6 == YAHOO.env.ua.ie) {
					E.onDOMReady(function() {
						E.on(window, 'resize',_f.Ie6fn);
						E.on(window, 'scroll',_f.Ie6fn);
					});
				}
				
				//��ʼ��֮���ʹ��hide���������Լ�
				return publicfn; 
			},
			//����ֱ�ӵ���close�����ر��Լ�
			'close':function(trigger){
				var ele = D.get(trigger);
				E.on(ele,'click',_f.Hide);
			},
			//�������غ�ʹ��fire����ʹ�Լ�����
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
	 * �����������������
	 * ��������ģ��˽��
	 * ֻ���������봦�ͻص���ʹ��
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
     * iehover |IE��hoverģ��
     * parameter
     * eles,��Ҫ��ӵ�eles
     * clsname ��Ҫ��Ӻ��Ƴ���classname
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
	
	/* listenBack �Ա������ڲ����,��ѯ���,�����첽��Ӧ��
	 * 
	 * Parameters:
	 * filter <function> return false | true;
	 * fun <function> ��filter����ֵ�����Ϊtrue��ִ��fun������500������ѯһ��
	 * 
	 * Returns:
	 * boole <true|false> �Ϸ�����true�����Ϸ�����false
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
		/* wordcountdown �����ַ���캯��
		 * 
		 * Parameters:
		 * ele <ele> �����������ڵ�input����textarea
		 * target <ele> ��ʾ����������
		 * max <num> max����
		 * 
		 * @author longxiao
		 * @date 2010 12 21
		 */
	TB.wordcountdown.bind=function(ele,target,max){
		//��ʼ������
		var targetnum=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
		var targetparent=D.getAncestorByTagName(D.get(target),'span');
		D.get(target).innerHTML=targetnum;
		//change����
		var _change=function(){
			var size=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
			targetparent.innerHTML= size>=0 ? '��������<em id="J_Bpnum">'+size+'</em>����':'���������ѳ���<em id="J_Bpnum" class="cause">'+max+'</em>����'
		};
		_change();
		//���¼�
		E.on(ele,'keyup',_change);
	};
})();