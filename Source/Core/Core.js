/*
Script: Core.js
	MooTools - My Object Oriented JavaScript Tools.

License:
	MIT-style license.

MooTools Copyright:
	Copyright (c) 2007 Valerio Proietti, <http://mad4milk.net/>

MooTools Code & Documentation:
	The MooTools team <http://mootools.net/developers/>.

MooTools Credits:
	- Class is slightly based on Base.js <http://dean.edwards.name/weblog/2006/03/base/> (c) 2006 Dean Edwards, License <http://creativecommons.org/licenses/LGPL/2.1/>
*/

var MooTools = {
	'version': '1.2dev',
	'build': '%build%'
};

/* Section: Utility Functions */

/*
Function: $A
	Creates a copy of an Array, optionally from only a specific range. Useful for applying the Array prototypes to iterable objects such as a DOM Node collection or the arguments object.

Syntax:
	>var copiedArray = $A(iterable[, start[, length]]);

Arguments:
	iterable - (array) The iterable to copy.
	start    - (integer, optional) The starting index.
	length   - (integer, optional) The length of the resulting copied array. If not provided, the length of the returned array will be the length of the iterable minus the start value.

Returns:
	(array) The new copied array.

Examples:
	Apply Array to arguments:
	[javascript]
		function myFunction(){
			$A(arguments).each(function(argument, index){
				alert(argument);
			});
		}; //will alert all the arguments passed to the function myFunction.
	[/javascript]

	Copy an Array:
	[javascript]
		var anArray = [0, 1, 2, 3, 4];
		var copiedArray = $A(anArray); //returns [0, 1, 2, 3, 4]
		var slicedArray1 = $A(anArray, 2, 3); //returns [2, 3, 4]
		var slicedArray2 = $A(anArray, -1); //returns [4]
	[/javascript]
*/

function $A(iterable, start, length){
	start = start || 0;
	if (start < 0) start = iterable.length + start;
	length = length || (iterable.length - start);
	var array = [];
	for (var i = 0; i < length; i++) array[i] = iterable[start++];
	return array;
};

/*
Function: $augment
	Augments the first object with all the properties of the second object that are not already defined.
	Similar to extend except that it does not overwrite properties that are already defined.

Syntax:
	>$augment(original, augumentation);

Arguments:
	original     - (object) The object to copy properties to.
	augmentation - (object) The object to copy properties from.

Returns:
	(object) The augmented object.

Example:
	[javascript]
		var firstObj = {
			'name': 'John',
			'lastName': 'Doe'
		};
		var secondObj = {
			'age': '20',
			'sex': 'male',
			'lastName': 'Dorian'
		};
		$augment(firstObj, secondObj);
		//firstObj is now { 'name': 'John', 'lastName': 'Doe', 'age': '20', 'sex': 'male' };
	[/javascript]
*/

function $augment(original, augmentation){
	for (var property in augmentation){
		var old = original[property];
		if (!$defined(old)) original[property] = augmentation[property];
	}
	return original;
};

/*
Function: $chk
	Checks to see if a value exists or is 0. Useful for allowing 0.

Syntax:
	>$chk(obj);

Arguments:
	obj - (mixed) The object to inspect.

Returns:
	(boolean) If the object passed in exists or is 0, returns true. Otherwise, returns false.

Example:
	[javascript]
		function myFunction(arg){
			if($chk(arg)) alert('The object exists or is 0.');
			else alert('The object is either null, undefined, false, or ""');
		}
	[/javascript]
*/

function $chk(obj){
	return !!(obj || obj === 0);
};

/*
Function: $clear
	Clears a Timeout or an Interval.

Syntax:
	>$clear(timer);

Arguments:
	timer - (integer) The identifier of the setInterval (periodical) or setTimeout (delay) to clear.

Returns:
	null

Example:
	[javascript]
		var myTimer = myFunction.delay(5000); //Wait 5 seconds and execute myFunction.
		myTimer = $clear(myTimer); //Nevermind.
	[/javascript]

See also:
	<Function.delay>, <Function.periodical>
*/

function $clear(timer){
	clearTimeout(timer);
	clearInterval(timer);
	return null;
};

/*
Function: $defined
	Checks to see if a value is defined.

Syntax:
	>$defined(obj);

Arguments:
	obj - (mixed) The object to inspect.

Returns:
	(boolean) If the object passed is not null or undefined, returns true. Otherwise, returns false.

Example:
	[javascript]
		function myFunction(arg){
			if($defined(arg)) alert('The object is defined.');
			else alert('The object is null or undefined.');
		}
	[/javascript]
*/

