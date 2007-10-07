/*
Script: Array.js
	Specs for Array.js

License:
	MIT-style license.
*/

describe('Array', {

	'before all': function(){
		this.local.array = [1,2,3,0,0,0];

		this.local.adder = function(a, b){
			return a + b;
		}
	},

	'should return a `filter`ed array': function(){
		var arr = this.local.array.concat([false, null, 4]).filter(Number.type);
		value_of(arr).should_be(this.local.array.concat(4));
	},

	'should return a `map`ping of an array': function(){
		var arr = this.local.array.map(function(item){
			return (item + 1);
		});

		value_of(arr).should_be([2,3,4,1,1,1]);
	},

	'should return true if `every` item matches the comparator': function(){
		var every = this.local.array.every(Number.type);
		value_of(every).should_be_true();
	},

	'should return false if `every` item do not mach the comparator': function(){
		var every = ['1',2,3,0].every(Number.type);
		value_of(every).should_be_false();
	},

	'should return false if at least `some` do not match the comparator': function(){
		var some = this.local.array.map(String).some(Number.type);
		value_of(some).should_be_false();
	},

	'should return true if `some` of the items match the comparator': function(){
		var some = ['1',2,3,0].some(Number.type);
		value_of(some).should_be_true();
	},

	'should return the `indexOf` an item': function(){
		value_of(this.local.array.indexOf(0)).should_be(3);
	},

	'should return -1 if the `indexOf` the item is not found': function(){
		value_of(this.local.array.indexOf('not found')).should_be(-1);
	},

	'should `reduce` an array to a single value': function(){
		value_of(this.local.array.reduce(this.local.adder)).should_be(6);
	},

	'should `reduce` an array to a single value with an initial value': function(){
		var reduction = ['answer', 'is', 42].reduce(function(a, b) {
			return a.concat(' ', b);
		}, 'The');
		value_of(reduction).should_be('The answer is 42');
	},

	'should return undefined if an empty array is `reduce`d': function(){
		value_of([].reduce(this.local.adder)).should_be_undefined();
	},

	'should `remove` all items in the array that match the specified item': function(){
		var array = $A(this.local.array).remove(0);
		value_of(array).should_be([1,2,3]);
	},

	'should return true if the array `contains` the specified item': function(){
		value_of(this.local.array.contains(0)).should_be_true();
	},

	'should return false if the array does not `contain` the specified item': function(){
		value_of(this.local.array.contains('not found')).should_be_false();
	},

	'should `associate` an array with a specified array': function(){
		var assoc = this.local.array.associate(['a', 'b', 'c', 'd']);
		value_of(assoc).should_be({a:1, b:2, c:3, d:0});
	},

	'should `link` an array items to a new object according to the specified matchers': function(){
		var el = document.createElement('div');
		var assoc2 = [100, 'Hello', {foo: 'bar'}, el, false].link({
			myNumber: Number.type,
			myElement: Element.type,
			myObject: Object.type,
			myString: String.type,
			myBoolean: $defined
		});

		value_of(assoc2).should_be({
			myNumber: 100,
			myElement: el,
			myObject: {foo: 'bar'},
			myString: 'Hello',
			myBoolean: false
		});
	},

	'should `extend` an array': function(){
		var arr = [1,2,3,4].extend([1,2,3,4,5,6,7]);
		value_of(arr).should_be([1,2,3,4,1,2,3,4,5,6,7]);
	},

	'should `merge` an array': function(){
		var arr = [1,2,3,4].merge([1,2,3,4,5,6,7]);
		value_of(arr).should_be([1,2,3,4,5,6,7]);
	},

	'should `include` only new items': function(){
		var arr = [1,2,3,4];
		arr.include(1);
		arr.include(5);

		value_of(arr).should_be([1,2,3,4,5]);
	},

	'should return the last item with `getLast`': function(){
		value_of(this.local.array.getLast()).should_be(0);
	},

	'should `empty` the array': function(){
		var arr = [1,2,3,4];
		arr.empty();
		value_of(arr).should_be([]);
	}

});