  /*
* @intro ����ͶƱ��(����,�༭,ɾ��)ģ��
* @author ziya
* @date 2009.12.01
*/
if(!TB.vote) TB.namespace('vote'); 
TB.vote.textVote=(function(){
	var D=YAHOO.util.Dom,E=YAHOO.util.Event,Connect = YAHOO.util.Connect,
	isTips=false, /*����������ʾ���Ƿ���ʾ*/
	sum=5,/*Ĭ��ͶƱѡ����*/
	j_link=D.getElementsByClassName('j_link'), /*����ͼƬ���Ӱ�ť*/
	j_close=D.getElementsByClassName('j_close'),/*����ѡ��رհ�ť*/
	j_false=D.getElementsByClassName('j_false'),/*��������ȡ����ť*/
	j_ture=D.getElementsByClassName('btn_true'),/*��������ȷ����ť*/
	j_edit=D.getElementsByClassName('j_showlink_edit'),/*�������ӱ༭��ť*/
	j_del=D.getElementsByClassName('j_showlink_del'),
	j_addItem=D.get('j_add_item'),
	TR=D.getChildrenBy(D.get('vote-post'),function(el){
		return el.tagName=='TR';
	}),
	handle={
		init:function(){
		/*@date 2010 10 15
		 * author longxiao
		 * �༭��������������ɺ����tip��ʾ
		 * */
			E.onDOMReady(function(){
				handle.showTips();
			});
			
			E.on(TR,'mouseover',function(){
				handle.trShow(this);
			});
			E.on(TR,'mouseout',function(){
				handle.trHidden(this);
			});
			E.on(j_close,'click',function(){
				handle.trClose(this);
			});
			E.on(j_link,'click',function(){
				handle.linkShow(this);
			});
			E.on(j_false,'click',function(){
				handle.linkFalse(this);
			});
			E.on(j_ture,'click',function(){
				handle.linkTrue(this);
			});
			E.on(j_edit,'click',function(){
				handle.linkEdit(this);
			});
			E.on(j_addItem,'click',function(){
				handle.addItem(this);
			});
			E.on(j_del,'click',function(){
				handle.linkDel(this);
			});

			//ɾ��������¡�Ķ���������¼�;
			E.removeListener(handle.getChlid(D.get("j_one"),'DIV','j_close'));
			E.removeListener(handle.getChlid(D.get("j_one"),'img','j_link'));
			E.removeListener(handle.getChlid(D.get("j_one"),'a','j_false'));
			E.removeListener(handle.getChlid(D.get("j_one"),'input','btn_true'));
			E.removeListener(handle.getChlid(D.get("j_one"),'a','j_showlink_edit'));
			E.removeListener(handle.getChlid(D.get("j_one"),'a','j_showlink_del'));
			var _sum=0;
			for(var i=0;i<TR.length;i++){
				if(TR[i].style.display!='none'){
					_sum++;
				}
			}
			if(_sum>=100){
				D.get('j_add_item').style.display='none';
				_sum=0;
			}
			//����ҳ�治�ɹ����أ����������������ʾ
			var _showLink=handle.getArrayChlid(D.get('vote-post'),'div','j_showlink');
			for(var i=0;i<_showLink.length;i++){
				var _tmp=handle.getChlid(_showLink[i],'a','j_showlink_text');
				if(document.all){
					if(_tmp.innerText && _tmp.innerText.length>32){
							_tmp.innerText=_tmp.innerText.substr(0,32)+"...";
					}
				}else{
					if( _tmp.textContent.length>32){
							_tmp.textContent=_tmp.textContent.substr(0,32)+"...";
					}
				}
				if(handle.getChlid(_showLink[i],'a','j_showlink_text').title!=""){
					_showLink[i].style.display="block";
					D.getLastChild(D.getFirstChild(_showLink[i].parentNode)).style.display="none";
				}
			}
			handle.preview();

		},
		showTips:function(){
			obj=D.get('vote-post');
			//����Ѿ���ʾ����������ʾ
			if(isTips || D.getElementsByClassName('j_link2').length>0){return;};
			//�������������ʾ��
			var _div=document.createElement('div');
			_div.id='j_tips';
			_div.style.width='173px';
			_div.style.height='58px';
			_div.style.background='url(http://img04.taobaocdn.com/tps/i4/T1Gc0pXgdXXXXXXXXX-173-58.gif)';
			_div.style.position='absolute';
			_div.style.top='-32px';
			_div.style.left='482px';
			_div.innerHTML="<a href='javascript:void(0)' style='display:block;width:18px;height:18px;float:right'><a/>";
			
			//document.body.appendChild(_div);
			
			//���ò��λ���ڰ�ť����
			
			var _ftb=D.getAncestorByClassName(obj,'bd');
			D.setStyle(_ftb,'position','relative');
			_ftb.appendChild(_div);
			
				
			//���ò�����ʾ��
			isTips=true;
			//��ر�ϵ������ʾ��ʱ ����
			E.on(D.get('j_tips').firstChild,'click',function(){
				if(D.get('j_tips')){
					D.get('j_tips').style.display='none';
				}
			});
		},
		//��꾭��trʱ����ɫ����
		trShow:function(obj){
			//������꾭���¼�
			var _obj=D.getFirstChild(obj);
			_obj.style.background='#F2F2F2';
			if(D.getFirstChild(D.getFirstChild(_obj)).className=="j_close"){
				D.getFirstChild(D.getFirstChild(_obj)).style.visibility='visible';
			}
			var xp=D.getLastChild(D.getFirstChild(D.getFirstChild(obj).getElementsByTagName("span")[0].parentNode.parentNode)).className;
			var title=obj.getElementsByTagName('a')[obj.getElementsByTagName('a').length-3].title;
			if(title!="" && xp!="j_link2"){
				obj.getElementsByTagName('a')[obj.getElementsByTagName('a').length-2].style.display='inline';
				obj.getElementsByTagName('a')[obj.getElementsByTagName('a').length-1].style.display='inline';
			}
		},
		//����뿪trʱ����ɫ��ԭ
		trHidden:function(obj){
			var _obj=D.getFirstChild(obj);
			_obj.style.background='#FFF';
			D.getFirstChild(D.getFirstChild(_obj)).style.visibility='hidden';
			var title=obj.getElementsByTagName('a')[obj.getElementsByTagName('a').length-3].title;
			obj.getElementsByTagName('a')[obj.getElementsByTagName('a').length-2].style.display='none';
			obj.getElementsByTagName('a')[obj.getElementsByTagName('a').length-1].style.display='none';
		},
		//�ر�ѡ��
		trClose:function(obj){
			if(!confirm("�Ƿ�ɾ����ѡ��?")){
				return;
			}else{
				obj.parentNode.parentNode.parentNode.style.display='none';
				var _tr=D.getChildrenBy(D.get('vote-post'),function(el){
					return el.tagName=='TR' && ( el.style.display !='none');
				});
				var sum=0;
				if(_tr.length<2){
				obj.parentNode.parentNode.parentNode.style.display='block';
					D.get('add_msg').innerHTML='<p class="error" >����������Сѡ����</p>';
					D.get('add_msg').style.display='block';
					setTimeout(function(){
						D.get('add_msg').style.display='none';
					},2000)
					return;
				}
				for(var i=0;i<_tr.length;i++){
					if(_tr[i].style.display!='none'){
						_tr[i].getElementsByTagName('span')[0].innerHTML="ѡ��"+(i+1)+" : ";
						sum++;
					}
				}
				D.get('j_add_item').style.display='block';

			}
		},
		linkDel:function(obj){
			obj.parentNode.style.display='none';
			var _t=D.getAncestorBy(obj,function(el){
				return el.className=='con';
			});
			D.getLastChild(_t).getElementsByTagName('a')[0].innerHTML="";
			D.getLastChild(_t).getElementsByTagName('a')[0].title="";
			_t.getElementsByTagName('input')[1].value="";
			_t.getElementsByTagName('img')[0].style.display='inline';
			try{
				var msgBox=D.getNextSibling(_t.parentNode);
				msgBox.getElementsByTagName('div')[msgBox.getElementsByTagName('div').length-1].style.display='none';
			}catch(e){};
		},
		//��ʾ��������ģ��
		linkShow:function(obj){
			if(D.get('j_tips')){
					D.get('j_tips').style.display='none';
			}
			if(D.getPreviousSibling(obj).value!=""){
				var _t=D.getNextSibling(obj.parentNode);
				if(_t.getElementsByTagName('input')[0].value==""){
					_t.getElementsByTagName('input')[0].value="http://";
				}
				obj.style.display='none';
				_t.style.display='block';
			}else{
				alert('��ѡ����ѡ�����ݣ�Ȼ�������������');
				return;
			}
		},
		//��������-ȡ������
		linkFalse:function(obj){
			obj.parentNode.parentNode.style.display='none';
			var _t=D.getAncestorBy(obj,function(el){
				return el.className=='con';
			});
			if(D.getLastChild(_t).getElementsByTagName('a')[D.getLastChild(_t).getElementsByTagName('a').length-3].title==""){
				_t.getElementsByTagName('img')[0].style.display='inline';
			}else{
				D.getLastChild(_t).style.display='block';
			}
			D.getLastChild(_t.parentNode.parentNode).style.display='none';
		},
		//��������-ȷ������
		linkTrue:function(obj){
			var _value=D.getPreviousSibling(obj).value;
			if( _value.substr(0,7)!="http://"){
					_value="http://"+_value;
					D.getPreviousSibling(obj).value=_value;
				}
			var _value2=_value.replace(/[A-Z]/g,   function(a){return   String.fromCharCode(a.charCodeAt(0)+32)});
			var _t=D.getAncestorBy(obj,function(el){
				return el.className=='con';
			});
			
			if(_value.replace(/<[^>]+>/g,"")!=""){
				if(handle.checkUrl(_value2)){
					var a=_t.parentNode.parentNode;
					if(D.getPreviousSibling(D.getLastChild(a)).className=="msg-box"){
						D.getLastChild(a).style.display='none';
					}else{
						D.getLastChild(a).style.display='block';
					}
					return;
				}
				var as=_value.replace(/<[^>]+>/g,"");
				D.getLastChild(_t).getElementsByTagName('a')[D.getLastChild(_t).getElementsByTagName('a').length-3].title=as;
				if(as.length>32){
					as=as.substr(0,32)+"...";
				}
				D.getLastChild(_t).getElementsByTagName('a')[D.getLastChild(_t).getElementsByTagName('a').length-3].innerHTML=as;
				D.getLastChild(_t).style.display='block';
			}else{
				_t.getElementsByTagName('img')[0].style.display='inline';
			}
			obj.parentNode.parentNode.style.display='none';
			D.getLastChild(_t.parentNode.parentNode).style.display='none';
		},
		//��������-�༭����
		linkEdit:function(obj){
			obj.parentNode.style.display='none';
			D.getPreviousSibling(obj.parentNode).style.display='block';
			D.getPreviousSibling(obj.parentNode).getElementsByTagName('input')[0].value=D.getPreviousSibling(obj).title;
		},
		//URL���
		checkUrl:function(str_url){
			//���url��ʽ
			var isURL = function (){ 
				var strRegex=/.taobao.com/g;
				var Regex2=/.taobao.com/g;
				var re=new RegExp(/.taobao.com/);
				if (re.test(str_url) &&  str_url.substr(0,7)=="http://" && str_url.substr(str_url.indexOf("."),20).match(Regex2)){
				   return (false);  
				}else{  
				   return (true);  
				} 
			}
			//���Ƿ��Ĺؼ���
			var isURL2=function(){
				reg = new RegExp(/alimama|s.click.taobao.com|search8.taobao.com|mall.taobao.com|item.taobao.com|favorite.taobao.com|list.taobao.com|shop/); 
				if(str_url.match(reg)){
					return true;
				}else{
					return false;	
				}
			}
			return ( isURL() );
		},
		//��ȡ��Ӧ�Ľڵ�
		getChlid:function(el,Tag,name){
			var ln=el.getElementsByTagName(Tag);
			for(var i=0;i<ln.length;i++){
				if(ln[i].className==name){
					return ln[i];
				}
			}
		},
		getArrayChlid:function(el,Tag,name){
			var arr=[];
			var ln=el.getElementsByTagName(Tag);
			for(var i=0;i<ln.length;i++){
				if(ln[i].className==name){
					arr.push(ln[i]);
				}
			}
			return arr;
		},
		preview:function(){
			E.onDOMReady(function(){
				var _getMaxAnswer = function(){
					var j_radio1 = D.get('j_radio1');
					if (j_radio1.checked) {
						return 1;
					} else {
						return D.get('j_multiple').value;
					}
				}
			
				
				var _getEndDate=function(){
					return (D.get('J_Year').value + "-"+ D.get('J_Month').value + "-"+D.get('J_Date').value + " "+D.get('J_Hour').value);
				}

				

				var _sub=function(){
					sum=0;
					var _tr=D.getChildrenBy(D.get('vote-post'),function(el){
							return el.tagName=='TR' && ( el.style.display !='none');
						});
					var arr="";
					for(var i=0;i<_tr.length;i++){
						var imglink="";
						var title=_tr[i].getElementsByTagName('input')[0].value;
						var href=_tr[i].getElementsByTagName('a')[_tr[i].getElementsByTagName('a').length-3].title;
						if(title=="" && href!=""){
							_empty=true;
							sum++;
						}
						var j_close=D.getFirstChild(D.getFirstChild(D.getFirstChild(_tr[i]))).className;
						if(_tr[i].style.display!='none' && j_close=="j_close"){
							arr+=title+"\u0010"+ (href=="" ? " " : href) +"\u0010"+ (imglink == "" ? " " :  imglink)+"\u0011";
						}
					}
					return arr;
				}
				
				
				/*���ֲ�*/
				var Mask=new Flower_MaskLayer({
					color:"#000",
					timer:400,
					zindex:6665
				});
				E.on('j_preview','click',function(){
					D.get('maxAnswer').value = _getMaxAnswer();
					D.get('endDate').value = _getEndDate();
					D.get('j_previewKey').value="true";
					var cookie1 = TB.bom.getCookie('cookie1') || TB.bom.getCookie('_l_g_') || TB.bom.getCookie('ck1'); 
					if(cookie1==''){
						window.location.replace(location.href);
						return;
					}

					D.get('msgpost').value=editor.getData();

					D.get('j_options').value=_sub();

					/*TBͷ��̫�ߣ�����zindexֵ*/
					D.get('header').style.zIndex=3333;
					
					/*����Ԥ��ģ��*/
					if(!D.get("j_text-preview")){
						var _div=document.createElement("div");
							_div.id="j_text-preview";
							_div.className="text-preview";
						D.setStyle(_div,"display","none");
						document.body.appendChild(_div);
					}

					var link=preview_link+'?_input_charset=utf-8&time='+new Date();
					Connect.setForm(document.forms['pollForm']);
					Connect.asyncRequest('POST',link,{
						success: function(json){
							if(json.responseText.indexOf('page-feedback-msg')>-1){
								D.get("j_msgBox").innerHTML=json.responseText;
							}else{
							ohtml="<p class='p-v1'><a class='close'></a></p>";
							ohtml+=json.responseText;
							ohtml+="<p class='p-v2'><button class='close-v2' type='button'></button></p>";
							D.get("j_text-preview").innerHTML=ohtml;
							D.get("j_msgBox").innerHTML='';

							/*��ʾԤ��*/
							Mask.show(function(){
								D.setStyle("j_text-preview","display","block");
								D.setStyle("j_text-preview","zIndex",6666);
								var h= (document.documentElement.scrollTop+(document.documentElement.clientHeight-D.get("j_text-preview").offsetHeight)/2);
								var point=[(D.getDocumentWidth()-D.get("j_text-preview").offsetWidth)/2,h];
								D.setXY("j_text-preview",point);
							});
							}
						
							YAHOO.util.Event.on(window,'resize',function(){
								if(D.get('j_text-preview').style.display!='none'){
									D.setStyle("j_text-preview","left",(document.documentElement.scrollWidth-D.get("j_text-preview").offsetWidth)/2+'px')
								}
							});
							/*�رշ���*/
							var close1=D.getFirstChild(D.getFirstChild("j_text-preview")),
								close2=D.getFirstChild(D.getLastChild("j_text-preview"));
							E.on([close1,close2],'click',function(){
								D.setStyle(this.parentNode.parentNode,"display","none");
								Mask.hide();
							});
							D.get('j_previewKey').value="false";
						},
						failure: function(req) {
							//alert(req);
						}
					});

				

				});
			})	
		},
		//����ѡ��
		addItem:function(obj){
			var count=D.get('vote-post').getElementsByTagName('tr');
			for(var z=0;z<5;z++){
				var sum=0;
				for(var i=0;i<count.length;i++){
					if(count[i].style.display!='none'){
						sum++;
					}
				}
				if(sum>=100){
					D.get('j_add_item').style.display='none';
					return;
				}
				var _tmp=D.getFirstChild(D.get('vote-post')).cloneNode(true);
				_tmp.getElementsByTagName('span')[0].innerHTML="ѡ��"+(sum+1)+" : ";
				D.get('vote-post').appendChild(_tmp);
				//�������Ԫ�ص��¼�
				E.on(_tmp,'mouseover',function(){
					handle.trShow(this);
				});
				E.on(_tmp,'mouseout',function(){
					handle.trHidden(this);
				});
				E.on(handle.getChlid(_tmp,'DIV','j_close'),'click',function(){
					handle.trClose(this);
				});
				E.on(handle.getChlid(_tmp,'img','j_link'),'click',function(){
					handle.linkShow(this);
				});
				E.on(handle.getChlid(_tmp,'a','j_false'),'click',function(){
					handle.linkFalse(this);
				});
				E.on(handle.getChlid(_tmp,'input','btn_true'),'click',function(){
					handle.linkTrue(this);
				});
				E.on(handle.getChlid(_tmp,'a','j_showlink_edit'),'click',function(){
					handle.linkEdit(this);
				});
				E.on(handle.getChlid(_tmp,'a','j_showlink_del'),'click',function(){
					handle.linkDel(this);
				});
				_tmp.style.display='block';
				if((sum+1)==100){
					D.get('j_add_item').style.display='none';
				};
				
			}
		}
	}
	return handle;
})();


TB.vote.textVote.init();
