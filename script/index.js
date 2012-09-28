/*异步读取回帖数、浏览数*/
KISSY.add('viewCount', function(S){
	var D = S.DOM,
		E = S.Event;
	var isDaily = location.href.indexOf('bbs.daily.taobao.net') !== -1 ? 1 : 0,
		URL = '../action/json.php';//异步请求地址
		
	function getCatalogAndThreadId(str){
		if(str.indexOf('catalog/thread/') === -1) {throw new Error('URL Illegal');}
		var start = str.indexOf('catalog/thread/'),
			end   = str.indexOf('.htm');
		return str.substring(start + 15, end)
	}
	function getThreadId(str){
		var st = getCatalogAndThreadId(str);
		return st.split('-')[1];
	}
	return S.ViewCount = {
		init : function(){
			var hotImgs = D.query('.J_Reply'),
				that = this;				
			this.catalogAndThreadIds = [];//异步发送给服务器的数据
			S.each(hotImgs, function(item){
				var url = D.attr(item, 'href'),	
					parent = D.hasClass(D.parent(item), 'post-reply') ? D.parent(item) : 0,				
					catalogAndThreadId = getCatalogAndThreadId(url),
					threadId = getThreadId(url);
					
				item.id = 'reply' + threadId;
				
				if(parent){
					var view = D.get('.J_View', D.prev(parent, '.post-view'));
					view.id = 'view' + threadId;
				}
				
				that.catalogAndThreadIds.push(catalogAndThreadId);
			})
			this.ajax();
		},
		ajax : function(){
			var that = this;
			S.io({
				dataType : 'jsonp',
				url : URL, 
				jsonpCallback : "callback",  
				data : {threadIds : that.catalogAndThreadIds + ''},
				success: function(d) {					
					if(!d.status) return;	
					var i, j,
						infos = d.data,
						infoId, elId,
						replyEl, viewel,
						replyNum, viewNum;
					for(i = 0, j = infos.length; i < j; i++){
						infoId = infos[i]['id'];
						replyEl = D.get('#reply' + infoId);
						if(!replyEl) return;
						replyNum = infos[i]['reply'];
						if(D.get('#view' + infoId)){
							viewEl = D.get('#view' + infoId);						
							viewNum = infos[i]['view'];					
							D.html(viewEl, viewNum);
							D.html(replyEl, replyNum);
						}else{							
							D.html(replyEl, replyNum + '跟贴');
						}
						
					}					
				}
			});
		}
	}	
})
KISSY.add('ie6Hover', function(S){
	var D = S.DOM,
		E = S.Event,
		isIE6 = S.UA.ie === 6 ? 1 : 0;
	function IE6Hover(cls, hover){
		if(!isIE6) return;
		var lists = D.query('.' + cls);
		
		S.each(lists, function(item){
			E.on(item, 'mouseenter mouseleave', function(e){
				if(e.type === 'mouseenter'){
					D.addClass(item, hover)
				}else{
					D.removeClass(item, hover);
				}
			})
		})
		
	}
	return S.IE6Hover = IE6Hover;
})


	

KISSY.use('switchable, viewCount,  ie6Hover', function(S, Switchable, ViewCount, IE6Hover){
	S.ready(function(){
		new S.Tabs('#J_Slide', {
			navCls: 'slide-nav',
			contentCls: 'slide-content',
			aria:false
		});
		S.IE6Hover('hot-list', 'hot-list-hover');
		S.ViewCount.init();
	})
	
})
