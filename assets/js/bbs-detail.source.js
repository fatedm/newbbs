KISSY.app('Detail');
/**
 * @修复ie6不支持hover的问题 
 * @author hanyan.slx sunlixu@163.com
 */
Detail.add('fixHover', function(Detail) {

	/**
	 * 修复 ie6 不支持 hover 的问题.
	 * @param { HTMLelement } el 需要修复的节点或者节点 list,
	 * @param parentNode给父节点添加class phover,主要用在用户头像一处
	 */
	function fixHover(el,parentNode) {
		var S = KISSY;
		if (el) {
			S.Event.on(el, 'mouseenter mouseleave', function(ev) {
				var type = 'mouseenter' === ev.type ? 'add' : 'remove';
				S.DOM[type + 'Class'](ev.target, 'hover');
				if(parentNode)
					S.DOM[type + 'Class'](S.DOM.parent(ev.target,parentNode), 'phover');
			});
		}
	}

	return Detail.fixHover = fixHover;
});

/**
 * 助威
 */
Detail.add("zhuwei",function(B){
	var D = KISSY.DOM, E = KISSY.Event;
	E.on(".J_zhuweiBtns","click",function(ev){
		ev.halt();
		var url = D.attr(ev.target,"data-url");
		Detail.overlay.showDialog({
			'src' : url,
			'width' : 345,
			'headerContent' : '助威'
		});
	});
});

/**
 * 添加成功返回的操作
 */
Detail.add("zhuwei_success",function(Detail){
	var D = KISSY.DOM, E = KISSY.Event;
	function zhuweiSuccess(data){
		zhuweiSuccessAction(data, data.zhuweiId);
		if(D.get('#' + data.zhuweiId + '-top')){
			zhuweiSuccessAction(data, data.zhuweiId + '-top');
		}
	}
	/*解决置顶回复内容后页面存在重复id*/
	function zhuweiSuccessAction(data, zhuweiId){
		var cur_list = D.get('#'+ zhuweiId + ' .J_zhuweiList');
		if(!cur_list) return;
		var cur_table = D.get('#'+ zhuweiId + ' .J_zhuweiTables');
		if(!cur_table) return;
		var zw_sum = D.get('#'+ zhuweiId + ' .zhuweicounts');

		var rows = D.query("tr",cur_table),maxrow;
		D.css(cur_list,"display","block");

		if(data.zhuweiId == 'replay0'){
			maxrow = 5;
		}else{
			maxrow = 3;
		}
		
		if(rows.length >= maxrow) {
			cur_table.deleteRow(maxrow - 1);
		}

		if(rows.length==0){
			var newRow = cur_table.insertRow(0);
			newRow.insertCell(0).className="username";
			newRow.insertCell(1);
			newRow.insertCell(2).className="content";
		}else{
			var newRow = rows[0].cloneNode(true);
			rows[0].parentNode.insertBefore(newRow,rows[0]);
		}

		if(data.coin>0){				
			newRow.cells[1].className="plus";
		}else{
			newRow.cells[1].className="neg";
		}

		newRow.cells[0].innerHTML="<a target='_blank' href='"+data.userCenterLink+"'>"+data.username+"</a>";
		newRow.cells[1].innerHTML="<s></s>"+data.coin;
		newRow.cells[2].innerHTML=data.content;

		zw_sum.innerHTML = zw_sum.innerHTML*1 + data.coin*1;
		Detail.overlay.hide();
		//D.get("content").className='';
		//window.location.replace(TB.common.parseUri(location.href)["prePath"]+TB.common.parseUri(location.href)["path"]+'?t='+Math.random()+'#'+data.zhuweiId);
	}
	return Detail.zhuweiSuccess = zhuweiSuccess;
});

/**
 * 收藏帖子
 */
Detail.add('collect',function(Detail){
	var url = KISSY.DOM.attr('#J_collection', 'data-url');
	if(!url) return;
	KISSY.Event.on('#J_collection', 'click', function(ev) {
		ev.halt();
		Detail.overlay.showDialog({
			'src' : url,
			'width' : 345,
			'headerContent' : '收藏'
		});
	});
});

