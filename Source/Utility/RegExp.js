/*
---
name: RegExp
description: Custom RegExp prototypes and generics.
...
*/

define(['../Host', '../Host/RegExp'], function(Host, RegExp){

return Host(RegExp).implement('escape', function(){
	return this.toString().replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
});

});
