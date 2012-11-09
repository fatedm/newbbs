(function(){
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
	
})();