/**
 * 宠物市场论坛帖子列表页个性化功能
 * @author ck0123456@gmail.com
 */
(function(S, D, E, L) {
	var boardList = D.get('.J_BoardList'),
	catalogId = D.val('#J_CatalogId'),
	boardId = D.val('#J_BoardId'),
	pathname = location.pathname.split('/');
	pathname = pathname[pathname.length - 1].replace(/(\-\-\d+)?\.htm/, '.htm');
	S.each(D.query('#J_Clubs li'), function(club) {
		var link = club.getElementsByTagName('a')[0];
		if (link.href && link.href.indexOf(pathname) > 0) {
			D.addClass(club, 'current');
			E.on(link, 'click', function(evt) {
				evt.halt();
				window['locate2Tab'] && window['locate2Tab']();
			});
			return false;
		}
	});
	if (boardList && L) {
		var i, j, hit,
		children = D.children(boardList),
		storage = L.getItem('bbs_catalog'),
		storageObj = {};
		if (storage) {
			storage = storage.split(';');
			for (i = 0, hit = false; i < storage.length; i++) {
				storage[i] = storage[i].split(',');
				storageObj[storage[i][0]] = [];
				for (j = 1; j < storage[i].length; j += 2) {
					if (storage[i][0] == catalogId && storage[i][j] == boardId) {
						hit = true;
						storageObj[storage[i][0]].push({
							'id' : storage[i][j],
							'time' : '' + new Date().getTime()
						});
					} else {
						storageObj[storage[i][0]].push({
							'id' : storage[i][j],
							'time' : storage[i][j + 1]
						});
					}
				}
			}
		}
		!storageObj[catalogId] && (storageObj[catalogId] = []);
		!hit && parseInt(boardId) && storageObj[catalogId].push({
			'id' : boardId,
			'time' : '' + new Date().getTime()
		});
		storageObj[catalogId] = storageObj[catalogId].sort(function(a, b) {
			return Number(b.time) - Number(a.time);
		}).slice(0, 5);
		for (i = 0; i < storageObj[catalogId].length; i++) {
			for (j = 1; j < children.length; j++) {
				if (children[j].getAttribute('data-id') == storageObj[catalogId][i].id) {
					D.append(children[j], boardList);
					D.removeClass(children[j], 'hidden');
					break;
				}
			}
		}
		storage = '';
		for (i in storageObj) {
			storage += ';' + i;
			for (j = 0; j < storageObj[i].length; j++) {
				storage += ',' + storageObj[i][j].id + ',' + storageObj[i][j].time
			}
		}
		L.setItem('bbs_catalog', storage.substring(1));
	}

	// 公告数据拉取
	if (D.val('#J_FirstPageFlag') === 'true') {
		var posts = D.get('.J_Posts'),
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

				cells[1].innerHTML = '' +
				(replyCount >= 100 ? '<em>' + replyCount + '</em>' : replyCount) + '/' +
				(viewCount >= 1000 ? '<em>' + viewCount + '</em>' : viewCount);
				
				cells[2].innerHTML = '' +
				'<a href="' + data.authorUrl + '" title="' + data.authorNick + '" target="_blank">' +
					'<img class="user-logo" src="' + data.picUrl + '" width="20" height="20"/>' +
				'</a>' +
				'<div class="info">' +
					'<a class="name ellipsis" href="' + data.authorUrl + '" title="' + data.authorNick + '" target="_blank">' + data.authorNick + '</a>' +
					'<div class="date">' + data.gmtCreate + '</div>' +
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
})(KISSY, KISSY.DOM, KISSY.Event, KISSY.LocalStore);