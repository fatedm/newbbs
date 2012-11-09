 (function(){
	var D=YAHOO.util.Dom,E=YAHOO.util.Event;
	//获取年月日时4个Select Domobject
	var t=D.get('j_time').getElementsByTagName('select');
	var yearSelect=t[0],monthSelect=t[1],daySelect=t[2],hourSelect=t[3];
	//定义当前的时间，年，月，日，小时
	var myDate = new Date(),y=myDate.getFullYear(),m=myDate.getMonth()+1,d=myDate.getDate(),h=myDate.getHours();
	//定义k为选中月的 day (天数)
	var k=0;
	var Matrix={
		//判断是否是闰年;
		isLeapYear:function(year){
			 return (0==year%4&&((year%100!=0)||(year%400==0)));
		},
		//获取选中月的天数
		getK:function(m,y){
			if(this.isLeapYear(y) && m==2){
				k=29;
			}else{
				if(m==2){
					k=28;
				}else{
					if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12){
						k=31;
					}else{
						k=30;
					}
				}
			}
			return k;
		},
		//设置年份 今年和明年
		setYear:function(){
			yearSelect.options[0]= new Option(y,y);
			yearSelect.options[1]= new Option(y+1,y+1);
		},
		//年份选择器事件
		yearchange:function(){
			if(this.value!=0){
				if(t[0].value==y){
					t[1].options.length=0;
					for(var i=m;i<13;i++){
						t[1].options.add(new Option(i,i));
					}
				}
				else{
					t[1].options.length=0;
					for(var i=1;i<13;i++){
						t[1].options.add(new Option(i,i));
					}
				}
			}
		},
		//月份选择器事件
		yuechang:function(){
			if(this.value!=0){
				if(yearSelect.value==y && monthSelect.value==m){
					daySelect.options.length=0;
					for(var i=d;i<Matrix.getK(monthSelect.value,yearSelect.value)+1;i++){
						daySelect.options.add(new Option(i,i));
					}
				}else{
					daySelect.options.length=0;
					for(var i=1;i<Matrix.getK(monthSelect.value,yearSelect.value)+1;i++){
						daySelect.options.add(new Option(i,i));
					}
				}
			}
		},
		//日期天数选择器事件
		daychange:function(){
			var self=this;
			if(this.value!=0){
				if(daySelect.value==d && yearSelect.value==y && monthSelect.value==m){
					hourSelect.options.length=0;
					for(var i=h+1;i<24;i++){
						hourSelect.options.add(new Option(i+"时",i));
					}
				}else{
					hourSelect.options.length=0;
					for(var i=0;i<24;i++){
						hourSelect.options.add(new Option(i+"时",i));
					}
				}
			}
		},
		//绑定select选择器事件
		bind:function(){
			var self=this;
			E.on(yearSelect,'change',function(){
				self.yearchange();
				self.yuechang();
				self.daychange();
			});
			E.on(monthSelect,'change',function(){
				self.yuechang();
				self.daychange();
			});
			E.on(daySelect,'change',function(){
				self.daychange();
			});
		},
		//初始化
		init:function(){
			this.bind();
			this.setYear();
			this.yearchange();
			this.yuechang();
			this.daychange();
			yearSelect.value=yearSelect.options[0].value;
			var k2=this.getK(monthSelect.value,yearSelect.value);
			var d2=d+15;
			if(d2>k2){
				d2=d2-k2;
				if(m+1<13){
					monthSelect.value=m+1;
				}else{
					yearSelect.value=yearSelect.options[1].value;
					this.yearchange();
					monthSelect.value=1;
				}
				this.yuechang();
				daySelect.value=d2;
				this.daychange();
			}else{
				this.yearchange();
				this.yuechang();
				hourSelect.options.length=0;
					for(var i=0;i<24;i++){
						hourSelect.options.add(new Option(i+"时",i));
					}
				daySelect.value=d+15;
				hourSelect.value=h+1;
			}
		}
	}
	Matrix.init();
})();