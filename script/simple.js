(function(){
    if( !window.DM ) window.DM = {};
    function $ () {
        var elements = new Array();
        if ( arguments.length === 1 ) {
            if ( typeof arguments[0] === 'string') {
                return document.getElementById( arguments[0] );
            } else if ( isArray( arguments[0] ) ) {
                for ( var i = 0; i < arguments[0].length; i++) {
                    var element = document.getElementById( arguments[0][i] );
                    elements.push( element );
                }
                return elements;
            } else {
                throw new error( 'arguments illegal' );
            }
        }

        for ( var j = 0, len = arguments.length; j < len; j++) {
            var element = arguments[j];
            element = document.getElementById( element );
            elements.push( element );
        }
        return elements;
    }
    window['DM']['$'] = $;
    function isArray ( arr ) {
        return typeof arr === 'object' && arr instanceof Array;
    }
    window['DM']['isArray'] = isArray;
    function addEvent ( node, type, listener ){
        if ( !( node = $( node ) ) ) return false;
        if ( node.addEventListener ) {
            node.addEventListener( type, listener, false);
        } else if ( node.attachEvent ){
            node['e'+ type + listener ] = listener;
            node[type + listener] = function(){
                node['e' + type + listener]( window.event );
            }
            node.attachEvent( type, node[type + listener]);
        }
    }
    window['DM']['addEvent'] = addEvent;
    function removeEvent( node, type, listener ){
        if ( !( node = $( node ) ) ) return false;
        if ( node.removeEventListener ) {
            node.removeEventListener( type, listener, false );
        } else if ( node.detachEvent ) {
            node.detachEvent( type, node[type + listener]);
            node[type + listener] = null;
        }
    }
    window['DM']['removeEvent'] = removeEvent;
     function getElementsByClassName ( className, tag, parent ) {
        parent = parent || document;
        if ( !( parent = $( parent ) ) ) return false;
         var allTags = ( tag === '*' && parent.all ) ? parent.all : parent.getELementsByTagName( tag );
         className = className.replace( /\-/g, '\\-');
     }
})()

console.log( DM.$( ['t1', 't2'] ) );
function click(){
    console.log( 't1 click' );
    DM.removeEvent( 't1', 'click', click);
}
DM.addEvent('t1', 'click', click);

