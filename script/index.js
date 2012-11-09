/*异步读取回帖数、浏览数*/

KISSY.use('switchable, script/view-count/index,  ie6Hover', function( S, Switchable, ViewCount, IE6Hover ){
    S.ready(function(){
         new Switchable.Tabs( '#J_Slide', {
             navCls: 'slide-nav',
             contentCls: 'slide-content',
             aria: false
         });
         IE6Hover( 'hot-list', 'hot-list-hover' );
         ViewCount.init();
     })

})
