/*
 * @data 2012/12/10
 * get value function
 * @param input {HTML element}
 * @return {string} if input value equal to it's attribute 'default-value' return empty string
                  else return input value;
 */ 
export.val = function( input ) {
    if ( !input ) return;
    var val = input.value,
        defaultValue = input.getAttribute( _placeHolderAttr ) || '';
    if( val == defaultValue ) {
        val = '';
    }
    return val;
}