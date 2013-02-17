
var length  = function( str , type ){
    type = type || 'char';
    var length = 0;
    switch ( type ){
        case 'char':
            length = str.length;
            break;
        case 'byte':
            var oLength = str.length 
                , tmp = str.replace( /[\u0000-\u0080]/g , '**' )
                , singleLetter = tmp.length - oLength;
            length = singleLetter + (oLength - singleLetter) * 2 ;
            break;
        // case 'word':
    }

    return length;
}