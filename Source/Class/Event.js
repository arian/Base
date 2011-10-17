
define(['../Class', '../Utility/merge'], function(Class, merge){

return new Class({

	initialize: function(options){
		// TODO: once Options works again, use that.
		options = this.options = merge({
			stopped: false,
			target: null,
			data: null
		}, options || {});

		this.stopped = options.stopped;
		this.target = options.target;
		this.data = options.data;
	},

	setTarget: function(target){
		this.target = target;
		return this;
	},

	getTarget: function(){
		return this.target;
	},

	setData: function(data){
		this.data = data;
		return this;
	},

	getData: function(){
		return this.data;
	},

	isStopped: function(){
		return this.stopped;
	},

	stop: function(){
		this.stopped = true;
		return this;
	}

});

});
