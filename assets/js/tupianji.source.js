/*
	图片集功能展现
	xiongsong
	最后修改：当切换图片时，增加PV计数功能
*/
KISSY.ready(function(S){
    S.getScript('http://a.tbcdn.cn/s/kissy/1.1.6/sizzle/sizzle-pkg-min.js',function(){
	var D=S.DOM,E=S.Event,
		//获取第一个计数埋点
		pvImg=D.query('img[src*=http://www.atpanel.com/1.gif]')[0];
	//PV计数
	function pvCount(){
		var tmp=D.attr(pvImg,'src').split('?'),
			host=tmp[0],
			monitorURI,
			search=tmp[1].split('&'),
			pvMonitor=new Image();
		for (var idx=0; idx<search.length; idx++){
			if (search[idx].indexOf('pre')!=-1){
				search.splice(idx,1);
			}
		}
		monitorURI=host+'?'+search.join('&');
		pvMonitor.src=monitorURI+'&cachepv='+Math.random();
		//if(window.console){console.log(pvMonitor);}
	}

	//开始遍历处理实例
	S.each(S.query('.J-photoWrapper'),function(obj){
		var navObj=S.query('li',obj),
		//获取图片容器节点
		picObj=S.get('img',obj),
		wrapQuteObj=S.get('.pw-des'),
		quoteObj=S.get('.des-info',obj),
		prevObj=S.get('.prev',obj),
		nextObj=S.get('.next',obj),
		ulObj=S.get('ul',obj),
		liObj=D.query('li',ulObj),
        scrollTop = D.offset(obj).top;
		//为了实现渐变，首先设置高度
		D.css(wrapQuteObj,'height',quoteObj.offsetHeight);
		//循环给LI节点添加事件
		S.each(navObj,function(ev,i){
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
			});
		});
		//如果没有指定current，那么默认显示第一张图片
		if(!obj.currentIndex)showPic(navObj[0]);
		//根据传递进来的LI节点，来显示图像
		function showPic(liObj){
			//如果目的地和当前是同一对象，就不需要显示了
			if(D.hasClass(liObj,'current')){return;}
			//console.log(liObj);
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
			//PV计数
			pvCount();
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
				pwWidth=S.get('.pw-content',obj).offsetWidth;
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
			var _curPage=(-goWhere)/pwWidth;
			//首先计算好要滚动到的位置
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
			//以动画效果来展现动画效果
			S.Anim(ulObj, 'left: '+goWhere+'px', .2, 'easeOut').run();
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
});

