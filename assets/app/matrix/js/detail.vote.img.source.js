 /**
 * 投票项目 (detail页 提交投票数据)
 * @author ziya@taobao.com
 * @date   2009-12-20
 */
(function(){
if(!TB.voteImage) TB.namespace('voteImageDetail'); 
	TB.voteImageDetail.vote=(function(){
		var D=YAHOO.util.Dom,E=YAHOO.util.Event,
		handle={
			/**
			 * 验证可选择几项
			 * @id 投票模块的id
			 * @num 可选几项
			 * @href iframe的url地址
			 */
			check:function(id,num,href){
				this.id=id;

				/*获取模块中所有 checked */
				var list=D.get(id).getElementsByTagName('input');

				/*绑定checked元素 点击事件*/
				E.on(list,'click',function(){
					var sum=0;
					for(var i=0;i<list.length;i++){
						list[i].checked && sum++;
					}
					if(sum>num){
						this.checked=false;
						alert('最多只能选择'+num+'项');
						return;
					};
				});

				/*创建弹出登录框*/
				handle.create(href);
			},
			create:function(href){
				/*创建登录框*/
				var oDiv = document.createElement("div");
				oDiv.id = 'J_PopUpMask_4';
				oDiv.className = "pop-up";
				oDiv.style.position='absolute';
				oDiv.style.zIndex=6667;
				oDiv.innerHTML="<div class='hd'><h3 id='J_title'></h3></div><div class=\"bd\"><div class=\"inner\"><iframe id=\"J_PopUpFrame_4\" class=\"pop-mask\" src=\"\" scrolling=\"no\" frameborder=\"0\"></iframe></div></div><p class=\"ft\"><a href=\"#\" class=\"j_close act\"  id='close4'>关闭</a></p>";
				document.body.appendChild(oDiv);
				D.setStyle(oDiv,'display','none');
				var close = D.getElementsByClassName('j_close');

				/*关闭按钮事件*/
				E.on(close, 'click', function(e){
					D.setStyle(oDiv,'display','none');
					E.stopEvent(e);
					if(D.get("J_submit")){
						D.get("J_submit").disabled=false;
					}
				});

				/*绑定表单事件*/
				handle.status(href);
			},
			/*是否已选择*/
			ischeck:function(){
				var list=D.get(this.id).getElementsByTagName('input');
				for(var i=0;i<list.length;i++){
					if(list[i].checked==true){return false}
				}
				return true;
			},
			status:function(href){
				E.on('J_submit', 'click', function(e){
					/*get方式把数据添到url*/
					D.get('J_PopUpFrame_4').src=handle.voteUrl(href);

					/*判断是否已选择*/
					if(handle.ischeck()){
						alert('请选择');
						return;
					}
					/*暂时禁用提交表单*/
					D.get("J_submit").disabled=true;

					/*延时加载*/
					setTimeout(function(){
						D.get('J_PopUpMask_4').style.display="block";
						var point=D.getXY("J_submit");
						point = [point[0]+D.get("J_submit").offsetWidth-100,point[1]-D.get("J_submit").offsetHeight];
						D.setXY("J_PopUpMask_4",point);
					},500);

					/*延时关闭*/
					if(D.hasClass("J_PopUpFrame_4",'msg24')){
						setTimeout(function(){D.setStyle("J_PopUpMask_4",'display','none');},3000);
					}
					E.stopEvent(e);
				});
			},
			/*要提交的表单数据*/
			voteUrl:function(href){
				var form = D.get('choiceForm');
				var redirectURL = href;
				redirectURL = redirectURL + "?threadId=" + form['threadId'].value;
				redirectURL = redirectURL + "&groupId=" + form['groupId'].value;
				for (i = 0; i < form['choice'].length; i++) {
					if (form['choice'][i].checked) {
						redirectURL = redirectURL + "&choice=" + form['choice'][i].value;
					}
				}
				redirectURL = redirectURL + "&tbToken=" + encodeURIComponent(form['tbToken'].value);
				return redirectURL;
			}
		}
		return handle;
	})();
})();

/**
 * @id 投票模块的id
 * @num 可选几项
 * @href iframe的url地址
 * 页面初始化调用例: TB.voteImageDetail.vote.check("j_vote", 2, "http://bangpai.daily.taobao.net/forum/vote.htm");
 */