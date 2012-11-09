/**
 * @author ck0123456@gmail.com
 * @date 2011-11-11
 */
(function(S) {
	var D = S.DOM, E = S.Event;
	
	// 搜索框
	var form = document.forms['g_search_form'],
	keyword = D.get('#keyword');
	form && E.on(form, 'submit', function(ev) {
		if (!keyword.value.replace(/(^\s+)|(\s+$)/g, '')) {
			alert("关键字不能为空!");
			keyword.focus();
			ev.halt();
		} else {
			form.action = '/search/searchThreadList.htm';
		}
	});

	// 发表按钮
	Number(S.UA.ie) === 6 && E.on('#J_PublishButton', 'mouseenter mouseleave', function(evt) {
		D[(evt.type === 'mouseenter' ? 'add' : 'remove') + 'Class'](this, 'hover');
	});

	// 公告数据拉取
	if (D.val('#J_FirstPageFlag') === 'true') {
		var posts = D.get('.posts'),
		fillCells = function(cells) {
			var tongzhiLink = D.attr(D.get('a', cells[0]), 'href'),
			regResult = /(\d+)\-(\d+)\.htm/.exec(tongzhiLink);
			if (!(regResult && regResult[1] && regResult[2])) {
				return;
			}
			S.io.get('/json/getThreadToBulletinBoard.htm', {
				'groupId' : regResult[1],
				'threadId' : regResult[2],
				'_' : new Date().getTime()
			}, function(data) {
				data = eval('(' + data + ')');
				if (data.success) {
					data = data.data[0];
				} else {
					return;
				}
				var replyCount = Number(data.replyCount),
				viewCount = Number(data.viewCount);
				
				cells[1].className = 'later';
				cells[1].innerHTML = '' +
				'<div class="ext-user-logo">' +
					'<a href="' + data.authorUrl + '" title="' + data.authorNick + '" target="_blank">' +
						'<img src="' + data.picUrl + '" width="20" height="20"/>' +
					'</a>' +
				'</div>' +
				'<div class="info">' +
					'<div class="name">' +
						'<a href="' + data.authorUrl + '" title="' + data.authorNick + '" target="_blank" class="ext-ellipsis">' +
							data.authorNick +
						'</a>' +
					'</div>' +
					'<div class="time">' + data.gmtCreate + '</div>' +
				'</div>';
				
				cells[2].className = 'score';
				cells[2].innerHTML = '' +
				(replyCount >= 100 ? '<em class="reply">' : '<em>') + replyCount + '</em>/' +
				(viewCount >= 1000 ? '<em class="view">' : '<em>') + viewCount + '</em>';
				
				cells[3].className = 'last';
				cells[3].innerHTML = '' +
				'<div class="info">' +
					'<div class="name ext-ellipsis">' +
						'<a href="' + data.replyAUrl + '" title="' + data.lastReplyAuthorNick + '" target="_blank" class="ext-ellipsis">' +
							data.lastReplyAuthorNick +
						'</a>' +
					'</div>' +
					'<div class="time">' + data.lastReplyTime + '</div>' +
				'</div>';
			});
		};
		if (posts) {
			for (var rows = posts.rows, inRange = false, i = 0; i < rows.length; i++) {
				if (inRange && !D.hasClass(rows[i].cells[0], 'bulletin')) {
					break;
				} else if (!(inRange = D.hasClass(rows[i].cells[0], 'bulletin'))) {
					continue;
				} else {
					fillCells(rows[i].cells);
				}
			}
		}
	}

	// 侧边栏数据拉取
	var queryFireThreads = function(ul, type, mockup) {
		ul && S.io.get('/outer/fire_thread.htm', {
			'market_id' : D.val('#J_MarketId'),
			'size' : 5,
			'type' : type,
			'day' : type === 'view' ? 14 : 30,
					'_' : new Date().getTime()
		}, function(data) {
			!mockup && (mockup = '' +
			'<li>' +
				'<span class="ext-tahoma">{index}</span>' +
				'<span class="ext-gray">&nbsp;|&nbsp;</span>' +
				'<a href="{href}" class="ext-ellipsis" title="{title}" target="_blank">{title}</a>' +
			'</li>');
			for (var html = '', i = 0; i < data.length; i++) {
				html += mockup.replace(/\{[^\}]+\}/g, function(placeholder) {
					switch (placeholder) {
					case '{index}': return i + 1;
					case '{href}': return data[i].threadUrl;
					case '{title}': return data[i].threadSub;
					default: return '';
					}
				});
			}
			ul.innerHTML = html;
		});
	},
	mockup = D.html('#J_Mockup');
	queryFireThreads(D.get('#J_ViewFireThreads'), 'view', mockup);
	queryFireThreads(D.get('#J_ReplyFireThreads'), 'reply', mockup);

	// 子频道导航 IE 6 7 8 圆角
	if(!!S.UA.ie && S.UA.ie < 9){
		var subChannel = D.get('.J_SubChannel'),
		initChannel;
		if (subChannel) { // 有些页面没有子频道导航
			initChannel = D.children(subChannel, '.ext-sub-channel-selected')[0];
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
	}

	// 图片集预览
	if (D.val('#J_PictureSetPreview') === 'true') {
		S.use('anim', function() {
			var timeout = null,
			overlay = null,
			previewImg = null,
			show = function(status) {
				if (!overlay) { // 初始化
					var previewCon = null,
					overlayInner = D.create('<div class="ext-preview">');
					D.append(D.create('<s>'), overlayInner);
					D.append(previewCon = D.create('<p>'), overlayInner);
					D.append(previewImg = D.create('<img src="' + status.src + '">'), previewCon);
					D.append(overlayInner, overlay = D.create('<div class="ext-preview-wrap hidden">'));
					D.css(overlay, {
						'left' : status.x + 'px',
						'top' : status.y + 'px'
					});
					E.on(overlay, 'click', function() {
						window.open(overlay.getAttribute('data-url'), '_blank');
					});
					overlay.setAttribute('data-url', status.link);
					D.append(overlay, D.get('body'));
					delayShow();
				} else if (previewImg.getAttribute('src') !== status.src) { // 不同对象
					previewImg.setAttribute('src', status.src);
					overlay.setAttribute('data-url', status.link);
					S.Anim(overlay, {
						'left' : status.x + 'px',
						'top' : status.y + 'px'
					}, 0.5, 'easeBoth', function() {
						delayShow();
					}).run();
				} else if (D.hasClass(overlay, 'hidden')) { // 同一对象但已经隐藏
					delayShow();
				} else { // 同一对象延迟消失
					delayHide();
				}
			},
			delayShow = function() {
				timeout && clearTimeout(timeout);
				timeout = setTimeout(function() {
					overlay && D.removeClass(overlay, 'hidden');
					delayHide();
				}, 200);
			},
			delayHide = function() {
				timeout && clearTimeout(timeout);
				timeout = setTimeout(function() {
					overlay && D.addClass(overlay, 'hidden');
				}, 2000);
			};
			E.on('#J_Posts a', 'mouseover mouseout', function(evt) {
				var pic = this.getAttribute('data-pic');
				if (pic) {
					if (evt.type === 'mouseout') {
						delayHide();
					} else {
						var offset = D.offset(this);
						show({
							'x' : offset.left + 120,
							'y' : offset.top + 10,
							'src' : pic,
							'link' : this.href
						});
					}
					evt.halt();
				}
			});
		});
	}

	// 图片集瀑布
	if (window['_waterfall_']) {
		S.use('waterfall', function() {
			window['_waterfall_'].obj = new S.Waterfall({
				'container' : window['_waterfall_'].container,
				'minColCount' : 3,
				'effect' : 'fadeIn',
				'colWidth' : 250
			});
		});

		// ie 6 7 下分页marginTop丢失的临时解决方案
		if (Number(S.UA.ie) === 6 || Number(S.UA.ie) === 7) {
			D.query('.pagination').pop().style.paddingTop = '10px';
		}
	}

	// 模拟hash定位
	S.ready(function(S) {
		if (location.hash === '#ThreadList') {
			var loaded = window['locate2Tab'] = function() {
				var e = S.DOM.get('.J_Tab'),
				y = e.offsetTop;
				while(e = e.offsetParent) {
					y += e.offsetTop;
				}
				(navigator.userAgent.indexOf('Safari') > -1 ? document.body : (document.documentElement || document.body)).scrollTop = y;
			};
			window.attachEvent ? window.attachEvent('onload', loaded) : window.addEventListener('load', loaded, false);
		}
	});

	// 错误信息
	var errorMessage = D.get('#J_ErrorMessage');
	if (errorMessage) {
		alert(errorMessage.value);
	}

})(KISSY);