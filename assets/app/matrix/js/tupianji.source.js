//图片集的展示所需
//xiongsong
KISSY.ready(function(S){
	var D=S.DOM,E=S.Event,
		pwObj=S.query('.J-photoWrapper');
	//开始遍历处理实例
	S.each(pwObj,function(obj){
		var navObj=S.query('li',obj),
		//获取图片容器节点
		picObj=S.get('img',obj),
		wrapQuteObj=S.get('.pw-des'),
		quoteObj=S.get('.des-info',obj),
		prevObj=S.get('.prev',obj),
		nextObj=S.get('.next',obj),
		ulObj=S.get('ul',obj),
		liObj=D.query('li',ulObj),
		pwObj=S.get('.pw-content',obj);
		//为了实现渐变，首先设置高度
		D.css(wrapQuteObj,'height',quoteObj.offsetHeight);
		//循环给LI节点添加事件
		navObj.each(function(ev,i){
			//如果存在class="current"，则存放起索引
			if(D.hasClass(ev,'current')){
				obj.currentIndex=i;
				//并立刻显示当前位置图片
				showPic(ev);
			}
			//更新页码（滚动需要）
			updateCurrentPage();
			E.on(ev,'click',function(){
				//显示图片
				showPic(ev);
			});
			//移除虚线框并阻止默认事件
			var aObj=S.get('a',ev);
			E.on(aObj,'click',function(e){
				e.preventDefault();
				return false;
			});
			E.on(aObj,'focus',function(){
				this.blur();
			});
		});
		//如果没有指定current，那么默认显示第一张图片
		if(!obj.currentIndex)showPic(navObj[0]);
		//根据传递进来的LI节点，来显示图像
		function showPic(liObj){
			//获取图片地址
			var img=S.get('img',S.get('a',liObj)),
			//获取文字内容
				txt=S.get('blockquote',liObj);
			//显示图片
			D.attr(picObj,'src',D.attr(img,'lazyload'));
			//插入文字
			quoteObj.innerHTML=txt.innerHTML;
			
			
			//置当前高亮
			navObj.each(function(obj){
				if(liObj!==obj){
					D.removeClass(obj,'current');
				}
			});
			D.addClass(liObj,'current');
			//更新index，以方便外部切换
			obj.currentIndex=S.indexOf(liObj,navObj);
			//更新当前页码
			updateCurrentPage();
			//如果在第一页，则 上翻页不可用
			if(S.indexOf(liObj,navObj)<=6){
				prevObj.className="disabled-prev";
			}else{
				prevObj.className="prev";
			}
			//DW在这里有问题，高亮不对
			if(Math.ceil((obj.currentIndex+1)/7)===Math.ceil(D.query('li',ulObj).length/7)){
				nextObj.className="disabled-next";
			}else{
				nextObj.className="next";
			}
			//开始动画其高度
			S.Anim(D.parent(quoteObj), 'height: '+quoteObj.offsetHeight+'px', .2, 'easeOut').run();
		}

		//此方法更新obj的页码，以为滚动产生条件
		function updateCurrentPage(){
			if(isNaN(obj.currentIndex)){
				obj.currentIndex=0;
			}else{
				obj.currentPage=parseInt(obj.currentIndex/7,10);
			}
		}
		//此方法负责让UL产生滚动效果
		function scrollRun(goOn){
			//首先更新页码
			updateCurrentPage();
			//开始准备数据
			var curPage=obj.currentPage,
				//运动到哪里
				goWhere,
				autoRun,
				pwWidth=S.get('.pw-content',obj).offsetWidth,
				getTail=(navObj.length%7),
				curNum=curPage*7;
			//计算好坐标
			if(goOn=='next'){
				//判断是否超越界限
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
			//判断是否超越界限
			//console.log(getTail,curNum);
			S.Anim(ulObj, 'left: '+goWhere+'px', .1, 'easeOut',function(){
				//动画完成后的回调函数
				//选中当前第一张图片
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
		//点击大图也可以实现切换
		E.on(picObj,'mouseup',function(ev){
			//首先获取index
			var index=obj.currentIndex,nextIndex=index+1,prevIndex=index-1,x;
			if(nextIndex>=navObj.length){nextIndex=navObj.length-1;}
			if(prevIndex<0){prevIndex=0;}
			//获取相对坐标
			x=ev.layerX;
			if(!x){x=ev.offsetX;}
			//判断是否到达边界
				//下页
			var __nextPage=parseInt((obj.currentIndex+1)/7,10),
				//当前所在页
				__curPage=parseInt((obj.currentIndex)/7,10),
				//上一页
				__prevPage=parseInt((obj.currentIndex-1)/7,10);
			
			if(x<ev.currentTarget.offsetWidth/2){
				if(__prevPage<__curPage){
					scrollRun('prev');
				}else{
					showPic(navObj[prevIndex]);
				}
				showPic(navObj[prevIndex]);
			}else{
				//如果刚好7张图片，修复当点击最后一张会返回到1的bug
				if(!D.hasClass(liObj[nextIndex],'current')){
					if(__nextPage>__curPage){
						scrollRun('next');
					}else{
						showPic(navObj[nextIndex]);
					}
				}
			}
		});
		//设置翻页的CUR光标
		E.on(picObj,'mousemove click',function(ev){
			var x=ev.layerX;
			if(!x){x=ev.offsetX;}
			//可能仍未undefined
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
		//上一页和下一页的处理
		E.on(prevObj,'click',function(ev){
			//如果当前不是第一页
			if(!D.hasClass(this,'disabled-prev')){
				scrollRun('prev');
			}
			ev.halt();
		});
		E.on(nextObj,'click',function(ev){
		if(!D.hasClass(this,'disabled-next')){
			//如果当前不是末页
			scrollRun('next');
		}
			ev.halt();
		});
		//移除不是很好看的虚线框
		E.on([prevObj,nextObj],'focus',function(){
			this.blur();
		});
	});
});