/********************************************************************
 * 投票模块
 * 
 * @author ck0123456@gmail.com
 * @date 2011-10-31
 ********************************************************************/
Detail.add('vote', function() {

	var S = KISSY, D = S.DOM, E = S.Event,
	getCheckedNumber = function(list) { // 获取选中投票项的个数
		for (var sum = 0, i = 0, l = list.length; i < l; i++) {
			list[i].checked && sum++;
		}
		return sum;
	},
	voteUrl = function(href){ // 要提交的表单数据
		var params = '', node, i, l, t,
		nodes = document.getElementById('choiceForm').getElementsByTagName('*');
		for (i = 0, l = nodes.length; i < l; i++) {
			node = nodes[i];
			if (node.name) {
				t = node.type && node.type.toLowerCase();
				if (t === 'checkbox' || t === 'radio') {
					if (!node.checked) {
						continue;
					}
				}
				params += '&' + node.name + '=' + node.value;
			}
		}
		return href + '?' + params.substring(1);
	};

	/**
	 * 初始化方法
	 * @param num 最多投票数
	 * @param href 投票url
	 */
	Detail['vote'] = function(num, href) {
		var list = D.query('#J_vote input'), timestamp = 0;
		
		E.on(list, 'click', function() { // 验证不超过最多投票数
			if (getCheckedNumber(list) > num) {
				this.checked = false;
				alert('最多只能选择' + num + '项');
			}
		});
		
		E.on('#J_submit', 'click', function(evt) { // 点击投票按钮
			evt.halt();
			var now = new Date().getTime();
			if (now - timestamp < 2000) {
				return;
			}
			timestamp = now;
			if (getCheckedNumber(list) === 0) {
				alert('嗨，你到底投票给哪一项呀？');
			} else {
				Detail.overlay.showDialog({
					'src' : voteUrl(href),
					'width' : 345,
					'headerContent' : '投票'
				});
			}
		});
	};
});

/********************************************************************
 * 浮层包装
 * 
 * @author ck0123456@gmail.com
 * @date 2011-10-31
 ********************************************************************/
Detail.add('overlay', function(overlay) {
	
	var S = KISSY, D = S.DOM,
	_dialog, _overlay, _isMessageShow;

	overlay = overlay['overlay'] = {
		
		/**
		 * 显示对话框
		 * 
		 * @param cfg {src:框架的路径,width:对话框宽度,headerContent:对话框标题}
		 */
		'showDialog' : function(cfg) {
			cfg = cfg || {};
			S.use('overlay,dd', function() {
				if (!_dialog) {
					_dialog = new S.Dialog({
						'width' : cfg.width || 345,
						'headerContent' : cfg.headerContent || '',
						'bodyContent' : '<iframe id="dialogFrm" src="' + cfg.src + '" width="' + (cfg.width - 2 || 343) + '" height="250" frameborder="0" scrolling="no"></iframe>',
						'draggable': true,
						'mask': true,
						'zIndex': 10003
					});
					_dialog.render();
				} else {
					D.attr('#dialogFrm', 'src', cfg.src);
					if (cfg.width) {
						_dialog.set('width', cfg.width);
						D.attr('#dialogFrm', 'width', cfg.width - 2);
					}
					cfg.headerContent && _dialog.set('headerContent', cfg.headerContent);
				}
				overlay.hide();
				setTimeout(function() {
					if (!_isMessageShow) { // 有消息浮层的时候禁止对话框弹出
						overlay.hide();
						_dialog.center();
						_dialog.show();
					}
				}, 500);
			});
		},
		
		/**
		 * 隐藏当前浮层
		 */
		'hide' : function() {
			_dialog && _dialog.hide();
			_overlay && _overlay.hide();
		},
		
		/**
		 * 显示浮层消息
		 * 
		 * @param html 浮层内容
		 * @param delay 延时毫秒
		 * @param reload 是否刷新页面
		 */
		'showMessage' : function(html, delay, reload) {
			S.use('overlay,dd', function() {
				if (!_overlay) {
					if (6 === S.UA.ie) {
						_overlay = new S.Overlay({
							'width' : 360
						});
					} else {
						_overlay = new S.Overlay();
					}
					_overlay.render();
					_overlay.get('contentEl').addClass('msg24');
				}
				_overlay.get('contentEl').html(html);
				overlay.hide();
				_overlay.center();
				_overlay.show();
				_isMessageShow = true;
				delay && setTimeout(function() {
					overlay.hide();
					reload && (location.href = location.href.split('#')[0]);
					_isMessageShow = false;
				}, delay);
			});
		},

		/**
		 * 设置窗口宽度
		 * 
		 * @param width 宽度
		 */
		'setWidth' : function(width) {
			if (_dialog) {
				_dialog.set('width', width);
				D.attr('#dialogFrm', 'width', width - 2);
				_dialog.center();
			}
		},
		'setHeight' : function(height) {
			if (_dialog) {
				_dialog.set('height', height);
				D.attr('#dialogFrm', 'height', height - 2);
				_dialog.center();
			}
		}
	};
});