function $defined(obj){
	return (obj != undefined);
};

/*
Function: $empty
	An empty function, that's it. Typically used for as a placeholder inside classes event methods.

Syntax:
	>var emptyFn = $empty;

Example:
	[javascript]
		var myFunc = $empty;
	[/javascript]
*/

function $empty(){};

/*
Function: $extend
	Copies all the properties from the second object passed in to the first object passed in.
	In myWhatever.extend = $extend, the first parameter will become myWhatever, and the extend function will only need one parameter.

Syntax:
	>$extend(original[, extended]);

Arguments:
	original - (object) The object to be extended.
	extended - (object, optional) The object whose properties will be copied to src.

Returns:
	(object) The extended object.

Examples:
	Normal extension:
	[javascript]
		var firstObj = {
			'name': 'John',
			'lastName': 'Doe'
		};
		var secondObj = {
			'age': '20',
			'sex': 'male',
			'lastName': 'Dorian'
		};
		$extend(firstObj, secondObj);
		//firstObj is now: { 'name': 'John', 'lastName': 'Dorian', 'age': '20', 'sex': 'male' };
	[/javascript]

	Without the second parameter:
	[javascript]
		var myFunction = function(){ ... };
		myFunction.extend = $extend;
		myFunction.extend(secondObj);
		//myFunction now has the properties: 'age', 'sex', and 'lastName', each with its respected values.
	[/javascript]
*/

function $extend(original, extended){
	if (!extended){
		extended = original;
		original = this;
	}
	for (var property in extended) original[property] = extended[property];
	return original;
};

/*
Function: $merge
	Merges any number of objects recursively without referencing them or their sub-objects.

Syntax:
	>var merged = $merge(obj1, obj2[, obj3[, ...]]);

Arguments:
	(objects) Any number of objects.

Returns:
	(object) The object that is created as a result of merging all the objects passed in.

Example:
	[javascript]
		var obj1 = {a: 0, b: 1};
		var obj2 = {c: 2, d: 3};
		var obj3 = {a: 4, d: 5};
		var merged = $merge(obj1, obj2, obj3); //returns {a: 4, b: 1, c: 2, d: 5}, (obj1, obj2, and obj3 are unaltered)

		var nestedObj1 = {a: {b: 1, c: 1}};
		var nestedObj2 = {a: {b: 2}};
		var nested = $merge(nestedObj1, nestedObj2); //returns: {a: {b: 2, c: 1}}
	[/javascript]
*/

function $merge(){
	var mix = {};
	for (var i = 0; i < arguments.length; i++){
		for (var property in arguments[i]){
			var ap = arguments[i][property];
			var mp = mix[property];
			if (mp && $type(ap) == 'object' && $type(mp) == 'object') mix[property] = $merge(mp, ap);
			else mix[property] = ap;
		}
	}
	return mix;
};

/*
Function: $pick
	Returns the first defined argument passed in, or null.

Syntax:
	>var picked = $pick(var1[, var2[, var3[, ...]]]);

Arguments:
	(mixed) Any number of variables.

Returns:
	(mixed) The first variable that is defined. If all variables passed in are null or undefined, returns null.

Example:
	[javascript]
		function say(infoMessage, errorMessage){
			alert($pick(errorMessage, infoMessage, 'There was no message supplied.'));
		}
	[/javascript]
*/


function $pick(){
	for (var i = 0, l = arguments.length; i < l; i++){
		if ($defined(arguments[i])) return arguments[i];
	}
	return null;
};

/*
Function: $random
	Returns a random integer number between the two passed in values.

Syntax:
	>var random = $random(min, max);

Arguments:
	min - (integer) The minimum value (inclusive).
	max - (integer) The maximum value (inclusive).

Returns:
	(integer) A random integer between min and max.

Example:
	[javascript]
		alert($random(5, 20)); //alerts a random number between 5 and 20
	[/javascript]
*/

