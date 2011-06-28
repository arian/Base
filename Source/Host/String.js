/*
---
name: String
description: ES5 String methods
...
*/

define(['../Core/Host'], function(Host){

var names = 'charAt,charCodeAt,concat,indexOf,lastIndexOf,match,quote,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase'.split(','),
	i = names.length, String_ = Host(String), proto = String.prototype;

while (i--) String_.implement(names[i], proto[names[i]]);

return String_;

});
