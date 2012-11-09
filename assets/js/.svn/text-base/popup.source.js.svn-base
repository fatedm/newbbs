/**
 * @author longxiao.fq 弹出模块
 */
 /*
	 * 浮动层类- 2010-07-19 @author longxiao 调用方法： 第一个参数是点击调出层的按钮ID；
	 * 第二个参数是目标弹出层【默认样式要设置display：none】 第三个参数是关闭弹出层的按钮ID，多个用数组形式表达；
	 */
(function() {
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	Y.util.popup = function(btn, target, close) {
		var self=this;
		this.status = 'none';
		this.ffh = parseInt(D.getStyle(target, 'height')) / 2;
		this.w = parseInt(D.getStyle(target, 'width')) / 2;
		
		this.adjustPostion = function(t,status,w) {
			var target=D.get(t);
			if(target){
			D.addClass(target,'supernatant');
			var h = D.getDocumentScrollTop() + (D.getViewportHeight()/ 2 - this.ffh);
			target.style.cssText = 'display:'+ status+ ';margin-left:-'+ w + 'px;top:' + h + 'px;';
			}
			
		};
		this.adjustBackground = function(status,h,t) {
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
					myshade.style.cssText = 'display:'+ status+ ';height:'+ h + 'px;top:'+ t + 'px;';
			}
		};
		this.createshade = function() {
			var bd = document.getElementsByTagName('body')[0];
			if (!D.get('mypopupshadeDiv')) {
				if (6 == YAHOO.env.ua.ie) {
					var shadeDiv = document.createElement('iframe');
						shadeDiv.allowtranseparency = true;
						shadeDiv.src="about:blank";
				}else{
					var shadeDiv = document.createElement('div');
					D.addClass(shadeDiv,'bigshade');
				};
					shadeDiv.id = "mypopupshadeDiv";
					bd.appendChild(shadeDiv);
			};
		};
		this.ie6fn=function(){
			self.adjustPostion(target,self.status,self.w);
			self.adjustBackground(self.status,D.getViewportHeight(),D.getDocumentScrollTop());
		};
		this.hide=function(){
			D.addClass(target,'hidden');
			var bd = document.getElementsByTagName('body')[0], 
				shade = D.get('mypopupshadeDiv');
				bd.removeChild(shade);
				self.status = 'none';
		}
		
		return {
			// 安装事件
			'int' : function() {
				this.Event(btn);
				if (typeof close === 'string') {
					this.close(close);
				} else {
					for ( var i = 0; i < close.length; i++) {
						this.close(close[i]);
					}
				};
				if (6 == YAHOO.env.ua.ie) {
					E.onDOMReady(function() {
						E.on(window, 'resize',self.ie6fn);
						E.on(window, 'scroll',self.ie6fn);
					});
				}
				return {
					'hide':self.hide
				};
			},
			'Event' : function(btn) {
				var ele = D.get(btn), that = this;
				E.on(ele, 'click', that.trigger);
			},
			'trigger' : function() {
				D.removeClass(target,'hidden');
				self.createshade();
				if (6 == YAHOO.env.ua.ie) {
					self.status = 'block';
					self.ie6fn();
				} else {
					D.addClass(target,'supernatant');
					if(YAHOO.env.ua.opera){
						var ffh = parseInt(D.getStyle(target, 'height')) / 2,w = parseInt(D.getStyle(target, 'width')) / 2;
						D.get(target).style.cssText = 'margin-left:-'+ w + 'px;margin-top:-' + ffh + 'px';
					}else{
						D.get(target).style.cssText = 'margin-left:-'+ self.w + 'px;margin-top:-' + self.ffh + 'px';
					}
 					
				}
			},
			'close' : function(btn) {
				var ele = D.get(btn);
				E.on(ele,'click',self.hide);
			},
			'fire' : function() {
				this['int']();
				self.createshade();
				this['trigger']();
			}
		}
	};
})();