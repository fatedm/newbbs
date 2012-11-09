/**
 * User: fatedm
 * Date: 12-11-8
 * Time: ����9:29
 */
/**
 * ���ie6��aԪ��û��hoverα��
 * method: IE6Hover
 * param: {String} Ŀ��cls
 * param: {String} �����ʽ��cls
 * return null
 */
KISSY.add('script/hover/index', function( S ) {
    var D = S.DOM,
        E = S.Event,
        isIE6 = S.UA.ie === 6 ? 1 : 0;
    function IE6Hover( cls, hover ){
        if ( !isIE6 ) return;
        var lists = D.query( '.' + cls),
            hover = hover || 'hover';

        S.each( lists, function( item ){
            E.on(item, 'mouseenter mouseleave', function( e ){
                if ( e.type === 'mouseenter' ) {
                    D.addClass( item, hover )
                }else{
                    D.removeClass(item, hover);
                }
            })
        })
    }
    return IE6Hover;
})
