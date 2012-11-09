/*
 * Author: fatedm
 * Date: 2012-10-14
 * Des: threadList
 */
// TODO 将vm中的input改为a
/*var publishLink = "http://bbs.taobao.com/catalog/publish_thread/1338197--12933510.htm";
 *去掉这个无用变量。当时难道是因为按钮是用input表示的，所以引入这个变量的吗。。。
 *将input改为a
 */
/*去掉冗余代码
 *将发表按钮 和 收缩按钮合并为一个，方便维护
 */
KISSY.add('btn', function(S){
    var D = S.DOM,
        E = S.Event,
        isIE6 = S.UA.ie == 6 ? 1 : 0;
    return  {
        init: function(){
            this.publishBtn();
            this.slideBtn();
        },
        //发表按钮
        publishBtn:  function(){
            var parent = D.get( '.tab-opt' ),
                btn = D.get( '#toppublish'),
                bd = D.get( '#publish-list' );
            E.on( parent, 'mouseover mouseout', function(e){
                var tar = e.target,
                    el,
                    isMouseover = e.type == 'mouseover' ? 1 : 0,
                    toggle = isMouseover ? 'show' : 'hide',
                    toggleCls = isMouseover ? 'addClass' : 'removeClass';
                D[ toggle ]( bd );
                D[ toggleCls ]( btn, 'btn-fb' );
                if( isIE6 && ( tar.nodeName.toLowerCase() === 'a' || D.hasClass( D.parent( tar, '.J_PublishHref' ), 'J_PublishHref' ) ) ) {
                    el = D.parent( tar, '.J_PublishHref') ? D.parent( tar, '.J_PublishHref') : tar;
                    D[ toggleCls ]( el, 'publish-href-bg' );
                }
            })
        },
        //收缩按钮
        slideBtn: function(){
            if ( !D.get( '#j_TriggerBar' )) return;

            var trigger = D.get( '#j_TriggerBar'),
                container = D.get( '#J_Key');

            E.on( trigger, 'click', function(){
                if( D.hasClass( trigger, 'closed') && D.hasClass( container, 'key-close' ) ) {
                    D.removeClass( trigger, 'closed' );
                    D.removeClass( container, 'key-close' );
                } else {
                    D.addClass( trigger, 'closed');
                    D.addClass( container, 'key-close');
                }
            })
        }
    }
})
KISSY.use( 'btn, switchable', function(S, Btn, Sw){
    Btn.init();

    //switchable
    new Sw.Slide( '#slide-play', {
        navCls: 'tb-slide-triggers',
        contentCls: 'tb-slide-list',
        activeTriggerCls: 'current',
        effect : 'scrolly',
        easing : 'easeOutStrong'
    });
})