/********************************************************************
 * 根据页面元素来初始化相应的模块
 ********************************************************************/
(function() {
	var S = KISSY, D = S.DOM,
	jVote = D.get('#J_vote'),
	maxAnswer, url;
	if (D.attr(jVote, 'data-votable') === 'true') {
		maxAnswer = D.attr(jVote, 'data-maxanswer');
		url = D.attr(jVote, 'data-url');
		Detail.vote(maxAnswer, url);
	}

	if (6 === S.UA.ie) {
		Detail.fixHover(D.query(".J_userHead"),".user-info");
		Detail.fixHover(D.get("#J_publish"));
		Detail.fixHover(D.query(".J_sort"));
	}
})();


/********************************************************************
 * 图片懒加载
 ********************************************************************/
KISSY.use('datalazyload', function(S) {
	new S.DataLazyload({ mod: 'auto' });
},{order:true});


/********************************************************************
 * 删除帖子与回复
 ********************************************************************/
function deleteThread(){
	if(window.confirm('你确认要删除该帖子？删除之后不能恢复哦！')){
	    var form = KISSY.DOM.get("#deleteThreadForm");
	    form.submit();
    }
}
function sinkThread(){
    var form = KISSY.DOM.get("#sinkThread");
    form.submit();
}
function floatThread(){
    var form = KISSY.DOM.get("#floatThread");
    form.submit();
}
 function deleteReply(replyId){
     if(window.confirm('你确认要删除该回复？删除之后不能恢复哦！')){
         var form = KISSY.DOM.get("#replyForm");
         form.replyId.value=replyId;
         form.submit();
     }
 }
 
 

 /********************************************************************
  * 显示图片白名单
  ********************************************************************/

	KISSY.ready(function(S) {
		var D = S.DOM, E = S.Event, e,
		replyAreas = D.get('#J_FastReply') ? [] : D.query('.replyArea');
		e = D.get('#quick_hf');
		e && replyAreas.push(e);
		e = D.get('#topreply');
		e && replyAreas.push(e);
		E.on(replyAreas, 'click', function(e) {
			window.location.href = '#publishreply';
			e.halt();
		});
		var wl = D.attr('#whitelist', 'value'), imgs;
		if (wl) {
			wl = wl.split('_');
			S.use('sizzle', function() {
				S.each(D.query('.substance img'), function(img) {
					try {
						var src = D.attr(img, 'src') || D.attr(img, 'data-ks-lazyload'),
						domain = src.split('/')[2].split(':')[0],
						isFit = false;
						S.each(wl, function(w) {
							if (domain.substring(domain.length - w.length) === w) {
								isFit = true;
								return false;
							}
						});
						if (!isFit) {
							D.attr(img, {
								'src' : 'http://img07.taobaocdn.com/tps/i7/T1aoxtXhtCXXXXXXXX-170-120.jpg',
								'width' : 170,
								'height' : 120
							});
							D.css(img, 'display', 'inline');
						}
					} catch (e) {}
				});
			});
		}
	});
	
	
	

	 /********************************************************************
	  * IE 6 7 8 圆角
	  ********************************************************************/
	
	(function(){
		if(!!KISSY.UA.ie && KISSY.UA.ie < 9){
			var S = KISSY, D = S.DOM, E = S.Event,
			subChannel = D.get('.J_SubChannel'),
			initChannel;
			if (!subChannel) { // 有些页面没有子频道导航
				return;
			} else {
				initChannel = D.children(subChannel, '.ext-sub-channel-selected')[0];
			}
			S.each(D.children(subChannel, 'a'), function(item) {
				var cornerLeft = D.create('<span>'),
				cornerRight = D.create('<span>');
				D.css(item, 'position', 'relative');
				D.addClass(cornerLeft, 'ext-channel-item-l');
				D.append(cornerLeft, item);
				D.addClass(cornerRight, 'ext-channel-item-r');
				D.append(cornerRight, item);
			});
			E.on(subChannel, 'mouseover', function(ev) {
				if (ev.target.tagName.toLowerCase() === 'a' && ev.target !== initChannel) {
					D.addClass(ev.target, 'ext-sub-channel-selected');
				}
			});
			E.on(subChannel, 'mouseout', function(ev) {
				if (ev.target.tagName.toLowerCase() === 'a' && ev.target !== initChannel) {
					D.removeClass(ev.target, 'ext-sub-channel-selected');
				}
			});
		}
		
	})();
