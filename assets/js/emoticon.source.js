/* @author yuyin@taobao.com 2009-07-03
 * @default wangwang emoticon
 * @demo: http://t-yuyin/OA/emoticon/demo.html
 * @todo inherit
*/

/*Demo
 *var m = TB.widget.SimpleEmoticon.decorate({
 *		emotelist:CustomList,直接赋予对象，默认是获取外部URL
 *		catchType:'url'//嵌IMG图片到文本框中，默认是UBB形式
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
//定义对象
TB.widget.SimpleEmoticon = (function(){
	var U=YAHOO.util,D=U.Dom,E=U.Event,L=YAHOO.lang,imgFragment=oList=null;
	
	var defConfig = {
		emotelist:'http://a.tbcdn.cn/app/matrix/js/emoticon_list.js?'+new Date().getTime()+'.js',//默认对象名为EmoticonList，也可以直接为队列对象
		catchType:'ubb',//@ubb UBB code,@url 图片地址
		clickOff:false,//点击选择一个表情之后关闭
		trigger:'J_Emote',//Default 触发链接/按钮ID或el
		container:'J_EmoteImg',//Default 表情容器ID或el
		textarea:'J_MessageContent'//Default 文本框ID或el
	};
	var _handle ={};
	_handle._beforeProcess = function(){return true};//初始DOM处理前函数
	_handle._afterProcess = function(){};//初始DOM处理后函数
	var _process = function(){
			var self = this,config = self.config; 
			//DOM处理前
			if(!this._beforeProcess()) return;
			//拼接DOM
			
			for(var i = 0;i<oList.length;i++){
				imgFragment.innerHTML += '<a href="'+oList[i]['url']+'" ubb="'+oList[i]['ubb']+'" title="'+oList[i]['title']+'" />';
			}
			this.popup.appendChild(imgFragment);
			//绑定表情选择事件
			E.on(this.popup,'click',function(e){
				E.stopEvent(e);
				var o = E.getTarget(e);
				if(o.tagName == 'A'){
					D.get(config.textarea).value += config.catchType == 'ubb' ? o.getAttribute('ubb'):'<img src="'+o.getAttribute('href')+'" alt="'+ o.getAttribute('title')+'" />';
					//是否选择后关闭
					config.clickOff&&self.hide();
				}
			});
			//点击其他区域关闭
			E.on(document,'click',function(e){
				var o = E.getTarget(e);
				if(o==self.trigger){
					return true;
				}else if(!(o==self.popup)){
					self.hide();
				}
			});
			//DOM处理后
			this._afterProcess();
	}
	return{
		decorate:function(config){
			_handle.config = L.merge(defConfig,config||{},true);
			var simplePop = TB.widget.SimplePopup.decorate(_handle.config.trigger,_handle.config.container,{autoFit:true,eventType:'click',onShow:function(){
				var popup = this.popup,oParent = popup.parentNode,newPop=null,self=this;
				//如果container父容器不是body，说明没有初始化过，执行初始化
				if(oParent != document.body){
					//把container移做body的子元素
					this.popup = newPop = popup.cloneNode(true);
					oParent.removeChild(popup);
					document.body.appendChild(newPop);
					//构建container内部的表情容器
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
					//如果表情列表是存在外部脚本中
					if(typeof (_handle.config.emotelist)=='string'){
						U.Get.script(_handle.config.emotelist,{//调用外部脚本
							onSuccess:function(){
								if(isLogin){
								oList = EmoticonList;//外部脚本中列表的对象名称为EmoticonList
								}else{
									oList = EmoticonList2;
								}
								_process.apply(self);
							}
						});
					}else{//如果用JSON调用或者直接本地列出LIST对象，则取配置中对应的对象
						oList = _handle.config.emotelist;
						_process.call(this);
					}
				}
			}});
			L.augmentObject(_handle.config,simplePop.config,true);//合并配置参数
			L.augmentObject(simplePop,_handle,true);//合并方法
			return simplePop;//返回供使用者调用所有的方法和配置
		}
	}
})();

//end