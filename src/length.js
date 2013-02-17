/*
 * @rely export.val
 * @desc  a tool function for counting the length of a string. It can count two type lengths.
 *	One is byte length , another is letter length.
 * @param str {string | Element} the target string or an input element
 * @param isByte {boolean} defined the type of length . 
 				TRUE  ：count the byte length
 				FALSE : count the letter length
 * @return {number} the target length
 */
export.length  = function( str , isByte ) {
    if ( str.nodeType ) {
        str = export.getValue ( str ) ;
    }
    if ( isByte ) {
        var oLength = str.length
        ,   tmp     = str.replace(/[\u0000-\u0080]/g , '**')
        ,   singleLetter = tmp.length - oLength ;
        return singleLetter + ( oLength - singleLetter ) * 2 ;
    } else {
        return str.length ;
    }
}