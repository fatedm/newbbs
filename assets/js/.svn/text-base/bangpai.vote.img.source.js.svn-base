 /**
 * 图片投票项目 
 * @author ziya@taobao.com
 * @date   2009-12-20
 */
(function(){
if(!TB.voteImage) TB.namespace('voteImage'); 
TB.voteImage.vote=(function(){
	var D=YAHOO.util.Dom,E=YAHOO.util.Event,Connect = YAHOO.util.Connect,
	nodeId=0,
	upload={
		actionUrl: "http://bangpai.taobao.com/json/image_upload.htm",
		filter: "png|gif|jpg|jpeg"
	},
	handle={
		//创建一个投票控件
		create:function(){
			var nodeList=D.getChildrenBy(D.get("j_vote-image"),function(e){
					return e.style.display!="none" && e.tagName=="LI";
				});
			var li=document.createElement("li");
				var str_Html="<span class='vote-header'><span class='title'>选项1</span><a class='close' href='javascript:void(0)'>x</a></span>";
					str_Html+="<span class='vote-content'>";
					str_Html+="<a class='vote-imgborder'><div class='vote-table-cell'><img  class='vote-content-img' src='http://img08.taobaocdn.com/tps/i8/T1FCppXg0fXXXXXXXX-180-180.png' alt='贴入图片'/></div></a>";
					str_Html+="<input type='text' class='vote-content-text' maxlength='20' value='' />";
					str_Html+="<img class='j_link' border='0' src='http://img07.taobaocdn.com/tps/i7/T1_d4pXk0BXXXXXXXX-26-22.png' />";
					str_Html+="<span class='j_add'><input class='j_add-text' type='text' value='http://' /><input class='j_add-true' type='button' value='确定' /><a class='j_add-false'   >取消</a></span>";
					str_Html+="<span class='j_linktext'>链接到: <span class='j_link-text' title='http://'></span></span>";
					str_Html+="<span class='vote-content-edit'><a class='j_link-edit'>修改</a><a class='j_link-del'>移除</a></span>";
					str_Html+="</span>";
					str_Html+="<div class='msg' style='display:none'><p class='error'>链接不正确或者包含外链及淘宝店铺、商品、淘客等链接</p></div>";
			li.innerHTML=str_Html;
			li.id="voteImage"+(nodeId++);
			D.get("j_vote-image").appendChild(li);
			return li;
		},
		//创建多个投票控件
		creates:function(num){
			var num=num||1,arr=[];
			for(var i=0;i<num;i++){
				arr.push(handle.create());
				var ln=handle.optionText();
					if(ln.length>=60){
						D.setStyle("j_add_item","display","none");
						return arr;
					};

			}
			return arr;
		},
		//获取指定ClassName和TagName的子元素
		getChlid:function(el,Tag,name){
			var ln=el.getElementsByTagName(Tag);
			for(var i=0;i<ln.length;i++){
				if(ln[i].className==name){
					return ln[i];
				}
			}
		},
		//绑定增加按钮方法
		addBind:function(name){
			E.on(D.get(name),'click',function(){
				handle.init(4);
			});
		},
		submitBind:function(name){
			E.on(D.get(name),'click',function(){
				handle.ajaxSubmit();
			});	
		},
		//图片投票提示信息
		tips:function(){
			if(D.getFirstChild('j_vote-image').id=='voteImage0'){
				var odiv=document.createElement("div");
				odiv.id='img_vote_tips';
				D.get('voteImage0').appendChild(odiv);
				D.setStyle('voteImage0','position','relative');
				odiv.innerHTML="<a id='img_vote_tips_close' style='float:right;width:20px;height:20px;cursor:pointer'></a>";
					point=[50,255];
				D.setStyle(odiv,'position','absolute');
				D.setStyle(D.get('img_vote_tips'),"left",point[0]+"px");
				D.setStyle(odiv,"top",point[1]+"px");
				D.setStyle(odiv,'display','block');
				E.on('img_vote_tips_close','click',function(){
					this.parentNode.style.display='none';
				});

				var input=handle.getChlid(D.get('voteImage0'),"input","vote-content-text");
				input.style.color='#ccc';
				input.value='选项描述，选填';
				E.on(input,'focus',function(){
					if(input.value=='选项描述，选填'){
						input.value='';
						input.style.color='#000';
					}
				});
			}
			
		},
		//初始化绑定方法
		init:function(num){
			if(num){
				var el=handle.creates(num);
			}else{
				var el=D.getChildrenBy(D.get("j_vote-image"),function(e){
					if(!e.id){e.id="clone"+new Date()};
					return e.className!="close" && e.tagName=="LI";
				});
			}
			//进入编辑时有链接则显示
			var nodeList=D.getChildrenBy(D.get("j_vote-image"),function(e){
					return e.className=="close" && e.tagName=="LI";
				});
			for(var i=0;i<nodeList.length;i++){
				var temp=handle.getChlid(nodeList[i],"span","j_link-text");
					if(temp.title!="http://" && temp.title!=""){
						temp.parentNode.style.display="inline-block";
						if(temp.title.length>19){
							temp.innerHTML=temp.title.substr(0,19)+"...";
						}
						handle.getChlid(nodeList[i],"img","j_link").style.display='none';
					}
			}
			
			/*给控件绑定事件*/
			for(var i=0;i<el.length;i++){
				handle.show(handle.getChlid(el[i],"span","vote-content"));
				handle.link(handle.getChlid(el[i],"img","j_link"));
				handle.linkTrue(handle.getChlid(el[i],"input","j_add-true"));
				handle.imgAdd(handle.getChlid(el[i],"img","vote-content-img"));
				handle.linkFalse(handle.getChlid(el[i],"a","j_add-false"));
				handle.linkDel(handle.getChlid(el[i],"a","j_link-del"));
				handle.linkEdit(handle.getChlid(el[i],"a","j_link-edit"));
				handle.close(el[i].getElementsByTagName("a")[0]);
				
				var temp=handle.getChlid(el[i],"span","j_link-text");
				if(temp.title!="http://"){
						temp.parentNode.style.display="inline-block";
						if(temp.title.length>19){
							temp.innerHTML=temp.title.substr(0,19)+"...";
						}
						handle.getChlid(el[i],"img","j_link").style.display='none';
						handle.getChlid(el[i],"span","vote-content-edit").style.display='inline-block';
				}
			}


			
		},
		//鼠标移入变色效果
		show:function(el){
			E.on(el.parentNode,'mouseover',function(){
				D.setStyle(el,"background","#F3F3F3");
				el.parentNode.getElementsByTagName('span')[0].className='vote-header2';
			})
			E.on(el.parentNode,'mouseout',function(){
				D.setStyle(el,"background","#fff");
				el.parentNode.getElementsByTagName('span')[0].className='vote-header';
			})
		},
		//选项变换
		optionText:function(){
			var liNode=D.getChildrenBy(D.get("j_vote-image"),function(e){
					return e.style.display!="none"&& e.tagName=="LI";
				});
			for(var i=0,sum=1;i<liNode.length;i++){
				if(liNode[i].style.display!="none"){
					handle.getChlid(liNode[i],"span","title").innerHTML="选项"+sum;
					sum++;
				}
			}
			return liNode;
		},
		//关闭选项
		close:function(el){
			E.on(el,'click',function(e){
				if(!confirm("是否删除此选项?")){
					E.stopEvent(e);
					return;
				}else{
					var liNode=D.get("j_vote-image").getElementsByTagName("li");
					var sum=0;
					for(var i=0;i<liNode.length;i++){
						if(liNode[i].style.display!="none"){
							sum++;
						}
					}
					if(sum>2){
						el.parentNode.parentNode.style.display='none';
						handle.optionText();
					}else{
						alert('操作失败，选项至少为2项');
						return;
					}
					D.setStyle("j_add_item","display","block");
				}
			})
		},
		//设置连接
		link:function(el){
			D.setStyle(el,"cursor","pointer");
			E.on(el,'click',function(){
				D.setStyle(D.get('img_vote_tips'),"display","none");
				D.setStyle(el,"display","none");
				D.setStyle(D.getNextSibling(el),"display","inline-block");
				var inputValue=handle.getChlid(el.parentNode,"input","j_add-text");
				var valueTitle=handle.getChlid(el.parentNode,"span","j_link-text");
				inputValue.value=valueTitle.title;
			})
		},
		//获取时间
		getTime:function(){
			return (D.get('J_Year').value + "-"+ D.get('J_Month').value + "-"+D.get('J_Date').value + " "+D.get('J_Hour').value);
		},
		//设置连接-确定
		linkTrue:function(el){
			E.on(el,'click',function(){
				var textValue=D.getPreviousSibling(el).value;
				var showLink=D.getNextSibling(el.parentNode);
				if( textValue.substr(0,7)!="http://"){
					textValue="http://"+textValue;
					D.getPreviousSibling(el).value=textValue;
				}
				var textValue2=textValue.replace(/[A-Z]/g,   function(a){return   String.fromCharCode(a.charCodeAt(0)+32)});
				if(!url(textValue2)){
					if(textValue.length>19){
						var textValue2=textValue.substr(0,19)+"...";
					}
					handle.getChlid(showLink,"span","j_link-text").innerHTML=textValue2||textValue;
					handle.getChlid(showLink,"span","j_link-text").title=textValue;
					D.setStyle(el.parentNode,"display","none");
					D.setStyle(showLink,"display","block");
					D.setStyle(D.getNextSibling(showLink),"display","block");
					handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					}),"div","msg").style.display="none";
				}else{
					handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					}),"div","msg").style.display="block";
				}
			})
			function url(str_url){
				var Regex=/.taobao.com/g;
				var re=new RegExp(/.taobao.com/);
				if (re.test(str_url) &&  str_url.substr(0,7)=="http://" && str_url.substr(str_url.indexOf("."),20).match(Regex)){
					 return (false);
				}else{  
				   return (true);  
				} 
			}
		},
		//设置连接-取消
		linkFalse:function(el){
			D.setStyle(el,"cursor","pointer");
			E.on(el,'click',function(){
				D.setStyle(el.parentNode,"display","none");
				D.setStyle(D.getPreviousSibling(el.parentNode),"display","block");
				handle.getChlid(this.parentNode.parentNode.parentNode,"div","msg").style.display="none";
				var title=handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
				}),"span","j_link-text");
				if(title.title!='http://' && title.title!=''){
					handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					}),"span","j_linktext").style.display='inline-block';
					handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					}),"span","vote-content-edit").style.display='inline-block';
					handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					}),"img","j_link").style.display='none';
					handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					}),"input","j_add-text").value=title.title;
				}
				
			})
		},
		//设置连接-移除
		linkDel:function(el){
			D.setStyle(el,"cursor","pointer");
			E.on(el,'click',function(){
				D.setStyle(el.parentNode,"display","none");
				D.setStyle(D.getPreviousSibling(el.parentNode),"display","none");
				D.setStyle(handle.getChlid(el.parentNode.parentNode,'img','j_link'),"display","block");
				handle.getChlid(el.parentNode.parentNode,'input','j_add-text').value='http://';
				handle.getChlid(el.parentNode.parentNode,'span','j_link-text').title='http://';
				handle.getChlid(el.parentNode.parentNode,'span','j_link-text').innerHTML='';
				D.setStyle(handle.getChlid(el.parentNode.parentNode,'div','msg'),"display","none");
				if(D.getLastChild(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					})).className='msg'){
					handle.getChlid(D.getAncestorBy(el,function(e){
						return e.tagName=="LI";
					}),'div','msg').style.display='none';
				}
			})
		},
		//设置连接-编辑
		linkEdit:function(el){
			D.setStyle(el,"cursor","pointer");
			E.on(el,'click',function(){
				D.setStyle(el.parentNode,"display","none");
				D.setStyle(D.getPreviousSibling(el.parentNode),"display","none");
				D.setStyle(handle.getChlid(el.parentNode.parentNode,'span','j_add'),"display","inline-block");

			})
		},
		//添加本地上传图片
		imgAdd:function(el){
			D.setStyle(el.parentNode,"cursor","pointer");
			E.on(el.parentNode,'click',function(){
				D.setStyle(D.get("vote_img"),"display","block");
				D.get("vote_img").setAttribute('img-id',D.getAncestorBy(el,function(e){
					return e.tagName=="LI";
				}).id);
				var point=D.getXY(el);
					point=[point[0]-2,point[1]+140];
				D.setXY('vote_img',point);
			});
		},
		//上传图片Dom create
		createUpload:function(){
			E.onDOMReady(function(){
				var _div=document.createElement("div");
					_div.id="vote_img";
					_div.className="vote-img-update";
				var str_html="<a class='vote-img-update-close' id='j_update_false2'></a><form id='j_imgUpload' name='imgUpload' action='http://bangpai.daily.taobao.net/json/pic_vote_image_upload.htm' >";
					str_html+="<label>请选择本地图片上传：</label>";
					str_html+="<input type='file' size='40' id='imgFile' unselectable='on' name='imgFile'/>";
					str_html+="<label class='tips'>可以上传1M以内的JPG/JPEG/GIF/PNG图片，建议尺寸180 x 180</label>";
					str_html+="<label id='j_imgUploadTips' style='display:none'></label>";
					str_html+="<span><input type='button' id='j_imgupdate' name='waterMark' value='上传'/><a class='update-false' id='j_update_false'>取消</a></span>";
					str_html+="</form>";
					_div.innerHTML=str_html;
				document.body.appendChild(_div);
				D.setStyle(_div,"cursor","pointer");
				D.setStyle(_div,"display","none");
				
				/*关闭*/
				YAHOO.util.Event.on([D.get("j_update_false"),D.get("j_update_false2")],'click',function(e){
					E.stopEvent(e);
					D.setStyle("vote_img","display","none");
					D.get('j_imgUpload').reset();
				});
			});
		},
		//表单提交
		submit:function(e){
			D.get('j_previewKey').value='false';
			var sum=0;
			var _getMaxAnswer = function(){
				var j_radio1 = D.get('j_radio1');
				if (j_radio1.checked) {
					return 1;
				} else {
					return D.get('j_selectInput').value;
				}
			}
			var _getListNodeValue=function(){
				var arr="";
				var liNode=D.getChildrenBy(D.get("j_vote-image"),function(e){
					return e.className!="close" && e.tagName=="LI";
				});
				for(var i=0;i<liNode.length;i++){
					var imgUrl=handle.getChlid(liNode[i],"img","vote-content-img").src;
					var title=handle.getChlid(liNode[i],"input","vote-content-text").value;
					var href=handle.getChlid(liNode[i],"span","j_link-text").title;
					if(imgUrl=="http://img08.taobaocdn.com/tps/i8/T1FCppXg0fXXXXXXXX-180-180.png" && title!="" && title!='选项描述，选填' ){_empty=true;sum++;}
					if(imgUrl=="http://img08.taobaocdn.com/tps/i8/T1FCppXg0fXXXXXXXX-180-180.png" && href!="" && href!='http://' ){_empty=true;sum++;}
					if(liNode[i].style.display!="none" && imgUrl!="undefined" && liNode[i].className!="close" ){
						arr+=(title=="选项描述，选填" ? " " : title)+"\u0010"+ (href=="http://" ? " " : href) +"\u0010"+ (imgUrl=="http://img08.taobaocdn.com/tps/i8/T1FCppXg0fXXXXXXXX-180-180.png" ? " " : imgUrl)+"\u0011";
					}
				}
				return arr;
			}
			D.get('j_options').value=_getListNodeValue();
			
			if(sum>0){
				if(!confirm("您有选项未上传图片，是否继续发表?")){
					E.stopEvent(e);
					return;
				}else{
					D.get('maxAnswer').value = _getMaxAnswer();
					D.get('endDate').value = handle.getTime();
				}
			}else{
				D.get('maxAnswer').value = _getMaxAnswer();
				D.get('endDate').value = handle.getTime();
			}
		},
		/*预览数据提交*/
		ajaxSubmit:function(){
			var sum=0;
			var _getMaxAnswer = function(){
				var j_radio1 = D.get('j_radio1');
				if (j_radio1.checked) {
					return 1;
				} else {
					return D.get('j_selectInput').value;
				}
			}
			var _getListNodeValue=function(){
				var arr="";
				var liNode=D.getChildrenBy(D.get("j_vote-image"),function(e){
					return e.className!="close" && e.tagName=="LI";
				});
				for(var i=0;i<liNode.length;i++){
					var imgUrl=handle.getChlid(liNode[i],"img","vote-content-img").src;
					var title=handle.getChlid(liNode[i],"input","vote-content-text").value;
					var href=handle.getChlid(liNode[i],"span","j_link-text").title;
					if(imgUrl=="http://img08.taobaocdn.com/tps/i8/T1FCppXg0fXXXXXXXX-180-180.png" && href!=""){_empty=true;sum++;}
					if(liNode[i].style.display!="none" && imgUrl!="undefined" && liNode[i].className!="close" ){
						arr+=(title=="选项描述，选填" ? " " : title)+"\u0010"+ (href=="http://" ? " " : href) +"\u0010"+ (imgUrl=="http://img08.taobaocdn.com/tps/i8/T1FCppXg0fXXXXXXXX-180-180.png" ? " " : imgUrl)+"\u0011";
					}
				}
				return arr;
			}
			D.get('j_options').value=_getListNodeValue();
			D.get('maxAnswer').value = _getMaxAnswer();
			D.get('endDate').value = handle.getTime();

		},
		//上传图片
		insertLocalImage: function() {
            var form =  D.get("j_imgUpload"),
                uploadConfig =upload,
                imgFile = D.get("imgFile").value,
                actionUrl = upload.actionUrl,
                self = this, ext;
			
			/*判断空*/
			if(!imgFile){
				D.setStyle(D.get('vote_img'),"display","none");
				return;
			}

			/*判断类型*/
            if (imgFile && actionUrl){
				if(uploadConfig.filter !== "*") {
                    ext = imgFile.substring(imgFile.lastIndexOf(".") + 1).toLowerCase();
                    if(uploadConfig.filter.indexOf(ext) == -1) {
                        form.reset();
						alert('文件类型不正确,上传图片格式只支持 png|gif|jpg|jpeg');
						D.setStyle(D.get('vote_img'),"display","none");
                        return;
                    }
             }
			
			/*图片ajax提交*/
			form.setAttribute('enctype', 'multipart/form-data');
			Connect.setForm(form,true);
			actionUrl=imgupload_link+'?time='+new Date();
			Connect.asyncRequest("post", actionUrl,{
				   upload:function(obj){
					   try{
							var json=YAHOO.lang.JSON.parse(obj.responseText); 
							if(json.status==0){
								var imgUrl=json.imgUrl;
								var imgid=form.parentNode.getAttribute('img-id');
								var img=handle.getChlid(D.get(imgid),"img","vote-content-img");
									img.src=imgUrl;
								D.setStyle(D.get('vote_img'),"display","none");
								form.reset();
							}else if(json.status==1){
								alert(json.error);
								form.reset();
								D.setStyle(D.get('vote_img'),"display","none");
								return;
							}
					   }
					   catch(e){
							alert('上传图片失败!');
					   }
				   }
				});
			} else {
					//self._hideDialog();
			}
        },
		/*最大可选项操作绑定*/
		select:function(){
		    E.on('j_radio2','click',function(){
				if(this.checked==true){
					D.get('j_multiple_span').style.display='inline-block';
				}
			 })
			E.on('j_radio1','click',function(){
				if(this.checked==true){
					D.get('j_multiple_span').style.display='none';
				}
		    })
			if(D.get('j_radio2').checked==true){
				D.get('j_multiple_span').style.display='inline-block';
			}
		},
		preview:function(){
			/*初始化遮罩层*/
			var Mask=new Flower_MaskLayer({
				color:"#000",
				timer:400,
				zindex:6665
			});

			E.on('j_preview','click',function(e){
				/*给页面设定为预览操作*/
				D.get('j_previewKey').value='true';

				/*登录判断*/
				var cookie1 = TB.bom.getCookie('cookie1') || TB.bom.getCookie('_l_g_'); 
				if(cookie1==''){
					window.location.replace(location.href);
					return;
				}

				/*获取编辑器内容*/
				D.get('msgpost').value=editor.getData();
				
				/*TB头部太高，降低zindex值*/
				D.get('header').style.zIndex=3333;

				/*加载预览模块*/
				if(!D.get("j_text-preview")){
					var _div=document.createElement("div");
						_div.id="j_text-preview";
						_div.className="text-preview";
					D.setStyle(_div,"display","none");
					document.body.appendChild(_div);
				}
				
				/*表单数据*/
				handle.ajaxSubmit();
				
				/*ajax预览*/
				var link=preview_link+'?_input_charset=utf-8&time='+new Date();
				Connect.setForm(document.forms['pollForm']);
				Connect.asyncRequest('POST',link,{
					success: function(json){
						if(json.responseText.indexOf('page-feedback-msg')>-1){
							D.setStyle("j_msgBox","display","block");
							D.get("j_msgBox").innerHTML=json.responseText;
						}else{
						D.setStyle("j_msgBox","display","none");
						D.get("j_msgBox").innerHTML="";
						ohtml="<p class='p-v1'><a class='close'></a></p>";
						ohtml+=json.responseText;
						ohtml+="<p class='p-v2'><button class='close-v2' type='button'></button></p>";
						D.get("j_text-preview").innerHTML=ohtml;

						/*显示预览*/
						Mask.show(function(){
							D.setStyle("j_text-preview","display","block");
							D.setStyle("j_text-preview","zIndex",6666);
							var h= (document.documentElement.scrollTop+(document.documentElement.clientHeight-D.get("j_text-preview").offsetHeight)/2);
							var point=[(D.getDocumentWidth()-D.get("j_text-preview").offsetWidth)/2,h];
							D.setXY("j_text-preview",point);
						});
						}
						
						/*页面大小变化时，位置固定*/
						YAHOO.util.Event.on(window,'resize',function(){
							if(D.get('j_text-preview').style.display!='none'){
								D.setStyle("j_text-preview","left",(document.documentElement.scrollWidth-D.get("j_text-preview").offsetWidth)/2+'px')
							}
						});
						/*关闭方法*/
						var close1=D.getFirstChild(D.getFirstChild("j_text-preview")),
							close2=D.getFirstChild(D.getLastChild("j_text-preview"));
						E.on([close1,close2],'click',function(){
							D.setStyle(this.parentNode.parentNode,"display","none");
							Mask.hide();
						});
						
					},
					failure: function(req) {
						//alert(req);
					}
				});
				

				
			});
		}
	}
	return handle;
})();
})()

/*初始化*/
YAHOO.util.Event.onDOMReady(function(){
	//绑定增加按钮
	TB.voteImage.vote.addBind("j_add_item");
	//上传图片
	YAHOO.util.Event.on("j_imgupdate",'click',function(e){
		YAHOO.util.Event.stopEvent(e);
		TB.voteImage.vote.insertLocalImage();
	});
	//发布
	YAHOO.util.Event.on("j_submit",'click',function(e){
		TB.voteImage.vote.submit(e);
	});
	//创建上传图片的Dom
	TB.voteImage.vote.createUpload();
	TB.voteImage.vote.select();
	TB.voteImage.vote.preview();
})