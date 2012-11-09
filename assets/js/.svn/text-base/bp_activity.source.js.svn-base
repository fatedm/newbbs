/*
* 帮派社区活动发起,包括:线上(下)活动切换,
* 参与活动显示，session倒计时，file文件上传等;
* by hanyu@taobao.com
* by 2010-8-5
* increase by longxiao.fq@taobao.com
* by 2010-9-14
*/
(function(){
	TB.namespace('Activity');
	/*
	 * shortcuts
	 * @private 
	 */
	var Y=YAHOO.util,
		D=Y.Dom,
		E=Y.Event,
		doc=window.document;
	/*
	 * 活动发布页--输入框默认提示;
	 * Default Hint Message
	 */
	TB.Activity.IptHint = function(){
		if(D.get('J_Tag')) {
			TB.widget.InputHint.decorate('J_Tag', {hintMessage:'活动关键字，空格或逗号或顿号隔开'});
		}
		if(D.get('J_PopupValidCode')) {
			TB.widget.InputHint.decorate('J_PopupValidCode', {hintMessage:'点击输入验证码'});
		}
	}();
	
	/*
	 * 活动发布页--活动起始及截止日历;
	 * Activity Calendar
	 */
	TB.Activity.Calendar = function(){
			 E.onContentReady('J_TimeHook', function() {
				TB.namespace('CalendarTime');
				//后期today时间可以改为服务器时间
				var D1=new Date().getTime();//当前时间
				var D2=D1+180*24*3600*1000;//三个月后时间
				var getdate=function(d){
					var D=new Date();
					D.setTime(d);
					var y=D.getFullYear(),
					m=((D.getMonth()+1)<10?'0'+(D.getMonth()+1):(D.getMonth()+1)),
					d=D.getDate()<10?'0'+D.getDate():D.getDate();
					return y+'-'+m+'-'+d;
				}
				var today=getdate(D1),threem=getdate(D2);
				
		        TB.CalendarTime.RangeTime = TB.widget.SimpleCalendar.initRange(['J_TimeOn', 'J_TimeTo'], null, null, {
		            mindate:today,
		            maxdate:threem,
		            navigator: true,
					autoMoveToNext: true
		        });
	    });
	}();
	
	 //充填时间00:00-24:00,30分钟一分割。
	 TB.namespace('Daypartition');
	 
	 //section 按照分钟单位来输入
	 TB.Daypartition['int']=function(select,section,value){
		 var day=24*60;
		 var sectionlist=[];
		 var getNow=function(){
			 var D=new Date(),
			 	 h=D.getHours(),
			 	 m=D.getMinutes();
			 return (h.toString().length==1?"0"+h:h)+":"+(m.toString().length==1?"0"+m:m);
		 }
		 
		 if(/\./.test(day/section) && section<=0){
			 throw new Error('section参数不合法，不能为负数或者不被一天整除的分钟数');
			 return;
		 }
		 sectionlist.length=day/section;
		 sectionlist[0]=0;
		 for(var i=1;i<sectionlist.length;i++){
			 sectionlist[i]=sectionlist[i-1]+section;
		 }
		 
		 var shortary=[];
		 var nowh=getNow().split(':')[0],nowm=getNow().split(':')[1];
		 
		 for(var i=0;i<sectionlist.length;i++){
			sectionlist[i]=(sectionlist[i]/60)
		        var h,s;
		        h=Math.floor(sectionlist[i]);
		        s=(sectionlist[i]-h)*60;
		        sectionlist[i]=(h.toString().length==1?"0"+h:h)+":"+(s.toString().length==1?"0"+s:s);
		        var p = document.createElement('option');
		        p.value = sectionlist[i];
				p.innerHTML = sectionlist[i];
				
				var h=sectionlist[i].split(':')[0],m=sectionlist[i].split(':')[1];
				
				D.get(select).appendChild(p);
				if(h==nowh){
					if(m==nowm){
						D.get(select).value=sectionlist[i];
					}else{
						shortary.push(sectionlist[i]);
					}
				}
		 };
		 // 判断当前距离最近的时间并赋值

	setTimeout(function() {
		if(value!=""){
		D.get(select).value = value;
		};
	}, 5);
		 
	};
	
	//金额部分的readio焦点切换
	var jmoney=D.get('J_Money');
		
		E.on('J_MoneyRadio1', 'click', function(e) {
				jmoney.value="";
		});
		
		E.on('J_MoneyRadio2', 'click', function(e) {
				jmoney.focus();
		});
		
		E.on('J_Money', 'focus', function(e) {
			D.get('J_MoneyRadio2').checked=true;
		});
		
	//提交时清空标签默认文本
		E.on('J_Activity', 'submit', function(e) {
			if(D.get('J_Tag').value=='活动关键字，空格或逗号或顿号隔开'){
				D.get('J_Tag').value="";
			};
		});
		
	
	
	/*
	 * 上传图片与截图
	 * uploadpic screenshot
	 * create by longxiao.fq
	 */
	TB.Activity.Uploadpic = function(){
		//开始上传模块
		var c160,
			imgCrop,
			save=true,
			compile=false,
			close=['J_CloseBtn','J_CancelBtn'],
			Uploadpic=new Y.popup('J_UploadBtn','J_Incision',close)['int'](),
			browsetext=D.get('J_BrowseText'),
			uptips=D.get('J_UpTips'),
			file=D.get('uploadform'),
			screenbig=D.get('J_ScreenBig'),
			preview=D.get("preview-img"),
			filehide=D.get('J_FileHide'),
			imgtype=['.jpg','.gif','.png','.jpeg'],
			action=file.action,
			w,h,crop,
			bugfix=null,
			//关闭取消后清空文本和图片
			clearinput=function(){
			browsetext.value="";
			filehide.value="";
			if(!compile){
				screenbig.innerHTML="";
				preview.innerHTML="";
			} 
			},
			uptipsset=function(msg,type){
				uptips.innerHTML=msg;
				if(type=="error"){
					D.addClass(uptips,'error-tip uptips');
				}else if(type=='success'){
					D.removeClass(uptips,'error-tip uptips');
				}
			},
			reloadimgstyle=function(inner){
			var cropArea = imgCrop.getCropCoords();
			
			var ch=cropArea.height,
				 cw=cropArea.width,
				 ct=cropArea.top,
				 cl=cropArea.left,
				dh = (h * 160)/ ch,
				dw = (w * 160) / cw, 
				dt = (dh * ct)/ h, 
				dl = (dw * cl) / w;
			if(h<=160 || w<=160){
				var hw=Math.min(h,w);
				var c=(160-hw)/2;
				var c160style=c160.style;
				c160style.height=h+'px';
				c160style.width=w+'px';
				c160style.top=(c-ct)+'px';
				c160style.left=(c-cl)+'px';
				c160style.clip="rect("+ct+"px "+(hw+cl)+"px "+(hw+ct)+"px "+cl+"px)";
			}else{
				var c160style=c160.style;
				c160style.height=dh+'px';
				c160style.width=dw+'px';
				c160style.top=-dt+'px';
				c160style.left=-dl+'px';
			}
			
			if(inner)return cropArea;
			
			},
			callback={
			//上传成功后的回调
				upload:function(o){
					//之前需要处理服务器端返回的json，判断是否404，302，202等；
					if(o.responseText!=undefined){
						uptipsset('支持JPG,JPEG,PNG,GIF图片格式,且图片小于1M','success');
						
						var callbackobj=YAHOO.lang.JSON.parse(o.responseText); 
						
						if(callbackobj.status==0){
							var html='<img src='+callbackobj.imgUrl+'_310x310.jpg id="cropper">';
						}else{
							uptipsset(callbackobj.error,'error');
							screenbig.innerHTML="";
							return;
						}
						
						//去掉浏览的按钮虚线框
						D.get('J_ScreenBig').focus();
						
						
						
						screenbig.innerHTML=html;
						preview.innerHTML=html;
						preview.getElementsByTagName('img')[0].id="copr160";
						c160=D.get("copr160"),crop = D.get("cropper");
						
						crop.onload=function(){
							h = crop.offsetHeight,
							w = crop.offsetWidth;
							if(h<=160 && w<=160){
								c160.style.left=(160-crop.offsetWidth)/2+'px';
								c160.style.top=(160-crop.offsetHeight)/2+'px';
								return null;	
							}
							
							var minh=160,minw=160,inth=160,intw=160;
							
							if(h<=160 || w<=160){
								minh=minw=inth=intw=Math.min(h,w);
							};
							
							imgCrop = new YAHOO.widget.ImageCropper('cropper',{
								initialXY:[0,0],
								minHeight:minh,
								minWidth:minw,
								initHeight :inth,
								initWidth :intw,
								status:false,
								ratio:true,
								shiftKeyTick:10
							});
							
							if(6 == YAHOO.env.ua.ie){
								var mask=D.getElementsByClassName('yui-crop-mask')[0];
								mask.style.height=h+'px';
							}
							
							reloadimgstyle();
							
							imgCrop.on('moveEvent',function(){
								reloadimgstyle();
							});
							
							imgCrop.on('resizeEvent',function(){
								reloadimgstyle();
							});
							
							imgCrop._resize.on('endResize', function() {
								var ev = arguments[0];
								if (ev.width != ev.height) {
									var adjustXY = Math.min(ev.width, ev.height);
									this.resize(null, adjustXY, adjustXY, 0, 0);
									if(!bugfix){
										bugfix = this.on('dragEvent',function(){
											imgCrop._setConstraints(true);
										})||true;
									}
								}
							});
							
						}
					}
				},
				timeout:5000,
				failure:function(o){
					uptipsset('上传请求超时','error');
					screenbig.innerHTML="";
					clearinput();
				}
			},
			imitatefile=function(){
			browsetext.value=this.value;
			//此处直接开始异步上传
			
			//图片前端规格检测函数
				var v=filehide.value,
					s=v.lastIndexOf('.'),
					extension=v.substring(s,v.length).toLowerCase(),
					eflg=false;
				imgtype.forEach(function(i){
					if(extension==i){eflg=true;}
				});
				
			if(!eflg){
				uptipsset('帮派仅支持jpg/jpeg/gif/png格式的图片','error');
				clearinput();
				return;
			}
			
			//loading bar
			screenbig.innerHTML="<p class='loadingbar'>图片上传中<br/><img src='http://img04.taobaocdn.com/tps/i4/T1ie4OXi4GXXXXXXXX-95-7.gif'></p>";
			//loading.gif
			
			//配置好后进行异步图片上传
			Y.Connect.setForm(file,true,true);
			
			Y.Connect.asyncRequest('POST', action,callback);
			};
			E.on(close,'click',clearinput);
		//加载圈图插件
		var loader = new Y.YUILoader({
			    require: ["imagecropper"],
			    loadOptional: true,
			    onSuccess:function(){
					E.on(filehide,'change',imitatefile);
				},
				timeout: 10000,
				combine: true
		});
		loader.insert();	
		//保存
		var picsave=function(){
			if(save){
			if(screenbig.getElementsByTagName('img').length!=0){
				save=false;
				var callback={
						upload:function(o){
							if(o.responseText!=undefined){
								//console.log(o.responseText)
								//失败的话，不充填并提示右边提示错误
								uptipsset('支持JPG,JPEG,PNG,GIF图片格式,且图片小于1M','success');
								
								var callbackobj2=YAHOO.lang.JSON.parse(o.responseText);
								
								if(callbackobj2.status==0){
									//成功的话执行下面的充填图片操作
									var img=doc.createElement('img');
									img.src=callbackobj2.imgUrl;
									img.alt="";
									Uploadpic.hide();
									var  outwarp=D.get('upload-img');
									outwarp.removeChild(outwarp.getElementsByTagName('img')[0]);
									outwarp.appendChild(img);
									D.get('J_UploadBtn').value="编辑活动海报";
									D.get('J_LogoUrl').value=callbackobj2.imgUrl;
									//状态
									compile=true; //说明已经保存过图像，则之后的取消都不清空图片内容
									save=true; //保存延迟
								}else{
									uptipsset(callbackobj2.error,'error');
									screenbig.innerHTML="";
									return;
								}
							}
						},
						timeout:5000,
						failure:function(o){
							uptipsset('截图程序超时，请重新保存','error');
							screenbig.innerHTML="";
							clearinput();
						}
				}
				var savepic=D.get('J_SavePic'),saveaction=savepic.action;
				
				if(imgCrop){
					if(crop.offsetHeight>160 && crop.offsetWidth>160){
						D.get('J_AvatarUrl').value=imgCrop.getCropCoords().image;
						D.get('J_AvatarWidth').value=imgCrop.getCropCoords().width;
						D.get('J_AvatarHeight').value=imgCrop.getCropCoords().height;
						D.get('J_AvatarTop').value=imgCrop.getCropCoords().top;
						D.get('J_AvatarLeft').value=imgCrop.getCropCoords().left;
					}else if(crop.offsetHeight<=160 || crop.offsetWidth<=160){
						var hw=Math.min(imgCrop.getCropCoords().width,imgCrop.getCropCoords().height);
						D.get('J_AvatarUrl').value=imgCrop.getCropCoords().image;
						D.get('J_AvatarWidth').value=hw;
						D.get('J_AvatarHeight').value=hw;
						D.get('J_AvatarTop').value=imgCrop.getCropCoords().top;
						D.get('J_AvatarLeft').value=imgCrop.getCropCoords().left;
					}
				}else{
					D.get('J_AvatarUrl').value=crop.src;
					D.get('J_AvatarWidth').value=160;
					D.get('J_AvatarHeight').value=160;
					D.get('J_AvatarTop').value=0;
					D.get('J_AvatarLeft').value=0;
				}
				
				
				if(crop.offsetHeight<=160 && crop.offsetWidth<=160){
					D.get('J_AvatarUrl').value=crop.src;
					D.get('J_AvatarWidth').value=160;
					D.get('J_AvatarHeight').value=160;
					D.get('J_AvatarTop').value=0;
					D.get('J_AvatarLeft').value=0;
				}
				
				
				//console.log(D.get('J_AvatarUrl').value);
				
				Y.Connect.setForm(savepic,true,true);
				
				Y.Connect.asyncRequest('POST', saveaction, callback);
				
			}else{
				uptipsset('你还未上传图片，无法保存','error');
			}
			}
		}
		E.on('J_SaveBtn','click',picsave);
	}();

})();
