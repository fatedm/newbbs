 /**
 * 投票项目 (文字和图片投票中的 最大可选项组件)
 * @author ziya@taobao.com
 * @date   2009-12-20
 */
(function(){
	YAHOO.namespace('TB');
	YAHOO.TB.select =(function(){
		var D  =YAHOO.util.Dom,E = YAHOO.util.Event,
		handle={
			/*初始值，最小值，最大值*/
			config:{normal:2,min:2,max:60},
			/*初始化控件*/
			init:function(name,config){
				var _config,_arr=[];

				/*如果限定范围则改换默认配置*/
				config?_config=config:_config=this.config;
		
				/*传入多个数组初始化*/
				if(typeof name!="string" && name.length){
					for(var i=0;i<name.length;i++){
						 handle.bind(name[i],_config);
						 _arr.push(D.get(name[i]));
					}
					return handle.fn.apply(_arr);
				}

				/*单个控件初始化*/
				else{
					 handle.bind(name,_config);
					 return handle.fn.apply(D.get(name));
				}
			},
			bind:function(el,config){
				var txt,up,down,config=config||this.config;
				
				/*txt:输入数字的 input 元素 ,up:按上增加值的 a 元素,down:按下减值的 a 元素*/

				txt=D.getFirstChild(el);up=D.getNextSibling(txt);down=D.getLastChild(el);
				
				/*定义控件的初始值*/
				if(typeof parseInt(txt.value)!="number" || typeof parseInt(txt.value)!=""){
					txt.value=config.normal;
				}

				/*绑定加法*/
				E.on(up,'click',function(){
					handle.plus(txt,config);
				});

				/*绑定减法*/
				E.on(down,'click',function(){
					handle.minus(txt,config);
				});

				/*只能输入数字和退后键*/
				E.on(txt,'keydown',function(e){
				 if (!(e.keyCode > 47 && e.keyCode < 58 || e.keyCode > 95 && e.keyCode < 106 || e.keyCode == 8 || e.keyCode == 110)){
					 e.preventDefault&&e.preventDefault();
					 e.returnValue = false;
				 }
				});
			},

			/*控件的值加一*/
			plus:function(txt,config){
				var config=config||this.config;
				if(typeof parseInt(txt.value)=="number" && parseInt(txt.value)<config.max && txt.disabled==false){
					txt.value=parseInt(txt.value)+1;
				}
			},

			/*控件的值减一*/
			minus:function(txt,config){
				var config=config||this.config;
				if(typeof parseInt(txt.value)=="number" && parseInt(txt.value)>config.min && txt.disabled==false){
					txt.value=parseInt(txt.value)-1;
				}
			},

			fn:function(){
				var self=this;
				return{
					/*清除控件的值或重置值*/
					clear:function(num,index){
						if(self.length){
							if(index){
								for(var i=0;i<self.length;i++){
									if(index==i){D.getFirstChild(self[i]).value=num||0}
								}
							}else{
								for(var i=0;i<self.length;i++){
									D.getFirstChild(self[i]).value=num||0;
								}
							}
						}else{
							D.getFirstChild(self).value=num||0;
						}
					},
					
					/*绑定方法*/
					bind:function(pme,fn){
						E.on(self,pme,fn);
					},

					/*设置控件不可编辑*/
					close:function(num){
						if(self.length){
							if(num){
								for(var i=0;i<self.length;i++){
									if(num==i){D.getFirstChild(self[i]).disabled=true;}
								}
							}else{
								for(var i=0;i<self.length;i++){
									D.getFirstChild(self[i]).disabled=true;
								}
							}
						}else{
							D.getFirstChild(self).disabled=true;
						}
					},
					
					/*获取控件的值*/
					getValue:function(){
						if(self.length){
							var _arr=[];
							for(var i=0;i<self.length;i++){
								_arr.push( D.getFirstChild(self[i]).value );
							}
							return _arr;
						}
						else{
							var _value = D.getFirstChild(self).value;
							return _value;
						}
					}
				}
			}
		}
		return handle;
	})();
	
})();

/**
 * 调用方法
 * 页面初始化调用例: 
 *                   TB.select.init('j_select');
 *                   TB.select.init('j_select',{normal:2,min:2,max:60});
 *                   TB.select.init(['j_select1','j_select2','j_select3']);
 *                   TB.select.init(['j_select1','j_select2','j_select3'],{normal:2,min:2,max:60});
 *
 * 重置或修改数据:
 * @num 被赋予的值
 * @index 索引值 第几个组件对象
 * clear(num,index)
 *                   var flower=TB.select.init('j_select');
 *						 flower.clear(999,0);
 *
 * 关闭组件 不能修改
 *                   var flower=TB.select.init('j_select');
 *                   flower.close();
 * 获取组件的值
 *                   var flower=TB.select.init('j_select');
 *                   flower.getValue();
 * 绑定事件
 *                   var flower=TB.select.init('j_select');
 *                   flower.bind('click',function(){
 *						//...
 *					 });
 */