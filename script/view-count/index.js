/**
 * User: fatedm
 * Date: 12-11-8
 * Time: 下午9:54
 */
/**
 * 异步获取帖子的查看数和回复数（首页是tms区块拼接）
 */
KISSY.add('script/view-count/index', function( S ){
    var D = S.DOM;
    var isDaily = location.href.indexOf( 'bbs.daily.taobao.net' ) !== -1 ? 1 : 0,
        DAILY = 'http://bbs.daily.taobao.net/json/batchGetThreadList.htm',
        ONLINE = 'http://bbs.taobao.com/json/batchGetThreadList.htm',
        URL = isDaily  ? DAILY : ONLINE;//异步请求地址
    if ( location.href.indexOf( 'local' ) !== -1 ) {
        URL = '../action/json.php';
    }

    function getCatalogAndThreadId(str){
        if( str.indexOf( 'catalog/thread/' ) === -1 ) return '0-0';
        var start = str.indexOf( 'catalog/thread/' ),
            end   = str.indexOf( '.htm' );
        return str.substring( start + 15, end )
    }
    function getThreadId( str ){
        var st = getCatalogAndThreadId( str );
        return st.split( '-' )[1];
    }
    return {
        init: function(){
            var hotImgs = D.query( '.J_Reply' ),
                that = this;

            this.catalogAndThreadIds = [];//异步发送给服务器的数据
            S.each( hotImgs, function( item ){
                var url = D.attr( item, 'href' ),
                    parent = D.hasClass( D.parent(item), 'post-reply' ) ? D.parent( item ) : 0,
                    catalogAndThreadId = getCatalogAndThreadId( url ),
                    threadId = getThreadId( url );

                item.id = 'reply' + threadId;

                if( parent ){
                    var view = D.get( '.J_View', D.prev( parent, '.post-view' ) );
                    view.id = 'view' + threadId;
                }

                that.catalogAndThreadIds.push( catalogAndThreadId );
            })
            this.ajax();
        },
        ajax: function(){
            var that = this;
            S.io({
                dataType: 'jsonp',
                url: URL,
                jsonpCallback: "callback",
                data: { threadIds: that.catalogAndThreadIds + '' },
                success: function( d ) {
                    if ( !d.status ) return;
                    var i, j,
                        infos = d.data,
                        infoId,
                        replyEl,
                        viewEl,
                        replyNum,
                        viewNum;
                    for ( i = 0, j = infos.length; i < j; i++ ) {
                        infoId = infos[i]['id'];
                        replyEl = D.get( '#reply' + infoId );
                        if( !replyEl ) return;
                        replyNum = infos[i]['reply'];
                        if(D.get( '#view' + infoId )){
                            viewEl = D.get( '#view' + infoId );
                            viewNum = infos[i]['view'];
                            D.html( viewEl, viewNum );
                            D.html( replyEl, replyNum );
                        }else{
                            D.html(replyEl, replyNum + '回复');
                        }

                    }
                }
            });
        }
    }
})