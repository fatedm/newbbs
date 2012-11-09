/**获取消息数量并展示
 * author:fatedm
 * date:2012-2-2
 * */
KISSY.ready(function(S){
		
    	var D = S.DOM,
    		E = S.Event,
    		IO = S.IO;
		var isLogin = S.Cookie.get('_l_g_') && S.Cookie.get('_nk_') || S.Cookie.get('ck1') && S.Cookie.get('tracknick');
		var URL,
			loc = window.location.href;
		if(loc.indexOf('bbs.taobao.com') !== -1){
			URL = 'http://bbs.taobao.com/json/get_message_count.htm';
		}else{
			URL = 'http://bbs.daily.taobao.net/json/get_message_count.htm';
		}
    	function messageCount(){
			 S.io({
                dataType:'jsonp',
                url:URL, 
                jsonpCallback:"getMessageCount",    
                success:function (d) {
					
                	  if(d.count && d.isLogin){
					
                    	var container = D.get('.msg-tip'),
    					html = ['<s></s><a target="_blank" class="msg-link" href="http://bbs.taobao.com/forum/pc/my_message_list.htm?message_status=0">您有<b>', '</b>条新的消息，请注意查收</a><span class="msg-tip-close"></span>'],
    				    str = html[0] + d.count + html[1];
						D.css(container, 'display', 'block');
	    				D.html(container, str);	
	    				var close = D.get('.msg-tip-close'),
	    					link = D.get('.msg-link');
	    				function linkClick(){
	    					D.css(container, 'display', 'none');
	    				}
	    				E.on(close, 'click', function(){
	    					D.html(container, '');
							D.css(container, 'display', 'none');
							E.detach(close, 'click', arguments.callee);
							E.detach(link, 'click', linkClick);
	    				})
	    				
	    				E.on(link, 'click', linkClick);
        			}
                }
            });
			
			
    	}
	
		if(isLogin){
			messageCount();
			S.later(function(){
        		messageCount();
        	}, 60000, true, null)
		}
    	
	})