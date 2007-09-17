/*
Script: Hash.js
	Contains the Hash implementation for custom Object prototypes.

License:
	MIT-style license.
*/

/*
Native: Hash
	A Custom "Object" ({}) implementation which does not account for prototypes when setting, getting, iterating.
*/

var Hash = new Native({

	name: 'Hash',

	initialize: function(object){
		if (object){
			if ($type(object) == 'hash') return object;
			this.extend(object);
		}
		return this;
	}

});

function $H(object){
	return new Hash(object);
};

Hash.implement({

	/*
	Method: each
		Calls a function for each key-value pair in the object.

	Syntax:
		>myArray.forEach(fn[, bind]);

	Arguments:
		fn   - (function) The function which should be executed on each item in the array. This function is passed the item and its index in the array.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Example:
		[javascript]
			var hash = new Hash({first: "Sunday", second: "Monday", third: "Tuesday"});
			hash.each(function(value, key){
				alert("the " + key + " day of the week is " + value);
			}); //alerts "the first day of the week is Sunday", "the second day of the week is Monday", etc.
		[/javascript]
	*/

	each: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key)) fn.call(bind, this[key], key, this);
		}
	},

	/*
	Method: contains
		Tests for the presence of a specified key in the Hash.

	Syntax:
		>var inHash = myHash.contains(item);

	Arguments:
		key - (string) The key to search for in the Hash.

	Returns:
		(boolean) If the Hash has a defined value for the specified key, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var hash = new Hash({'a': 'one', 'b': 'two', 'c': 'three'});
			hash.contains('a'); //returns true
			hash.contains('d'); //returns false
		[/javascript]

	Notes:
		Testing for a Hash prototype will never return true. Only testing the actual properties of the Hash will return true.
	*/

	contains: function(key){
		return this.hasOwnProperty(key);
	},

	/*
	Method: extend
		Extends this Hash with the key-value pairs from the object passed in.

	Syntax:
		>myHash.extend(properties);

	Arguments:
		properties - (object) The object whose items should be extended into this Hash.

	Returns:
		(hash) This Hash, extended.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			var properties = {
				'age': '20',
				'sex': 'male',
				'lastName': 'Dorian'
			};
			hash.extend(properties);
			//hash now holds an object containing: { 'name': 'John', 'lastName': 'Dorian', 'age': '20', 'sex': 'male' };
		[/javascript]
	*/

	extend: function(properties){
		Hash.each(properties, function(value, key){
			this[key] = value;
		}, this);
		return this;
	},

	/*
	Method: merge
		Merges this Hash with the key-value pairs of the object passed in. Does not allow duplicates and is case and type sensitive.

	Syntax:
		>myHash.merge(properties);

	Arguments:
		properties - (object) The object whose items should be merged into this Hash.

	Returns:
		(hash) This Hash, merged with the new key-value pairs.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			var properties = {
				'age': '20',
				'sex': 'male',
				'lastName': 'Dorian'
			};
			hash.merge(properties);
			//hash now holds an object containing: { 'name': 'John', 'lastName': 'Doe', 'age': '20', 'sex': 'male' };
		[/javascript]
	*/

	merge: function(properties){
		Hash.each(properties, function(value, key){
			this.include(key, value);
		}, this);
		return this;
	},

	/*
	Method: remove
		Removes the specified key from the Hash.

	Syntax:
		>myHash.remove(key);

	Arguments:
		key - (string) The key to search for in the Hash.

	Returns:
		(hash) This Hash with the specified key and its value removed.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.remove('lastName');
			//hash now holds an object containing: { 'name': 'John' };
		[/javascript]
	*/

	remove: function(key){
		if (this.contains(key)) delete this[key];
		return this;
	},

	/*
	Method: get
		Retrieves a value from the hash, or if no key is specified, returns a clean copy of the object that this Hash holds.

	Syntax:
		>myHash.get([key]);

	Arguments:
		key - (string, optional) The key to search for in the Hash.

	Returns:
		(mixed) If a key is specified, returns the value that corresponds to the key if found, or null if the key doesn't exist.
			If no argument is passed, a clean copy of the object this Hash holds is returned.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.get('name'); //returns 'John'
			hash.get(); //returns { 'name': 'John', 'lastName': 'Doe' }
		[/javascript]
	*/

	get: function(key){
		if (key) return (this.contains(key)) ? this[key] : null;
		var clean = {};
		this.each(function(value, key){
			clean[key] = value;
		});
		return clean;
	},

	/*
	Method: set
		Adds a key-value pair to the hash or replaces a previous value associated with the specified key.

	Syntax:
		>myHash.set(key, value);

	Arguments:
		key   - (string) The key to insert or modify in the Hash.
		value - (mixed) The value to associate with the specified key in the Hash.

	Returns:
		(hash) This Hash with the specified key set to the specified value.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.set('name', 'Michelle'); //hash.name is now 'Michelle'
		[/javascript]
	*/

	set: function(key, value){
		if (!this[key] || this.contains(key)) this[key] = value;
		return this;
	},

	/*
	Method: empty
		Empties the hash.

	Syntax:
		>myHash.empty();

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.empty();
			//hash now holds an empty object: {}
		[/javascript]
	*/

	empty: function(){
		this.each(function(value, key){
			delete this[key];
		}, this);
	},

	/*
	Method: include
		Includes the specified key-value pair in the Hash if the key doesn't already exist.

	Syntax:
		>myHash.include(key, value);

	Arguments:
		key   - (string) The key to insert into the Hash.
		value - (mixed) The value to associate with the specified key in the Hash.

	Returns:
		(hash) This Hash with the specified key included if it did not previously exist.

	Example:
		[javascript]
			var hash = new Hash({
				'name': 'John',
				'lastName': 'Doe'
			});
			hash.include('name', 'Michelle'); //hash is unchanged
			hash.include('age', 25); //hash.age is now 25
		[/javascript]
	*/

	include: function(key, value){
		if (!this[key]) this[key] = value;
		return this;
	},

	/*
	Method: map
		Creates a new map with the results of calling a provided function on every value in the map.

	Syntax:
		>var mappedHash = myHash.map(fn[, bind]);

	Arguments:
		fn   - (function) The function to produce an element of the new Array from an element of the current one.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(array) The new mapped hash.

	Example:
		[javascript]
			var timesTwo = new Hash({a: 1, b: 2, c: 3}).map(function(item, index){
				return item * 2;
			}); //timesTwo now holds an object containing: {a: 2, b: 4, c: 6};
		[/javascript]
	*/

	map: function(fn, bind){
		var results = new Hash;
		for (var key in this){
			if (this.hasOwnProperty(key)) results.set(key, fn.call(bind, this[key], key, this));
		}
		return results;
	},

	/*
	Method: filter
		Creates a new Hash with all of the elements of the Hash for which the provided filtering function returns true.

	Syntax:
		>var filteredHash = myHash.filter(fn[, bind]);

	Arguments:
		fn   - (function) The function to test each element of the Hash. This function is passed the value and its key in the Hash.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(hash) The new filtered hash.

	Example:
		[javascript]
		var biggerThanTwenty = new Hash({a: 10, b: 20, c: 30}).filter(function(value, key){
			return value > 20;
		}); //biggerThanTwenty now holds an object containing: {c: 30}
		[/javascript]
	*/

	filter: function(fn, bind){
		var results = new Hash;
		for (var key in this){
			if (this.hasOwnProperty(key) && fn.call(bind, this[key], key, this)) results.set(key, this[key]);
		}
		return results;
	},

	/*
	Method: every
		Returns true if every value in the object satisfies the provided testing function.

	Syntax:
		>var allPassed = myHash.every(fn[, bind]);

	Arguments:
		fn   - (function) The function to test each element of the Hash. This function is passed the value and its key in the Hash.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(boolean) If every value in the Hash satisfies the provided testing function, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var areAllBigEnough = ({a: 10, b: 4, c: 25, d: 100}).every(function(value, key){
				return value > 20;
			}); //areAllBigEnough = false
		[/javascript]
	*/

	every: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && !fn.call(bind, this[key], key)) return false;
		}
		return true;
	},

	/*
	Method: some
		Returns true if at least one value in the object satisfies the provided testing function.

	Syntax:
		>var anyPassed = myHash.any(fn[, bind]);

	Arguments:
		fn   - (function) The function to test each element of the Hash. This function is passed the value and its key in the Hash.
		bind - (object, optional) The object to use as 'this' in the function. For more information see <Function.bind>.

		fn (continued):
			Signature:
				>fn(value, key, hash)

			Arguments:
				value - (mixed) The current value in the hash.
				key   - (string) The current value's key in the hash.
				hash  - (hash) The actual hash.

	Returns:
		(boolean) If any value in the Hash satisfies the provided testing function, returns true. Otherwise, returns false.

	Example:
		[javascript]
			var areAllBigEnough = ({a: 10, b: 4, c: 25, d: 100}).some(function(value, key){
				return value > 20;
			}); //isAnyBigEnough = true
		[/javascript]
	*/

	some: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && fn.call(bind, this[key], key)) return true;
		}
		return false;
	}

});