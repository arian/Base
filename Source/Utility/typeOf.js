/*
---
name: typeOf
description: type of
...
*/

define('Utility/typeOf', function(){
	
var toString = Object.prototype.toString,
	types = {'[object Text]': 'textnode'},
	_types = 'Array,String,Function,Date,NodeList,Arguments,RegExp'.split(',');

for (var i = _types.length; i--;) types['[object ' + _types[i] + ']'] = _types[i].toLowerCase();

return function(item){
	if (item == null) return 'null';

	var _class = toString.call(item), type = types[_class]; 
	if (type) return type;

	type = _class.slice(8, -1).toLowerCase();

	if (type.slice(-7) == 'element') return (types[_class] = 'element');

	if (type == 'number') return isFinite(item) ? 'number' : 'null';
	if (type == 'object'){
		if (item.nodeName){
			if (item.nodeType == 1) return 'element';
			if (item.nodeType == 3) return 'textnode';
		} else if (typeof item.length == 'number'){
			if (item.callee) return 'arguments';
			if ('item' in item) return 'nodelist';
		}
	}

	return 'object';
};
	
});
