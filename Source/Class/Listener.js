
define(['../Class'], function(Class){

return new Class({

	initialize: function(object, name, fn){
		this.object = object;
		this.name = name;
		this.fn = fn;
		this._bound = this.fire.bind(this);
	},

	attach: function(){
		this.object.addEventListener(this.name, this._bound);
		return this;
	},

	detach: function(){
		this.object.removeEventListener(this.name, this._bound);
		return this;
	},

	fire: function(args, bind){
		if (!this.paused) this.fn.apply(bind || this, args);
	},

	setFunction: function(fn){
		this.fn = fn;
		return this;
	},

	pause: function(){
		this.paused = true;
		return this;
	},

	resume: function(){
		this.paused = false;
		return this;
	}

});

});
