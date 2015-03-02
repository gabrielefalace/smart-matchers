/*
	The MIT License (MIT)

	Copyright (c) 2015 Gabriele Falace, Daniela Martino

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 *
 * @param element
 * @returns {Predicate}
 */
function valueOf(element){
	console.log('creating predicate for element ' + element);
	return new Predicate(element);
}

/**
 *
 * @param element
 * @constructor
 */
function Predicate(element){
	var self = this;
	this.element = element;

	/**
	 *
	 * @returns {boolean}
	 */
	self.isIn = function(){
		for(var i=0; i<arguments.length; i++){
			if(self.element === arguments[i]){
				return true;
			}
		}
		return false;
	};

	/**
	 *
	 * @returns {boolean}
	 */
	self.isNotIn = function(){
		return !self.isIn(arguments);
	};

	/**
	 *
	 * @param a
	 * @param b
	 * @returns {boolean}
	 */
	self.isBetween = function (a, b) {
		return self.element > a && self.element < b;
	};

	/**
	 *
	 * @param a
	 * @param b
	 * @returns {boolean}
	 */
	self.isNotBetween = function (a, b) {
		return !self.isBetween(a, b)
	};
}

var matching = matching || {

		/**
		 *
		 * @param param
		 * @returns {Function}
		 */
	equalsTo: function(param){
		return function(element){return element === param;};
	},

		/**
		 *
		 * @param element
		 * @returns {boolean}
		 */
	odd: function(element){
		return element % 2 === 1;
	},

		/**
		 *
		 * @param element
		 * @returns {boolean}
		 */
	even: function(element){
		return element % 2 === 0;
	},

		/**
		 *
		 * @param param1
		 * @param param2
		 * @returns {Function}
		 */
	between: function(param1, param2){
		return function(element){
			return element >= param1 && element <= param2;
		};
	},

		/**
		 *
		 * @param param1
		 * @param param2
		 * @returns {Function}
		 */
	strictlyBetween: function(param1, param2){
		return function(element){
			return element > param1 && element < param2;
		};
	},

		/**
		 *
		 * @param param
		 * @returns {Function}
		 */
	greaterThan: function(param){
		return function(element){ return element > param;};
	},

		/**
		 *
		 * @param param
		 * @returns {Function}
		 */
	greaterEqualsTo: function(param){
		return function(element){ return element >= param;};
	},

		/**
		 *
		 * @param param
		 * @returns {Function}
		 */
	smallerThan: function(param){
		return function(element){return element < param;};
	},

		/**
		 *
		 * @param param
		 * @returns {Function}
		 */
	smallerEqualsTo: function(param){
		return function(element){return element <= param;};
	},

		/**
		 *
		 * @param prefix
		 * @returns {Function}
		 */
	startsWith: function(prefix){
		return function(element){ return element.indexOf(prefix)===0; };
	},

		/**
		 *
		 * @param substring
		 * @returns {Function}
		 */
	contains: function(substring){
		return function(element){ return element.indexOf(substring)>=0; };
	},

		/**
		 *
		 * @param suffix
		 * @returns {Function}
		 */
	endsWith: function(suffix){
		return function(element){ return element.indexOf(suffix) + suffix.length === element.length; };
	},

		/**
		 *
		 * @param fieldName
		 * @param fieldValue
		 * @returns {Function}
		 */
	fieldEquals: function(fieldName, fieldValue){
		return function(element){
			return element[fieldName] === fieldValue;
		};
	},

		/**
		 *
		 * @param fieldName
		 * @param prefix
		 * @returns {Function}
		 */
	fieldStartsWith: function(fieldName, prefix){
		return function(element) {
			return matching.startsWith(prefix)(element[fieldName]);
		};
	},

		/**
		 *
		 * @param fieldName
		 * @param suffix
		 * @returns {Function}
		 */
	fieldEndsWith: function(fieldName, suffix){
		return function(element) {
			return matching.endsWith(suffix)(element[fieldName]);
		};
	},

		/**
		 *
		 * @param fieldName
		 * @param substring
		 * @returns {Function}
		 */
	fieldContains: function(fieldName, substring){
		return function(element){
			return matching.contains(substring)(element[fieldName]);
		};
	}

}
