/*
Script: Drag.Move.js
	A Drag extension that provides support for the constraining of draggables to containers and droppables.

License:
	MIT-style license.
*/

Drag.Move = new Class({

	Extends: Drag,

	options: {
		droppables: [],
		container: false
	},

	initialize: function(element, options){
		arguments.callee.parent(element, options);
		this.droppables = $$(this.options.droppables);
		this.container = $(this.options.container);
		if (this.container && $type(this.container) != 'element') this.container = $(this.container.getDocument().body);
		element = this.element;
		
		var current = element.getStyle('position');
		var position = (current != 'static') ? current : 'absolute';
		if (element.getStyle('left') == 'auto' || element.getStyle('top') == 'auto') element.position(element.getPosition(element.offsetParent));
		
		element.setStyle('position', position);
		
		this.addEvent('onStart', function(){
			this.checkDroppables();
		}, true);
	},

	start: function(event){
		if (this.container){
			var el = this.element, cont = this.container, ccoo = cont.getCoordinates(el.offsetParent), cps = {}, ems = {};

			['top', 'right', 'bottom', 'left'].each(function(pad){
				cps[pad] = cont.getStyle('padding-' + pad).toInt();
				ems[pad] = el.getStyle('margin-' + pad).toInt();
			}, this);

			var width = el.offsetWidth + ems.left + ems.right, height = el.offsetHeight + ems.top + ems.bottom;
			var x = [ccoo.left + cps.left, ccoo.right - cps.right - width];
			var y = [ccoo.top + cps.top, ccoo.bottom - cps.bottom - height];

			this.options.limit = {x: x, y: y};
		}
		arguments.callee.parent(event);
	},

	checkAgainst: function(el){
		el = el.getCoordinates();
		var now = this.mouse.now;
		return (now.x > el.left && now.x < el.right && now.y < el.bottom && now.y > el.top);
	},

	checkDroppables: function(){
		var overed = this.droppables.filter(this.checkAgainst, this).getLast();
		if (this.overed != overed){
			if (this.overed) this.fireEvent('onLeave', [this.element, this.overed]);
			if (overed){
				this.overed = overed;
				this.fireEvent('onEnter', [this.element, overed]);
			} else {
				this.overed = null;
			}
		}
	},

	drag: function(event){
		arguments.callee.parent(event);
		if (this.droppables.length) this.checkDroppables();
	},

	stop: function(event){
		this.checkDroppables();
		this.fireEvent('onDrop', [this.element, this.overed]);
		this.overed = null;
		return arguments.callee.parent(event);
	}

});

Element.implement({

	makeDraggable: function(options){
		return new Drag.Move(this, options);
	}

});
