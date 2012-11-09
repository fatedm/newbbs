/*
* �������������,����:����(��)��л�,
* ������ʾ��session����ʱ��file�ļ��ϴ���;
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
	 * �����ҳ--�����Ĭ����ʾ;
	 * Default Hint Message
	 */
	TB.Activity.IptHint = function(){
		if(D.get('J_Tag')) {
			TB.widget.InputHint.decorate('J_Tag', {hintMessage:'��ؼ��֣��ո�򶺺Ż�ٺŸ���'});
		}
		if(D.get('J_PopupValidCode')) {
			TB.widget.InputHint.decorate('J_PopupValidCode', {hintMessage:'���������֤��'});
		}
	}();
	
	/*
	 * �����ҳ--���ʼ����ֹ����;
	 * Activity Calendar
	 */
	TB.Activity.Calendar = function(){
			 E.onContentReady('J_TimeHook', function() {
				TB.namespace('CalendarTime');
				//����todayʱ����Ը�Ϊ������ʱ��
				var D1=new Date().getTime();//��ǰʱ��
				var D2=D1+180*24*3600*1000;//�����º�ʱ��
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
	
	 //����ʱ��00:00-24:00,30����һ�ָ
	 TB.namespace('Daypartition');
	 
	 //section ���շ��ӵ�λ������
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
			 throw new Error('section�������Ϸ�������Ϊ�������߲���һ�������ķ�����');
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
		 // �жϵ�ǰ���������ʱ�䲢��ֵ

	setTimeout(function() {
		if(value!=""){
		D.get(select).value = value;
		};
	}, 5);
		 
	};
	
	//���ֵ�readio�����л�
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
		
	//�ύʱ��ձ�ǩĬ���ı�
		E.on('J_Activity', 'submit', function(e) {
			if(D.get('J_Tag').value=='��ؼ��֣��ո�򶺺Ż�ٺŸ���'){
				D.get('J_Tag').value="";
			};
		});
		
	
	
	/*
	 * �ϴ�ͼƬ���ͼ
	 * uploadpic screenshot
	 * create by longxiao.fq
	 */
	TB.Activity.Uploadpic = function(){
		//��ʼ�ϴ�ģ��
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
			//�ر�ȡ��������ı���ͼƬ
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
			//�ϴ��ɹ���Ļص�
				upload:function(o){
					//֮ǰ��Ҫ����������˷��ص�json���ж��Ƿ�404��302��202�ȣ�
					if(o.responseText!=undefined){
						uptipsset('֧��JPG,JPEG,PNG,GIFͼƬ��ʽ,��ͼƬС��1M','success');
						
						var callbackobj=YAHOO.lang.JSON.parse(o.responseText); 
						
						if(callbackobj.status==0){
							var html='<img src='+callbackobj.imgUrl+'_310x310.jpg id="cropper">';
						}else{
							uptipsset(callbackobj.error,'error');
							screenbig.innerHTML="";
							return;
						}
						
						//ȥ������İ�ť���߿�
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
					uptipsset('�ϴ�����ʱ','error');
					screenbig.innerHTML="";
					clearinput();
				}
			},
			imitatefile=function(){
			browsetext.value=this.value;
			//�˴�ֱ�ӿ�ʼ�첽�ϴ�
			
			//ͼƬǰ�˹���⺯��
				var v=filehide.value,
					s=v.lastIndexOf('.'),
					extension=v.substring(s,v.length).toLowerCase(),
					eflg=false;
				imgtype.forEach(function(i){
					if(extension==i){eflg=true;}
				});
				
			if(!eflg){
				uptipsset('���ɽ�֧��jpg/jpeg/gif/png��ʽ��ͼƬ','error');
				clearinput();
				return;
			}
			
			//loading bar
			screenbig.innerHTML="<p class='loadingbar'>ͼƬ�ϴ���<br/><img src='http://img04.taobaocdn.com/tps/i4/T1ie4OXi4GXXXXXXXX-95-7.gif'></p>";
			//loading.gif
			
			//���úú�����첽ͼƬ�ϴ�
			Y.Connect.setForm(file,true,true);
			
			Y.Connect.asyncRequest('POST', action,callback);
			};
			E.on(close,'click',clearinput);
		//����Ȧͼ���
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
		//����
		var picsave=function(){
			if(save){
			if(screenbig.getElementsByTagName('img').length!=0){
				save=false;
				var callback={
						upload:function(o){
							if(o.responseText!=undefined){
								//console.log(o.responseText)
								//ʧ�ܵĻ����������ʾ�ұ���ʾ����
								uptipsset('֧��JPG,JPEG,PNG,GIFͼƬ��ʽ,��ͼƬС��1M','success');
								
								var callbackobj2=YAHOO.lang.JSON.parse(o.responseText);
								
								if(callbackobj2.status==0){
									//�ɹ��Ļ�ִ������ĳ���ͼƬ����
									var img=doc.createElement('img');
									img.src=callbackobj2.imgUrl;
									img.alt="";
									Uploadpic.hide();
									var  outwarp=D.get('upload-img');
									outwarp.removeChild(outwarp.getElementsByTagName('img')[0]);
									outwarp.appendChild(img);
									D.get('J_UploadBtn').value="�༭�����";
									D.get('J_LogoUrl').value=callbackobj2.imgUrl;
									//״̬
									compile=true; //˵���Ѿ������ͼ����֮���ȡ���������ͼƬ����
									save=true; //�����ӳ�
								}else{
									uptipsset(callbackobj2.error,'error');
									screenbig.innerHTML="";
									return;
								}
							}
						},
						timeout:5000,
						failure:function(o){
							uptipsset('��ͼ����ʱ�������±���','error');
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
				uptipsset('�㻹δ�ϴ�ͼƬ���޷�����','error');
			}
			}
		}
		E.on('J_SaveBtn','click',picsave);
	}();

})();
