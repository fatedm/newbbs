//ͼƬ����չʾ����
//xiongsong
KISSY.ready(function(S){
	var D=S.DOM,E=S.Event,
		pwObj=S.query('.J-photoWrapper');
	//��ʼ��������ʵ��
	S.each(pwObj,function(obj){
		var navObj=S.query('li',obj),
		//��ȡͼƬ�����ڵ�
		picObj=S.get('img',obj),
		wrapQuteObj=S.get('.pw-des'),
		quoteObj=S.get('.des-info',obj),
		prevObj=S.get('.prev',obj),
		nextObj=S.get('.next',obj),
		ulObj=S.get('ul',obj),
		liObj=D.query('li',ulObj),
		pwObj=S.get('.pw-content',obj);
		//Ϊ��ʵ�ֽ��䣬�������ø߶�
		D.css(wrapQuteObj,'height',quoteObj.offsetHeight);
		//ѭ����LI�ڵ�����¼�
		navObj.each(function(ev,i){
			//�������class="current"������������
			if(D.hasClass(ev,'current')){
				obj.currentIndex=i;
				//��������ʾ��ǰλ��ͼƬ
				showPic(ev);
			}
			//����ҳ�루������Ҫ��
			updateCurrentPage();
			E.on(ev,'click',function(){
				//��ʾͼƬ
				showPic(ev);
			});
			//�Ƴ����߿���ֹĬ���¼�
			var aObj=S.get('a',ev);
			E.on(aObj,'click',function(e){
				e.preventDefault();
				return false;
			});
			E.on(aObj,'focus',function(){
				this.blur();
			});
		});
		//���û��ָ��current����ôĬ����ʾ��һ��ͼƬ
		if(!obj.currentIndex)showPic(navObj[0]);
		//���ݴ��ݽ�����LI�ڵ㣬����ʾͼ��
		function showPic(liObj){
			//��ȡͼƬ��ַ
			var img=S.get('img',S.get('a',liObj)),
			//��ȡ��������
				txt=S.get('blockquote',liObj);
			//��ʾͼƬ
			D.attr(picObj,'src',D.attr(img,'lazyload'));
			//��������
			quoteObj.innerHTML=txt.innerHTML;
			
			
			//�õ�ǰ����
			navObj.each(function(obj){
				if(liObj!==obj){
					D.removeClass(obj,'current');
				}
			});
			D.addClass(liObj,'current');
			//����index���Է����ⲿ�л�
			obj.currentIndex=S.indexOf(liObj,navObj);
			//���µ�ǰҳ��
			updateCurrentPage();
			//����ڵ�һҳ���� �Ϸ�ҳ������
			if(S.indexOf(liObj,navObj)<=6){
				prevObj.className="disabled-prev";
			}else{
				prevObj.className="prev";
			}
			//DW�����������⣬��������
			if(Math.ceil((obj.currentIndex+1)/7)===Math.ceil(D.query('li',ulObj).length/7)){
				nextObj.className="disabled-next";
			}else{
				nextObj.className="next";
			}
			//��ʼ������߶�
			S.Anim(D.parent(quoteObj), 'height: '+quoteObj.offsetHeight+'px', .2, 'easeOut').run();
		}

		//�˷�������obj��ҳ�룬��Ϊ������������
		function updateCurrentPage(){
			if(isNaN(obj.currentIndex)){
				obj.currentIndex=0;
			}else{
				obj.currentPage=parseInt(obj.currentIndex/7,10);
			}
		}
		//�˷���������UL��������Ч��
		function scrollRun(goOn){
			//���ȸ���ҳ��
			updateCurrentPage();
			//��ʼ׼������
			var curPage=obj.currentPage,
				//�˶�������
				goWhere,
				autoRun,
				pwWidth=S.get('.pw-content',obj).offsetWidth,
				getTail=(navObj.length%7),
				curNum=curPage*7;
			//���������
			if(goOn=='next'){
				//�ж��Ƿ�Խ����
				var step=Math.ceil((navObj[0].offsetWidth*navObj.length)/pwWidth);
				if(curPage<step-1){
					curPage++;
				}
				if(curPage==1){
					goWhere=-pwWidth;
				}else{
					goWhere=-(curPage*pwWidth);
				} 
			}
			if(goOn=='prev'){
				if(curPage<=1){
					goWhere=0;
				}else{
					goWhere=-((curPage-1)*pwWidth);
				}
			}
			//�ж��Ƿ�Խ����
			//console.log(getTail,curNum);
			S.Anim(ulObj, 'left: '+goWhere+'px', .1, 'easeOut',function(){
				//������ɺ�Ļص�����
				//ѡ�е�ǰ��һ��ͼƬ
				var _curPage=(-goWhere)/pwWidth;
				if(_curPage==0){
					if(goOn=='next'){
						showPic(navObj[0]);
					}else{
						showPic(navObj[6]);
					}
				}else{
					if(goOn=='next'){
						showPic(navObj[(_curPage*7)]);
					}else{
						showPic(navObj[(_curPage*7)+6]);
					}
				}
			}).run();
		}
		//�����ͼҲ����ʵ���л�
		E.on(picObj,'mouseup',function(ev){
			//���Ȼ�ȡindex
			var index=obj.currentIndex,nextIndex=index+1,prevIndex=index-1,x;
			if(nextIndex>=navObj.length){nextIndex=navObj.length-1;}
			if(prevIndex<0){prevIndex=0;}
			//��ȡ�������
			x=ev.layerX;
			if(!x){x=ev.offsetX;}
			//�ж��Ƿ񵽴�߽�
				//��ҳ
			var __nextPage=parseInt((obj.currentIndex+1)/7,10),
				//��ǰ����ҳ
				__curPage=parseInt((obj.currentIndex)/7,10),
				//��һҳ
				__prevPage=parseInt((obj.currentIndex-1)/7,10);
			
			if(x<ev.currentTarget.offsetWidth/2){
				if(__prevPage<__curPage){
					scrollRun('prev');
				}else{
					showPic(navObj[prevIndex]);
				}
				showPic(navObj[prevIndex]);
			}else{
				//����պ�7��ͼƬ���޸���������һ�Ż᷵�ص�1��bug
				if(!D.hasClass(liObj[nextIndex],'current')){
					if(__nextPage>__curPage){
						scrollRun('next');
					}else{
						showPic(navObj[nextIndex]);
					}
				}
			}
		});
		//���÷�ҳ��CUR���
		E.on(picObj,'mousemove click',function(ev){
			var x=ev.layerX;
			if(!x){x=ev.offsetX;}
			//������δundefined
			if(x && x>=0){
				if(x<ev.currentTarget.offsetWidth/2 && obj.currentIndex!==0){
					this.className="prev";
				}
				if(obj.currentIndex===0 && x<ev.currentTarget.offsetWidth/2  || liObj.leng<=7){
					this.className="";
				}
				if(x>ev.currentTarget.offsetWidth/2 && obj.currentIndex!==liObj.length-1){
					this.className="next";
				}
				if(x>ev.currentTarget.offsetWidth/2 && obj.currentIndex===liObj.length-1 || liObj.leng<=7){
					this.className="";
				}
			}
			
		});
		//��һҳ����һҳ�Ĵ���
		E.on(prevObj,'click',function(ev){
			//�����ǰ���ǵ�һҳ
			if(!D.hasClass(this,'disabled-prev')){
				scrollRun('prev');
			}
			ev.halt();
		});
		E.on(nextObj,'click',function(ev){
		if(!D.hasClass(this,'disabled-next')){
			//�����ǰ����ĩҳ
			scrollRun('next');
		}
			ev.halt();
		});
		//�Ƴ����Ǻܺÿ������߿�
		E.on([prevObj,nextObj],'focus',function(){
			this.blur();
		});
	});
});