function $random(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
Function: $splat
	Array-ifies the argument passed in if it is defined and not already an array.

Syntax:
	>var splatted = $splat(obj);

Arguments:
	obj - (mixed) Any type of variable.

Returns:
	(array) If the variable passed in is an array, returns the array. Otherwise, returns an array with the only element being the variable passed in.

Examples:
	[javascript]
		var obj = 'hello';
		$splat(obj); //returns ['hello']

		var obj2 = ['a', 'b', 'c'];
		$splat(obj2); //returns ['a', 'b', 'c']
	[/javascript]
*/

function $splat(obj){
	var type = $type(obj);
	return (type) ? ((type != 'array' && type != 'arguments') ? [obj] : obj) : [];
	/*if (!type) return [];
	if (type != 'array' && type != 'arguments') return [obj];
	return obj;*/
};

/*
Function: $time
	Returns the current time as a timestamp.

Syntax:
	>var time = $time();

Returns:
	(integer) - Current timestamp.
*/

function $time(){
	return new Date().getTime();
};

/*
Function: $try
	Tries to execute a function. Returns false if it fails.

Syntax:
	>$try(fn[, bind[, args]]);

Arguments:
	fn   - (function) The function to execute.
	bind - (object, optional: defaults to the function passed in) The object to use as 'this' in the function. For more information see <Function.bind>.
	args - (mixed, optional) Single item or array of items as arguments to be passed to the function.

Returns:
	(mixed) Standard return of the called function, or false on failure.

Example:
	[javascript]
		var result = $try(eval, window, 'some invalid javascript'); //false
	[/javascript]

Note:
	Warning: if the function passed can return false, there will be no way to know if it has been successfully executed or not.
*/

function $try(fn, bind, args){
	try {
		return fn.apply(bind || null, $splat(args));
	} catch(e){
		return false;
	}
};

/*
Function: $type
	Returns the type of object that matches the element passed in.

Syntax:
	>$type(obj);

Arguments:
	obj - (object) The object to inspect.

Returns:
	'element'    - (string) If passed object is a DOM element node.
	'textnode'   - (string) If passed object is a DOM text node.
	'whitespace' - (string) If passed object is a DOM whitespace node.
	'arguments'  - (string) If passed object is an arguments object.
	'array'      - (string) If passed object is an array.
	'object'     - (string) If passed object is an object.
	'string'     - (string) If passed object is a string.
	'number'     - (string) If passed object is a number.
	'boolean'    - (string) If passed object is a boolean.
	'function'   - (string) If passed object is a function.
	'regexp'     - (string) If passed object is a regular expression.
	'class'      - (string) If passed object is a Class (created with new Class, or the extend of another class).
	'collection' - (string) If object is a native htmlelements collection, such as childNodes, getElementsByTagName, etc.
	'window'     - (string) If object passed is the window object.
	'document'   - (string) If passed object is the document object.
	false        - (boolean) If passed object is undefined, null, NaN or none of the above.

Example:
	[javascript]
		var myString = 'hello';
		$type(myString); //returns "string"
	[/javascript]
*/

function $type(obj){
	if (obj == undefined) return false;
	if (obj.htmlElement) return 'element';
	if (obj.$family) return (obj.$family == 'number' && !isFinite(obj)) ? false : obj.$family;
	var type = typeof obj;
	if (obj.nodeName){
		switch (obj.nodeType){
			case 1: return 'element';
			case 3: return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
		}
	} else if (typeof obj.length == 'number'){
		if (obj.item) return 'collection';
		if (obj.callee) return 'arguments';
	}
	return type;
};

var Native = function(options){
	options = $extend({name: false, generics: true, browser: false, initialize: $empty, implement: $empty}, options || {});
	var name = options.name, generics = options.generics, initialize = options.initialize, implement = options.implement, browser = options.browser;
	initialize.prototype.constructor = initialize;
	var self = this;
	initialize.implement = function(properties){
		((browser) ? $augment : $extend)(this.prototype, properties);
		if (generics) self.genericize(this, properties);
		implement.call(this, properties);
		return this;
	};
	if (name) initialize.prototype.$family = name.toLowerCase();
	initialize.$family = 'native';
	initialize.constructor = Native;
	return initialize;
};

//Native.Methods = {};

Native.generic = function(object, property){
	return function(){
		var args = arguments;
		var bind = Array.prototype.shift.call(args);
		return object.prototype[property].apply(bind, args);
	};
};

Native.prototype = {
	
	genericize: function(object, properties){
		for (var property in properties){
			if (object[property] || typeof object.prototype[property] != 'function') continue;
			object[property] = Native.generic(object, property);
		}
	}

};

Native.implement = function(objects, properties){
	for (var i = 0, l = objects.length; i < l; i++) objects[i].implement(properties);
};

/*
Object: Client
	Some browser properties are attached to the Client Object for browser and platform detection.

Features:
	Client.Features.xpath - (boolean) Browser supports dom queries using xpath.
	Client.Features.xhr   - (boolean) Browser supports native XMLHTTP object.

Engine:
	Client.Engine.ie        - (boolean) True if the current browser is internet explorer (any).
	Client.Engine.ie6       - (boolean) True if the current browser is internet explorer 6.
	Client.Engine.ie7       - (boolean) True if the current browser is internet explorer 7.
	Client.Engine.gecko     - (boolean) True if the current browser is Mozilla/Gecko.
	Client.Engine.webkit    - (boolean) True if the current browser is Safari/Konqueror.
	Client.Engine.webkit419 - (boolean) True if the current browser is Safari2 / webkit till version 419.
	Client.Engine.webkit420 - (boolean) True if the current browser is Safari3 (Webkit SVN Build) / webkit over version 419.
	Client.Engine.opera     - (boolean) True if the current browser is opera.
	Client.Engine.name      - (string) The name of the engine.

Platform:
	Client.Platform.mac     - (boolean) True if the platform is mac.
	Client.Platform.windows - (boolean) True if the platform is windows.
	Client.Platform.linux   - (boolean) True if the platform is linux.
	Client.Platform.other   - (boolean) True if the platform is neither mac, windows or linux.
	Client.Platform.name    - (string) The name of the platform.

Note:
	Engine detection is entirely object-based.
*/

var Client = {
	Engine: {'name': 'unknown', 'version': ''},
	Platform: {'name': (navigator.platform.match(/(mac)|(win)|(linux)|(nix)/i) || ['Other'])[0].toLowerCase()},
	Features: {'xhr': !!(window.XMLHttpRequest), 'xpath': !!(document.evaluate)}
};

if (window.opera) Client.Engine.name = 'opera';
else if (window.ActiveXObject) Client.Engine = {'name': 'ie', 'version': (Client.Features.xhr) ? 7 : 6};
else if (!navigator.taintEnabled) Client.Engine = {'name': 'webkit', 'version': (Client.Features.xpath) ? 420 : 419};
else if (document.getBoxObjectFor != null) Client.Engine.name = 'gecko';
Client.Engine[Client.Engine.name] = Client.Engine[Client.Engine.name + Client.Engine.version] = true;

Client.Platform[Client.Platform.name] = true;

/* Native: Document */

var Document = new Native({
	
	name: 'Document',
	
	initialize: function(doc){
		if ($type(doc) == 'document') return doc;
		Document.instances.push(doc);
		doc.head = doc.getElementsByTagName('head')[0];
		doc.window = doc.defaultView || doc.parentWindow;
		return $extend(doc, this);
	},
	
	implement: function(properties){
		for (var i = 0, l = Document.instances.length; i < l; i++) $extend(Document.instances[i], properties);
	}

});

Document.instances = [];

new Document(document);

/* Native: Window */

var Window = new Native({
	
	name: 'Window',
	
	initialize: function(win){
		if ($type(win) == 'window') return win;
		Window.instances.push(win);
		
		if (typeof win.HTMLElement == 'undefined'){
			win.HTMLElement = $empty;
			if (Client.Engine.webkit) win.document.createElement("iframe"); //fixes safari 2
			win.HTMLElement.prototype = (Client.Engine.webkit) ? win["[[DOMElement.prototype]]"] : {};
		}
		
		win.HTMLElement.prototype.htmlElement = $empty;
		
		new Native({
			name: 'HTMLElement',
			initialize: win.HTMLElement,
			browser: false,
			generics: false
		});
		
		return $extend(win, this);
	},
	
	implement: function(properties){
		for (var i = 0, l = Window.instances.length; i < l; i++) $extend(Window.instances[i], properties);
	}
	
});

Window.instances = [];

new Window(window);

(function(){
	
	function natives(){
		for (var i = 0, l = arguments.length; i < l; i++){
			new Native({
				name: arguments[i],
				initialize: window[arguments[i]],
				browser: true
			});
		}
	};
	
	natives('String', 'Function', 'Number', 'Array', 'RegExp');
	
	function generic(object, methods){
		for (var i = 0, l = methods.length; i < l; i++){
			if (!object[methods[i]]) object[methods[i]] = Native.generic(object, methods[i]);
		}
	};
	
	generic(Array, ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice', 'toString', 'valueOf', 'indexOf', 'lastIndexOf']);
	generic(String, ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'replace', 'search', 'slice', 'split', 'substr', 'substring', 'toLowerCase', 'toUpperCase', 'valueOf']);

})();