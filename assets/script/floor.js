/**
 *论坛detail页盖楼优化：
 *1.后台盖楼消耗过大，改为由前端控制展现盖楼。
 *2.
 */
KISSY.add('floor', function(S){
	var D = S.DOM,
		E = S.Event,
		TPL_START = '<div class="citation">',
		TPL_END   = '</div>',
		TPL_TITLE = ['<div class="citation-title clearfix"><span class="user-name">原帖由', '楼 ', ' 发表</span><span class="citation-number">', '</span></div>'];
	return S.Floor = {
		reply : REPLY,
		init : function(){
			if(!this.reply) return;
			this.floorReply = this.reply.floorReply;
			if(!this.floorReply.length) return;
			var i, j;
			for(i = 0, j = this.floorReply.length; i < j; i++){
				this.render(i);
			}
		},
		render : function(k){
			var o = this.floorReply[k],
				isTop = o.isTop;
			if(!!o.isRepeat){
				this.createRepeat(k, isTop);
			}else{
				this.create(k, isTop);
			}
			
		},
		createRepeat : function(k, isTop){
			var bd = isTop ?  D.get('#rt' + this.floorReply[k].replyId) : D.get('#r' + this.floorReply[k].replyId),
				i, replies = this.floorReply[k].replies,
				j = replies.length,
				slideBtn = '<p class="slide-ci"><span class="slide-citation" onclick="KISSY.Floor.create(' + k  + ',' + isTop + ')" >展开更多楼层<s></s></span></p>',
				_title_0 = TPL_TITLE[0] + replies[0].floor + TPL_TITLE[1] + replies[0].nick + TPL_TITLE[2] + j + TPL_TITLE[3],
				_bd_0 = replies[0].detail,
				_title_end = TPL_TITLE[0] + replies[j-1].floor + TPL_TITLE[1] + replies[j-1].nick + TPL_TITLE[2] + 1 + TPL_TITLE[3],
				_bd_end = replies[j-1].detail,
				_html = TPL_START +
							TPL_START + 
								TPL_START +
									_title_end + 
									_bd_end + 
								TPL_END + 
								slideBtn + 
							TPL_END + 
							_title_0 + 
							_bd_0 + 
						TPL_END;

				D.html(bd, _html);		
				
		},
		create : function(k, isTop){
			var bd = isTop ? D.get('#rt' + this.floorReply[k].replyId) : D.get('#r' + this.floorReply[k].replyId),
				i, j,
				replies = this.floorReply[k].replies, 				
				title,
				content,
				end,
				_arr = [],
				html;
			for( i = 0, j = replies.length; i < j; i++){
				title = TPL_TITLE[0] + replies[i].floor + TPL_TITLE[1] +  replies[i].nick + TPL_TITLE[2] + (j - i) + TPL_TITLE[3];								
				content = replies[i].detail;				
				end = TPL_END;			
				if(i == 0){
					_arr = [TPL_START, title, content,end];									
				}else{
					_arr.splice(i, 0, TPL_START, title, content, end);					
				}
			}
			html = _arr.join('');
			D.html(bd, '');
			D.html(bd, html);
			
		}
	}
})
KISSY.Floor.init();