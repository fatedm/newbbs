 /**
 * ͶƱ��Ŀ (������ͶƱ�� ��ͼƬͶƱ��ַ �Ĳ���)
 * @author ziya@taobao.com
 * @date   2009-12-20
 */
(function(){
	if(!TB.voteImage) TB.namespace('textVote'); 
	TB.textVote.open=(function(){
		var D=YAHOO.util.Dom,E=YAHOO.util.Event,Connect = YAHOO.util.Connect,Lang=YAHOO.lang,
		j_text=D.get('j_open'),/*������ʾtipsͿ����¼���DomԪ��*/
		j_parent=j_text.parentNode.parentNode,/*���ڵ㣬��Զ�λ*/
		pointX=-30,/*�����������*/
		pointY=-75,
		mouse_tip=D.getElementsByClassName('mouse_tip')[0],/*�������ȥ��ʾ��tips��*/
		click_tip=D.getElementsByClassName('click_tip')[0],/*���������ʾ��tips��*/
		handle={
			/**
			 * ��ʼ��
			 * @url ajax�ɹ�����󣬴򿪵�ͼƬͶƱ���ӵ�ַ
			 * @link ���ʵ�ajax��ַ
			 */
			init:function(url,link){
				D.setStyle(j_parent,'position','relative');
				D.get(j_parent).style.zIndex=3334;
				D.get('header').style.zIndex=3333;
				this.mouseBind();
				this.clickBind(url,link);
				
			},
			mouseBind:function(){

				var ctrl; /*��ʾ���ؿ���*/

				/*����mouse_tipͼ���չ��λ��*/
				E.on(j_text,'mouseover',function(){
					ctrl=false;
					D.setStyle(mouse_tip,'right',pointX+"px");
					D.setStyle(mouse_tip,'top',pointY+"px");
					D.setStyle(mouse_tip,'display','block');
				});
				
				/*����뿪��ر� mouse_tip ��*/
				E.on(j_text,'mouseout',function(){
					ctrl=true;
					Lang.later(5000,this,function(){
						D.getStyle(mouse_tip,'display') != 'none' && ctrl &&  D.setStyle(mouse_tip,'display','none');
					},null,false);
				});
			},
			/**
			 * @url ajax�ɹ�����󣬴򿪵�ͼƬͶƱ���ӵ�ַ
			 * @link ���ʵ�ajax��ַ
			 */
			clickBind:function(url,link){
				E.on(j_text,'click',function(){
					Connect.asyncRequest('get',link+"?time="+new Date(),{
						success: function(json){
							/**
							 * Լ��:
							 * json.status==1 Ȩ�޵ȼ����� ���ܴ�ͼƬͶƱ
							 * json.status==0 Ȩ�޵ȼ��㹻 �ܴ�ͼƬͶƱ
							 */
							var json=Lang.JSON.parse(json.responseText),ctrl;
							
							/*Ȩ�޲�����*/
							if(json.status==1){
								/*���õ���� click_tip ��չʾλ�� ��������ʽ */
								D.setStyle(mouse_tip,'display','none');
								D.setStyle(click_tip,'right',pointX+"px");
								D.setStyle(click_tip,'top',pointY+"px");
								D.setStyle(click_tip,'display','block');
								j_text.parentNode.className='open-img-v2';

								/*�Ƴ��¼�*/
								E.removeListener(j_text);

								/*������ȾԪ������*/
								j_text.parentNode.innerHTML='<a id="j_open" style="color:#999" >�򿪷���ͼƬͶƱ</a>';

								/*���µ��¼�*/
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

							/*Ȩ������*/
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
 * @picVoteUrl ajax�ɹ�����󣬴򿪵�ͼƬͶƱ���ӵ�ַ
 * @checkUrl ���ʵ�ajax��ַ
 * ҳ���ʼ��������: TB.textVote.open.init(picVoteUrl,checkUrl);
 */