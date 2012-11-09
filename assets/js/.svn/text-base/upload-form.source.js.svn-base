// 控制上传表单，并负责和父窗口通信
// xiong_song 2010-09
// 此页有两个全局变量，可以考虑移除，其中tabs是选项卡涉及到的相关操作，点击其中一个，会disabled另一个上传控件，以保证任何时候只有一个文件被上传。


var uploadForm={},tabs;
KISSY.ready(function(S){
	var D=S.DOM;
	tabs = new S.Tabs('.tab-list',{'triggerType':'click'});
	tabs.on('switch', function(ev) {
		//禁用另一个隐藏域
		var allContent=ev.target.content.children;
		S.each(allContent,function(obj){
			//如果是当前
			if(obj===allContent[ev.currentIndex]){
				D.get('input',obj).disabled=false;
			}else{
				D.get('input',obj).disabled=true;
			}
		});
	});
});
KISSY.ready(function(S){
	var D=S.DOM,E=S.Event;
	//此方法负责渲染错误信息
	uploadForm = {
		insertTitle:function (tValue){   
			var fullFileName= new String(tValue.substring(tValue.lastIndexOf('\\') + 1)),
				fileName = fullFileName.substring(0, fullFileName.lastIndexOf('.'));
			return fullFileName;
			
		} ,  
		//判断后缀名
		lastname : function(obj){
			//获取欲上传的文件路径  
			var filepath = obj.value,
				parentObj=obj.parentNode;
				suffix=obj.getAttribute('allowType').toUpperCase(),
			//再对文件名进行截取，以取得后缀名
				last=filepath.split("."),
			//获取截取的最后一个字符串，即为后缀名  
				lastThree=last[last.length-1].toUpperCase(),
				rs=suffix.indexOf(lastThree),	
				showInfoObj=document.getElementById('show-info'),
				fileName=uploadForm.insertTitle(filepath),
				showTxtObj=D.next(D.parent(obj));
			//如果返回的结果大于或等于0，说明包含允许上传的文件类型
			if(rs<0){
				uploadForm.showInfo(obj,'选错啦，您只能选择 <b>'+suffix+'</b> 格式的文件！');
				var str='<input type=\"file\" size=\"50\" allowtype=\" '+suffix+' \" id=\"'+ obj.id +'\" name=\"'+obj.name+'\">';
				parentObj.innerHTML=str;
				E.on(D.get('input',parentObj),'change',function(){uploadForm.lastname(this);});
			}else{
				if(!fileName) { fileName = filepath; }
				uploadForm.showInfo(obj);
				return false;  
			}

		},
		//此方法有个特点，如果传递了txt，则淡出显示文本，否则淡入隐藏文本
		//obj 只能 type="file" 的对象，因为它要给 .next .parent提供定位参考，而txt则是显示的文本
		showInfo : function (obj,txt){
			var infoObj=D.next(D.parent(obj)),
				txtObj=D.get('p',infoObj);
			if(txt && txt.length>0){
				D.html(txtObj,txt);
				S.Anim(infoObj, {'opacity':'1','height':'25px' },.3,'easeIn').run();
			}else{
				S.Anim(infoObj, {'opacity':'0','height':'0' },.3,'easeOut').run();
			}
		},
		//此方法统计图片当前数量，以便发送给服务器
		updateSummary : function(){
			var summaryObj=D.get('#summary-hidden'),
				topDOM=window.top.KISSY.DOM;
			//更新图片数量
			summaryObj.value=topDOM.query('li',topDOM.get('#picListItem')).length;
		},
		getParentHidden : function(){
			var formObj=document.forms['upload-pic'],
				groupIdObj=formObj['groupId'],
				uuidObj=formObj['uuid'],
				threadIdObj=formObj['threadId'],
				//获取父窗口的标签内容
				topDOM=window.top.KISSY.DOM,
				parent_groupIdObj=topDOM.get('#J_groupId'),
				parent_uuidObj=topDOM.get('#J_uuid'),
				parent_threadIdObj=topDOM.get('#J_threadId');
			
			//更新隐藏域的值得
			groupIdObj.value = parent_groupIdObj.value;
			uuidObj.value  = parent_uuidObj.value;
			threadIdObj.value  = parent_threadIdObj.value;

		},
		//返回缩略图地址
		returnThumbnail : function(src){
			var lastIndex=src.lastIndexOf('.'),
				prevStr = src.substring(0,lastIndex),
				suffix=src.substring(lastIndex,src.length);
				//服务器返回的图片地址始终是jpg格式的
				//return prevStr+'_110x110'+suffix;
				//http://img01.taobaocdn.com/poster_pic/i1/T1Sb8BXghvXXaH.X6X.JPEG_110x110.jpg
				return src+'_110x110.jpg';
		}
	}
	//选择文件后，对其后缀名进行必要判断
	E.on([D.get('#zip-file'),D.get('#pic-file')],'change',function(){
		uploadForm.lastname(this);
	});
	
	//当提交表单那一刻，统计父窗口图片数量，以便服务器判断是否溢出
	E.on(document.forms['upload-pic'],'submit',function(ev){
		//始终停止，因为提交前要判断登陆情况，所以采用脚本方式提交
		ev.halt(true);
	});
	
	//当点击上传按钮（type="button"）时，进行必要的验证，如果通过，则上传
	E.on(D.get('#upload-file'),'click',function(ev){
		//首先更新图片数量
		uploadForm.updateSummary();
		//同步groupId uuid threadId三个隐藏域
		uploadForm.getParentHidden();
		//做一些必要的验证
		var fileObj=D.get('input',D.get('p.file',tabs.panels[tabs.activeIndex]));
		if(fileObj.value.length<1){
			uploadForm.showInfo(fileObj,'您还没有选择文件，请选择：'+D.attr(fileObj,'allowType') +'格式的文件！');
			ev.halt(true);
			return false;
		}
		//开始判断是否登陆
		//如果登陆了，则提交表单
		//否则，跳转到登录页面
		//isLoginAddress，loginAddress 是在HTML页指定的，由开发负责返回
		//这样方便回到daily测试环境
		S.getScript(isLoginAddress, function() {
			//如果用户已经登陆
			if(loginStatus===1){
				document.forms['upload-pic'].submit();
			}else{
				//跳转到登录页
				window.top.location.href=loginAddress+window.top.location.href;
			}
		}, 'gb2312');
	});

	//修改外层Iframe的高度
	var topIframeObj=window.top.document.getElementById('iframe-upload'),
		demoObj=D.get('#demo');
	window.setTimeout(function(){
		window.setInterval(function(){
			if(topIframeObj){
				topIframeObj.height=demoObj.offsetHeight;
			}
		},100);
	},1);

	var topDOM=window.top.KISSY.DOM,
		uploadInfo=topDOM.get('#upload-info p');
	if(errorMessage.length>1){
		//在父容器显示服务器传回的信息
		//不过errorMessage变量名有待商榷，因为服务器可能返回一些纯粹的提示信息
		topDOM.removeClass(uploadInfo,'hidden');
		topDOM.html(uploadInfo,errorMessage);
	}else{
		topDOM.addClass(uploadInfo,'hidden');
	}
	//通过开发返回的JSON片段生成节点，并插入到父页面
	function createPicListSelection(){
		var S=KISSY,D=S.DOM,E=S.Event,
			picListJson=picJSON.list,liNode,curObj,
			//获取外部UL
			topIframeObj=window.top.document.getElementById('picListItem'),
			//还允许上传，for将根据该变量进行循环
			allowNum,
			//获取父容器当前的LI数量，即图片数量
			liObj=D.query('li',topIframeObj),
			frameNode=window.top.document.createDocumentFragment();	
		//如果TOP已经有30张图片
		if(liObj.length>=30){
			allowNum=0;
			//否则开始上传
		}else{
			allowNum=30-liObj.length;
			if(!liObj.length || liObj.length<1){
				allowNum=30;
			}
			//首先获取顶层已经有多少张图片
			var i=0;
			for(Item in picListJson){
				//如果总和超过30，则跳出循环
				if(i>=allowNum){
					break;
				}
				curObj=picListJson[Item];
				liNode=window.top.KISSY.DOM.create('<li>'+
					'<p class="del"><input type="checkbox" class="del" /></p>'+
					'<p class="pic">'+
						//缩略图统一为jpg格式的，因此要做转换，并且加上 110x110
						'<b><img src="'+ uploadForm.returnThumbnail( curObj.imageUrl ) +'" /><u></u></b>'+
						'<a class="del">删除</a>'+
					'</p>'+
					'<p class="des">'+
						//'<del class="sensitive-words">图片描述中包含敏感词汇，请修改。<u>点击此处重新修改描述。</u></del>'+
						'<textarea></textarea>'+
						'<span>已经输入<b></b>个字，还可以输入<em></em>个字。</span>'+
						'<input type="checkbox" class="des" name="des" value="" checked="checked" />'+
						'<input type="checkbox" class="address" name="address" value="'+ curObj.imageUrl +'" checked="checked" />'+
					'</p>'+
					'<p class="control">'+
						//因为IE6不支持无href属性的A的hover，因此这里添加href属性
						'<a class="up" href="#prev"></a>'+
						'<a class="down" href="#next"></a>'+
					'</p>'+
				'</li>');
				frameNode.appendChild(liNode);
			i++;
			}
			//如果未曾有任何节点，则appendChild，否则inserBefore
			if(allowNum===30){
				topIframeObj.appendChild(frameNode);
			}else{
				D.insertBefore(frameNode,D.get('li',topIframeObj));
			}
		}
		//统计还可上传的数量
		if(window.top.uploadObj && window.top.uploadObj.statisticsRemainingNum){
			window.top.uploadObj.statisticsRemainingNum();
			
		}
		//统计还可输入的文字
		if(window.top.uploadObj && window.top.uploadObj.resetCharactor){
			window.top.uploadObj.resetCharactor();
		}
		//重置首尾的状态
		if(window.top.uploadObj && window.top.uploadObj.removeFirstEndLi){
			window.top.uploadObj.removeFirstEndLi();
		}
		//重新设置全选的状态
		if(window.top.uploadObj && window.top.uploadObj.keepChkStatus){
			window.top.uploadObj.keepChkStatus();
		}
		//将父窗口的一些隐藏域值得获取出来
		uploadForm.updateSummary();
	}
	//立即执行一次
	createPicListSelection();
});
