/*
Script: Fx.Slide.js
	Contains <Fx.Slide>

License:
	MIT-style license.

Note:
	Fx.Slide requires an XHTML doctype.
*/

/*
Class: Fx.Slide
	The slide effect; slides an element in horizontally or vertically, the contents will fold inside.

Extends:
	<Fx>

Syntax:
	>var myFx = new Fx.Slide(element[, options]);

Arguments:
	elements - (element) The element to slide.
	options  - (object, optional) All of <Fx> options in addition to mode and wrapper.

	options (continued):
		mode    - (string: defaults to 'vertical') String to indicate what type of sliding. Can be set to 'vertical' or 'horizontal'.
		wrapper - (element: defaults to this.element) Allows to set another Element as wrapper.

Properties:
	wrapper - (element) The Element wrapping the element being slid.
	open    - (boolean) Indicates whether the slide element is visible.

Example:
	[javascript]
	var mySlider = new Fx.Slide('container').hide().toggle().chain(function(){ //hides, toggles (which acts like slideOut), and chains an alert.
		alert(mySlider.open); //true
	});
	[/javascript]

Note:
	To create the slide effect an additional Element ('div' by default) is wrapped around the given Element. This wrapper adapts the margin from the Element.
*/

Fx.Slide = new Class({

	Extends: Fx,

	options: {
		mode: 'vertical'
		/*wrapper: null*/
	},

	initialize: function(element, options){
		this.addEvent('onComplete', function(){
			this.open = (this.now[0] === 0);
			if (this.open){
				this.wrapper.setStyle(this.layout, '');
				if (Client.Engine.webkit419) this.element.remove().inject(this.wrapper);
			}
		}, true);
		arguments.callee.parent($(element), options);
		this.wrapper = $(this.options.wrapper) || new Element('div', {'styles': $extend(this.element.getStyles('margin', 'position'), {'overflow': 'hidden'})}).injectAfter(this.element).adopt(this.element);
		this.element.setStyle('margin', 0);
		this.now = [];
		this.open = true;
	},

	setNow: function(){
		for (var i = 2; i--; i) this.now[i] = this.compute(this.from[i], this.to[i]);
	},

	vertical: function(){
		this.margin = 'margin-top';
		this.layout = 'height';
		this.offset = this.element.offsetHeight;
	},

	horizontal: function(){
		this.margin = 'margin-left';
		this.layout = 'width';
		this.offset = this.element.offsetWidth;
	},

	/*
	Method: slideIn
		Slides the Element in view horizontally or vertically.

	Syntax:
		>myFx.slideIn([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement').slideOut().chain(function(){
				this.show().slideOut('horizontal');
			});
		[/javascript]
	*/

	slideIn: function(mode){
		this[mode || this.options.mode]();
		return this.start([this.element.getStyle(this.margin).toInt(), this.wrapper.getStyle(this.layout).toInt()], [0, this.offset]);
	},

	/*
	Method: slideOut
		Slides the Element out of view horizontally or vertically.

	Syntax:
		>myFx.slideOut([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				mode: 'horizontal',
				onComplete: function(){ // due to inheritance we have all the <Fx> Options.
					alert('poof!');
				}
			}).slideOut();
		[/javascript]
	*/

	slideOut: function(mode){
		this[mode || this.options.mode]();
		return this.start([this.element.getStyle(this.margin).toInt(), this.wrapper.getStyle(this.layout).toInt()], [-this.offset, 0]);
	},

	/*
	Method: hide
		Hides the element without a transition.

	Syntax:
		>myFx.hide([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				duration: 1000,
				transition: Fx.Transitions.Bounce.easeOut
			});

			myFx.hide().slideIn(); //automatically hide and show myElement.
		[/javascript]
	*/

	hide: function(mode){
		this[mode || this.options.mode]();
		this.open = false;
		return this.set([-this.offset, 0]);
	},

	/*
	Method: show
		Shows the element without a transition.

	Syntax:
		>myFx.show([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				duration: 1000,
				transition: Fx.Transitions.Bounce.easeOut
			});

			myFx.slideOut().chain(function(){
				this.show.delay(1000, this); //after 1sec show the slid Element.
			});
		[/javascript]
	*/

	show: function(mode){
		this[mode || this.options.mode]();
		this.open = true;
		return this.set([0, this.offset]);
	},

	/*
	Method: toggle
		Slides in or Out the element depending on its state.

	Syntax:
		>myFx.toggle([mode]);

	Arguments:
		mode - (string, optional) Override the passed in Fx.Slide option with 'horizontal' or 'vertical'.

	Returns:
		(class) This Fx.Slide instance.

	Example:
		[javascript]
			var myFx = new Fx.Slide('myElement', {
				duration: 1000,
				transition: Fx.Transitions.Pow.easeOut
			});

			myFx.toggle().chain(myFx.toggle); // toggle the between slideIn and Out twice.
		[/javascript]
	*/

	toggle: function(mode){
		if (this.wrapper.offsetHeight == 0 || this.wrapper.offsetWidth == 0) return this.slideIn(mode);
		return this.slideOut(mode);
	},

	increase: function(){
		this.element.setStyle(this.margin, this.now[0] + this.options.unit);
		this.wrapper.setStyle(this.layout, this.now[1] + this.options.unit);
	}

});

