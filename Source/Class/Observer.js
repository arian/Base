/*
name: Observer
description: Observer
*/

define(['../Class', './Listener', './Event', '../Host/Array'], function(Class, Listener, Event, Array){

var listenersOfType = function(object, name){
	var listeners = (object._listeners || (object._listeners = {}));
	return listeners[name] || (listeners[name] = []);
};

return new Class({

	on: function(name, fn){
		return new Listener(this, name, fn).attach();
	},

	addEventListener: function(name, fn){
		listenersOfType(this, name).push(fn);
		return this;
	},

	removeEventListener: function(name, fn){
		var listeners = listenersOfType(this, name);
		var index = Array.indexOf(listeners, fn);
		if (index != -1) listeners = listeners.splice(index, 1);
//		else if (has('dev')) throw new Error('this listener did not exist');
		return this;
	},

	dispatchEvent: function(name, event, bind){
		if (!(event instanceof Event)){
			event = new Event({data: event});
		}
		if (!bind) bind = this;
		var target = this;
		while (target){
			var listeners = listenersOfType(target, name);
			for (var i = 0; i < listeners.length; i++){
				listeners[i]([event], bind);
			}
			target = !event.isStopped() && target.getParent && target.getParent();
		}
		return this;
	}

});

});
