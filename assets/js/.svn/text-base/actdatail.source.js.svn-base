/**
 * @author longxiao.fq
 */
(function() {
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	TB.namespace('TimeBar');
	TB.namespace('Iswas');
	
	/*
	 * 时间条倒计时功能以及相应的显示状态
	 */
	TB.TimeBar.initialize = function(timebar, status, container) {
		var flg=false;
		var ele = D.get(timebar), status = D.get(status), container = D
				.get(container), content = D.getElementsByClassName(
				'prompt-content', 'div', container)[0], btn = D
				.getElementsByClassName('prompt-btn', 'input', container)[0], h2 = ele
				.getElementsByTagName('h2')[0], h4 = ele
				.getElementsByTagName('h4')[0], end = D.getAttribute(h2, 'end'), start = D
				.getAttribute(h2, 'start'), now = D.getAttribute(h2, 'now'), daytext = D
				.getElementsByClassName('J_Day', 'span', h2)[0], hourtext = D
				.getElementsByClassName('J_Hour', 'span', h2)[0], minutetext = D
				.getElementsByClassName('J_Minute', 'span', h2)[0], secondtext = D
				.getElementsByClassName('J_Second', 'span', h2)[0];

		var Timeanalyse = function(end, start, now) {
			var end = Date.parse(end), start = Date.parse(start), now = Date
					.parse(now);

			var timer = function(duration) {
				var day, hour, minute, second, temp1, temp2;
				day = parseInt(duration / 86400);
				temp1 = parseInt(duration % 86400);
				hour = parseInt(temp1 / 3600);
				temp2 = parseInt(temp1 % 3600);
				minute = parseInt(temp2 / 60);
				second = parseInt(temp2 % 60);

				day = day.toString();
				hour = hour.toString();
				minute = minute.toString();
				second = second.toString();

				return {
					d : day,
					h : hour,
					m : minute,
					s : second
				}
			}

			var drawtime = function(t) {
				var timeHandler = setInterval(function() {
					if (t < 0) {
						try {
							clearInterval(timeHandler);
						} catch (ex) {};
						if(!flg){
						window.location.reload();
						flg=true;
						}
						return;
					}
					var time = timer(t);
					daytext.innerHTML = time.d;
					hourtext.innerHTML = time.h;
					minutetext.innerHTML = time.m;
					secondtext.innerHTML = time.s;
					t -= 1;
				}, 1000);
			}

			if (now < start) {
				var t = (start - now) / 1000;

				//status.innerHTML = '活动尚未开始';
				//h4.innerHTML = '离活动开始时间还有';
				//btn.value = "放弃参加活动";

				drawtime(t);

				//D.addClass(btn, 'surrender'); //灰色 放弃参加 按钮样式 surrender
				//D.addClass(ele, 'unplayed'); //时间容器 未开始 样式 unplayed

			} else if (now >= start && now < end) {
				var t = (end - now) / 1000;

				//status.innerHTML = '活动进行中';
				//h4.innerHTML = '离活动结束时间还有';
				//btn.value = "确定参加活动";

				drawtime(t);
				//D.addClass(btn, 'affirm'); //红色 参加按钮 样式 affirm
				//D.addClass(ele, 'yet'); //时间容器 活动已经开始 样式 yet

			} else if (now >= end) {
				//status.innerHTML = '活动已经结束';
												//结束时按钮不用添加样式，自动隐藏
				//D.addClass(content, 'finish'); //时间容器  活动结束 样式  finish
			}

		}

		Timeanalyse(end, start, now);
	};

	/*
	 * 人数计算
	 */
	TB.Iswas.initialize = function() {
		var Container = D.get('J_Participants'), Participants = D.getAttribute(
				Container, 'Participants'), Participator = parseInt(Container.innerHTML);

		D.get('J_Surplus').innerHTML = Participants - Participator;
	}();

})();