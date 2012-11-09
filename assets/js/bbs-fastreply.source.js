/**
 * ¿ì½Ý»Ø¸´
 * @author ck0123456@gmail.com
 * @date 2012-1-10
 */
(function(S) {
	var D = S.DOM, E = S.Event;

	var replyArea = D.get('#J_FastReply'),
	textarea = D.get('textarea', replyArea),
	close = D.get('.close', replyArea),
	submit = D.get('button', replyArea),
	checkCode = D.get('#checkCodeInput'),

	floorInfo = '',
	closeFn = function() {
		D.addClass(replyArea, 'hidden');
		D.removeClass(D.parent(replyArea, '.ft'), 'autoheight');
	};

	E.on(close, 'click', closeFn);
	E.on(submit, 'click', function() {
		D.val('#msgpost', floorInfo + D.val(textarea));
		D.get('#addReplyForm').submit();
	});
	E.on('.replyArea', 'click', function(evt) {
		evt.halt();
		if (!D.val('#J_EditorPlugins')) {
			loginSuccess && (loginSuccess.callback = function() {
				window.location.href = window.location.href.split('#')[0];
			});
			editor && editor.fire('focus');
		} else if (checkCode) {
			window.location.href = '#publishreply';
		} else {
			var floor = D.attr(this, 'data-floor'),
			op = D.parent(this, '.op'),
			ft = D.parent(op, '.ft');
			if (D.hasClass(ft, 'autoheight')) {
				closeFn();
			} else {
				closeFn();
				if (floor) {
					floor = '<a href="' + window.location.href.split('#')[0] + '#' + D.attr(D.parent(this, '.floor'), 'id') + '">' + floor + '</a>';
					D.insertBefore(replyArea, op);
					D.addClass(ft, 'autoheight clearfix');
					D.removeClass(replyArea, 'hidden');
					textarea.innerHTML = '';
					textarea.select();
					floorInfo = D.attr(textarea, 'data-prefix').replace('{{floor}}', floor);
				} else {
					window.location.href = '#publishreply';
				}
			}
		}
	});

})(KISSY);