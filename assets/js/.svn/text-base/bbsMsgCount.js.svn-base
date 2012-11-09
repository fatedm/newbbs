KISSY.ready(function(S){
		var D = S.DOM,
			E = S.Event,
			IO = S.IO;
		var msgContainer = D.get('.msg-notice-con'),
			msgNum = D.get('.msg-notice-num'),
			msgLink = D.get('.msg-notice-link'),
			varyTimer,
			ajaxTimer,
			flag = 0,
			URL,
			loc = window.location.href;
		if(loc.indexOf('bbs.taobao.com') !== -1){
			URL = 'http://bbs.taobao.com/json/get_message_count.htm';
		}else{
			URL = 'http://bbs.daily.taobao.net/json/get_message_count.htm';
		}
			
		
		function vary(){
			if(varyTimer) clearInterval(varyTimer);
			varyTimer = setInterval(function(){
				if(D.hasClass(msgContainer, 'msg-notice-red')){
					D.removeClass(msgContainer, 'msg-notice-red');
				}else{
					D.addClass(msgContainer, 'msg-notice-red');
				}
			}, 500)
		}
		
		function getMsgNum(){		
			 S.io({
                dataType:'jsonp',
                url:URL, 
                jsonpCallback:"getMessageCount",    
                success:function (d) {
					if(d.count !== flag){
						if(d.count && d.isLogin){
							flag = d.count;
							D.html(msgNum,'('+d.count+')');
							D.css(msgNum, 'display', 'inline');
							D.attr(msgLink, 'href', 'http://bbs.taobao.com/forum/pc/my_message_list.htm?message_status=0');
							vary();
						}
					}
					if(d.count == 0){
						if(D.hasClass(msgContainer, 'msg-notice-red')){
							D.removeClass(msgContainer, 'msg-notice-red');
						}
						if(varyTimer){clearInterval(varyTimer)};
						D.html(msgNum,'('+0+')');
						D.attr(msgLink, 'href', 'http://bbs.taobao.com/forum/pc/my_message_list.htm');
						D.css(msgNum, 'display', 'none');
					}
                }
            });
		}
		
		function getNumAfter5m(){		
			if(ajaxTimer) clearInterval(ajaxTimer);			
			ajaxTimer = setInterval(function(){
				if(varyTimer) clearInterval(varyTimer);
				if(D.hasClass(msgContainer, 'msg-notice-red')){
					D.removeClass(msgContainer, 'msg-notice-red');
				}
				D.css(msgNum, 'display', 'none');
				getMsgNum();
			}, 60000)
		}
		
		var isLogin = S.Cookie.get('_l_g_') && S.Cookie.get('_nk_') || S.Cookie.get('ck1') && S.Cookie.get('tracknick');
		if(isLogin){
			getMsgNum();
			getNumAfter5m();
		}else{
			if(D.hasClass(msgContainer, 'msg-notice-red')){
				D.removeClass(msgContainer, 'msg-notice-red');
			}
		}
	})