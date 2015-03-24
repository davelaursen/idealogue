describe('UtilityFactory', function() {
	var util;

	beforeEach(module('idealogue'));

	beforeEach(inject(function(_Util_) {
		util = _Util_;
	}));

	describe('randomUUID', function() {
		it('should return a string in the expected UUID format', function() {
			var uuid = util.randomUUID();
			var regex = /[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/;
			expect(uuid).toMatch(regex);
		});

		it('should generate a unique UUID string', function() {
			var uuid1 = util.randomUUID(),
				uuid2 = util.randomUUID(),
				uuid3 = util.randomUUID();

			expect(uuid1).not.toBe(uuid2);
			expect(uuid1).not.toBe(uuid3);
			expect(uuid2).not.toBe(uuid3);
		});
	});

	describe('getISO8601DateString', function() {
		it('should return a date in ISO-8601 format', function() {
			var dateStr = util.getISO8601DateString();
			var regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
			expect(dateStr).toMatch(regex);
		});
	});

	describe('sortBy', function() {
		var arr = [
			{ name: 'Nick', age: 20 },
			{ name: 'Walt', age: 35 },
			{ name: 'Abbi', age: 50 }
		];

		it('should return a sorting function that sorts objects by a specified field', function() {
			var fn = util.sortBy('name');
			arr.sort(fn);
			expect(arr[0].name).toBe('Abbi');
			expect(arr[1].name).toBe('Nick');
		});

		it('should return a sorting function that sorts objects by a specified field in descending order', function() {
			var fn = util.sortBy('name', true);
			arr.sort(fn);
			expect(arr[0].name).toBe('Walt');
			expect(arr[1].name).toBe('Nick');
		});

		it('should return a sorting function that sorts objects by a specified field using a primer to normalize the data', function() {
			var arr = [
				{ name: 'nick', age: 20 },
				{ name: 'Walt', age: 35 },
				{ name: 'Abbi', age: 50 }
			];
			var fn = util.sortBy('name', false, function(x) { return x.toUpperCase(); });
			arr.sort(fn);
			expect(arr[0].name).toBe('Abbi');
			expect(arr[1].name).toBe('nick');
		});

		it('should return a sorting function that sorts objects by directly comparing them if a null or undefined field is passed in', function() {
			var arr = [ '5', '1', '10' ];

			var fn = util.sortBy(null);
			arr.sort(fn);
			expect(arr[0]).toBe('1');
			expect(arr[1]).toBe('10');

			var field;
			fn = util.sortBy(field, true, function(x) { return parseInt(x); });
			arr.sort(fn);
			expect(arr[0]).toBe('10');
			expect(arr[1]).toBe('5');
		});
	});

	describe('arrayToString', function() {
		var arr = [
			{ name: 'Nick', age: 20 },
			{ name: 'Walt', age: 35 },
			{ name: 'Abbi', age: 50 }
		];

		it('should return a string that contains each element in the array', function() {
			var str = util.arrayToString(arr);
			expect(str).toBe(arr.join(', '));
		});

		it('should return a string that contains the specified property of each element in the array', function() {
			var str = util.arrayToString(arr, 'name');
			expect(str).toBe('Nick, Walt, Abbi');
		});

		it('should return an empty string if a null or undefined array is passed in', function() {
			var str = util.arrayToString(null);
			expect(str).toBe('');

			str = util.arrayToString(undefined);
			expect(str).toBe('');
		});
	});

	describe('findMultipleInArray', function() {
		var arr = [
			{ name: 'Nick', desc: 'Abbi\'s friend', nemesis: 'Walt' },
			{ name: 'Walt', desc: 'Loner', nemesis: 'Nick' },
			{ name: 'Abbi', desc: 'Likes Walt', nemesis: null }
		];

		it('should return objects from an array where the specified fields contain the specified text', function() {
			var result = util.findMultipleInArray(arr, ['name', 'desc'], 'Abbi');
			expect(result.length).toBe(2);
		});

		it('should return the entire array if no search text is specified', function() {
			var result = util.findMultipleInArray(arr, ['name', 'desc']);
			expect(result.length).toBe(3);
		});

		it('should return the entire array if the search text is null, undefined or empty', function() {
			var result1 = util.findMultipleInArray(arr, ['name', 'desc'], null);
			var result2 = util.findMultipleInArray(arr, ['name', 'desc'], undefined);
			var result3 = util.findMultipleInArray(arr, ['name', 'desc'], '');
			expect(result1.length).toBe(3);
			expect(result2.length).toBe(3);
			expect(result3.length).toBe(3);
		});

		it('should compare the search text against all properties if property array is null, undefined or empty', function() {
			var result1 = util.findMultipleInArray(arr, [], 'Walt');
			var result2 = util.findMultipleInArray(arr, [], 'Nick');
			var result3 = util.findMultipleInArray(arr, null, 'Nick');
			var result4 = util.findMultipleInArray(arr, undefined, 'Nick');
			expect(result1.length).toBe(3);
			expect(result2.length).toBe(2);
			expect(result3.length).toBe(2);
			expect(result4.length).toBe(2);
		});

		it('should return an empty array if the passed in array is null, undefined or empty', function() {
			var result1 = util.findMultipleInArray(null, ['name'], 'Abbi');
			var result2 = util.findMultipleInArray(undefined, ['name'], 'Abbi');
			var result3 = util.findMultipleInArray([], ['name'], 'Abbi');
			expect(result1.length).toBe(0);
			expect(result2.length).toBe(0);
			expect(result3.length).toBe(0);
		})
	});
	
	describe('findInArray', function() {
		var arr = ['one', 'TWO', 'Three', 'FouR', 'two', 'fours'];

		it('should find all elements that are a match for the specified value', function() {
			var result = util.findInArray(arr, 'Three');
			expect(result.length).toBe(1);
			expect(result[0]).toBe(2);
		});

		it('should find all elements that are a case-insensitive match for the specified value', function() {
			var result = util.findInArray(arr, 'two');
			expect(result.length).toBe(2);
			expect(result[0]).toBe(1);
			expect(result[1]).toBe(4);

			result = util.findInArray(arr, 'four');
			expect(result.length).toBe(1);
			expect(result[0]).toBe(3);
		});

		it('should return an empty array if no matches were found', function() {
			var result = util.findInArray(arr, 'five');
			expect(result.length).toBe(0);
		});

		it('should be able to find null, undefined, and empty string array values', function() {
			var arr = ['one', '', null, undefined];

			var result = util.findInArray(arr, null);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(2);

			result = util.findInArray(arr, undefined);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(3);

			result = util.findInArray(arr, '');
			expect(result.length).toBe(1);
			expect(result[0]).toBe(1);
		});

		it('should find partial matches if the partialMatch parameter is true', function() {
			var result = util.findInArray(arr, 'Wo', true);
			expect(result.length).toBe(2);
			expect(result[0]).toBe(1);
			expect(result[1]).toBe(4);

			result = util.findInArray(arr, 'four', true);
			expect(result.length).toBe(2);
			expect(result[0]).toBe(3);
			expect(result[1]).toBe(5);
		});

		it('should find a full match if the partialMatch parameter is omitted, null, undefined, or false', function() {
			var result = util.findInArray(arr, 'four');
			expect(result.length).toBe(1);
			expect(result[0]).toBe(3);

			result = util.findInArray(arr, 'four', null);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(3);

			result = util.findInArray(arr, 'four', undefined);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(3);

			result = util.findInArray(arr, 'four', false);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(3);
		});
	});

	describe('findInObjectArray', function() {
		var arr = [
			{ name: 'Nick', age: 20 },
			{ name: 'Walt', age: 35 },
			{ name: 'Abbi', age: 50 },
			{ name: 'John', age: 35 },
			{ name: 'abbi', age: null },
			{ name: '', age: undefined },
			{ name: 'Nickie', age: 10 }
		];

		it('should find all elements that are a match for the specified property value', function() {
			var result = util.findInObjectArray(arr, 'age', 50);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(2);
		});

		it('should find all elements that are a case-insensitive match for the specified property value', function() {
			var result = util.findInObjectArray(arr, 'name', 'abBI');
			expect(result.length).toBe(2);
			expect(result[0]).toBe(2);
			expect(result[1]).toBe(4);
		});

		it('should return an empty array if no matches were found', function() {
			var result = util.findInObjectArray(arr, 'age', 25);
			expect(result.length).toBe(0);
		});

		it('should be able to match properties that have null, undefined, or empty string values', function() {
			var result = util.findInObjectArray(arr, 'age', null);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(4);

			result = util.findInObjectArray(arr, 'age', undefined);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(5);

			result = util.findInObjectArray(arr, 'name', '');
			expect(result.length).toBe(1);
			expect(result[0]).toBe(5);
		});

		it('should find partial matches if the partialMatch parameter is true', function() {
			var result = util.findInObjectArray(arr, 'name', 'bb', true);
			expect(result.length).toBe(2);
			expect(result[0]).toBe(2);
			expect(result[1]).toBe(4);

			result = util.findInObjectArray(arr, 'name', 'nick', true);
			expect(result.length).toBe(2);
			expect(result[0]).toBe(0);
			expect(result[1]).toBe(6);
		});

		it('should find a full match if the partialMatch parameter is omitted, null, undefined, or false', function() {
			var result = util.findInObjectArray(arr, 'name', 'nick');
			expect(result.length).toBe(1);
			expect(result[0]).toBe(0);

			result = util.findInObjectArray(arr, 'name', 'nick', null);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(0);

			result = util.findInObjectArray(arr, 'name', 'nick', undefined);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(0);

			result = util.findInObjectArray(arr, 'name', 'nick', false);
			expect(result.length).toBe(1);
			expect(result[0]).toBe(0);
		});
	});
});