//盖楼
KISSY.add('citation', function(S){
	var D = S.DOM,
		E = S.Event,
		$ = S.Node.all;
	function Citation(cls){
		this.trigger = D.query(cls);		
		this.init();
		
	}
	S.augment(Citation, {
		init : function(){
			this.click();
		},
		
		click : function(){
			if(!this.trigger.length) return;
			S.each(this.trigger, function(item){
				E.on(item, 'click', function(){					
					var sup = D.parent(D.parent(item, 'p'), 2),
						ori =  D.next(sup, '.citation')
					D.remove(sup);
					D.css(ori, 'display', 'block');
				})
			})
		}
	})
	S.ready(function(S){
		new Citation('.slide-citation');
	})
	return Citation;
})
KISSY.add('fixed', function(S){
    var D = S.DOM,
        E = S.Event;
    function Fixed(id){
        if(!D.get(id)) return;
		E.on(D.get(id), 'click', function(e){			
			e.preventDefault();
			window.scroll(0, 0);
		})
        if (S.UA.ie != 6){
            E.on(window, 'scroll resize', function(){
                var scrollTop = D.scrollTop();

                if(scrollTop > 10){
                    D.css(id, 'display', 'block');
                }else{
                    D.css(id, 'display', 'none');
                }
            });
            return;
        }
        var el = D.get(id),
            conHeight = D.height('#content'),
            winHeight = D.viewportHeight(),
            offset = D.offset('#content'),
            offsetH = offset.top,
            top = winHeight - offsetH -115,
            start = conHeight - top;

        D.css(el, 'bottom', start);
        E.on(window, 'scroll resize', function(){
            var scrollTop = D.scrollTop();
            if(scrollTop > 10){
                D.css(el, 'display', 'block');
                var t = start - D.scrollTop();
                t = t > -217 ? t : -217;
                D.css(el, 'bottom', t + 'px');
            }else{
                D.css(el, 'display', 'none');
            }
        })
    }
	S.ready(function(S){
		Fixed('#toTop');
	})
    return Fixed;
});
/*sns 分享组件*/
try{
	SNS.ui("sharebtn",{"element":"#sns-widget-sharebtn","skinType":"2", "title": "淘宝论坛","app_id":"12076894", "comment": document.title});
	//SNS.ui("sharebtn",{"skinType":"2","title":"dfdf","element":"#sns-widget-sharebtn"})
}catch(e){};
KISSY.add('tag', function(S){
	var D = S.DOM,
		E = S.Event,
		isIE6 = S.UA.ie === 6 ? 1 : 0;
	function Tag(){
		if(!D.get('#tags-edit')) return;
		this.init();
	}
	S.augment(Tag, {
		allTags: [],//从tms获取的所有的标签列表
		exitTags: [],//同tms比较后保留的标签
		init: function(){
			this.getAllTags();
			this.getExitTags();
			this.render();			
			this.editStart();
			this.click();
			this.submit();
		},
		getAllTags: function(){
			var that = this;
			
			if(!D.get('#tms-tags p')) return;
			S.each(D.query('#tms-tags p'), function(item){
				
				that.allTags.push(D.html(item));
			});
			
		},
		getExitTags: function(){
			var con = D.get('.the-tags'),
				links = D.query('a', con) || [],
				_i, _l = this.allTags.length,
				that = this;
			
			if(!_l || !links.length) {
				D.hide(con);
				return;
			}
			S.each(links, function(item){
				var _html = D.html(item);
				for(_i = 0; _i < _l; _i++){
					if(_html == that.allTags[_i]){
						that.exitTags.push(_html);
					}
				}
			})
			D.val('#J_Tags', that.exitTags.join(' '))
		},
		editStart: function(){
			if(!D.get('.tags-edit-trigger')) return;
			var that = this;
			E.on(D.get('.tags-edit-trigger'), 'click', function(){
				if(D.css('#tags-edit', 'display') === 'block'){
					D.css('#tags-edit', 'display', 'none')
				}else{
					if(!that.allTags.length) {
						alert('TMS引入失败');
						return;
					}
					D.css('#tags-edit', 'display', 'block');
				}
			})
		},
		render: function(){
			var con = D.get('#tags-edit .tags-edit-box'),
				html = '',
				nonExit = [],
				exitTags = this.exitTags,								
				allTags = this.allTags;
			if(allTags.length == 0){
				return;
			}
			if(!exitTags.length ){
				nonExit = allTags;
			}else{
				for(var m = 0, mLen = allTags.length; m < mLen; m++){
					for(var n = 0, nLen = exitTags.length;  n < nLen; n++){
						if(exitTags[n] == allTags[m]){
							break;
						}else{
							if(n == (nLen - 1)){
								nonExit.push(allTags[m]);
							}
						}
					}
				}
				for(var _i = 0, _len = this.exitTags.length; _i < _len; _i++){
					html += '<span class="selected">' + exitTags[_i] + '</span>'
				}
			}
						
			for(var j = 0, len = nonExit.length; j < len; j++){
				html += '<span>' + nonExit[j] + '</span>';
			}
			D.html(con, '');
			D.html(con, html);
		},
		click: function(){
			var el = D.get('#tags-edit .tags-edit-box'),
				that = this;
			E.on(el, 'click', function(e){
				var tar = e.target;
				if(tar.nodeName.toLowerCase() === 'span'){
					
					try{
						var len = D.query('#tags-edit .selected').length;
					}catch(e){
						var len = 0;
					}					
					if(D.hasClass(tar, 'selected')){
						D.removeClass(tar, 'selected');
					}else{
						if(len == 5){
							alert('最多只能5个标签');
							return;
						};
						D.addClass(tar, 'selected');
					}
					that.synchro();
				}
			})
		},
		synchro: function(){
			var input = D.get('#J_Tags'),
				val = '';
			try{	
				S.each(D.query('#tags-edit .tags-edit-box span'), function(item, index){
					if(D.hasClass(item, 'selected')){				
						if(index == 0){
							val = D.html(item);
						}else{
							val += ' ' + D.html(item);
						}
					}
				})
				D.val(input, val);
			}catch(e){
				return;
			}
		},
		submit : function(){
			var btn = D.get('.J_TagsSubmit'),
				form = D.get('#tagsForm');
			E.on(btn, 'click', function(){
				if(isIE6){
					setTimeout(function(){
						form.submit();
					}, 0)
				}else{
					form.submit();
				}
			});
		}
	})
	S.ready(function(S){
		new Tag();
	})
	return S.Tag = Tag;
})
/**
 *论坛detail页盖楼优化：
 *1.后台盖楼消耗过大，改为由前端控制展现盖楼。
 *2.实现本页内超过10层以上的盖楼显示压缩为首尾+点击展开按钮形式，节约页面。
 *3.页面内有可能出现同样的内容（在第一页内被置顶）
 */
