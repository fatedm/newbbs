
(function(){
	TB.namespace('zhuweiDetail'); 

	var D=YAHOO.util.Dom,
		E=YAHOO.util.Event,
		Anim=YAHOO.util.Anim;

	TB.zhuweiDetail.zhuwei = function(datas){
		var data = D.getElementsByClassName(datas.floorClass);

		var self = this;
		var _arr = [];

		var _len = data.length;
		var _popup = D.get("J_weiwang");
		var _iframe = D.get("J_zhuweiIframe");
		_iframe.hasSrc = false;
		


		//初始化函数
		this.init = function(){ 
			if(_len<1) return;
			for(var i=0;i<_len;i++){
				var obj = {};
				obj._id = data[i].id;
				obj._btn = D.getElementsByClassName(datas.btnClass,'',obj._id)[0];
				obj._list = D.getElementsByClassName(datas.listClass,'',obj._id)[0];
				obj._tableId = D.getElementsByClassName(datas.tableClass,'',obj._id)[0];
				_arr.push(obj);

				//添加点击各个助威按钮的事件
				(function(el){
					E.addListener(_arr[i]._btn,'click',function(){
						self.openZhuwei(_arr[el]);
					});
				})(i);
			_iframe.hasSrc = false;
				
				
			}
		}

		//创建遮罩层
		this.createMask = function(){
			this.mask = D.get('mask');
			var layer = this.mask;
			if(!layer){
				layer = document.createElement("div");
				layer.className = 'mask';
				layer.id = 'mask';
				document.body.appendChild(layer);
			}
			D.setStyle(layer,"opacity",0);
			D.setStyle(layer,'width',D.getDocumentWidth() + 'px')
			D.setStyle(layer,'height',D.getDocumentHeight() + 'px');
			E.addListener(window,"resize",function(){
				layer.style.width=D.getDocumentWidth()+"px";
				layer.style.height=D.getDocumentHeight() +"px";
			});	
			this.mask = layer;
		}

		//显示遮罩层
		this.showMask = function(){
			this.createMask();
			var mask = this.mask;
			D.setStyle(mask,"display","block");
			D.setStyle(mask,"opacity",0.5);
		}

		//隐藏遮罩层与弹出层
		this.hiddenPopup = function(){
			_iframe.hasSrc = false;
			D.setStyle(_popup,"display","none");
			D.setStyle(this.mask,"display","none");
			D.setStyle(this.mask,"opacity",0);
			D.setStyle(_iframe,"display","none");
		}	
		
		//显示弹出层
		this.showPopup = function(){
			D.setStyle(_popup,"display","block");

			//创建关闭按钮事件
			var close = D.get("J_close");
			if(!close){
				close = document.createElement("a");
				close.id = "J_close";
				close.className = 'close act';
				_popup.appendChild(close);
			}
			E.addListener(close,"click",function(e){
				self.hiddenPopup();
				E.stopEvent(e);
			})
		}	


		//打开助威窗口
		this.openZhuwei = function(obj){
			var cookie1 = TB.bom.getCookie('cookie1') || TB.bom.getCookie('_l_g_');
			if(!cookie1){				
				var ele=D.get("J_zhuweiIframe");
				var ele_wrap=D.get("J_weiwang");
				ele_wrap.className ="pop-up";
				D.addClass(ele,"pop-mask");
				ele.style.height="200px";
				ele_wrap.style.height="246px";
				ele.style.width="368px";
				ele_wrap.style.width="390px";
				ele_wrap.style.marginLeft = "-195px";
			}
			if(!_iframe.hasSrc){
				_iframe.src = obj._btn.getAttribute(datas.zhuweiUrl);
				_iframe.hasSrc = true;
			}
			setTimeout(function(){
				self.showMask();
				self.showPopup();
				D.setStyle(_iframe,"display","block");
			
			},500);
		}

		//添加成功返回的操作
		this.success = function(data){
			var cur_id = D.get(data.zhuweiId);
			var cur_list = D.getElementsByClassName(datas.listClass,"",cur_id )[0];
			if(!cur_list) return;
			var cur_table = D.getElementsByClassName(datas.tableClass,"",cur_id)[0];
			if(!cur_table) return;
			var zw_sum = D.getElementsByClassName(datas.sumClass,"",cur_id)[0];

			var rows = cur_table.getElementsByTagName("tr");
			if(D.getStyle(cur_list,"display") == "none"){
				D.setStyle(cur_list,"display","block");
			}

			if(rows.length==0){
				var newRow = cur_table.insertRow(0);
				newRow.insertCell(0).className="username";
				newRow.insertCell(1);
				newRow.insertCell(2).className="content";

			}else{
				var newRow = rows[0].cloneNode(true);
				rows[0].parentNode.insertBefore(newRow,rows[0]);
			}

			if(data.coin>0){				
				newRow.cells[1].className="plus";
			}else{
				newRow.cells[1].className="neg";
			}

			newRow.cells[0].innerHTML="<a target='_blank' href='"+data.userCenterLink+"'>"+data.username+"</a>";
			newRow.cells[1].innerHTML="<s></s>"+data.coin;
			newRow.cells[2].innerHTML=data.content;

			zw_sum.innerHTML = zw_sum.innerHTML*1 + data.coin*1;
			D.get("content").className='';
			self.hiddenPopup();
			window.location.replace(TB.common.parseUri(location.href)["prePath"]+TB.common.parseUri(location.href)["path"]+'?t='+Math.random()+'#'+data.zhuweiId);
		}

		//添加失败返回的操作
		this.failed = function(){
			self.hiddenPopup();
			D.get("content").className='';
			window.location.replace(location.href.replace(/#.*/,''));
		}
		
		//执行初始化函数
		this.init();
	
	};
		

})();