/*
Native: Element
	Custom Native to allow all of its methods to be used with any DOM element via the dollar function <$>.
*/

/*
Method: slideIn
	Slides this Element in view horizontally or vertically.

Syntax:
	>myElement.slideIn([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideHide().slideIn();
	[/javascript]

See Also:
	<Fx.Slide.slideIn>
*/

//auto generated

/*
Method: slideOut
	Slides this Element out of view horizontally or vertically.

Syntax:
	>myElement.slideOut([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideOut({
			duration: 1000,
			transition: Fx.Transitions.Sine.easeOut
		});
	[/javascript]

See Also:
	<Fx.Slide.slideOut>
*/

//auto generated

/*
Method: slideHide
	Hides this element without a transition.

Syntax:
	>myElement.slideHide([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideHide({
			duration: 1000,
			transition: Fx.Transitions.Bounce.easeOut
		}).slideIn(); //automatically hide and show myElement.
	[/javascript]

See Also:
	<Fx.Slide.hide>
*/

//auto generated

/*
Method: slideShow
	Shows this element without a transition.

Syntax:
	>myElement.slideShow([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myElement = $('myElement');
		myElement.slideHide().chain(function(){
			myElement.slideShow.delay(1000, myElement);
		});
	[/javascript]

See Also:
	<Fx.Slide.show>
*/

//auto generated

/*
Method: slideToggle
	Slides in or Out this element depending on its state.

Syntax:
	>myElement.slideToggle([options]);

Arguments:
	options - (object, optional) The <Fx.Slide> options parameter.

Returns:
	(class) An Fx.Slide instance.

Example:
	[javascript]
		var myFx = $('myElement').slideToggle({
			duration: 1000,
			transition: Fx.Transitions.Pow.easeOut
		}).chain(myFx.toggle); // toggle the between slideIn and Out twice. Note that myFx becomes an instance of Fx.Slide therefore toggle becomes available.
	[/javascript]

See Also:
	<Fx.Slide.toggle>
*/

(function(){
	var methods = {'slideIn': 'slideIn', 'slideOut': 'slideOut', 'slideToggle': 'toggle', 'slideHide': 'hide', 'slideShow': 'show'};
	Hash.each(methods, function(slideMethod, elementMethod){
		methods[elementMethod] = function(options){
			var slide = this.$attributes.slide;
			if (!slide){
				slide = new Fx.Slide(this, {wait: false});
				this.$attributes.slide = slide.wrapper.$attributes.slide = slide;
			}
			if (options) slide.setOptions(options);
			return slide[slideMethod]();
		};
	});
	Element.implement(methods);
})();