KISSY.add('floor', function(S){
	var D         	= S.DOM,
		E 			= S.Event,
		TPL_START 	= '<div class="citation">',
		TPL_END   	= '</div>',
		TPL_TITLE 	= ['<div class="citation-title clearfix"><span class="user-name">原帖由', '楼 ', ' 发表</span><span class="citation-number">', '</span></div>'];
	S.Floor 	= {
		reply : null,
		init : function(re){
			if(!re) return;
			this.reply=re;
			this.floorReply = this.reply.floorReply;
			if(!this.floorReply.length) return;
			var i, j;
			for(i = 0, j = this.floorReply.length; i < j; i++){
				this.render(i);
			}
		},
		render : function(k){
			var o = this.floorReply[k],
				isTop = o.isTop;//是否是被置顶的回复
			if(!!o.isRepeat){
				this.createRepeat(k, isTop);
			}else{
				this.create(k, isTop);
			}
			
		},
		createRepeat : function(k, isTop){
			if(this.floorReply[k].replies.length == 0) return;
			var bd 			= isTop ?  D.get('#rt' + this.floorReply[k].replyId) : D.get('#r' + this.floorReply[k].replyId),
				i, 
				replies 	= this.floorReply[k].replies,
				j 			= replies.length,
				slideBtn 	= '<p class="slide-ci"><span class="slide-citation" 	onclick="KISSY.Floor.create(' + 
								k  + 
								',' + 
								isTop + 
								')" >展开更多楼层<s></s></span></p>',
				_title_0 	=  	TPL_TITLE[0] + 
								replies[j-1].floor + 
								TPL_TITLE[1] + 
								replies[j-1].nick + 
								TPL_TITLE[2] + 
								j + 
								TPL_TITLE[3],
				_bd_0    	=  	replies[j-1].detail,
				_title_end 	= 	TPL_TITLE[0] + 
								replies[0].floor + 
								TPL_TITLE[1] + 
								replies[0].nick + 
								TPL_TITLE[2] + 
								1 + 
								TPL_TITLE[3],
				_bd_end 	= 	replies[0].detail,
				_html 		= 	TPL_START +
									TPL_START + 
										TPL_START +
											_title_end + 
											_bd_end + 
										TPL_END + 
										slideBtn + 
									TPL_END + 
									_title_0 + 
									_bd_0 + 
								TPL_END;

				D.html(bd, _html);		
				
		},
		create : function(k, isTop){
			if(this.floorReply[k].replies.length == 0) return;
			var bd = isTop ? D.get('#rt' + this.floorReply[k].replyId) : D.get('#r' + this.floorReply[k].replyId),
				i, j,
				replies = this.floorReply[k].replies,
				len = replies.length,
				title,
				content,
				end,
				_arr = [],
				html;
			for( i = (len - 1); i >= 0; i--){
				title 	= 	TPL_TITLE[0] + 
							replies[i].floor + 
							TPL_TITLE[1] +  
							replies[i].nick + 
							TPL_TITLE[2] + 
							(i + 1) + 
							TPL_TITLE[3];								
				content = 	replies[i].detail;				
				end 	= 	TPL_END;
				
				if(i == (len - 1)){
					_arr = [TPL_START, title, content,end];									
				}else{
					_arr.splice((len - i -1), 0, TPL_START, title, content, end);					
				}
				
			}
			html = _arr.join('');
			D.html(bd, '');
			D.html(bd, html);			
		}
	}
	try {
		if(REPLY === undefined || !REPLY){return;}
		S.Floor.init(REPLY);
	}catch(e){};
})
KISSY.ready(function(S){
	var D = S.DOM;
	/*解决头像悬浮层被下方头像盖住*/
	var detailPosts = D.query('.detail-post');
	for(var i = 0, len = detailPosts.length; i < len; i++){
		D.css(detailPosts[i], 'z-index', 50 - i)
	}
})
