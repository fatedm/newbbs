 /**
 * ͶƱ��Ŀ (���ֺ�ͼƬͶƱ�е� ����ѡ�����)
 * @author ziya@taobao.com
 * @date   2009-12-20
 */
(function(){
	YAHOO.namespace('TB');
	YAHOO.TB.select =(function(){
		var D  =YAHOO.util.Dom,E = YAHOO.util.Event,
		handle={
			/*��ʼֵ����Сֵ�����ֵ*/
			config:{normal:2,min:2,max:60},
			/*��ʼ���ؼ�*/
			init:function(name,config){
				var _config,_arr=[];

				/*����޶���Χ��Ļ�Ĭ������*/
				config?_config=config:_config=this.config;
		
				/*�����������ʼ��*/
				if(typeof name!="string" && name.length){
					for(var i=0;i<name.length;i++){
						 handle.bind(name[i],_config);
						 _arr.push(D.get(name[i]));
					}
					return handle.fn.apply(_arr);
				}

				/*�����ؼ���ʼ��*/
				else{
					 handle.bind(name,_config);
					 return handle.fn.apply(D.get(name));
				}
			},
			bind:function(el,config){
				var txt,up,down,config=config||this.config;
				
				/*txt:�������ֵ� input Ԫ�� ,up:��������ֵ�� a Ԫ��,down:���¼�ֵ�� a Ԫ��*/

				txt=D.getFirstChild(el);up=D.getNextSibling(txt);down=D.getLastChild(el);
				
				/*����ؼ��ĳ�ʼֵ*/
				if(typeof parseInt(txt.value)!="number" || typeof parseInt(txt.value)!=""){
					txt.value=config.normal;
				}

				/*�󶨼ӷ�*/
				E.on(up,'click',function(){
					handle.plus(txt,config);
				});

				/*�󶨼���*/
				E.on(down,'click',function(){
					handle.minus(txt,config);
				});

				/*ֻ���������ֺ��˺��*/
				E.on(txt,'keydown',function(e){
				 if (!(e.keyCode > 47 && e.keyCode < 58 || e.keyCode > 95 && e.keyCode < 106 || e.keyCode == 8 || e.keyCode == 110)){
					 e.preventDefault&&e.preventDefault();
					 e.returnValue = false;
				 }
				});
			},

			/*�ؼ���ֵ��һ*/
			plus:function(txt,config){
				var config=config||this.config;
				if(typeof parseInt(txt.value)=="number" && parseInt(txt.value)<config.max && txt.disabled==false){
					txt.value=parseInt(txt.value)+1;
				}
			},

			/*�ؼ���ֵ��һ*/
			minus:function(txt,config){
				var config=config||this.config;
				if(typeof parseInt(txt.value)=="number" && parseInt(txt.value)>config.min && txt.disabled==false){
					txt.value=parseInt(txt.value)-1;
				}
			},

			fn:function(){
				var self=this;
				return{
					/*����ؼ���ֵ������ֵ*/
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
					
					/*�󶨷���*/
					bind:function(pme,fn){
						E.on(self,pme,fn);
					},

					/*���ÿؼ����ɱ༭*/
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
					
					/*��ȡ�ؼ���ֵ*/
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
 * ���÷���
 * ҳ���ʼ��������: 
 *                   TB.select.init('j_select');
 *                   TB.select.init('j_select',{normal:2,min:2,max:60});
 *                   TB.select.init(['j_select1','j_select2','j_select3']);
 *                   TB.select.init(['j_select1','j_select2','j_select3'],{normal:2,min:2,max:60});
 *
 * ���û��޸�����:
 * @num �������ֵ
 * @index ����ֵ �ڼ����������
 * clear(num,index)
 *                   var flower=TB.select.init('j_select');
 *						 flower.clear(999,0);
 *
 * �ر���� �����޸�
 *                   var flower=TB.select.init('j_select');
 *                   flower.close();
 * ��ȡ�����ֵ
 *                   var flower=TB.select.init('j_select');
 *                   flower.getValue();
 * ���¼�
 *                   var flower=TB.select.init('j_select');
 *                   flower.bind('click',function(){
 *						//...
 *					 });
 */