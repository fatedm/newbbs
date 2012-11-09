/*
依赖到的JS：
http://assets.taobaocdn.com/yui/2.7.0/build/element/element-min.js
http://assets.taobaocdn.com/yui/2.7.0/build/selector/selector-min.js
http://assets.taobaocdn.com/yui/2.8.0r4/build/event-delegate/event-delegate-min.js

这个JS文件是管理整个展示活动部分的逻辑处理，比如验证身份，提交参加活动数据，退出活动数据等。
还有可以配置浮层的种类和样式，维护浮层DOM结构，和具体处理流程等。

*/
(function(){
       var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
        Y.widget.actlayer = function(btn, type, config){
                    var self = this;
                    self.btn = btn;
                    self.type = type;
                    self.config = config;
                    
                  //全角半角转换函数
            		var FullToDBC=function(Str) {
							var DBCStr = "";
							for ( var i = 0; i < Str.length; i++) {
								var c = Str.charCodeAt(i);
								if (c == 12288) {
									DBCStr += String
											.fromCharCode(32);
									continue;
								}
								if (c > 65280 && c < 65375) {
									DBCStr += String
											.fromCharCode(c - 65248);
									continue;
								}
								DBCStr += String
										.fromCharCode(c);
							}
							return DBCStr;
						};
					
					//ajax时截取url避免转移字符产生IE下的404错误	
					var _urlcut=function(url){
            				var url=TB.common.parseUri(url);
            				return url['prePath']+url['path'];
        			};	
                    
                    //构造post数据
                    var _postdata=function(type){
                    	//共有config
                    	var _Ajaxconfig = {
         					'action' : 'bangpai/activity_action',
         					'groupId' : self.config.groupId,
         					'threadId' : self.config.threadId,
         					'_input_charset':'utf_8'
         				};
                    	
                    	//addconfig
                    	var _Addconfig=function(config,obj){
                    		for(var i in obj){
                    			if(!config.hasOwnProperty(i)){ config[i]=obj[i];}
                    		}
                    		return config;
                    	};
                    	
                    	//builtdata
                    	var _Builddata=function(config){
                    		var _ret="";
                    		for(var i in config){
                    			_ret += i+'='+config[i]+'&';
                    		}
                    		return _ret.slice(0,_ret.length-1);
                    	};
                    	
                    	//不同分类
                    	var _type={
                    		//身份验证action
                    		canido:function(config){
                    			var _candolist={
                    				'event_submit_do_can_join_activity':'anything'
                    			};
                    			var data=_Addconfig(_Ajaxconfig,_candolist);
                    			return _Builddata(data);
                    		},
                    		//参加活动action
                    		dojoin:function(config){
                    			var _dojionlist={
                    				'event_submit_do_user_join_activity': 'anything'
                    			};
                    			
                    			_dojionlist[self.config.tbTokenFieldName]=self.config.tbToken;
                    			_dojionlist[self.config.phoneFieldName]=D.get('affirmact-popup-phone')? FullToDBC(D.get('affirmact-popup-phone').value) : "";
								if(self.config.needCheckcode=='true'){
								_dojionlist[self.config.checkcodeFieldName]=D.get('popup-validCode').value;
								}
                    			
                    			var data=_Addconfig(_Ajaxconfig,_dojionlist);
                    			return _Builddata(data);
                    		},
                    		//退出活动action
                    		exit:function(){
                    			var _exitlist={
                    				'event_submit_do_exit_activity':'anything'
                    			};
                    			
                    			_exitlist['tbToken']=self.config.tbToken;
                    			
                    			var data=_Addconfig(_Ajaxconfig,_exitlist);
                    			return _Builddata(data);
                    		}
                    	};
                    	
                    	return _type[type]();
                    };
                    
                    
                    
                    
                    
                    
                    //配置类型
                    var _typelist={
                    		'affirmact':function(o){
                    		_creataffirmact(o.target,o.title,o.money,o.actTime,o.phone,o.verifyCodeUrl,o.needCheckcode);
                    		}
                    };
                    
                  //超时请求
					var _failure=function(o){
						 _popuptips(self.config.target,'访问超时');
                 		 Y.util.popup(self.btn, self.config.target, ['mypopup-close', 'sub-close'])['fire']();
					};
					
					//退出活动的回调
					var _exitback={
						success:function(o){
							if (o.responseText != "") {			
									var callbackobj=YAHOO.lang.JSON.parse(o.responseText);
									if(callbackobj.hasOwnProperty('resultCode') && callbackobj.resultCode=="CSRF_INVALID"){
										_popuptips(self.config.target,callbackobj.erMsg);
										Y.util.popup(self.btn, self.config.target, ['mypopup-close', 'sub-close'])['fire']();
										E.on('mypopup-close','click',function(){
											D.get(self.config.target).innerHTML="";
											window.location.reload();
										});
									}else{
										window.location.reload();
									}
							}
						},
						failure:_failure,
						timeout: 5000	
					}
					
					//参加活动之后的回调
					var _doback={
	                    success:function(o){
						 if (o.responseText != "") {
								var callbackobj=YAHOO.lang.JSON.parse(o.responseText);
	                           	if(callbackobj.isSuccess=="true"){
	                           		_purgeElement();
	                                _joincallback(self.config.target,self.config.constitutor,'success');
									_popup();
	                           	}else{
	                           		//如果退出的或者超时话
	                           		if(callbackobj.hasOwnProperty('redirectURL')){
		                     	   		window.location.href=callbackobj.redirectURL;
		                     	   		return null;
		                     	   	}
	                           		
									if(D.get('validCode-tip')){
									var validCodetip=D.get('validCode-tip');
									};
									
									if(phonetip=D.get('phone-tip')){
									var phonetip=D.get('phone-tip');
									}
	                           		//含有提交验证错误信息的错误提示，在当前DOM下提示
	                           		if(callbackobj.hasOwnProperty('formErMsg')){
										var formlists=callbackobj.formErMsg;
										//验证一致性
										var coherence=function(node){
											if(!node){
												_popuptips(self.config.target,'对不起，活动信息已更新，请刷新后重新提交');
												E.on('mypopup-close','click',function(){
													window.location.reload();
												});
											}else{
												node.innerHTML=formlists[k];
												D.removeClass(node,"hidden");
											};
										};
										
										var errormanage={
											phoneNum:function(){
												coherence(phonetip);
											},
											checkcode:function(){
												coherence(validCodetip);
												D.batch(D.getElementsByClassName('J_validCode'),function(ev){
													ev.src = ev.src+"r="+new Date().valueOf();
												});
											},
											tbToken:function(){
												_purgeElement();
												_joincallback(self.config.target,self.config.constitutor,'error',formlists[k]);
												_popup();
												//失效之后重新加载
												E.on('mypopup-close','click',function(){
													window.location.reload();
												});
											}
										};
										
										for(var k in formlists){
											//console.log(k);
											//console.log(formlists[k]);
											errormanage[k]();
										};
									};
	                           		//含有业务错误信息的，提交到大页面提示错误
									if(callbackobj.hasOwnProperty('erMsg')){
										_purgeElement();
										_joincallback(self.config.target,self.config.constitutor,'error',callbackobj.erMsg);
										_popup();
										E.on(['mypopup-close', 'sub-close'],'click',function(){
													window.location.reload();
										});
	                           		};
	                           		
	                           	}
	                       }
	                    },
	                    failure:_failure,
	                    timeout: 5000	
	                };
					
					
					//第一次检测身份参加的回调
                    var _canjionback={
                    		success:function(o){
                    		if (o.responseText != "") {
								var callbackobj=YAHOO.lang.JSON.parse(o.responseText);
		                        if(callbackobj.isSuccess=="false"){
		                     	   	  if(callbackobj.hasOwnProperty('redirectURL')){
		                     	   		window.location.href=callbackobj.redirectURL;
		                     	   	  }else if(callbackobj.hasOwnProperty('erMsg')){
		                     	   		_popuptips(self.config.target,callbackobj.erMsg);
										Y.util.popup(self.btn, self.config.target, ['mypopup-close', 'sub-close'])['fire']();
										E.on('mypopup-close','click',function(){
											D.get(self.config.target).innerHTML="";
											window.location.reload();
									    });
									  }
		                     	 }else{
		                     	   	_fire();
		                        }
                    		}
                    		},
                    		failure:_failure,
                            timeout: 5000
                    };
                    //检测是否有资格参加活动
                    var _canjion=function(){
                    	var getdata=_postdata('canido');
                        Y.util.Connect.asyncRequest('POST',_urlcut(window.location.href),_canjionback,getdata);
                    };
                    
                    //绑定事件
                    var _bind=function(){
                        var that = this;
                        var target=self.config.target;
                        
                        var setmsg={
                        		validCodetip:{failmsg:"验证码不能为空"},
                        		phonetip:{failmsg1:"电话号码不能为空",failmsg2:"联系电话只能由数字,-,空格,(,)组成。"},
                        		ruletip:{failmsg:"请勾选淘宝网活动协议"}
                        };
                        
                        //验证码
                        E.delegate(target, "click", function(e, matchedEl, container) {
								var img=D.get('J_CodeImg');
                        		img.src = img.src+"r="+new Date().valueOf();
                       }, "a.J_RfreshValidation");
                        
                     //点击切换文本内容
                        if(D.get('popup-term')) TB.widget.InputHint.decorate('popup-term', {hintMessage:setmsg.term.msg});
						//提交部分
                        E.delegate(target, 'click', function(e, matchedEl, container){
                        	//先分出2种类型的不同验证，然后进行分组
							if(D.get('popup-validCode')){
							var validCode=D.get('popup-validCode').value;
							}
							
							if(D.get('validCode-tip')){
							var validCodetip=D.get('validCode-tip');
							}
							
                        	var rule=D.get('popup-rule').checked,
                        		ruletip=D.get('rule-tip');
                        	
                        	var typelist={
                        		'affirmact':function(){
                        			// 最后验证电话号码不为空或者不为非数字，并不允许带特殊符号,长度20
                        			var flg=true;
                            		if(D.get('affirmact-popup-phone')){
                            			var phonetip=D.get('phone-tip'), phone=FullToDBC(D.get('affirmact-popup-phone').value);
                            			//console.log(phone);
                            			//判断是否为空
                                		if (phone == "") {
                                			D.removeClass(phonetip,"hidden");
											phonetip.innerHTML = setmsg.phonetip.failmsg1;
											flg=false;
                                		}else if (/[^\d|\(|\)|\-|\s]/.test(phone)) {
											D.removeClass(phonetip,"hidden");
											phonetip.innerHTML =  setmsg.phonetip.failmsg2;
											flg=false;
										}else {
											D.addClass(phonetip,"hidden");
										}
										
									};
                            		
                            		//验证码不能为空
									if (validCode == "" || validCode=="点击输入验证码") {
										D.removeClass(validCodetip,'hidden');
										validCodetip.innerHTML = setmsg.validCodetip.failmsg;
										flg=false;
									}else {
										D.addClass(validCodetip,'hidden');
									};
									
									//验证协议一定要勾选
									if (rule == "") {
										D.removeClass(ruletip,'hidden');
										D.setStyle(ruletip,"display","inline");
										D.setStyle(ruletip,"float","none");
										ruletip.innerHTML = setmsg.ruletip.failmsg;
										flg=false;
									}else {
										D.addClass(ruletip,'hidden');
									};
									
                        			return flg;
                        		}
                        	};
								if(!typelist[self.type]()) return;
								
								//_canjion();
								//提交表单之前的身份2次验证
								
								 //提交信息到action，正式参加活动
								 var getdata=_postdata('dojoin');    
								 //console.log(getdata)
                                 Y.util.Connect.asyncRequest('POST',_urlcut(window.location.href),_doback,getdata);
								
								
                        }, 'input#popup-sub');
                        
                    };
                    
                    //注销事件
                    var _purgeElement=function(){
                          E.purgeElement(self.config.target,true);
                    };
                    
                     //弹出效果
                    var _popup=function(){
                    	var target=D.get(self.config.target);
                        Y.util.popup(self.btn, self.config.target, ['mypopup-close', 'sub-close'])['fire']();
						E.on(['mypopup-close', 'sub-close'],'click',function(){
							D.get(self.config.target).innerHTML="";
						});
                    };
                    //启动第一次弹窗
                    var _fire=function(){
                    	_purgeElement();
                        _typelist[type](self.config);
                        _popup();
						
                    }
                    
					//确认线下活动的回调
					var _joincallback=function(target,constitutor,status,errormsg){
						if(status=='success'){
							var statushtml='<div class="success-icon"></div>',
								title='活动报名成功',
								statusmsg='<p class="ft20 p80">恭喜你，参加活动成功！ </p>'+
								'<p class="p80">请与活动发起者 '+constitutor+' '+
								'<span class="J_WangWang" data-display="inline" data-nick="'+constitutor+'" id="newdog"></span> '+
								' &nbsp;及时联系，以便能够按时顺利地参加活动！</p>'+statushtml;
						}else if(status=='error'){
							var statushtml='<div class="error-icon"></div>',
								title='活动报名失败';
								msg=errormsg,
								statusmsg='<p class="ft35 p80">'+msg+'</p>'+statushtml;
						};
							var formhtml ='<form id="affirmact" class="tacitly-actpopup msg">'+
			                '<div class="act-top">'+
			                '<h3 class="oneline notarize">'+title+'</h3>'+
			                '<s title="关闭" id="mypopup-close">&times;</s></div>'+
							'<div id="affirmact-content" class="content">'+statusmsg+'</div>'+
			                '<div class="act-foot">'+
			                '<input type="button" value="关 闭" class="sub-t" title="关闭" id="sub-close">'+
			                '</div>'+
			                '</form>';
					
						D.get(target).innerHTML = formhtml;
						TB.ww.lightByIcon(D.get('newdog'));
						
						E.on(['mypopup-close', 'sub-close'],'click',function(){
							window.location.reload();
						});
					}
                    
                  //参与报名
					var _creataffirmact=function(target,acttitle,money,actTime,phone,validurl,needCheckcode){
                    	var phoneinput=phone=='true'?'<p>联系电话：<input type="text" id="affirmact-popup-phone" maxlength="20"><span class="error hidden" id="phone-tip"></span></p>':'';
						var Checkcodehtml=needCheckcode=='true'?'<p style="text-indent:12px;"><span class="actcode">验证码：</span><input type="text" id="popup-validCode" maxlength="4"> <img src="' +validurl +
                        '" width="100" height="37" class="J_validCode hidden" id="J_CodeImg"> <span class="sup hidden" id="J_CodeTip">看不清？<a href="" onclick="return false;" class="J_RfreshValidation" target="_blank">换一张</a></span> <span class="error hidden" id="validCode-tip"></span></p>':'';
						var formhtml = '<form id="affirmact" class="tacitly-actpopup msg">'+
		                '<div class="act-top">'+
		                '<h3 class="oneline">活动报名申请：'+acttitle+'</h3>'+
		                '<s title="关闭"  id="mypopup-close">&times;</s>'+
		                '</div>'+
		                '<div id="affirmact-content" class="content">'+
		                '<p class="ft20">活动时间：'+actTime+'</p>'+
		                '<p>人均费用：'+money+' </p>'+phoneinput+Checkcodehtml+
                        '<p class="rule-p"><input type="checkbox" id="popup-rule" checked="checked"> 接受淘宝网<a href="http://bangpai.taobao.com/group/thread/12011-20118749.htm" target="_blank">帮派活动免责协议</a> <span class="error hidden" id="rule-tip"></span></p>'+
                        '</div>'+
		                '<div class="act-foot">'+
		                '<input type="button" value="确定报名" class="sub-f" title="确定报名" id="popup-sub">'+
		                '</div>'+
		                '</form>';
						D.get(target).innerHTML = formhtml;
						_bind();
						if(needCheckcode=="true"){
						TB.widget.InputHint.decorate('popup-validCode', {hintMessage:'点击输入验证码'});
						var img=D.get('J_CodeImg'),tip=D.get('J_CodeTip'),flg=false;
						E.on('popup-validCode','focus',function(){
							D.removeClass(img,'hidden');
							D.removeClass(tip,'hidden');
							if(!flg){
                        	img.src = img.src+"r="+new Date().valueOf();
							flg=true;
							}
						});
						}
					};
                    
					//tips提示
					var _popuptips=function(target,msg){
						var divhtml='<div class="popup-tips">'+
		            		'<div class="tips-top" id="mypopup-close">'+
		            		'<h4>小提示</h4>'+
							'<s title="关闭">&times;</s>'+
							'</div>'+
							'<div class="tips-content"></div>'+
		            	'</div>';
						D.get(target).innerHTML = divhtml;
						D.getElementsByClassName('tips-content','div')[0].innerHTML=msg;
						E.on('mypopup-close','click',function(){
							D.get(target).innerHTML="";
						});
					};
                    
                    return {
                        //初始化
                        intbind: function(){
                            var that = this;
                            E.on(btn, 'click', function(){
								//如果是退出活动的按钮就执行退出的流程
                            	if(D.hasClass(btn,'surrender')){
                            			var msg = "您真的确定要放弃参加活动吗？";
                            			if (confirm(msg)==true){
										//获得的退出活动的post数据
                            				var getdata=_postdata('exit');
											Y.util.Connect.asyncRequest('POST',_urlcut(window.location.href),_exitback,getdata);
                            			}else{
                            				return false;
                            			}
                            	}else{
                            		_canjion();
                            	}
                            });
                        }
                    }
                };
})();