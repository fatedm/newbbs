/* @author yuyin@taobao.com 2009-07-03
 * @default wangwang emoticon
 * @demo: http://t-yuyin/OA/emoticon/demo.html
 * @todo inherit
*/

/*Demo
 *var m = TB.widget.SimpleEmoticon.decorate({
 *		emotelist:CustomList,ֱ�Ӹ������Ĭ���ǻ�ȡ�ⲿURL
 *		catchType:'url'//ǶIMGͼƬ���ı����У�Ĭ����UBB��ʽ
 *	})
  *
 *	m._beforeShow = function(){
 *		console.log('beforeShow');
 *		this.config.emotelist=CustomList;
 *		return true;
 *	}
 *	m._beforeProcess = function(){
 *		console.log('beforeProcess');
 *		this.config.catchType = 'ubb';
 *		return true;
 *	}
 *	m._afterProcess = function(){
 *		console.log('afterProcess');
 *		this.popup.onclick = function(){this.style.display = 'none';}
 *	}
*/
//start
//�������
TB.widget.SimpleEmoticon = (function(){
	var U=YAHOO.util,D=U.Dom,E=U.Event,L=YAHOO.lang,imgFragment=oList=null;
	
	var defConfig = {
		emotelist:'http://a.tbcdn.cn/app/matrix/js/emoticon_list.js?'+new Date().getTime()+'.js',//Ĭ�϶�����ΪEmoticonList��Ҳ����ֱ��Ϊ���ж���
		catchType:'ubb',//@ubb UBB code,@url ͼƬ��ַ
		clickOff:false,//���ѡ��һ������֮��ر�
		trigger:'J_Emote',//Default ��������/��ťID��el
		container:'J_EmoteImg',//Default ��������ID��el
		textarea:'J_MessageContent'//Default �ı���ID��el
	};
	var _handle ={};
	_handle._beforeProcess = function(){return true};//��ʼDOM����ǰ����
	_handle._afterProcess = function(){};//��ʼDOM�������
	var _process = function(){
			var self = this,config = self.config; 
			//DOM����ǰ
			if(!this._beforeProcess()) return;
			//ƴ��DOM
			
			for(var i = 0;i<oList.length;i++){
				imgFragment.innerHTML += '<a href="'+oList[i]['url']+'" ubb="'+oList[i]['ubb']+'" title="'+oList[i]['title']+'" />';
			}
			this.popup.appendChild(imgFragment);
			//�󶨱���ѡ���¼�
			E.on(this.popup,'click',function(e){
				E.stopEvent(e);
				var o = E.getTarget(e);
				if(o.tagName == 'A'){
					D.get(config.textarea).value += config.catchType == 'ubb' ? o.getAttribute('ubb'):'<img src="'+o.getAttribute('href')+'" alt="'+ o.getAttribute('title')+'" />';
					//�Ƿ�ѡ���ر�
					config.clickOff&&self.hide();
				}
			});
			//�����������ر�
			E.on(document,'click',function(e){
				var o = E.getTarget(e);
				if(o==self.trigger){
					return true;
				}else if(!(o==self.popup)){
					self.hide();
				}
			});
			//DOM�����
			this._afterProcess();
	}
	return{
		decorate:function(config){
			_handle.config = L.merge(defConfig,config||{},true);
			var simplePop = TB.widget.SimplePopup.decorate(_handle.config.trigger,_handle.config.container,{autoFit:true,eventType:'click',onShow:function(){
				var popup = this.popup,oParent = popup.parentNode,newPop=null,self=this;
				//���container����������body��˵��û�г�ʼ������ִ�г�ʼ��
				if(oParent != document.body){
					//��container����body����Ԫ��
					this.popup = newPop = popup.cloneNode(true);
					oParent.removeChild(popup);
					document.body.appendChild(newPop);
					//����container�ڲ��ı�������
					imgFragment = document.createElement('DIV');
					imgFragment.className='emote-inner';
					var Util = {
						getCookie: function(name) {
							var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
							return (m && m[1]) ? decodeURIComponent(m[1]) : '';
						}
					 }
					var nick = Util.getCookie('_nk_');
					var isLogin = Util.getCookie('_l_g_') && nick;
					//��������б��Ǵ����ⲿ�ű���
					if(typeof (_handle.config.emotelist)=='string'){
						U.Get.script(_handle.config.emotelist,{//�����ⲿ�ű�
							onSuccess:function(){
								if(isLogin){
								oList = EmoticonList;//�ⲿ�ű����б�Ķ�������ΪEmoticonList
								}else{
									oList = EmoticonList2;
								}
								_process.apply(self);
							}
						});
					}else{//�����JSON���û���ֱ�ӱ����г�LIST������ȡ�����ж�Ӧ�Ķ���
						oList = _handle.config.emotelist;
						_process.call(this);
					}
				}
			}});
			L.augmentObject(_handle.config,simplePop.config,true);//�ϲ����ò���
			L.augmentObject(simplePop,_handle,true);//�ϲ�����
			return simplePop;//���ع�ʹ���ߵ������еķ���������
		}
	}
})();

//end