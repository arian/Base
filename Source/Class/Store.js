/*
---
name: Store
description: Store
requires: [Type, String.uniqueID, Class]
provides: Store
...
*/

define(['../Core/Class', '../Utility/Function'], function(Class, Function){

var uid = '_store';

var storageOf = function(object){
	return object[uid] || (object[uid] = {});
};

return new Class({

	store: Function.overloadSetter(function(key, value){
		storageOf(this)[key] = value;
	}),

	retrieve: function(key, defaultValue){
		var storage = storageOf(this);
		var value = storage[key];
		if (defaultValue != null && value == null) storage[key] = Function.from(defaultValue).call(this);
		return storage[key];
	},

	dump: Function.overloadGetter(function(key){
		var storage = storageOf(this);
		var value = storage[key];
		delete storage[key];
		return value;
	})

});

});
