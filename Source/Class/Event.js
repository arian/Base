
define(['../Class', '../Utility/typeOf', '../Utility/merge', '../Utility/Function'], function(Class, typeOf, merge, Function){

return new Class({

	initialize: function(options){
		// TODO: once Options works again, use that.
		options = this.options = merge({
			stopped: false
		}, options || {});

		this.stopped = options.stopped;
		this.data = {};
		if (options.data && typeOf(options.data) == 'object') this.set(options.data);
	},

	set: Function.overloadSetter(function(key, value){
		this.data[key] = value;
		return this;
	}),

	get: Function.overloadGetter(function(key){
		return this.data[key];
	}),

	isStopped: function(){
		return this.stopped;
	},

	stop: function(){
		this.stopped = true;
		return this;
	}

});

});
