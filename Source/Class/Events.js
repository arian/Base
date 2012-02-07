/*
---
name: Events
description: Events
requires: [Type, Array, Function, Class, Table]
provides: Events
...
*/

define(['../Class', '../Utility/Function', '../Utility/Array'], function(Class, Function, Array){

"use strict";

var uid = '_events';

return new Class({

	listen: Function.overloadSetter(function(type, fn){
		if (!this[uid]) this[uid] = {};

		if (!this[uid][type]) this[uid][type] = [];
		var events = this[uid][type];
		if (Array.indexOf(events, fn) == -1) events.push(fn);

		return this;
	}),

	ignore: Function.overloadSetter(function(type, fn){
		if (!this[uid]) return this;

		var events = this[uid][type];
		if (!events) return this;

		if (type == null){ //ignore all
			this[uid] = {};
		} else if (fn == null){ // ignore every of type
			this[uid][type] = []
		} else { // ignore one
			var index = Array.indexOf(events, fn);
			events.splice(events, index, 1);
		}

		return this;
	}),

	fire: function(type){
		if (!this[uid]) return this;
		var events = this[uid][type];
		if (!events) return this;

		var ignored = [];
		var ignore = this.ignore;
		this.ignore = function(){
			ignored.push(arguments);
		};

		var args = [].slice.call(arguments, 1);

		events.forEach(function(fn, bound){
			fn.apply(this, args);
		}, this);

		this.ignore = ignore;
		for (var i = 0; i < ignored.length; i++){
			this.ignore.apply(this, ignored[i]);
		}

		return this;
	}

});

});
