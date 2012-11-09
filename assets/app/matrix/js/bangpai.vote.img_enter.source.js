 /**
 * 投票项目 (从文字投票处 打开图片投票地址 的操作)
 * @author ziya@taobao.com
 * @date   2009-12-20
 */
(function(){
	if(!TB.voteImage) TB.namespace('textVote'); 
	TB.textVote.open=(function(){
		var D=YAHOO.util.Dom,E=YAHOO.util.Event,Connect = YAHOO.util.Connect,Lang=YAHOO.lang,
		j_text=D.get('j_open'),/*触发显示tips涂层的事件的Dom元素*/
		j_parent=j_text.parentNode.parentNode,/*父节点，相对定位*/
		pointX=-30,/*定义坐标变量*/
		pointY=-75,
		mouse_tip=D.getElementsByClassName('mouse_tip')[0],/*鼠标移上去显示的tips层*/
		click_tip=D.getElementsByClassName('click_tip')[0],/*鼠标点击后显示的tips层*/
		handle={
			/**
			 * 初始化
			 * @url ajax成功请求后，打开的图片投票链接地址
			 * @link 访问的ajax地址
			 */
			init:function(url,link){
				D.setStyle(j_parent,'position','relative');
				D.get(j_parent).style.zIndex=3334;
				D.get('header').style.zIndex=3333;
				this.mouseBind();
				this.clickBind(url,link);
				
			},
			mouseBind:function(){

				var ctrl; /*显示隐藏控制*/

				/*设置mouse_tip图层的展现位置*/
				E.on(j_text,'mouseover',function(){
					ctrl=false;
					D.setStyle(mouse_tip,'right',pointX+"px");
					D.setStyle(mouse_tip,'top',pointY+"px");
					D.setStyle(mouse_tip,'display','block');
				});
				
				/*鼠标离开后关闭 mouse_tip 层*/
				E.on(j_text,'mouseout',function(){
					ctrl=true;
					Lang.later(5000,this,function(){
						D.getStyle(mouse_tip,'display') != 'none' && ctrl &&  D.setStyle(mouse_tip,'display','none');
					},null,false);
				});
			},
			/**
			 * @url ajax成功请求后，打开的图片投票链接地址
			 * @link 访问的ajax地址
			 */
			clickBind:function(url,link){
				E.on(j_text,'click',function(){
					Connect.asyncRequest('get',link+"?time="+new Date(),{
						success: function(json){
							/**
							 * 约定:
							 * json.status==1 权限等级不够 不能打开图片投票
							 * json.status==0 权限等级足够 能打开图片投票
							 */
							var json=Lang.JSON.parse(json.responseText),ctrl;
							
							/*权限不满足*/
							if(json.status==1){
								/*设置点击后 click_tip 的展示位置 并更换样式 */
								D.setStyle(mouse_tip,'display','none');
								D.setStyle(click_tip,'right',pointX+"px");
								D.setStyle(click_tip,'top',pointY+"px");
								D.setStyle(click_tip,'display','block');
								j_text.parentNode.className='open-img-v2';

								/*移除事件*/
								E.removeListener(j_text);

								/*重新渲染元素内容*/
								j_text.parentNode.innerHTML='<a id="j_open" style="color:#999" >打开发表图片投票</a>';

								/*绑定新的事件*/
								j_text=D.get('j_open');
								E.on(j_text,'mouseover',function(){
									ctrl=false;
									D.setStyle(click_tip,'right',pointX+"px");
									D.setStyle(click_tip,'top',pointY+"px");
									D.setStyle(click_tip,'display','block');
								});

								E.on(j_text,'mouseout',function(){
									ctrl=true;
									Lang.later(5000,this,function(){
										D.getStyle(click_tip,'display') != 'none' && ctrl &&  D.setStyle(click_tip,'display','none');
									},null,false);
								});

							/*权限满足*/
							}else if(json.status==0){
								window.open(url,'_blank');
								Lang.later(5000,this,function(){
										 D.setStyle(click_tip,'display','none');
								},null,false);
							}
						}
					});
				
				});
			}
		}
		return handle;
	})();
	
})();

/**
 * @picVoteUrl ajax成功请求后，打开的图片投票链接地址
 * @checkUrl 访问的ajax地址
 * 页面初始化调用例: TB.textVote.open.init(picVoteUrl,checkUrl);
 */