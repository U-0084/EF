(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],2:[function(require,module,exports){
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _enchant = require('./lib/enchant.js');

var _enchant2 = _interopRequireDefault(_enchant);

var _avatarEnchant = require('./lib/avatar.enchant.js');

var _avatarEnchant2 = _interopRequireDefault(_avatarEnchant);

var _uiEnchant = require('./lib/ui.enchant.js');

var _uiEnchant2 = _interopRequireDefault(_uiEnchant);

var _main = require('./main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./lib/avatar.enchant.js":3,"./lib/enchant.js":4,"./lib/ui.enchant.js":5,"./main.js":6,"jquery":1}],3:[function(require,module,exports){
"use strict";

module.exports = function (n) {

    /**
     * @fileOverview
     * avatar.enchant.js
     * @version 0.2 (2012/08/09)
     * @requires enchant.js v0.4.0 or later
     * @author shi3z/UEI Corporation
     *
     * @description
     * enchant.js extension for 9leap.net
     * Avatar character plugin for enchant.js with 9leap.net
     *
     * @example
     * var core = new Core(320, 320);
     * core.preload('avatarBg1.png', 'avatarBg2.png', 'avatarBg3.png', 'bigmonster1.gif');
     * core.onload = function(){
     *     core.rootScene.backgroundColor = "#000000";
     *     // show infinite scrolling background
     *     bg = new AvatarBG(0);
     *     bg.y = 50;
     *     core.rootScene.addChild(bg);
     *     
     *     // show monster
     *     monster = new AvatarMonster(core.assets['bigmonster1.gif']);
     *     monster.x = 200;
     *     monster.y = 100;
     *     core.rootScene.addChild(monster);
     *     
     *     // show avatar
     *     chara = new Avatar("2:2:1:2004:21230:22480");
     *     core.rootScene.addChild(chara);
     *     chara.scaleX = -1;
     *     chara.scaleY = 1;
     *     chara.x = 50;
     *     chara.y = 100;
     * };
     * core.start();
     */

    /**
     * avatar namespace object
     * @type {Object}
     */
    enchant.avatar = {};

    /**
     * AvatarCharacter
     * Base class of enchant.Avatar and enchant.AvatarMonster
     * @scope enchant.avatar.AvatarCharacter.prototype
     */
    enchant.avatar.AvatarCharacter = enchant.Class.create(enchant.Sprite, {
        /**
         * Constructor of AvatarCharacter
         * @constructs
         * @param width
         * @param height
         */
        initialize: function initialize(width, height) {
            enchant.Sprite.call(this, width, height);
            this.right();

            /**
             * Name of animation pattern;
             * @type {String}
             */
            this.action = "stop";

            /**
             * Array of animation patterns
             * @type {Object}
             */
            this.animPattern = { "stop": [0] };

            /**
             * Frame number of animation
             * @type {Object}
             */
            this.animFrame = 0;
            this.addEventListener('enterframe', function () {
                if ((~ ~this.age & 0x03) !== 0) return;
                if (this.action) {
                    var animPattern = this.animPattern[this.action];
                    this.frame = animPattern[this.animFrame];
                    this.animFrame++;
                    if (animPattern[this.animFrame] === -1) {
                        this.animFrame = 0;
                        this.action = "stop";
                    }
                    if (animPattern[this.animFrame] === -2) {
                        this.parentNode.removeChild(this);
                    }
                    if (this.animFrame >= animPattern.length) {
                        this.animFrame = 0;
                    }
                }
            });
        },

        /**
         * Flip to left
         */
        left: function left() {
            this.scaleX = 1;
        },
        /**
         * Flip to right
         */
        right: function right() {
            this.scaleX = -1;
        }
    });

    /**
     * AvatarMonster
     * subclass of enchant.avatar.AvatarCharacter
     * @scope enchant.avatar.AvatarMonster.prototype
     */
    enchant.avatar.AvatarMonster = enchant.Class.create(enchant.avatar.AvatarCharacter, {
        /**
         * AvatarMonster
         * Manage a monter animations
         * @constructs
         * @param {image} Image of monster
         * @extends enchant.avatar.AvatarCharacter
         */
        initialize: function initialize(image) {
            var w = ~ ~(image.width / 4);
            var h = w;
            enchant.avatar.AvatarCharacter.call(this, w, h);
            this.image = image;
            this.animPattern = { "stop": [4, 4, 4, 3, 3, 3],
                "walk": [2, 3, 4, 3],
                "appear": [0, 1, 7, 6, 5, 4, 2, 3, -1],
                "disappear": [3, 2, 4, 5, 6, 7, 1, 0, -2],
                "attack": [5, 4, 6, 6, 6, -1]
            };
            this.action = "attack";
            this.left();
        }
    });

    /**
     * AvatarBG
     * @scope enchant.AvatarBG.prototype
     */
    enchant.avatar.AvatarBG = enchant.Class.create(enchant.Group, {
        /**
         * A class of infinite scrolling background.
         * @param mode {Number} 0 to 3
         * @constructs
         * @extends enchant.Group
         */
        initialize: function initialize(mode) {
            enchant.Group.call(this);
            var core = enchant.Core.instance;

            this.veryfarbg = new enchant.Sprite(320, 51);
            this.veryfarbg.y = 0;
            this.veryfarbg.image = core.assets["avatarBg2.png"];
            this.veryfarbg.frame = mode;
            this.addChild(this.veryfarbg);
            this.farbgs = [];
            for (i = 0; i < 3; i++) {
                var bg = new enchant.Sprite(320, 32);
                bg.image = core.assets["avatarBg3.png"];
                bg.frame = mode;
                bg.x = i * 320 - 320;
                bg.y = 20;
                this.farbgs[this.farbgs.length] = bg;
                this.addChild(bg);
            }

            this.tiles = [];
            for (i = 0; i < 14; i++) {
                var tile = new enchant.Sprite(32, 128);
                tile.image = core.assets["avatarBg1.png"];
                tile.frame = mode;
                tile.x = i * 31 - 48;
                tile.y = 48;
                this.tiles[this.tiles.length] = tile;
                this.addChild(tile);
            }
        },
        /**
         * horizontal scrolling.
         * @param {int} x Offset of x coordinate.
         */
        scroll: function scroll(x) {
            var dx = ~ ~(x / 2) % 320,
                ddx = ~ ~x % 32 * 2;
            for (i = 0; i < 14; i++) {
                this.tiles[i].x = i * 31 - ddx - 48;
            }
            for (i = 0; i < 3; i++) {
                this.farbgs[i].x = i * 320 - dx - 320;
            }
        }
    });

    /**
     * Avatar
     * @scope enchant.Avatar.prototype
     */
    enchant.avatar.Avatar = enchant.Class.create(enchant.avatar.AvatarCharacter, {
        /**
         * @param {int}code  Avatar code
         * @extends enchant.avatar.AvatarCharacter
         * @constructs
         */
        initialize: function initialize(code) {
            enchant.avatar.AvatarCharacter.call(this, 64, 64);
            if (code) {
                this.setCode(code);
            } else {
                this.gender = 1;
                this.hairstyle = 1;
                this.haircolor = 0;
                this.weapon = 2545;
                this.armor = 2135;
                this.headpiece = 0;
                this.loadImage();
            }
            this.animPattern = { "stop": [0],
                "run": [1, 2, 3, 2],
                "attack": [0, 2, 9, 10, 11, 5, 0, 0, 0, -1],
                "special": [0, 6, 5, 13, 14, 15, 0, 0, -1],
                "damage": [7, 7, 7, 7, 0, 0, 0, -1],
                "dead": [8],
                "demo": [1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 0, 0, 0, 0, 2, 9, 10, 11, 5, 0, 0, 0, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 0, 6, 5, 13, 14, 15, 0, 0]
            };
        },
        /**
         * Reflesh avatar animation image
         */
        loadImage: function loadImage() {
            var ___EnchantAvatarServerURL = "http://9leap.net/meruru/draw/draw.php";
            this.opt = "gender=" + this.gender + "&job=0&hairstyle=" + this.hairstyle + "&haircolor=" + this.haircolor + "&weapon=" + this.weapon + "&armor=" + this.armor + "&headpiece=" + this.headpiece + "&invisible=0&x=0&y=0&w=4&h=4&dummy=.gif";
            this.src = ___EnchantAvatarServerURL + "?" + this.opt;
            (function (that) {
                var core = enchant.Core.instance;
                core.load(that.src, function () {
                    that.image = core.assets[that.src];
                });
            })(this);
        },
        /**
         * Get avatar code from actual object
         * @return {String} code;
         */
        getCode: function getCode() {
            return this.gender + ":" + this.hairstyle + ":" + this.haircolor + ":" + this.weapon + ":" + this.armor + ":" + this.headpiece;
        },
        /**
         * Set avatar code and reflesh avatar image.
         * @param {String} code
         */
        setCode: function setCode(code) {
            data = code.split(":");
            this.gender = data[0];
            this.hairstyle = data[1];
            this.haircolor = data[2];
            this.weapon = data[3];
            this.armor = data[4];
            this.headpiece = data[5];
            this.loadImage();
        }
    });
};

},{}],4:[function(require,module,exports){
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; /**
 * enchant.js v0.8.3
 * http://enchantjs.com
 *
 * Copyright UEI Corporation
 * Released under the MIT license.
 */(function(window,undefined){ // ECMA-262 5th edition Functions
if(typeof Object.defineProperty!=='function'){Object.defineProperty=function(obj,prop,desc){if('value' in desc){obj[prop]=desc.value;}if('get' in desc){obj.__defineGetter__(prop,desc.get);}if('set' in desc){obj.__defineSetter__(prop,desc.set);}return obj;};}if(typeof Object.defineProperties!=='function'){Object.defineProperties=function(obj,descs){for(var prop in descs){if(descs.hasOwnProperty(prop)){Object.defineProperty(obj,prop,descs[prop]);}}return obj;};}if(typeof Object.create!=='function'){Object.create=function(prototype,descs){function F(){}F.prototype=prototype;var obj=new F();if(descs!=null){Object.defineProperties(obj,descs);}return obj;};}if(typeof Object.getPrototypeOf!=='function'){Object.getPrototypeOf=function(obj){return obj.__proto__;};}if(typeof Function.prototype.bind!=='function'){Function.prototype.bind=function(thisObject){var func=this;var args=Array.prototype.slice.call(arguments,1);var Nop=function Nop(){};var bound=function bound(){var a=args.concat(Array.prototype.slice.call(arguments));return func.apply(this instanceof Nop?this:thisObject||window,a);};Nop.prototype=func.prototype;bound.prototype=new Nop();return bound;};}window.getTime=function(){var origin;if(window.performance&&window.performance.now){origin=Date.now();return function(){return origin+window.performance.now();};}else if(window.performance&&window.performance.webkitNow){origin=Date.now();return function(){return origin+window.performance.webkitNow();};}else {return Date.now;}}(); // define requestAnimationFrame
window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(){var lastTime=window.getTime();var frame=1000/60;return function(func){var _id=setTimeout(function(){lastTime=window.getTime();func(lastTime);},Math.max(0,lastTime+frame-window.getTime()));return _id;};}(); /**
 * Export the library classes globally.
 *
 * When no arguments are given, all classes defined in enchant.js as well as all classes defined in
 * plugins will be exported. When more than one argument is given, by default only classes defined
 * in enchant.js will be exported. When you wish to export plugin classes you must explicitly deliver
 * the plugin identifiers as arguments.
 *
 * @example
 * enchant();     // All classes will be exported.
 * enchant('');   // Only classes in enchant.js will be exported.
 * enchant('ui'); // enchant.js classes and ui.enchant.js classes will be exported.
 *
 * @param {...String} [modules] Export module. Multiple designations possible.
 * @function
 * @global
 * @name enchant
 */var enchant=function enchant(modules){if(modules!=null){if(!(modules instanceof Array)){modules=Array.prototype.slice.call(arguments);}modules=modules.filter(function(module){return [module].join();});}(function include(module,prefix){var submodules=[],i,len;for(var prop in module){if(module.hasOwnProperty(prop)){if(typeof module[prop]==='function'){window[prop]=module[prop];}else if(_typeof(module[prop])==='object'&&module[prop]!==null&&Object.getPrototypeOf(module[prop])===Object.prototype){if(modules==null){submodules.push(prop);}else {i=modules.indexOf(prefix+prop);if(i!==-1){submodules.push(prop);modules.splice(i,1);}}}}}for(i=0,len=submodules.length;i<len;i++){include(module[submodules[i]],prefix+submodules[i]+'.');}})(enchant,''); // issue 185
if(enchant.Class.getInheritanceTree(window.Game).length<=enchant.Class.getInheritanceTree(window.Core).length){window.Game=window.Core;}if(modules!=null&&modules.length){throw new Error('Cannot load module: '+modules.join(', '));}}; // export enchant
window.enchant=enchant;window.addEventListener("message",function(msg,origin){try{var data=JSON.parse(msg.data);if(data.type==="event"){enchant.Core.instance.dispatchEvent(new enchant.Event(data.value));}else if(data.type==="debug"){switch(data.value){case "start":enchant.Core.instance.start();break;case "pause":enchant.Core.instance.pause();break;case "resume":enchant.Core.instance.resume();break;case "tick":enchant.Core.instance._tick();break;default:break;}}}catch(e){ // ignore
}},false); /**
 * @name enchant.Class
 * @class
 * A Class representing a class which supports inheritance.
 * @param {Function} [superclass] The class from which the
 * new class will inherit the class definition.
 * @param {*} [definition] Class definition.
 * @constructor
 */enchant.Class=function(superclass,definition){return enchant.Class.create(superclass,definition);}; /**
 * Creates a class.
 *
 * When defining a class that extends from another class, 
 * the constructor of the other class will be used by default.
 * Even if you override this constructor, you must still call it
 * to ensure that the class is initialized correctly.
 *
 * @example
 * // Creates a Ball class.
 * var Ball = Class.create({ 
 *
 *     // Ball's constructor
 *     initialize: function(radius) {
 *       // ... code ...
 *     }, 
 *
 *     // Defines a fall method that doesn't take any arguments.
 *     fall: function() { 
 *       // ... code ...
 *     }
 * });
 *
 * // Creates a Ball class that extends from "Sprite"
 * var Ball = Class.create(Sprite);  
 *
 * // Creates a Ball class that extends from "Sprite"
 * var Ball = Class.create(Sprite, { 
 *
 *     // Overwrite Sprite's constructor
 *     initialize: function(radius) { 
 *
 *         // Call Sprite's constructor.
 *         Sprite.call(this, radius * 2, radius * 2);
 *
 *         this.image = core.assets['ball.gif'];
 *     }
 * });
 *
 * @param {Function} [superclass] The class from which the
 * new class will inherit the class definition.
 * @param {*} [definition] Class definition.
 * @static
 */enchant.Class.create=function(superclass,definition){if(superclass==null&&definition){throw new Error("superclass is undefined (enchant.Class.create)");}else if(superclass==null){throw new Error("definition is undefined (enchant.Class.create)");}if(arguments.length===0){return enchant.Class.create(Object,definition);}else if(arguments.length===1&&typeof arguments[0]!=='function'){return enchant.Class.create(Object,arguments[0]);}for(var prop in definition){if(definition.hasOwnProperty(prop)){if(_typeof(definition[prop])==='object'&&definition[prop]!==null&&Object.getPrototypeOf(definition[prop])===Object.prototype){if(!('enumerable' in definition[prop])){definition[prop].enumerable=true;}}else {definition[prop]={value:definition[prop],enumerable:true,writable:true};}}}var Constructor=function Constructor(){if(this instanceof Constructor){Constructor.prototype.initialize.apply(this,arguments);}else {return new Constructor();}};Constructor.prototype=Object.create(superclass.prototype,definition);Constructor.prototype.constructor=Constructor;if(Constructor.prototype.initialize==null){Constructor.prototype.initialize=function(){superclass.apply(this,arguments);};}var tree=this.getInheritanceTree(superclass);for(var i=0,l=tree.length;i<l;i++){if(typeof tree[i]._inherited==='function'){tree[i]._inherited(Constructor);break;}}return Constructor;}; /**
 * Get the inheritance tree of this class.
 * @param {Function} Constructor
 * @return {Function[]} Parent's constructor
 */enchant.Class.getInheritanceTree=function(Constructor){var ret=[];var C=Constructor;var proto=C.prototype;while(C!==Object){ret.push(C);proto=Object.getPrototypeOf(proto);C=proto.constructor;}return ret;}; /**
 * @namespace
 * enchant.js environment variables.
 * Execution settings can be changed by modifying these before calling new Core().
 */enchant.ENV={ /**
     * Version of enchant.js
     * @type String
     */VERSION:'0.8.3', /**
     * Identifier of the current browser.
     * @type String
     */BROWSER:function(ua){if(/Eagle/.test(ua)){return 'eagle';}else if(/Opera/.test(ua)){return 'opera';}else if(/MSIE|Trident/.test(ua)){return 'ie';}else if(/Chrome/.test(ua)){return 'chrome';}else if(/(?:Macintosh|Windows).*AppleWebKit/.test(ua)){return 'safari';}else if(/(?:iPhone|iPad|iPod).*AppleWebKit/.test(ua)){return 'mobilesafari';}else if(/Firefox/.test(ua)){return 'firefox';}else if(/Android/.test(ua)){return 'android';}else {return '';}}(navigator.userAgent), /**
     * The CSS vendor prefix of the current browser.
     * @type String
     */VENDOR_PREFIX:function(){var ua=navigator.userAgent;if(ua.indexOf('Opera')!==-1){return 'O';}else if(/MSIE|Trident/.test(ua)){return 'ms';}else if(ua.indexOf('WebKit')!==-1){return 'webkit';}else if(navigator.product==='Gecko'){return 'Moz';}else {return '';}}(), /**
     * Determines if the current browser supports touch.
     * True, if touch is enabled.
     * @type Boolean
     */TOUCH_ENABLED:function(){var div=document.createElement('div');div.setAttribute('ontouchstart','return');return typeof div.ontouchstart==='function';}(), /**
     * Determines if the current browser is an iPhone with a retina display.
     * True, if this display is a retina display.
     * @type Boolean
     */RETINA_DISPLAY:function(){if(navigator.userAgent.indexOf('iPhone')!==-1&&window.devicePixelRatio===2){var viewport=document.querySelector('meta[name="viewport"]');if(viewport==null){viewport=document.createElement('meta');document.head.appendChild(viewport);}viewport.setAttribute('content','width=640');return true;}else {return false;}}(), /**
     * Determines if for current browser Flash should be used to play 
     * sound instead of the native audio class.
     * True, if flash should be used.
     * @type Boolean
     */USE_FLASH_SOUND:function(){var ua=navigator.userAgent;var vendor=navigator.vendor||""; // non-local access, not on mobile mobile device, not on safari
return location.href.indexOf('http')===0&&ua.indexOf('Mobile')===-1&&vendor.indexOf('Apple')!==-1;}(), /**
     * If click/touch event occure for these tags the setPreventDefault() method will not be called.
     * @type String[]
     */USE_DEFAULT_EVENT_TAGS:['input','textarea','select','area'], /**
     * Method names of CanvasRenderingContext2D that will be defined as Surface method.
     * @type String[]
     */CANVAS_DRAWING_METHODS:['putImageData','drawImage','drawFocusRing','fill','stroke','clearRect','fillRect','strokeRect','fillText','strokeText'], /**
     * Keybind Table.
     * You can use 'left', 'up', 'right', 'down' for preset event.
     * @example
     * enchant.ENV.KEY_BIND_TABLE = {
     *     37: 'left',
     *     38: 'up',
     *     39: 'right',
     *     40: 'down',
     *     32: 'a', //-> use 'space' key as 'a button'
     * };
     * @type Object
     */KEY_BIND_TABLE:{37:'left',38:'up',39:'right',40:'down'}, /**
     * If keydown event occure for these keycodes the setPreventDefault() method will be called.
     * @type Number[]
     */PREVENT_DEFAULT_KEY_CODES:[37,38,39,40], /**
     * Determines if Sound is enabled on Mobile Safari.
     * @type Boolean
     */SOUND_ENABLED_ON_MOBILE_SAFARI:true, /**
     * Determines if "touch to start" scene is enabled.
     * It is necessary on Mobile Safari because WebAudio Sound is
     * muted by browser until play any sound in touch event handler.
     * If set it to false, you should control this behavior manually.
     * @type Boolean
     */USE_TOUCH_TO_START_SCENE:true, /**
     * Determines if WebAudioAPI is enabled. (true: use WebAudioAPI instead of Audio element if possible)
     * @type Boolean
     */USE_WEBAUDIO:function(){return location.protocol!=='file:';}(), /**
     * Determines if animation feature is enabled. (true: Timeline instance will be generated in new Node)
     * @type Boolean
     */USE_ANIMATION:true, /**
     * Specifies range of the touch detection.
     * The detection area will be (COLOR_DETECTION_LEVEL * 2 + 1)px square.
     * @type Boolean
     */COLOR_DETECTION_LEVEL:2}; /**
 * @scope enchant.Event.prototype
 */enchant.Event=enchant.Class.create({ /**
     * @name enchant.Event
     * @class
     * A class for an independent implementation of events similar to DOM Events.
     * Does not include phase concepts.
     * @param {String} type Event type.
     * @constructs
     */initialize:function initialize(type){ /**
         * The type of the event.
         * @type String
         */this.type=type; /**
         * The target of the event.
         * @type *
         */this.target=null; /**
         * The x-coordinate of the event's occurrence.
         * @type Number
         */this.x=0; /**
         * The y-coordinate of the event's occurrence.
         * @type Number
         */this.y=0; /**
         * The x-coordinate of the event's occurrence relative to the object
         * which issued the event.
         * @type Number
         */this.localX=0; /**
         * The y-coordinate of the event's occurrence relative to the object
         * which issued the event.
         * @type Number
         */this.localY=0;},_initPosition:function _initPosition(pageX,pageY){var core=enchant.Core.instance;this.x=this.localX=(pageX-core._pageX)/core.scale;this.y=this.localY=(pageY-core._pageY)/core.scale;}}); /**
 * An event dispatched once the core has finished loading.
 *
 * When preloading images, it is necessary to wait until preloading is complete
 * before starting the game.
 * Issued by: {@link enchant.Core}
 *
 * @example
 * var core = new Core(320, 320);
 * core.preload('player.gif');
 * core.onload = function() {
 *     ... // Describes initial core processing
 * };
 * core.start();
 * @type String
 */enchant.Event.LOAD='load'; /**
 * An event dispatched when an error occurs.
 * Issued by: {@link enchant.Core}, {@link enchant.Surface}, {@link enchant.WebAudioSound}, {@link enchant.DOMSound}
 */enchant.Event.ERROR='error'; /**
 * An event dispatched when the display size is changed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 @type String
 */enchant.Event.CORE_RESIZE='coreresize'; /**
 * An event dispatched while the core is loading.
 * Dispatched each time an image is preloaded.
 * Issued by: {@link enchant.LoadingScene}
 * @type String
 */enchant.Event.PROGRESS='progress'; /**
 * An event which is occurring when a new frame is beeing processed.
 * Issued object: {@link enchant.Core}, {@link enchant.Node}
 * @type String
 */enchant.Event.ENTER_FRAME='enterframe'; /**
 * An event dispatched at the end of processing a new frame.
 * Issued by: {@link enchant.Core}, {@link enchant.Node}
 * @type String
 */enchant.Event.EXIT_FRAME='exitframe'; /**
 * An event dispatched when a Scene begins.
 * Issued by: {@link enchant.Scene}
 * @type String
 */enchant.Event.ENTER='enter'; /**
 * An event dispatched when a Scene ends.
 * Issued by: {@link enchant.Scene}
 * @type String
 */enchant.Event.EXIT='exit'; /**
 * An event dispatched when a Child is added to a Node.
 * Issued by: {@link enchant.Group}, {@link enchant.Scene}
 * @type String
 */enchant.Event.CHILD_ADDED='childadded'; /**
 * An event dispatched when a Node is added to a Group.
 * Issued by: {@link enchant.Node}
 * @type String
 */enchant.Event.ADDED='added'; /**
 * An event dispatched when a Node is added to a Scene.
 * Issued by: {@link enchant.Node}
 * @type String
 */enchant.Event.ADDED_TO_SCENE='addedtoscene'; /**
 * An event dispatched when a Child is removed from a Node.
 * Issued by: {@link enchant.Group}, {@link enchant.Scene}
 * @type String
 * @type String
 */enchant.Event.CHILD_REMOVED='childremoved'; /**
 * An event dispatched when a Node is deleted from a Group.
 * Issued by: {@link enchant.Node}
 * @type String
 */enchant.Event.REMOVED='removed'; /**
 * An event dispatched when a Node is deleted from a Scene.
 * Issued by: {@link enchant.Node}
 * @type String
 */enchant.Event.REMOVED_FROM_SCENE='removedfromscene'; /**
 * An event dispatched when a touch event intersecting a Node begins.
 * A mouse event counts as a touch event. Issued by: {@link enchant.Node}
 * @type String
 */enchant.Event.TOUCH_START='touchstart'; /**
 * An event dispatched when a touch event intersecting the Node has been moved.
 * A mouse event counts as a touch event. Issued by: {@link enchant.Node}
 * @type String
 */enchant.Event.TOUCH_MOVE='touchmove'; /**
 * An event dispatched when a touch event intersecting the Node ends.
 * A mouse event counts as a touch event. Issued by: {@link enchant.Node}
 * @type String
 */enchant.Event.TOUCH_END='touchend'; /**
 * An event dispatched when an Entity is rendered.
 * Issued by: {@link enchant.Entity}
 * @type String
 */enchant.Event.RENDER='render'; /**
 * An event dispatched when a button is pressed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.INPUT_START='inputstart'; /**
 * An event dispatched when button inputs change.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.INPUT_CHANGE='inputchange'; /**
 * An event dispatched when button input ends.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.INPUT_END='inputend'; /**
 * An internal event which is occurring when a input changes.
 * Issued object: {@link enchant.InputSource}
 * @type String
 */enchant.Event.INPUT_STATE_CHANGED='inputstatechanged'; /**
 * An event dispatched when the 'left' button is pressed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.LEFT_BUTTON_DOWN='leftbuttondown'; /**
 * An event dispatched when the 'left' button is released.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.LEFT_BUTTON_UP='leftbuttonup'; /**
 * An event dispatched when the 'right' button is pressed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.RIGHT_BUTTON_DOWN='rightbuttondown'; /**
 * An event dispatched when the 'right' button is released.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.RIGHT_BUTTON_UP='rightbuttonup'; /**
 * An event dispatched when the 'up' button is pressed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.UP_BUTTON_DOWN='upbuttondown'; /**
 * An event dispatched when the 'up' button is released.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.UP_BUTTON_UP='upbuttonup'; /**
 * An event dispatched when the 'down' button is pressed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.DOWN_BUTTON_DOWN='downbuttondown'; /**
 * An event dispatched when the 'down' button is released.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.DOWN_BUTTON_UP='downbuttonup'; /**
 * An event dispatched when the 'a' button is pressed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.A_BUTTON_DOWN='abuttondown'; /**
 * An event dispatched when the 'a' button is released.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.A_BUTTON_UP='abuttonup'; /**
 * An event dispatched when the 'b' button is pressed.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.B_BUTTON_DOWN='bbuttondown'; /**
 * An event dispatched when the 'b' button is released.
 * Issued by: {@link enchant.Core}, {@link enchant.Scene}
 * @type String
 */enchant.Event.B_BUTTON_UP='bbuttonup'; /**
 * An event dispatched when an Action is added to a Timeline.
 * When looped, an Action is removed from the Timeline and added back into it.
 * @type String
 */enchant.Event.ADDED_TO_TIMELINE="addedtotimeline"; /**
 * An event dispatched when an Action is removed from a Timeline.
 * When looped, an Action is removed from the timeline and added back into it.
 * @type String
 */enchant.Event.REMOVED_FROM_TIMELINE="removedfromtimeline"; /**
 * An event dispatched when an Action begins.
 * @type String
 */enchant.Event.ACTION_START="actionstart"; /**
 * An event dispatched when an Action finishes.
 * @type String
 */enchant.Event.ACTION_END="actionend"; /**
 * An event dispatched when an Action has gone through one frame.
 * @type String
 */enchant.Event.ACTION_TICK="actiontick"; /**
 * An event dispatched to the Timeline when an Action is added.
 * @type String
 */enchant.Event.ACTION_ADDED="actionadded"; /**
 * An event dispatched to the Timeline when an Action is removed.
 * @type String
 */enchant.Event.ACTION_REMOVED="actionremoved"; /**
 * An event dispatched when an animation finishes, meaning null element was encountered
 * Issued by: {@link enchant.Sprite}
 * @type String
 */enchant.Event.ANIMATION_END="animationend"; /**
 * @scope enchant.EventTarget.prototype
 */enchant.EventTarget=enchant.Class.create({ /**
     * @name enchant.EventTarget
     * @class
     * A class for implementation of events similar to DOM Events.
     * However, it does not include the concept of phases.
     * @constructs
     */initialize:function initialize(){this._listeners={};}, /**
     * Add a new event listener which will be executed when the event
     * is dispatched.
     * @param {String} type Type of the events.
     * @param {Function(e:enchant.Event)} listener Event listener to be added.
     */addEventListener:function addEventListener(type,listener){var listeners=this._listeners[type];if(listeners==null){this._listeners[type]=[listener];}else if(listeners.indexOf(listener)===-1){listeners.unshift(listener);}}, /**
     * Synonym for addEventListener.
     * @param {String} type Type of the events.
     * @param {Function(e:enchant.Event)} listener Event listener to be added.
     * @see enchant.EventTarget#addEventListener
     */on:function on(){this.addEventListener.apply(this,arguments);}, /**
     * Delete an event listener.
     * @param {String} [type] Type of the events.
     * @param {Function(e:enchant.Event)} listener Event listener to be deleted.
     */removeEventListener:function removeEventListener(type,listener){var listeners=this._listeners[type];if(listeners!=null){var i=listeners.indexOf(listener);if(i!==-1){listeners.splice(i,1);}}}, /**
     * Clear all defined event listeners of a given type.
     * If no type is given, all listeners will be removed.
     * @param {String} type Type of the events.
     */clearEventListener:function clearEventListener(type){if(type!=null){delete this._listeners[type];}else {this._listeners={};}}, /**
     * Issue an event.
     * @param {enchant.Event} e Event to be issued.
     */dispatchEvent:function dispatchEvent(e){e.target=this;e.localX=e.x-this._offsetX;e.localY=e.y-this._offsetY;if(this['on'+e.type]!=null){this['on'+e.type](e);}var listeners=this._listeners[e.type];if(listeners!=null){listeners=listeners.slice();for(var i=0,len=listeners.length;i<len;i++){listeners[i].call(this,e);}}}});(function(){var core; /**
     * @scope enchant.Core.prototype
     */enchant.Core=enchant.Class.create(enchant.EventTarget,{ /**
         * @name enchant.Core
         * @class
         * A class for controlling the core’s main loop and scenes.
         *
         * There can be only one instance at a time. When the
         * constructor is executed while an instance exists, the
         * existing instance will be overwritten. The existing instance
         * can be accessed from {@link enchant.Core.instance}.
         *
         * @param {Number} [width=320] The width of the core viewport.
         * @param {Number} [height=320] The height of the core viewport.
         * @constructs
         * @extends enchant.EventTarget
         */initialize:function initialize(width,height){if(window.document.body===null){ // @TODO postpone initialization after window.onload
throw new Error("document.body is null. Please excute 'new Core()' in window.onload.");}enchant.EventTarget.call(this);var initial=true;if(core){initial=false;core.stop();}core=enchant.Core.instance=this;this._calledTime=0;this._mousedownID=0;this._surfaceID=0;this._soundID=0;this._scenes=[];width=width||320;height=height||320;var stage=document.getElementById('enchant-stage');var scale,sWidth,sHeight;if(!stage){stage=document.createElement('div');stage.id='enchant-stage';stage.style.position='absolute';if(document.body.firstChild){document.body.insertBefore(stage,document.body.firstChild);}else {document.body.appendChild(stage);}scale=Math.min(window.innerWidth/width,window.innerHeight/height);this._pageX=stage.getBoundingClientRect().left;this._pageY=stage.getBoundingClientRect().top;}else {var style=window.getComputedStyle(stage);sWidth=parseInt(style.width,10);sHeight=parseInt(style.height,10);if(sWidth&&sHeight){scale=Math.min(sWidth/width,sHeight/height);}else {scale=1;}while(stage.firstChild){stage.removeChild(stage.firstChild);}stage.style.position='relative';var bounding=stage.getBoundingClientRect();this._pageX=Math.round(window.scrollX||window.pageXOffset+bounding.left);this._pageY=Math.round(window.scrollY||window.pageYOffset+bounding.top);}stage.style.fontSize='12px';stage.style.webkitTextSizeAdjust='none';stage.style.webkitTapHighlightColor='rgba(0, 0, 0, 0)';this._element=stage;this.addEventListener('coreresize',this._oncoreresize);this._width=width;this._height=height;this.scale=scale; /**
             * The frame rate of the core.
             * @type Number
             */this.fps=30; /**
             * The number of frames processed since the core was started.
             * @type Number
             */this.frame=0; /**
             * Indicates whether or not the core can be executed.
             * @type Boolean
             */this.ready=false; /**
             * Indicates whether or not the core is currently running.
             * @type Boolean
             */this.running=false; /**
             * Object which stores loaded assets using their paths as keys.
             * @type Object
             */this.assets={};var assets=this._assets=[];(function detectAssets(module){if(module.assets){enchant.Core.instance.preload(module.assets);}for(var prop in module){if(module.hasOwnProperty(prop)){if(_typeof(module[prop])==='object'&&module[prop]!==null&&Object.getPrototypeOf(module[prop])===Object.prototype){detectAssets(module[prop]);}}}})(enchant); /**
             * The Scene which is currently displayed. This Scene is on top of the Scene stack.
             * @type enchant.Scene
             */this.currentScene=null; /**
             * The root Scene. The Scene at the bottom of the Scene stack.
             * @type enchant.Scene
             */this.rootScene=new enchant.Scene();this.pushScene(this.rootScene); /**
             * The Scene to be displayed during loading.
             * @type enchant.Scene
             */this.loadingScene=new enchant.LoadingScene(); /**
             [/lang:ja]
             * Indicates whether or not {@link enchant.Core#start} has been called.
             [/lang]
             * @type Boolean
             * @private
             */this._activated=false;this._offsetX=0;this._offsetY=0; /**
             * Object that saves the current input state for the core.
             * @type Object
             */this.input={};this.keyboardInputManager=new enchant.KeyboardInputManager(window.document,this.input);this.keyboardInputManager.addBroadcastTarget(this);this._keybind=this.keyboardInputManager._binds;if(!enchant.ENV.KEY_BIND_TABLE){enchant.ENV.KEY_BIND_TABLE={};}for(var prop in enchant.ENV.KEY_BIND_TABLE){this.keybind(prop,enchant.ENV.KEY_BIND_TABLE[prop]);}if(initial){stage=enchant.Core.instance._element;var evt;document.addEventListener('keydown',function(e){core.dispatchEvent(new enchant.Event('keydown'));if(enchant.ENV.PREVENT_DEFAULT_KEY_CODES.indexOf(e.keyCode)!==-1){e.preventDefault();e.stopPropagation();}},true);if(enchant.ENV.TOUCH_ENABLED){stage.addEventListener('touchstart',function(e){var tagName=e.target.tagName.toLowerCase();if(enchant.ENV.USE_DEFAULT_EVENT_TAGS.indexOf(tagName)===-1){e.preventDefault();if(!core.running){e.stopPropagation();}}},true);stage.addEventListener('touchmove',function(e){var tagName=e.target.tagName.toLowerCase();if(enchant.ENV.USE_DEFAULT_EVENT_TAGS.indexOf(tagName)===-1){e.preventDefault();if(!core.running){e.stopPropagation();}}},true);stage.addEventListener('touchend',function(e){var tagName=e.target.tagName.toLowerCase();if(enchant.ENV.USE_DEFAULT_EVENT_TAGS.indexOf(tagName)===-1){e.preventDefault();if(!core.running){e.stopPropagation();}}},true);}stage.addEventListener('mousedown',function(e){var tagName=e.target.tagName.toLowerCase();if(enchant.ENV.USE_DEFAULT_EVENT_TAGS.indexOf(tagName)===-1){e.preventDefault();core._mousedownID++;if(!core.running){e.stopPropagation();}}},true);stage.addEventListener('mousemove',function(e){var tagName=e.target.tagName.toLowerCase();if(enchant.ENV.USE_DEFAULT_EVENT_TAGS.indexOf(tagName)===-1){e.preventDefault();if(!core.running){e.stopPropagation();}}},true);stage.addEventListener('mouseup',function(e){var tagName=e.target.tagName.toLowerCase();if(enchant.ENV.USE_DEFAULT_EVENT_TAGS.indexOf(tagName)===-1){e.preventDefault();if(!core.running){e.stopPropagation();}}},true);core._touchEventTarget={};if(enchant.ENV.TOUCH_ENABLED){stage.addEventListener('touchstart',function(e){var core=enchant.Core.instance;var evt=new enchant.Event(enchant.Event.TOUCH_START);var touches=e.changedTouches;var touch,target;for(var i=0,l=touches.length;i<l;i++){touch=touches[i];evt._initPosition(touch.pageX,touch.pageY);target=core.currentScene._determineEventTarget(evt);core._touchEventTarget[touch.identifier]=target;target.dispatchEvent(evt);}},false);stage.addEventListener('touchmove',function(e){var core=enchant.Core.instance;var evt=new enchant.Event(enchant.Event.TOUCH_MOVE);var touches=e.changedTouches;var touch,target;for(var i=0,l=touches.length;i<l;i++){touch=touches[i];target=core._touchEventTarget[touch.identifier];if(target){evt._initPosition(touch.pageX,touch.pageY);target.dispatchEvent(evt);}}},false);stage.addEventListener('touchend',function(e){var core=enchant.Core.instance;var evt=new enchant.Event(enchant.Event.TOUCH_END);var touches=e.changedTouches;var touch,target;for(var i=0,l=touches.length;i<l;i++){touch=touches[i];target=core._touchEventTarget[touch.identifier];if(target){evt._initPosition(touch.pageX,touch.pageY);target.dispatchEvent(evt);delete core._touchEventTarget[touch.identifier];}}},false);}stage.addEventListener('mousedown',function(e){var core=enchant.Core.instance;var evt=new enchant.Event(enchant.Event.TOUCH_START);evt._initPosition(e.pageX,e.pageY);var target=core.currentScene._determineEventTarget(evt);core._touchEventTarget[core._mousedownID]=target;target.dispatchEvent(evt);},false);stage.addEventListener('mousemove',function(e){var core=enchant.Core.instance;var evt=new enchant.Event(enchant.Event.TOUCH_MOVE);evt._initPosition(e.pageX,e.pageY);var target=core._touchEventTarget[core._mousedownID];if(target){target.dispatchEvent(evt);}},false);stage.addEventListener('mouseup',function(e){var core=enchant.Core.instance;var evt=new enchant.Event(enchant.Event.TOUCH_END);evt._initPosition(e.pageX,e.pageY);var target=core._touchEventTarget[core._mousedownID];if(target){target.dispatchEvent(evt);}delete core._touchEventTarget[core._mousedownID];},false);}}, /**
         * The width of the core screen.
         * @type Number
         */width:{get:function get(){return this._width;},set:function set(w){this._width=w;this._dispatchCoreResizeEvent();}}, /**
         * The height of the core screen.
         * @type Number
         */height:{get:function get(){return this._height;},set:function set(h){this._height=h;this._dispatchCoreResizeEvent();}}, /**
         * The scaling of the core rendering.
         * @type Number
         */scale:{get:function get(){return this._scale;},set:function set(s){this._scale=s;this._dispatchCoreResizeEvent();}},_dispatchCoreResizeEvent:function _dispatchCoreResizeEvent(){var e=new enchant.Event('coreresize');e.width=this._width;e.height=this._height;e.scale=this._scale;this.dispatchEvent(e);},_oncoreresize:function _oncoreresize(e){this._element.style.width=Math.floor(this._width*this._scale)+'px';this._element.style.height=Math.floor(this._height*this._scale)+'px';var scene;for(var i=0,l=this._scenes.length;i<l;i++){scene=this._scenes[i];scene.dispatchEvent(e);}}, /**
         * File preloader.
         *
         * Loads the files specified in the parameters when
         * {@link enchant.Core#start} is called.
         * When all files are loaded, a {@link enchant.Event.LOAD}
         * event is dispatched from the Core object. Depending on the
         * type of each file, different objects will be created and
         * stored in {@link enchant.Core#assets} Variable.
         *
         * When an image file is loaded, a {@link enchant.Surface} is
         * created. If a sound file is loaded, an {@link enchant.Sound}
         * object is created. Any other file type will be accessible
         * as a string.
         *
         * In addition, because this Surface object is created with
         * {@link enchant.Surface.load}, it is not possible to
         * manipulate the image directly.
         * Refer to the {@link enchant.Surface.load} documentation.
         *
         * @example
         * core.preload('player.gif');
         * core.onload = function() {
         *     var sprite = new Sprite(32, 32);
         *     sprite.image = core.assets['player.gif']; // Access via path
         *     ...
         * };
         * core.start();
         *
         * @param {...String|String[]} assets Path of images to be preloaded.
         * Multiple settings possible.
         * @return {enchant.Core} this
         */preload:function preload(assets){var a;if(!(assets instanceof Array)){if((typeof assets==='undefined'?'undefined':_typeof(assets))==='object'){a=[];for(var name in assets){if(assets.hasOwnProperty(name)){a.push([assets[name],name]);}}assets=a;}else {assets=Array.prototype.slice.call(arguments);}}Array.prototype.push.apply(this._assets,assets);return this;}, /**
         * Loads a file.
         *
         * @param {String} src File path of the resource to be loaded.
         * @param {String} [alias] Name you want to designate for the resource to be loaded.
         * @param {Function} [callback] Function to be called if the file loads successfully.
         * @param {Function} [onerror] Function to be called if the file fails to load.
         * @return {enchant.Deferred}
         */load:function load(src,alias,callback,onerror){var assetName;if(typeof arguments[1]==='string'){assetName=alias;callback=callback||function(){};onerror=onerror||function(){};}else {assetName=src;var tempCallback=callback;callback=arguments[1]||function(){};onerror=tempCallback||function(){};}var ext=enchant.Core.findExt(src);return enchant.Deferred.next(function(){var d=new enchant.Deferred();var _callback=function _callback(e){d.call(e);callback.call(this,e);};var _onerror=function _onerror(e){d.fail(e);onerror.call(this,e);};if(enchant.Core._loadFuncs[ext]){enchant.Core.instance.assets[assetName]=enchant.Core._loadFuncs[ext](src,ext,_callback,_onerror);}else {var req=new XMLHttpRequest();req.open('GET',src,true);req.onreadystatechange=function(){if(req.readyState===4){if(req.status!==200&&req.status!==0){ // throw new Error(req.status + ': ' + 'Cannot load an asset: ' + src);
var e=new enchant.Event('error');e.message=req.status+': '+'Cannot load an asset: '+src;_onerror.call(enchant.Core.instance,e);}var type=req.getResponseHeader('Content-Type')||'';if(type.match(/^image/)){core.assets[assetName]=enchant.Surface.load(src,_callback,_onerror);}else if(type.match(/^audio/)){core.assets[assetName]=enchant.Sound.load(src,type,_callback,_onerror);}else {core.assets[assetName]=req.responseText;_callback.call(enchant.Core.instance,new enchant.Event('load'));}}};req.send(null);}return d;});}, /**
         * Start the core.
         *
         * Sets the framerate of the {@link enchant.Core#currentScene}
         * according to the value stored in {@link enchant.core#fps}. If
         * there are images to preload, loading will begin and the
         * loading screen will be displayed.
         * @return {enchant.Deferred}
         */start:function start(deferred){var onloadTimeSetter=function onloadTimeSetter(){this.frame=0;this.removeEventListener('load',onloadTimeSetter);};this.addEventListener('load',onloadTimeSetter);this.currentTime=window.getTime();this.running=true;this.ready=true;if(!this._activated){this._activated=true;if(enchant.ENV.BROWSER==='mobilesafari'&&enchant.ENV.USE_WEBAUDIO&&enchant.ENV.USE_TOUCH_TO_START_SCENE){var d=new enchant.Deferred();var scene=this._createTouchToStartScene();scene.addEventListener(enchant.Event.TOUCH_START,function waitTouch(){this.removeEventListener(enchant.Event.TOUCH_START,waitTouch);var a=new enchant.WebAudioSound();a.buffer=enchant.WebAudioSound.audioContext.createBuffer(1,1,48000);a.play();core.removeScene(scene);core.start(d);},false);core.pushScene(scene);return d;}}this._requestNextFrame(0);var ret=this._requestPreload().next(function(){enchant.Core.instance.loadingScene.dispatchEvent(new enchant.Event(enchant.Event.LOAD));});if(deferred){ret.next(function(arg){deferred.call(arg);}).error(function(arg){deferred.fail(arg);});}return ret;},_requestPreload:function _requestPreload(){var o={};var loaded=0,len=0,loadFunc=function loadFunc(){var e=new enchant.Event('progress');e.loaded=++loaded;e.total=len;core.loadingScene.dispatchEvent(e);};this._assets.reverse().forEach(function(asset){var src,name;if(asset instanceof Array){src=asset[0];name=asset[1];}else {src=name=asset;}if(!o[name]){o[name]=this.load(src,name,loadFunc);len++;}},this);this.pushScene(this.loadingScene);return enchant.Deferred.parallel(o);},_createTouchToStartScene:function _createTouchToStartScene(){var label=new enchant.Label('Touch to Start'),size=Math.round(core.width/10),scene=new enchant.Scene();label.color='#fff';label.font=size-1+'px bold Helvetica,Arial,sans-serif';label.textAlign='center';label.width=core.width;label.height=label._boundHeight;label.y=(core.height-label.height)/2;scene.backgroundColor='#000';scene.addChild(label);return scene;}, /**
         * Start application in debug mode.
         *
         * Core debug mode can be turned on even if the
         * {@link enchant.Core#_debug} flag is already set to true.
         * @return {enchant.Deferred}
         */debug:function debug(){this._debug=true;return this.start();},actualFps:{get:function get(){return this._actualFps||this.fps;}}, /**
         * Requests the next frame.
         * @param {Number} delay Amount of time to delay before calling requestAnimationFrame.
         * @private
         */_requestNextFrame:function _requestNextFrame(delay){if(!this.ready){return;}if(this.fps>=60||delay<=16){this._calledTime=window.getTime();window.requestAnimationFrame(this._callTick);}else {setTimeout(function(){var core=enchant.Core.instance;core._calledTime=window.getTime();window.requestAnimationFrame(core._callTick);},Math.max(0,delay));}}, /**
         * Calls {@link enchant.Core#_tick}.
         * @param {Number} time
         * @private
         */_callTick:function _callTick(time){enchant.Core.instance._tick(time);},_tick:function _tick(time){var e=new enchant.Event('enterframe');var now=window.getTime();var elapsed=e.elapsed=now-this.currentTime;this.currentTime=now;this._actualFps=elapsed>0?1000/elapsed:0;var nodes=this.currentScene.childNodes.slice();var push=Array.prototype.push;while(nodes.length){var node=nodes.pop();node.age++;node.dispatchEvent(e);if(node.childNodes){push.apply(nodes,node.childNodes);}}this.currentScene.age++;this.currentScene.dispatchEvent(e);this.dispatchEvent(e);this.dispatchEvent(new enchant.Event('exitframe'));this.frame++;now=window.getTime();this._requestNextFrame(1000/this.fps-(now-this._calledTime));},getTime:function getTime(){return window.getTime();}, /**
         * Stops the core.
         *
         * The frame will not be updated, and player input will not be accepted anymore.
         * Core can be restarted using {@link enchant.Core#resume}.
         */stop:function stop(){this.ready=false;this.running=false;}, /**
         * Stops the core.
         *
         * The frame will not be updated, and player input will not be accepted anymore.
         * Core can be started again using {@link enchant.Core#resume}.
         */pause:function pause(){this.ready=false;}, /**
         * Resumes core operations.
         */resume:function resume(){if(this.ready){return;}this.currentTime=window.getTime();this.ready=true;this.running=true;this._requestNextFrame(0);}, /**
         * Switches to a new Scene.
         *
         * Scenes are controlled using a stack, with the top scene on
         * the stack being the one displayed.
         * When {@link enchant.Core#pushScene} is executed, the Scene is
         * placed top of the stack. Frames will be only updated for the
         * Scene which is on the top of the stack.
         *
         * @param {enchant.Scene} scene The new scene to display.
         * @return {enchant.Scene} The new Scene.
         */pushScene:function pushScene(scene){this._element.appendChild(scene._element);if(this.currentScene){this.currentScene.dispatchEvent(new enchant.Event('exit'));}this.currentScene=scene;this.currentScene.dispatchEvent(new enchant.Event('enter'));return this._scenes.push(scene);}, /**
         * Ends the current Scene and returns to the previous Scene.
         *
         * Scenes are controlled using a stack, with the top scene on
         * the stack being the one displayed.
         * When {@link enchant.Core#popScene} is executed, the Scene at
         * the top of the stack is removed and returned.
         *
         * @return {enchant.Scene} Removed Scene.
         */popScene:function popScene(){if(this.currentScene===this.rootScene){return this.currentScene;}this._element.removeChild(this.currentScene._element);this.currentScene.dispatchEvent(new enchant.Event('exit'));this.currentScene=this._scenes[this._scenes.length-2];this.currentScene.dispatchEvent(new enchant.Event('enter'));return this._scenes.pop();}, /**
         * Overwrites the current Scene with a new Scene.
         *
         * Executes {@link enchant.Core#popScene} and {@link enchant.Core#pushScene}
         * one after another to replace the current scene with the new scene.
         *
         * @param {enchant.Scene} scene The new scene with which to replace the current scene.
         * @return {enchant.Scene} The new Scene.
         */replaceScene:function replaceScene(scene){this.popScene();return this.pushScene(scene);}, /**
         * Removes a Scene from the Scene stack.
         *
         * If the scene passed in as a parameter is not the current
         * scene, the stack will be searched for the given scene.
         * If the given scene does not exist anywhere in the stack,
         * this method returns null.
         *
         * @param {enchant.Scene} scene Scene to be removed.
         * @return {enchant.Scene} The deleted Scene.
         */removeScene:function removeScene(scene){if(this.currentScene===scene){return this.popScene();}else {var i=this._scenes.indexOf(scene);if(i!==-1){this._scenes.splice(i,1);this._element.removeChild(scene._element);return scene;}else {return null;}}},_buttonListener:function _buttonListener(e){this.currentScene.dispatchEvent(e);}, /**
         * Bind a key code to an enchant.js button.
         *
         * Binds the given key code to the given enchant.js button
         * ('left', 'right', 'up', 'down', 'a', 'b').
         *
         * @param {Number} key Key code for the button to be bound.
         * @param {String} button An enchant.js button.
         * @return {enchant.Core} this
         */keybind:function keybind(key,button){this.keyboardInputManager.keybind(key,button);this.addEventListener(button+'buttondown',this._buttonListener);this.addEventListener(button+'buttonup',this._buttonListener);return this;}, /**
         * Delete the key binding for the given key.
         *
         * @param {Number} key Key code whose binding is to be deleted.
         * @return {enchant.Core} this
         */keyunbind:function keyunbind(key){var button=this._keybind[key];this.keyboardInputManager.keyunbind(key);this.removeEventListener(button+'buttondown',this._buttonListener);this.removeEventListener(button+'buttonup',this._buttonListener);return this;},changeButtonState:function changeButtonState(button,bool){this.keyboardInputManager.changeState(button,bool);}, /**
         * Get the core time (not actual) elapsed since {@link enchant.Core#start} was called.
         * @return {Number} Time elapsed (in seconds).
         */getElapsedTime:function getElapsedTime(){return this.frame/this.fps;}}); /**
     * Functions for loading assets of the corresponding file type.
     * The loading functions must take the file path, extension and
     * callback function as arguments, then return the appropriate
     * class instance.
     * @static
     * @private
     * @type Object
     */enchant.Core._loadFuncs={};enchant.Core._loadFuncs['jpg']=enchant.Core._loadFuncs['jpeg']=enchant.Core._loadFuncs['gif']=enchant.Core._loadFuncs['png']=enchant.Core._loadFuncs['bmp']=function(src,ext,callback,onerror){return enchant.Surface.load(src,callback,onerror);};enchant.Core._loadFuncs['mp3']=enchant.Core._loadFuncs['aac']=enchant.Core._loadFuncs['m4a']=enchant.Core._loadFuncs['wav']=enchant.Core._loadFuncs['ogg']=function(src,ext,callback,onerror){return enchant.Sound.load(src,'audio/'+ext,callback,onerror);}; /**
     * Get the file extension from a path.
     * @param {String} path file path.
     * @return {*}
     */enchant.Core.findExt=function(path){var matched=path.match(/\.\w+$/);if(matched&&matched.length>0){return matched[0].slice(1).toLowerCase();} // for data URI
if(path.indexOf('data:')===0){return path.split(/[\/;]/)[1].toLowerCase();}return null;}; /**
     * The current Core instance.
     * @type enchant.Core
     * @static
     */enchant.Core.instance=null;})(); /**
 * @name enchant.Game
 * @class
 * enchant.Game is moved to {@link enchant.Core} from v0.6
 * @deprecated
 */enchant.Game=enchant.Core; /**
 * @scope enchant.InputManager.prototype
 */enchant.InputManager=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.InputManager
     * @class
     * Class for managing input.
     * @param {*} valueStore object that store input state.
     * @param {*} [source=this] source that will be added to event object.
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(valueStore,source){enchant.EventTarget.call(this); /**
         * Array that store event target.
         * @type enchant.EventTarget[]
         */this.broadcastTarget=[]; /**
         * Object that store input state.
         * @type Object
         */this.valueStore=valueStore; /**
         * source that will be added to event object.
         * @type Object
         */this.source=source||this;this._binds={};this._stateHandler=function(e){var id=e.source.identifier;var name=this._binds[id];this.changeState(name,e.data);}.bind(this);}, /**
     * Name specified input.
     * Input can be watched by flag or event.
     * @param {enchant.InputSource} inputSource input source.
     * @param {String} name input name.
     */bind:function bind(inputSource,name){inputSource.addEventListener(enchant.Event.INPUT_STATE_CHANGED,this._stateHandler);this._binds[inputSource.identifier]=name;}, /**
     * Remove binded name.
     * @param {enchant.InputSource} inputSource input source.
     */unbind:function unbind(inputSource){inputSource.removeEventListener(enchant.Event.INPUT_STATE_CHANGED,this._stateHandler);delete this._binds[inputSource.identifier];}, /**
     * Add event target.
     * @param {enchant.EventTarget} eventTarget broadcast target.
     */addBroadcastTarget:function addBroadcastTarget(eventTarget){var i=this.broadcastTarget.indexOf(eventTarget);if(i===-1){this.broadcastTarget.push(eventTarget);}}, /**
     * Remove event target.
     * @param {enchant.EventTarget} eventTarget broadcast target.
     */removeBroadcastTarget:function removeBroadcastTarget(eventTarget){var i=this.broadcastTarget.indexOf(eventTarget);if(i!==-1){this.broadcastTarget.splice(i,1);}}, /**
     * Dispatch event to {@link enchant.InputManager#broadcastTarget}.
     * @param {enchant.Event} e event.
     */broadcastEvent:function broadcastEvent(e){var target=this.broadcastTarget;for(var i=0,l=target.length;i<l;i++){target[i].dispatchEvent(e);}}, /**
     * Change state of input.
     * @param {String} name input name.
     * @param {*} data input state.
     */changeState:function changeState(name,data){}}); /**
 * @scope enchant.InputSource.prototype
 */enchant.InputSource=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.InputSource
     * @class
     * Class that wrap input.
     * @param {String} identifier identifier of InputSource.
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(identifier){enchant.EventTarget.call(this); /**
         * identifier of InputSource.
         * @type String
         */this.identifier=identifier;}, /**
     * Notify state change by event.
     * @param {*} data state.
     */notifyStateChange:function notifyStateChange(data){var e=new enchant.Event(enchant.Event.INPUT_STATE_CHANGED);e.data=data;e.source=this;this.dispatchEvent(e);}}); /**
 * @scope enchant.BinaryInputManager.prototype
 */enchant.BinaryInputManager=enchant.Class.create(enchant.InputManager,{ /**
     * @name enchant.BinaryInputManager
     * @class
     * Class for managing input.
     * @param {*} flagStore object that store input flag.
     * @param {String} activeEventNameSuffix event name suffix.
     * @param {String} inactiveEventNameSuffix event name suffix.
     * @param {*} [source=this] source that will be added to event object.
     * @constructs
     * @extends enchant.InputManager
     */initialize:function initialize(flagStore,activeEventNameSuffix,inactiveEventNameSuffix,source){enchant.InputManager.call(this,flagStore,source); /**
         * The number of active inputs.
         * @type Number
         */this.activeInputsNum=0; /**
         * event name suffix that dispatched by BinaryInputManager.
         * @type String
         */this.activeEventNameSuffix=activeEventNameSuffix; /**
         * event name suffix that dispatched by BinaryInputManager.
         * @type String
         */this.inactiveEventNameSuffix=inactiveEventNameSuffix;}, /**
     * Name specified input.
     * @param {enchant.BinaryInputSource} inputSource input source.
     * @param {String} name input name.
     * @see enchant.InputManager#bind
     */bind:function bind(binaryInputSource,name){enchant.InputManager.prototype.bind.call(this,binaryInputSource,name);this.valueStore[name]=false;}, /**
     * Remove binded name.
     * @param {enchant.BinaryInputSource} inputSource input source.
     * @see enchant.InputManager#unbind
     */unbind:function unbind(binaryInputSource){var name=this._binds[binaryInputSource.identifier];enchant.InputManager.prototype.unbind.call(this,binaryInputSource);delete this.valueStore[name];}, /**
     * Change state of input.
     * @param {String} name input name.
     * @param {Boolean} bool input state.
     */changeState:function changeState(name,bool){if(bool){this._down(name);}else {this._up(name);}},_down:function _down(name){var inputEvent;if(!this.valueStore[name]){this.valueStore[name]=true;inputEvent=new enchant.Event(this.activeInputsNum++?'inputchange':'inputstart');inputEvent.source=this.source;this.broadcastEvent(inputEvent);}var downEvent=new enchant.Event(name+this.activeEventNameSuffix);downEvent.source=this.source;this.broadcastEvent(downEvent);},_up:function _up(name){var inputEvent;if(this.valueStore[name]){this.valueStore[name]=false;inputEvent=new enchant.Event(--this.activeInputsNum?'inputchange':'inputend');inputEvent.source=this.source;this.broadcastEvent(inputEvent);}var upEvent=new enchant.Event(name+this.inactiveEventNameSuffix);upEvent.source=this.source;this.broadcastEvent(upEvent);}}); /**
 * @scope enchant.BinaryInputSource.prototype
 */enchant.BinaryInputSource=enchant.Class.create(enchant.InputSource,{ /**
     * @name enchant.BinaryInputSource
     * @class
     * Class that wrap binary input.
     * @param {String} identifier identifier of BinaryInputSource.
     * @constructs
     * @extends enchant.InputSource
     */initialize:function initialize(identifier){enchant.InputSource.call(this,identifier);}}); /**
 * @scope enchant.KeyboardInputManager.prototype
 */enchant.KeyboardInputManager=enchant.Class.create(enchant.BinaryInputManager,{ /**
     * @name enchant.KeyboardInputManager
     * @class
     * Class that manage keyboard input.
     * @param {HTMLElement} dom element that will be watched.
     * @param {*} flagStore object that store input flag.
     * @constructs
     * @extends enchant.BinaryInputManager
     */initialize:function initialize(domElement,flagStore){enchant.BinaryInputManager.call(this,flagStore,'buttondown','buttonup');this._attachDOMEvent(domElement,'keydown',true);this._attachDOMEvent(domElement,'keyup',false);}, /**
     * Call {@link enchant.BinaryInputManager#bind} with BinaryInputSource equivalent of key code.
     * @param {Number} keyCode key code.
     * @param {String} name input name.
     */keybind:function keybind(keyCode,name){this.bind(enchant.KeyboardInputSource.getByKeyCode(''+keyCode),name);}, /**
     * Call {@link enchant.BinaryInputManager#unbind} with BinaryInputSource equivalent of key code.
     * @param {Number} keyCode key code.
     */keyunbind:function keyunbind(keyCode){this.unbind(enchant.KeyboardInputSource.getByKeyCode(''+keyCode));},_attachDOMEvent:function _attachDOMEvent(domElement,eventType,state){domElement.addEventListener(eventType,function(e){var core=enchant.Core.instance;if(!core||!core.running){return;}var code=e.keyCode;var source=enchant.KeyboardInputSource._instances[code];if(source){source.notifyStateChange(state);}},true);}}); /**
 * @scope enchant.KeyboardInputSource.prototype
 */enchant.KeyboardInputSource=enchant.Class.create(enchant.BinaryInputSource,{ /**
     * @name enchant.KeyboardInputSource
     * @class
     * @param {String} keyCode key code of BinaryInputSource.
     * @constructs
     * @extends enchant.BinaryInputSource
     */initialize:function initialize(keyCode){enchant.BinaryInputSource.call(this,keyCode);}}); /**
 * @private
 */enchant.KeyboardInputSource._instances={}; /**
 * @static
 * Get the instance by key code.
 * @param {Number} keyCode key code.
 * @return {enchant.KeyboardInputSource} instance.
 */enchant.KeyboardInputSource.getByKeyCode=function(keyCode){if(!this._instances[keyCode]){this._instances[keyCode]=new enchant.KeyboardInputSource(keyCode);}return this._instances[keyCode];}; /**
 * @scope enchant.Node.prototype
 */enchant.Node=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.Node
     * @class
     * Base class for objects in the display tree which is rooted at a Scene.
     * Not to be used directly.
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(){enchant.EventTarget.call(this);this._dirty=false;this._matrix=[1,0,0,1,0,0];this._x=0;this._y=0;this._offsetX=0;this._offsetY=0; /**
         * The age (frames) of this node which will be increased before this node receives {@link enchant.Event.ENTER_FRAME} event.
         * @type Number
         */this.age=0; /**
         * Parent Node of this Node.
         * @type enchant.Group
         */this.parentNode=null; /**
         * Scene to which Node belongs.
         * @type enchant.Scene
         */this.scene=null;this.addEventListener('touchstart',function(e){if(this.parentNode){this.parentNode.dispatchEvent(e);}});this.addEventListener('touchmove',function(e){if(this.parentNode){this.parentNode.dispatchEvent(e);}});this.addEventListener('touchend',function(e){if(this.parentNode){this.parentNode.dispatchEvent(e);}}); // Nodeが生成される際に, tl プロパティに Timeline オブジェクトを追加している.
if(enchant.ENV.USE_ANIMATION){this.tl=new enchant.Timeline(this);}}, /**
     * Move the Node to the given target location.
     * @param {Number} x Target x coordinates.
     * @param {Number} y Target y coordinates.
     */moveTo:function moveTo(x,y){this.x=x;this.y=y;}, /**
     * Move the Node relative to its current position.
     * @param {Number} x x axis movement distance.
     * @param {Number} y y axis movement distance.
     */moveBy:function moveBy(x,y){this.x+=x;this.y+=y;}, /**
     * x coordinates of the Node.
     * @type Number
     */x:{get:function get(){return this._x;},set:function set(x){if(this._x!==x){this._x=x;this._dirty=true;}}}, /**
     * y coordinates of the Node.
     * @type Number
     */y:{get:function get(){return this._y;},set:function set(y){if(this._y!==y){this._y=y;this._dirty=true;}}},_updateCoordinate:function _updateCoordinate(){var node=this;var tree=[node];var parent=node.parentNode;var scene=this.scene;while(parent&&node._dirty){tree.unshift(parent);node=node.parentNode;parent=node.parentNode;}var matrix=enchant.Matrix.instance;var stack=matrix.stack;var mat=[];var newmat,ox,oy;stack.push(tree[0]._matrix);for(var i=1,l=tree.length;i<l;i++){node=tree[i];newmat=[];matrix.makeTransformMatrix(node,mat);matrix.multiply(stack[stack.length-1],mat,newmat);node._matrix=newmat;stack.push(newmat);ox=typeof node._originX==='number'?node._originX:node._width/2||0;oy=typeof node._originY==='number'?node._originY:node._height/2||0;var vec=[ox,oy];matrix.multiplyVec(newmat,vec,vec);node._offsetX=vec[0]-ox;node._offsetY=vec[1]-oy;node._dirty=false;}matrix.reset();},remove:function remove(){if(this.parentNode){this.parentNode.removeChild(this);}if(this.childNodes){var childNodes=this.childNodes.slice();for(var i=childNodes.length-1;i>=0;i--){childNodes[i].remove();}}this.clearEventListener();}});var _intersectBetweenClassAndInstance=function _intersectBetweenClassAndInstance(Class,instance){var ret=[];var c;for(var i=0,l=Class.collection.length;i<l;i++){c=Class.collection[i];if(instance._intersectOne(c)){ret.push(c);}}return ret;};var _intersectBetweenClassAndClass=function _intersectBetweenClassAndClass(Class1,Class2){var ret=[];var c1,c2;for(var i=0,l=Class1.collection.length;i<l;i++){c1=Class1.collection[i];for(var j=0,ll=Class2.collection.length;j<ll;j++){c2=Class2.collection[j];if(c1._intersectOne(c2)){ret.push([c1,c2]);}}}return ret;};var _intersectStrictBetweenClassAndInstance=function _intersectStrictBetweenClassAndInstance(Class,instance){var ret=[];var c;for(var i=0,l=Class.collection.length;i<l;i++){c=Class.collection[i];if(instance._intersectStrictOne(c)){ret.push(c);}}return ret;};var _intersectStrictBetweenClassAndClass=function _intersectStrictBetweenClassAndClass(Class1,Class2){var ret=[];var c1,c2;for(var i=0,l=Class1.collection.length;i<l;i++){c1=Class1.collection[i];for(var j=0,ll=Class2.collection.length;j<ll;j++){c2=Class2.collection[j];if(c1._intersectStrictOne(c2)){ret.push([c1,c2]);}}}return ret;};var _staticIntersect=function _staticIntersect(other){if(other instanceof enchant.Entity){return _intersectBetweenClassAndInstance(this,other);}else if(typeof other==='function'&&other.collection){return _intersectBetweenClassAndClass(this,other);}return false;};var _staticIntersectStrict=function _staticIntersectStrict(other){if(other instanceof enchant.Entity){return _intersectStrictBetweenClassAndInstance(this,other);}else if(typeof other==='function'&&other.collection){return _intersectStrictBetweenClassAndClass(this,other);}return false;};var _nodePrototypeClearEventListener=enchant.Node.prototype.clearEventListener; /**
 * @scope enchant.Entity.prototype
 */enchant.Entity=enchant.Class.create(enchant.Node,{ /**
     * @name enchant.Entity
     * @class
     * A class with objects displayed as DOM elements. Not to be used directly.
     * @constructs
     * @extends enchant.Node
     */initialize:function initialize(){var core=enchant.Core.instance;enchant.Node.call(this);this._rotation=0;this._scaleX=1;this._scaleY=1;this._touchEnabled=true;this._clipping=false;this._originX=null;this._originY=null;this._width=0;this._height=0;this._backgroundColor=null;this._debugColor='#0000ff';this._opacity=1;this._visible=true;this._buttonMode=null;this._style={};this.__styleStatus={};this._isContainedInCollection=false; /**
         * @type String
         */this.compositeOperation=null; /**
         * Defines this Entity as a button.
         * When touched or clicked the corresponding button event is dispatched.
         * Valid buttonModes are: left, right, up, down, a, b. 
         * @type String
         */this.buttonMode=null; /**
         * Indicates if this Entity is being clicked.
         * Only works when {@link enchant.Entity.buttonMode} is set.
         * @type Boolean
         */this.buttonPressed=false;this.addEventListener('touchstart',function(){if(!this.buttonMode){return;}this.buttonPressed=true;this.dispatchEvent(new enchant.Event(this.buttonMode+'buttondown'));core.changeButtonState(this.buttonMode,true);});this.addEventListener('touchend',function(){if(!this.buttonMode){return;}this.buttonPressed=false;this.dispatchEvent(new enchant.Event(this.buttonMode+'buttonup'));core.changeButtonState(this.buttonMode,false);});this.enableCollection();}, /**
     * The width of the Entity.
     * @type Number
     */width:{get:function get(){return this._width;},set:function set(width){if(this._width!==width){this._width=width;this._dirty=true;}}}, /**
     * The height of the Entity.
     * @type Number
     */height:{get:function get(){return this._height;},set:function set(height){if(this._height!==height){this._height=height;this._dirty=true;}}}, /**
     * The Entity background color.
     * Must be provided in the same format as the CSS 'color' property.
     * @type String
     */backgroundColor:{get:function get(){return this._backgroundColor;},set:function set(color){this._backgroundColor=color;}}, /**
     * The Entity debug color.
     * Must be provided in the same format as the CSS 'color' property.
     * @type String
     */debugColor:{get:function get(){return this._debugColor;},set:function set(color){this._debugColor=color;}}, /**
     * The transparency of this entity.
     * Defines the transparency level from 0 to 1
     * (0 is completely transparent, 1 is completely opaque).
     * @type Number
     */opacity:{get:function get(){return this._opacity;},set:function set(opacity){this._opacity=parseFloat(opacity);}}, /**
     * Indicates whether or not to display this Entity.
     * @type Boolean
     */visible:{get:function get(){return this._visible;},set:function set(visible){this._visible=visible;}}, /**
     * Indicates whether or not this Entity can be touched.
     * @type Boolean
     */touchEnabled:{get:function get(){return this._touchEnabled;},set:function set(enabled){this._touchEnabled=enabled;if(enabled){this._style.pointerEvents='all';}else {this._style.pointerEvents='none';}}}, /**
     * Performs a collision detection based on whether or not the bounding rectangles are intersecting.
     * @param {*} other An object like Entity, with the properties x, y, width, height, which are used for the 
     * collision detection.
     * @return {Boolean} True, if a collision was detected.
     */intersect:function intersect(other){if(other instanceof enchant.Entity){return this._intersectOne(other);}else if(typeof other==='function'&&other.collection){return _intersectBetweenClassAndInstance(other,this);}return false;},_intersectOne:function _intersectOne(other){if(this._dirty){this._updateCoordinate();}if(other._dirty){other._updateCoordinate();}return this._offsetX<other._offsetX+other.width&&other._offsetX<this._offsetX+this.width&&this._offsetY<other._offsetY+other.height&&other._offsetY<this._offsetY+this.height;},intersectStrict:function intersectStrict(other){if(other instanceof enchant.Entity){return this._intersectStrictOne(other);}else if(typeof other==='function'&&other.collection){return _intersectStrictBetweenClassAndInstance(other,this);}return false;},_intersectStrictOne:function _intersectStrictOne(other){if(this._dirty){this._updateCoordinate();}if(other._dirty){other._updateCoordinate();}var rect1=this.getOrientedBoundingRect(),rect2=other.getOrientedBoundingRect(),lt1=rect1.leftTop,rt1=rect1.rightTop,lb1=rect1.leftBottom,rb1=rect1.rightBottom,lt2=rect2.leftTop,rt2=rect2.rightTop,lb2=rect2.leftBottom,rb2=rect2.rightBottom,ltx1=lt1[0],lty1=lt1[1],rtx1=rt1[0],rty1=rt1[1],lbx1=lb1[0],lby1=lb1[1],rbx1=rb1[0],rby1=rb1[1],ltx2=lt2[0],lty2=lt2[1],rtx2=rt2[0],rty2=rt2[1],lbx2=lb2[0],lby2=lb2[1],rbx2=rb2[0],rby2=rb2[1],t1=[rtx1-ltx1,rty1-lty1],r1=[rbx1-rtx1,rby1-rty1],b1=[lbx1-rbx1,lby1-rby1],l1=[ltx1-lbx1,lty1-lby1],t2=[rtx2-ltx2,rty2-lty2],r2=[rbx2-rtx2,rby2-rty2],b2=[lbx2-rbx2,lby2-rby2],l2=[ltx2-lbx2,lty2-lby2],cx1=ltx1+rtx1+lbx1+rbx1>>2,cy1=lty1+rty1+lby1+rby1>>2,cx2=ltx2+rtx2+lbx2+rbx2>>2,cy2=lty2+rty2+lby2+rby2>>2,i,j,poss1,poss2,dirs1,dirs2,pos1,pos2,dir1,dir2,px1,py1,px2,py2,dx1,dy1,dx2,dy2,vx,vy,c,c1,c2;if(t1[0]*(cy2-lty1)-t1[1]*(cx2-ltx1)>0&&r1[0]*(cy2-rty1)-r1[1]*(cx2-rtx1)>0&&b1[0]*(cy2-rby1)-b1[1]*(cx2-rbx1)>0&&l1[0]*(cy2-lby1)-l1[1]*(cx2-lbx1)>0){return true;}else if(t2[0]*(cy1-lty2)-t2[1]*(cx1-ltx2)>0&&r2[0]*(cy1-rty2)-r2[1]*(cx1-rtx2)>0&&b2[0]*(cy1-rby2)-b2[1]*(cx1-rbx2)>0&&l2[0]*(cy1-lby2)-l2[1]*(cx1-lbx2)>0){return true;}else {poss1=[lt1,rt1,rb1,lb1];poss2=[lt2,rt2,rb2,lb2];dirs1=[t1,r1,b1,l1];dirs2=[t2,r2,b2,l2];for(i=0;i<4;i++){pos1=poss1[i];px1=pos1[0];py1=pos1[1];dir1=dirs1[i];dx1=dir1[0];dy1=dir1[1];for(j=0;j<4;j++){pos2=poss2[j];px2=pos2[0];py2=pos2[1];dir2=dirs2[j];dx2=dir2[0];dy2=dir2[1];c=dx1*dy2-dy1*dx2;if(c!==0){vx=px2-px1;vy=py2-py1;c1=(vx*dy1-vy*dx1)/c;c2=(vx*dy2-vy*dx2)/c;if(0<c1&&c1<1&&0<c2&&c2<1){return true;}}}}return false;}}, /**
     * Performs a collision detection based on distance from the Entity's central point.
     * @param {*} other An object like Entity, with properties x, y, width, height, which are used for the 
     * collision detection.
     * @param {Number} [distance] The greatest distance to be considered for a collision.
     * The default distance is the average of both objects width and height.
     * @return {Boolean} True, if a collision was detected.
     */within:function within(other,distance){if(this._dirty){this._updateCoordinate();}if(other._dirty){other._updateCoordinate();}if(distance==null){distance=(this.width+this.height+other.width+other.height)/4;}var _;return (_=this._offsetX-other._offsetX+(this.width-other.width)/2)*_+(_=this._offsetY-other._offsetY+(this.height-other.height)/2)*_<distance*distance;}, /**
     * Enlarges or shrinks this Entity.
     * @param {Number} x Scaling factor on the x axis.
     * @param {Number} [y] Scaling factor on the y axis.
     */scale:function scale(x,y){this._scaleX*=x;this._scaleY*=y!=null?y:x;this._dirty=true;}, /**
     * Rotate this Entity.
     * @param {Number} deg Rotation angle (degree).
     */rotate:function rotate(deg){this.rotation+=deg;}, /**
     * Scaling factor on the x axis of this Entity.
     * @type Number
     */scaleX:{get:function get(){return this._scaleX;},set:function set(scaleX){if(this._scaleX!==scaleX){this._scaleX=scaleX;this._dirty=true;}}}, /**
     * Scaling factor on the y axis of this Entity.
     * @type Number
     */scaleY:{get:function get(){return this._scaleY;},set:function set(scaleY){if(this._scaleY!==scaleY){this._scaleY=scaleY;this._dirty=true;}}}, /**
     * Entity rotation angle (degree).
     * @type Number
     */rotation:{get:function get(){return this._rotation;},set:function set(rotation){if(this._rotation!==rotation){this._rotation=rotation;this._dirty=true;}}}, /**
     * The point of origin used for rotation and scaling.
     * @type Number
     */originX:{get:function get(){return this._originX;},set:function set(originX){if(this._originX!==originX){this._originX=originX;this._dirty=true;}}}, /**
     * The point of origin used for rotation and scaling.
     * @type Number
     */originY:{get:function get(){return this._originY;},set:function set(originY){if(this._originY!==originY){this._originY=originY;this._dirty=true;}}}, /**
     */enableCollection:function enableCollection(){this.addEventListener('addedtoscene',this._addSelfToCollection);this.addEventListener('removedfromscene',this._removeSelfFromCollection);if(this.scene){this._addSelfToCollection();}}, /**
     */disableCollection:function disableCollection(){this.removeEventListener('addedtoscene',this._addSelfToCollection);this.removeEventListener('removedfromscene',this._removeSelfFromCollection);if(this.scene){this._removeSelfFromCollection();}}, /**#nocode+*/clearEventListener:function clearEventListener(){_nodePrototypeClearEventListener.apply(this,arguments);if(this.scene){this._removeSelfFromCollection();}}, /**#nocode-*/_addSelfToCollection:function _addSelfToCollection(){if(this._isContainedInCollection){return;}var Constructor=this.getConstructor();Constructor._collectionTarget.forEach(function(C){C.collection.push(this);},this);this._isContainedInCollection=true;},_removeSelfFromCollection:function _removeSelfFromCollection(){if(!this._isContainedInCollection){return;}var Constructor=this.getConstructor();Constructor._collectionTarget.forEach(function(C){var i=C.collection.indexOf(this);if(i!==-1){C.collection.splice(i,1);}},this);this._isContainedInCollection=false;},getBoundingRect:function getBoundingRect(){var w=this.width||0;var h=this.height||0;var mat=this._matrix;var m11w=mat[0]*w,m12w=mat[1]*w,m21h=mat[2]*h,m22h=mat[3]*h,mdx=mat[4],mdy=mat[5];var xw=[mdx,m11w+mdx,m21h+mdx,m11w+m21h+mdx].sort(function(a,b){return a-b;});var yh=[mdy,m12w+mdy,m22h+mdy,m12w+m22h+mdy].sort(function(a,b){return a-b;});return {left:xw[0],top:yh[0],width:xw[3]-xw[0],height:yh[3]-yh[0]};},getOrientedBoundingRect:function getOrientedBoundingRect(){var w=this.width||0;var h=this.height||0;var mat=this._matrix;var m11w=mat[0]*w,m12w=mat[1]*w,m21h=mat[2]*h,m22h=mat[3]*h,mdx=mat[4],mdy=mat[5];return {leftTop:[mdx,mdy],rightTop:[m11w+mdx,m12w+mdy],leftBottom:[m21h+mdx,m22h+mdy],rightBottom:[m11w+m21h+mdx,m12w+m22h+mdy]};},getConstructor:function getConstructor(){return Object.getPrototypeOf(this).constructor;}});var _collectizeConstructor=function _collectizeConstructor(Constructor){if(Constructor._collective){return;}var rel=enchant.Class.getInheritanceTree(Constructor);var i=rel.indexOf(enchant.Entity);if(i!==-1){Constructor._collectionTarget=rel.splice(0,i+1);}else {Constructor._collectionTarget=[];}Constructor.intersect=_staticIntersect;Constructor.intersectStrict=_staticIntersectStrict;Constructor.collection=[];Constructor._collective=true;};_collectizeConstructor(enchant.Entity);enchant.Entity._inherited=function(subclass){_collectizeConstructor(subclass);}; /**
 * @scope enchant.Sprite.prototype
 */enchant.Sprite=enchant.Class.create(enchant.Entity,{ /**
     * @name enchant.Sprite
     * @class
     * Class which can display images.
     * @param {Number} width Sprite width.
     * @param {Number} height Sprite height.
     *
     * @example
     * var bear = new Sprite(32, 32);
     * bear.image = core.assets['chara1.gif'];
     *
     * @constructs
     * @extends enchant.Entity
     */initialize:function initialize(width,height){enchant.Entity.call(this);this.width=width;this.height=height;this._image=null;this._debugColor='#ff0000';this._frameLeft=0;this._frameTop=0;this._frame=0;this._frameSequence=null;}, /**
     * Image displayed in the Sprite.
     * @type enchant.Surface
     */image:{get:function get(){return this._image;},set:function set(image){if(image===undefined){throw new Error('Assigned value on Sprite.image is undefined. Please double-check image path, and check if the image you want to use is preload before use.');}if(image===this._image){return;}this._image=image;this._computeFramePosition();}}, /**
     * Index of the frame to be displayed.
     * Frames with the same width and height as Sprite will be arrayed from upper left corner of the 
     * {@link enchant.Sprite#image} image. When a sequence of numbers is provided, the displayed frame 
     * will switch automatically. At the end of the array the sequence will restart. By setting 
     * a value within the sequence to null, the frame switching is stopped.
     *
     * @example
     * var sprite = new Sprite(32, 32);
     * sprite.frame = [0, 1, 0, 2]
     * //-> 0, 1, 0, 2, 0, 1, 0, 2,..
     * sprite.frame = [0, 1, 0, 2, null]
     * //-> 0, 1, 0, 2, (2, 2,.. :stop)
     *
     * @type Number|Array
     */frame:{get:function get(){return this._frame;},set:function set(frame){if(this._frameSequence==null&&this._frame===frame||this._deepCompareToPreviousFrame(frame)){return;}if(frame instanceof Array){this._frameSequence=frame;}else {this._frameSequence=null;this._frame=frame;this._computeFramePosition();}}},_frameSequence:{get:function get(){return this.__frameSequence;},set:function set(frameSequence){if(frameSequence&&!this.__frameSequence){this.addEventListener(enchant.Event.ENTER_FRAME,this._rotateFrameSequence);}else if(!frameSequence&&this.__frameSequence){this.removeEventListener(enchant.Event.ENTER_FRAME,this._rotateFrameSequence);}if(frameSequence){this.__frameSequence=frameSequence.slice();this._originalFrameSequence=frameSequence.slice();this._rotateFrameSequence();}else {this.__frameSequence=null;this._originalFrameSequence=null;}}}, /**
     * If we are setting the same frame Array as animation,
     * just continue animating.
     * @private
     */_deepCompareToPreviousFrame:function _deepCompareToPreviousFrame(frameArray){if(frameArray===this._originalFrameSequence){return true;}if(frameArray==null||this._originalFrameSequence==null){return false;}if(!(frameArray instanceof Array)){return false;}if(frameArray.length!==this._originalFrameSequence.length){return false;}for(var i=0;i<frameArray.length;++i){if(frameArray[i]!==this._originalFrameSequence[i]){return false;}}return true;}, /**
     * 0 <= frame
     * @private
     */_computeFramePosition:function _computeFramePosition(){var image=this._image;var row;if(image!=null){row=image.width/this._width|0;this._frameLeft=(this._frame%row|0)*this._width;this._frameTop=(this._frame/row|0)*this._height%image.height;}},_rotateFrameSequence:function _rotateFrameSequence(){var frameSequence=this._frameSequence;if(frameSequence&&frameSequence.length!==0){var nextFrame=frameSequence.shift();if(nextFrame===null){this._frameSequence=null;this.dispatchEvent(new enchant.Event(enchant.Event.ANIMATION_END));}else {this._frame=nextFrame;this._computeFramePosition();frameSequence.push(nextFrame);}}}, /**#nocode+*/width:{get:function get(){return this._width;},set:function set(width){this._width=width;this._computeFramePosition();this._dirty=true;}},height:{get:function get(){return this._height;},set:function set(height){this._height=height;this._computeFramePosition();this._dirty=true;}}, /**#nocode-*/cvsRender:function cvsRender(ctx){var image=this._image,w=this._width,h=this._height,iw,ih,elem,sx,sy,sw,sh;if(image&&w!==0&&h!==0){iw=image.width;ih=image.height;if(iw<w||ih<h){ctx.fillStyle=enchant.Surface._getPattern(image);ctx.fillRect(0,0,w,h);}else {elem=image._element;sx=this._frameLeft;sy=Math.min(this._frameTop,ih-h); // IE9 doesn't allow for negative or 0 widths/heights when drawing on the CANVAS element
sw=Math.max(0.01,Math.min(iw-sx,w));sh=Math.max(0.01,Math.min(ih-sy,h));ctx.drawImage(elem,sx,sy,sw,sh,0,0,w,h);}}},domRender:function(){if(enchant.ENV.VENDOR_PREFIX==='ms'){return function(element){if(this._image){if(this._image._css){this._style['background-image']=this._image._css;this._style['background-position']=-this._frameLeft+'px '+-this._frameTop+'px';}else if(this._image._element){}}};}else {return function(element){if(this._image){if(this._image._css){this._style['background-image']=this._image._css;this._style['background-position']=-this._frameLeft+'px '+-this._frameTop+'px';}else if(this._image._element){}}};}}()}); /**
 * @scope enchant.Label.prototype
 */enchant.Label=enchant.Class.create(enchant.Entity,{ /**
     * @name enchant.Label
     * @class
     * A class for Label object.
     * @constructs
     * @extends enchant.Entity
     */initialize:function initialize(text){enchant.Entity.call(this);this.text=text||'';this.width=300;this.font='14px serif';this.textAlign='left';this._debugColor='#ff0000';}, /**#nocode+*/width:{get:function get(){return this._width;},set:function set(width){this._width=width;this._dirty=true; // issue #164
this.updateBoundArea();}}, /**#nocode-*/ /**
     * Text to be displayed.
     * @type String
     */text:{get:function get(){return this._text;},set:function set(text){text=''+text;if(this._text===text){return;}this._text=text;text=text.replace(/<br ?\/?>/gi,'<br/>');this._splitText=text.split('<br/>');this.updateBoundArea();for(var i=0,l=this._splitText.length;i<l;i++){text=this._splitText[i];var metrics=this.getMetrics(text);this._splitText[i]={};this._splitText[i].text=text;this._splitText[i].height=metrics.height;this._splitText[i].width=metrics.width;}}}, /**
     * Specifies horizontal alignment of text.
     * Can be set according to the format of the CSS 'text-align' property.
     * @type String
     */textAlign:{get:function get(){return this._style['text-align'];},set:function set(textAlign){this._style['text-align']=textAlign;this.updateBoundArea();}}, /**
     * Font settings.
     * Can be set according to the format of the CSS 'font' property.
     * @type String
     */font:{get:function get(){return this._style.font;},set:function set(font){this._style.font=font;this.updateBoundArea();}}, /**
     * Text color settings.
     * Can be set according to the format of the CSS 'color' property.
     * @type String
     */color:{get:function get(){return this._style.color;},set:function set(color){this._style.color=color;}},cvsRender:function cvsRender(ctx){var x,y=0;var labelWidth=this.width;var charWidth,amount,line,text,c,buf,increase,length;var bufWidth;if(this._splitText){ctx.textBaseline='top';ctx.font=this.font;ctx.fillStyle=this.color||'#000000';charWidth=ctx.measureText(' ').width;amount=labelWidth/charWidth;for(var i=0,l=this._splitText.length;i<l;i++){line=this._splitText[i];text=line.text;c=0;while(text.length>c+amount||ctx.measureText(text.slice(c,c+amount)).width>labelWidth){buf='';increase=amount;length=0;while(increase>0){if(ctx.measureText(buf).width<labelWidth){length+=increase;buf=text.slice(c,c+length);}else {length-=increase;buf=text.slice(c,c+length);}increase=increase/2|0;}ctx.fillText(buf,0,y);y+=line.height-1;c+=length;}buf=text.slice(c,c+text.length);if(this.textAlign==='right'){x=labelWidth-ctx.measureText(buf).width;}else if(this.textAlign==='center'){x=(labelWidth-ctx.measureText(buf).width)/2;}else {x=0;}ctx.fillText(buf,x,y);y+=line.height-1;}}},domRender:function domRender(element){if(element.innerHTML!==this._text){element.innerHTML=this._text;}},detectRender:function detectRender(ctx){ctx.fillRect(this._boundOffset,0,this._boundWidth,this._boundHeight);},updateBoundArea:function updateBoundArea(){var metrics=this.getMetrics();this._boundWidth=metrics.width;this._boundHeight=metrics.height;if(this.textAlign==='right'){this._boundOffset=this.width-this._boundWidth;}else if(this.textAlign==='center'){this._boundOffset=(this.width-this._boundWidth)/2;}else {this._boundOffset=0;}},getMetrics:function getMetrics(text){var ret={};var div,width,height;if(document.body){div=document.createElement('div');for(var prop in this._style){if(prop!=='width'&&prop!=='height'){div.style[prop]=this._style[prop];}}text=text||this._text;div.innerHTML=text.replace(/ /g,'&nbsp;');div.style.whiteSpace='noWrap';div.style.lineHeight=1;document.body.appendChild(div);var computedStyle=getComputedStyle(div);ret.height=parseInt(computedStyle.height,10)+1;div.style.position='absolute';ret.width=parseInt(computedStyle.width,10)+1;document.body.removeChild(div);}else {ret.width=this.width;ret.height=this.height;}return ret;}}); /**
 * @scope enchant.Map.prototype
 */enchant.Map=enchant.Class.create(enchant.Entity,{ /**
     * @name enchant.Map
     * @class
     * A class to create and display maps from a tile set.
     * @param {Number} tileWidth Tile width.
     * @param {Number} tileHeight Tile height.
     * @constructs
     * @extends enchant.Entity
     */initialize:function initialize(tileWidth,tileHeight){var core=enchant.Core.instance;enchant.Entity.call(this);var surface=new enchant.Surface(core.width,core.height);this._surface=surface;var canvas=surface._element;canvas.style.position='absolute';if(enchant.ENV.RETINA_DISPLAY&&core.scale===2){canvas.width=core.width*2;canvas.height=core.height*2;this._style.webkitTransformOrigin='0 0';this._style.webkitTransform='scale(0.5)';}else {canvas.width=core.width;canvas.height=core.height;}this._context=canvas.getContext('2d');this._tileWidth=tileWidth||0;this._tileHeight=tileHeight||0;this._image=null;this._data=[[[]]];this._dirty=false;this._tight=false;this.touchEnabled=false; /**
         * Two dimensional array to store if collision detection should be performed for a tile.
         * @type Number[][]
         */this.collisionData=null;this._listeners['render']=null;this.addEventListener('render',function(){if(this._dirty){this._previousOffsetX=this._previousOffsetY=null;}});}, /**
     * Set map data.
     * Sets the tile data, whereas the data (two-dimensional array with indizes starting from 0) 
     * is mapped on the image starting from the upper left corner.
     * When more than one map data array is set, they are displayed in reverse order.
     * @param {...Number[][]} data Two-dimensional array of tile indizes. Multiple designations possible.
     */loadData:function loadData(data){this._data=Array.prototype.slice.apply(arguments);this._dirty=true;this._tight=false;for(var i=0,len=this._data.length;i<len;i++){var c=0;data=this._data[i];for(var y=0,l=data.length;y<l;y++){for(var x=0,ll=data[y].length;x<ll;x++){if(data[y][x]>=0){c++;}}}if(c/(data.length*data[0].length)>0.2){this._tight=true;break;}}}, /**
     * Checks what tile is present at the given position.
     * @param {Number} x x coordinates of the point on the map.
     * @param {Number} y y coordinates of the point on the map.
     * @return {*} The tile data for the given position.
     */checkTile:function checkTile(x,y){if(x<0||this.width<=x||y<0||this.height<=y){return false;}var width=this._image.width;var height=this._image.height;var tileWidth=this._tileWidth||width;var tileHeight=this._tileHeight||height;x=x/tileWidth|0;y=y/tileHeight|0; //		return this._data[y][x];
var data=this._data[0];return data[y][x];}, /**
     * Judges whether or not obstacles are on top of Map.
     * @param {Number} x x coordinates of detection spot on map.
     * @param {Number} y y coordinates of detection spot on map.
     * @return {Boolean} True, if there are obstacles.
     */hitTest:function hitTest(x,y){if(x<0||this.width<=x||y<0||this.height<=y){return false;}var width=this._image.width;var height=this._image.height;var tileWidth=this._tileWidth||width;var tileHeight=this._tileHeight||height;x=x/tileWidth|0;y=y/tileHeight|0;if(this.collisionData!=null){return this.collisionData[y]&&!!this.collisionData[y][x];}else {for(var i=0,len=this._data.length;i<len;i++){var data=this._data[i];var n;if(data[y]!=null&&(n=data[y][x])!=null&&0<=n&&n<(width/tileWidth|0)*(height/tileHeight|0)){return true;}}return false;}}, /**
     * Image with which the tile set is displayed on the map.
     * @type enchant.Surface
     */image:{get:function get(){return this._image;},set:function set(image){var core=enchant.Core.instance;this._image=image;if(enchant.ENV.RETINA_DISPLAY&&core.scale===2){var img=new enchant.Surface(image.width*2,image.height*2);var tileWidth=this._tileWidth||image.width;var tileHeight=this._tileHeight||image.height;var row=image.width/tileWidth|0;var col=image.height/tileHeight|0;for(var y=0;y<col;y++){for(var x=0;x<row;x++){img.draw(image,x*tileWidth,y*tileHeight,tileWidth,tileHeight,x*tileWidth*2,y*tileHeight*2,tileWidth*2,tileHeight*2);}}this._doubledImage=img;}this._dirty=true;}}, /**
     * Map tile width.
     * @type Number
     */tileWidth:{get:function get(){return this._tileWidth;},set:function set(tileWidth){if(this._tileWidth!==tileWidth){this._tileWidth=tileWidth;this._dirty=true;}}}, /**
     * Map tile height.
     * @type Number
     */tileHeight:{get:function get(){return this._tileHeight;},set:function set(tileHeight){if(this._tileHeight!==tileHeight){this._tileHeight=tileHeight;this._dirty=true;}}}, /**
     * @private
     */width:{get:function get(){return this._tileWidth*this._data[0][0].length;}}, /**
     * @private
     */height:{get:function get(){return this._tileHeight*this._data[0].length;}}, /**
     * @private
     */redraw:function redraw(x,y,width,height){if(this._image==null){return;}var image,tileWidth,tileHeight,dx,dy;if(this._doubledImage){image=this._doubledImage;tileWidth=this._tileWidth*2;tileHeight=this._tileHeight*2;dx=-this._offsetX*2;dy=-this._offsetY*2;x*=2;y*=2;width*=2;height*=2;}else {image=this._image;tileWidth=this._tileWidth;tileHeight=this._tileHeight;dx=-this._offsetX;dy=-this._offsetY;}var row=image.width/tileWidth|0;var col=image.height/tileHeight|0;var left=Math.max((x+dx)/tileWidth|0,0);var top=Math.max((y+dy)/tileHeight|0,0);var right=Math.ceil((x+dx+width)/tileWidth);var bottom=Math.ceil((y+dy+height)/tileHeight);var source=image._element;var context=this._context;var canvas=context.canvas;context.clearRect(x,y,width,height);for(var i=0,len=this._data.length;i<len;i++){var data=this._data[i];var r=Math.min(right,data[0].length);var b=Math.min(bottom,data.length);for(y=top;y<b;y++){for(x=left;x<r;x++){var n=data[y][x];if(0<=n&&n<row*col){var sx=n%row*tileWidth;var sy=(n/row|0)*tileHeight;context.drawImage(source,sx,sy,tileWidth,tileHeight,x*tileWidth-dx,y*tileHeight-dy,tileWidth,tileHeight);}}}}}, /**
     * @private
     */updateBuffer:function updateBuffer(){if(this._visible===undefined||this._visible){var core=enchant.Core.instance;if(this._dirty||this._previousOffsetX==null){this.redraw(0,0,core.width,core.height);}else if(this._offsetX!==this._previousOffsetX||this._offsetY!==this._previousOffsetY){if(this._tight){var x=-this._offsetX;var y=-this._offsetY;var px=-this._previousOffsetX;var py=-this._previousOffsetY;var w1=x-px+core.width;var w2=px-x+core.width;var h1=y-py+core.height;var h2=py-y+core.height;if(w1>this._tileWidth&&w2>this._tileWidth&&h1>this._tileHeight&&h2>this._tileHeight){var sx,sy,dx,dy,sw,sh;if(w1<w2){sx=0;dx=px-x;sw=w1;}else {sx=x-px;dx=0;sw=w2;}if(h1<h2){sy=0;dy=py-y;sh=h1;}else {sy=y-py;dy=0;sh=h2;}if(core._buffer==null){core._buffer=document.createElement('canvas');core._buffer.width=this._context.canvas.width;core._buffer.height=this._context.canvas.height;}var context=core._buffer.getContext('2d');if(this._doubledImage){context.clearRect(0,0,sw*2,sh*2);context.drawImage(this._context.canvas,sx*2,sy*2,sw*2,sh*2,0,0,sw*2,sh*2);context=this._context;context.clearRect(dx*2,dy*2,sw*2,sh*2);context.drawImage(core._buffer,0,0,sw*2,sh*2,dx*2,dy*2,sw*2,sh*2);}else {context.clearRect(0,0,sw,sh);context.drawImage(this._context.canvas,sx,sy,sw,sh,0,0,sw,sh);context=this._context;context.clearRect(dx,dy,sw,sh);context.drawImage(core._buffer,0,0,sw,sh,dx,dy,sw,sh);}if(dx===0){this.redraw(sw,0,core.width-sw,core.height);}else {this.redraw(0,0,core.width-sw,core.height);}if(dy===0){this.redraw(0,sh,core.width,core.height-sh);}else {this.redraw(0,0,core.width,core.height-sh);}}else {this.redraw(0,0,core.width,core.height);}}else {this.redraw(0,0,core.width,core.height);}}this._previousOffsetX=this._offsetX;this._previousOffsetY=this._offsetY;}},cvsRender:function cvsRender(ctx){if(this.width!==0&&this.height!==0){var core=enchant.Core.instance;this.updateBuffer();ctx.save();ctx.setTransform(1,0,0,1,0,0);var cvs=this._context.canvas;ctx.drawImage(cvs,0,0,core.width,core.height);ctx.restore();}},domRender:function domRender(element){if(this._image){this.updateBuffer();this._style['background-image']=this._surface._css; // bad performance
this._style[enchant.ENV.VENDOR_PREFIX+'Transform']='matrix(1, 0, 0, 1, 0, 0)';}}}); /**
 * @scope enchant.Group.prototype
 */enchant.Group=enchant.Class.create(enchant.Node,{ /**
     * @name enchant.Group
     * @class
     * A class that can hold multiple {@link enchant.Node}.
     *
     * @example
     * var stage = new Group();
     * stage.addChild(player);
     * stage.addChild(enemy);
     * stage.addChild(map);
     * stage.addEventListener('enterframe', function() {
     *     // Moves the entire frame in according to the player's coordinates.
     *     if (this.x > 64 - player.x) {
     *         this.x = 64 - player.x;
     *     }
     * });
     * @constructs
     * @extends enchant.Node
     */initialize:function initialize(){ /**
         * Child Nodes.
         * @type enchant.Node[]
         */this.childNodes=[];enchant.Node.call(this);this._rotation=0;this._scaleX=1;this._scaleY=1;this._originX=null;this._originY=null;this.__dirty=false;[enchant.Event.ADDED_TO_SCENE,enchant.Event.REMOVED_FROM_SCENE].forEach(function(event){this.addEventListener(event,function(e){this.childNodes.forEach(function(child){child.scene=this.scene;child.dispatchEvent(e);},this);});},this);}, /**
     * Adds a Node to the Group.
     * @param {enchant.Node} node Node to be added.
     */addChild:function addChild(node){if(node.parentNode){node.parentNode.removeChild(node);}this.childNodes.push(node);node.parentNode=this;var childAdded=new enchant.Event('childadded');childAdded.node=node;childAdded.next=null;this.dispatchEvent(childAdded);node.dispatchEvent(new enchant.Event('added'));if(this.scene){node.scene=this.scene;var addedToScene=new enchant.Event('addedtoscene');node.dispatchEvent(addedToScene);}}, /**
     * Incorporates Node into Group.
     * @param {enchant.Node} node Node to be incorporated.
     * @param {enchant.Node} reference Node in position before insertion.
     */insertBefore:function insertBefore(node,reference){if(node.parentNode){node.parentNode.removeChild(node);}var i=this.childNodes.indexOf(reference);if(i!==-1){this.childNodes.splice(i,0,node);node.parentNode=this;var childAdded=new enchant.Event('childadded');childAdded.node=node;childAdded.next=reference;this.dispatchEvent(childAdded);node.dispatchEvent(new enchant.Event('added'));if(this.scene){node.scene=this.scene;var addedToScene=new enchant.Event('addedtoscene');node.dispatchEvent(addedToScene);}}else {this.addChild(node);}}, /**
     * Remove a Node from the Group.
     * @param {enchant.Node} node Node to be deleted.
     */removeChild:function removeChild(node){var i;if((i=this.childNodes.indexOf(node))!==-1){this.childNodes.splice(i,1);node.parentNode=null;var childRemoved=new enchant.Event('childremoved');childRemoved.node=node;this.dispatchEvent(childRemoved);node.dispatchEvent(new enchant.Event('removed'));if(this.scene){node.scene=null;var removedFromScene=new enchant.Event('removedfromscene');node.dispatchEvent(removedFromScene);}}}, /**
     * The Node which is the first child.
     * @type enchant.Node
     */firstChild:{get:function get(){return this.childNodes[0];}}, /**
     * The Node which is the last child.
     * @type enchant.Node
     */lastChild:{get:function get(){return this.childNodes[this.childNodes.length-1];}}, /**
    * Group rotation angle (degree).
    * @type Number
    */rotation:{get:function get(){return this._rotation;},set:function set(rotation){if(this._rotation!==rotation){this._rotation=rotation;this._dirty=true;}}}, /**
    * Scaling factor on the x axis of the Group.
    * @type Number
    * @see enchant.Group#originX
    * @see enchant.Group#originY
    */scaleX:{get:function get(){return this._scaleX;},set:function set(scale){if(this._scaleX!==scale){this._scaleX=scale;this._dirty=true;}}}, /**
    * Scaling factor on the y axis of the Group.
    * @type Number
    * @see enchant.Group#originX
    * @see enchant.Group#originY
    */scaleY:{get:function get(){return this._scaleY;},set:function set(scale){if(this._scaleY!==scale){this._scaleY=scale;this._dirty=true;}}}, /**
    * origin point of rotation, scaling
    * @type Number
    */originX:{get:function get(){return this._originX;},set:function set(originX){if(this._originX!==originX){this._originX=originX;this._dirty=true;}}}, /**
    * origin point of rotation, scaling
    * @type Number
    */originY:{get:function get(){return this._originY;},set:function set(originY){if(this._originY!==originY){this._originY=originY;this._dirty=true;}}}, /**#nocode+*/_dirty:{get:function get(){return this.__dirty;},set:function set(dirty){dirty=!!dirty;this.__dirty=dirty;if(dirty){for(var i=0,l=this.childNodes.length;i<l;i++){this.childNodes[i]._dirty=true;}}}} /**#nocode-*/});enchant.Matrix=enchant.Class.create({initialize:function initialize(){this.reset();},reset:function reset(){this.stack=[];this.stack.push([1,0,0,1,0,0]);},makeTransformMatrix:function makeTransformMatrix(node,dest){var x=node._x;var y=node._y;var width=node.width||0;var height=node.height||0;var rotation=node._rotation||0;var scaleX=typeof node._scaleX==='number'?node._scaleX:1;var scaleY=typeof node._scaleY==='number'?node._scaleY:1;var theta=rotation*Math.PI/180;var tmpcos=Math.cos(theta);var tmpsin=Math.sin(theta);var w=typeof node._originX==='number'?node._originX:width/2;var h=typeof node._originY==='number'?node._originY:height/2;var a=scaleX*tmpcos;var b=scaleX*tmpsin;var c=scaleY*tmpsin;var d=scaleY*tmpcos;dest[0]=a;dest[1]=b;dest[2]=-c;dest[3]=d;dest[4]=-a*w+c*h+x+w;dest[5]=-b*w-d*h+y+h;},multiply:function multiply(m1,m2,dest){var a11=m1[0],a21=m1[2],adx=m1[4],a12=m1[1],a22=m1[3],ady=m1[5];var b11=m2[0],b21=m2[2],bdx=m2[4],b12=m2[1],b22=m2[3],bdy=m2[5];dest[0]=a11*b11+a21*b12;dest[1]=a12*b11+a22*b12;dest[2]=a11*b21+a21*b22;dest[3]=a12*b21+a22*b22;dest[4]=a11*bdx+a21*bdy+adx;dest[5]=a12*bdx+a22*bdy+ady;},multiplyVec:function multiplyVec(mat,vec,dest){var x=vec[0],y=vec[1];var m11=mat[0],m21=mat[2],mdx=mat[4],m12=mat[1],m22=mat[3],mdy=mat[5];dest[0]=m11*x+m21*y+mdx;dest[1]=m12*x+m22*y+mdy;}});enchant.Matrix.instance=new enchant.Matrix();enchant.DetectColorManager=enchant.Class.create({initialize:function initialize(reso,max){this.reference=[];this.colorResolution=reso||16;this.max=max||1;this.capacity=Math.pow(this.colorResolution,3);for(var i=1,l=this.capacity;i<l;i++){this.reference[i]=null;}},attachDetectColor:function attachDetectColor(sprite){var i=this.reference.indexOf(null);if(i===-1){i=1;}this.reference[i]=sprite;return this._getColor(i);},detachDetectColor:function detachDetectColor(sprite){var i=this.reference.indexOf(sprite);if(i!==-1){this.reference[i]=null;}},_getColor:function _getColor(n){var C=this.colorResolution;var d=C/this.max;return [parseInt(n/C/C%C,10)/d,parseInt(n/C%C,10)/d,parseInt(n%C,10)/d,1.0];},_decodeDetectColor:function _decodeDetectColor(color,i){i=i||0;var C=this.colorResolution;return ~ ~(color[i]*C*C*C/256)+~ ~(color[i+1]*C*C/256)+~ ~(color[i+2]*C/256);},getSpriteByColor:function getSpriteByColor(color){return this.reference[this._decodeDetectColor(color)];},getSpriteByColors:function getSpriteByColors(rgba){var i,l,id,result,score=0,found={};for(i=0,l=rgba.length;i<l;i+=4){id=this._decodeDetectColor(rgba,i);found[id]=(found[id]||0)+1;}for(id in found){if(found[id]>score){score=found[id];result=id;}}return this.reference[result];}});enchant.DomManager=enchant.Class.create({initialize:function initialize(node,elementDefinition){var core=enchant.Core.instance;this.layer=null;this.targetNode=node;if(typeof elementDefinition==='string'){this.element=document.createElement(elementDefinition);}else if(elementDefinition instanceof HTMLElement){this.element=elementDefinition;}this.style=this.element.style;this.style.position='absolute';this.style[enchant.ENV.VENDOR_PREFIX+'TransformOrigin']='0px 0px';if(core._debug){this.style.border='1px solid blue';this.style.margin='-1px';}var manager=this;this._setDomTarget=function(){manager.layer._touchEventTarget=manager.targetNode;};this._attachEvent();},getDomElement:function getDomElement(){return this.element;},getDomElementAsNext:function getDomElementAsNext(){return this.element;},getNextManager:function getNextManager(manager){var i=this.targetNode.parentNode.childNodes.indexOf(manager.targetNode);if(i!==this.targetNode.parentNode.childNodes.length-1){return this.targetNode.parentNode.childNodes[i+1]._domManager;}else {return null;}},addManager:function addManager(childManager,nextManager){var nextElement;if(nextManager){nextElement=nextManager.getDomElementAsNext();}var element=childManager.getDomElement();if(element instanceof Array){element.forEach(function(child){if(nextElement){this.element.insertBefore(child,nextElement);}else {this.element.appendChild(child);}},this);}else {if(nextElement){this.element.insertBefore(element,nextElement);}else {this.element.appendChild(element);}}this.setLayer(this.layer);},removeManager:function removeManager(childManager){if(childManager instanceof enchant.DomlessManager){childManager._domRef.forEach(function(element){this.element.removeChild(element);},this);}else {this.element.removeChild(childManager.element);}this.setLayer(this.layer);},setLayer:function setLayer(layer){this.layer=layer;var node=this.targetNode;var manager;if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){manager=node.childNodes[i]._domManager;if(manager){manager.setLayer(layer);}}}},render:function render(inheritMat){var node=this.targetNode;var matrix=enchant.Matrix.instance;var stack=matrix.stack;var dest=[];matrix.makeTransformMatrix(node,dest);matrix.multiply(stack[stack.length-1],dest,dest);matrix.multiply(inheritMat,dest,inheritMat);node._matrix=inheritMat;var ox=typeof node._originX==='number'?node._originX:node.width/2||0;var oy=typeof node._originY==='number'?node._originY:node.height/2||0;var vec=[ox,oy];matrix.multiplyVec(dest,vec,vec);node._offsetX=vec[0]-ox;node._offsetY=vec[1]-oy;if(node.parentNode&&!(node.parentNode instanceof enchant.Group)){node._offsetX+=node.parentNode._offsetX;node._offsetY+=node.parentNode._offsetY;}if(node._dirty){this.style[enchant.ENV.VENDOR_PREFIX+'Transform']='matrix('+dest[0].toFixed(10)+','+dest[1].toFixed(10)+','+dest[2].toFixed(10)+','+dest[3].toFixed(10)+','+dest[4].toFixed(10)+','+dest[5].toFixed(10)+')';}this.domRender();},domRender:function domRender(){var node=this.targetNode;if(!node._style){node._style={};}if(!node.__styleStatus){node.__styleStatus={};}if(node.width!==null){node._style.width=node.width+'px';}if(node.height!==null){node._style.height=node.height+'px';}node._style.opacity=node._opacity;node._style['background-color']=node._backgroundColor;if(typeof node._visible!=='undefined'){node._style.display=node._visible?'block':'none';}if(typeof node.domRender==='function'){node.domRender(this.element);}var value;for(var prop in node._style){value=node._style[prop];if(node.__styleStatus[prop]!==value&&value!=null){this.style.setProperty(prop,''+value);node.__styleStatus[prop]=value;}}},_attachEvent:function _attachEvent(){if(enchant.ENV.TOUCH_ENABLED){this.element.addEventListener('touchstart',this._setDomTarget,true);}this.element.addEventListener('mousedown',this._setDomTarget,true);},_detachEvent:function _detachEvent(){if(enchant.ENV.TOUCH_ENABLED){this.element.removeEventListener('touchstart',this._setDomTarget,true);}this.element.removeEventListener('mousedown',this._setDomTarget,true);},remove:function remove(){this._detachEvent();this.element=this.style=this.targetNode=null;}});enchant.DomlessManager=enchant.Class.create({initialize:function initialize(node){this._domRef=[];this.targetNode=node;},_register:function _register(element,nextElement){var i=this._domRef.indexOf(nextElement);if(element instanceof Array){if(i===-1){Array.prototype.push.apply(this._domRef,element);}else {Array.prototype.splice.apply(this._domRef,[i,0].concat(element));}}else {if(i===-1){this._domRef.push(element);}else {this._domRef.splice(i,0,element);}}},getNextManager:function getNextManager(manager){var i=this.targetNode.parentNode.childNodes.indexOf(manager.targetNode);if(i!==this.targetNode.parentNode.childNodes.length-1){return this.targetNode.parentNode.childNodes[i+1]._domManager;}else {return null;}},getDomElement:function getDomElement(){var ret=[];this.targetNode.childNodes.forEach(function(child){ret=ret.concat(child._domManager.getDomElement());});return ret;},getDomElementAsNext:function getDomElementAsNext(){if(this._domRef.length){return this._domRef[0];}else {var nextManager=this.getNextManager(this);if(nextManager){return nextManager.element;}else {return null;}}},addManager:function addManager(childManager,nextManager){var parentNode=this.targetNode.parentNode;if(parentNode){if(nextManager===null){nextManager=this.getNextManager(this);}if(parentNode instanceof enchant.Scene){parentNode._layers.Dom._domManager.addManager(childManager,nextManager);}else {parentNode._domManager.addManager(childManager,nextManager);}}var nextElement=nextManager?nextManager.getDomElementAsNext():null;this._register(childManager.getDomElement(),nextElement);this.setLayer(this.layer);},removeManager:function removeManager(childManager){var dom;var i=this._domRef.indexOf(childManager.element);if(i!==-1){dom=this._domRef[i];dom.parentNode.removeChild(dom);this._domRef.splice(i,1);}this.setLayer(this.layer);},setLayer:function setLayer(layer){this.layer=layer;var node=this.targetNode;var manager;if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){manager=node.childNodes[i]._domManager;if(manager){manager.setLayer(layer);}}}},render:function render(inheritMat){var matrix=enchant.Matrix.instance;var stack=matrix.stack;var node=this.targetNode;var dest=[];matrix.makeTransformMatrix(node,dest);matrix.multiply(stack[stack.length-1],dest,dest);matrix.multiply(inheritMat,dest,inheritMat);node._matrix=inheritMat;var ox=typeof node._originX==='number'?node._originX:node.width/2||0;var oy=typeof node._originY==='number'?node._originY:node.height/2||0;var vec=[ox,oy];matrix.multiplyVec(dest,vec,vec);node._offsetX=vec[0]-ox;node._offsetY=vec[1]-oy;stack.push(dest);},remove:function remove(){this._domRef=[];this.targetNode=null;}});enchant.DomLayer=enchant.Class.create(enchant.Group,{initialize:function initialize(){var core=enchant.Core.instance;enchant.Group.call(this);this._touchEventTarget=null;this._element=document.createElement('div');this._element.style.position='absolute';this._domManager=new enchant.DomManager(this,this._element);this._domManager.layer=this;this.width=core.width;this.height=core.height;var touch=[enchant.Event.TOUCH_START,enchant.Event.TOUCH_MOVE,enchant.Event.TOUCH_END];touch.forEach(function(type){this.addEventListener(type,function(e){if(this._scene){this._scene.dispatchEvent(e);}});},this);var __onchildadded=function __onchildadded(e){var child=e.node;var next=e.next;var self=e.target;var nextManager=next?next._domManager:null;enchant.DomLayer._attachDomManager(child,__onchildadded,__onchildremoved);self._domManager.addManager(child._domManager,nextManager);var render=new enchant.Event(enchant.Event.RENDER);child._dirty=true;self._domManager.layer._rendering(child,render);};var __onchildremoved=function __onchildremoved(e){var child=e.node;var self=e.target;self._domManager.removeManager(child._domManager);enchant.DomLayer._detachDomManager(child,__onchildadded,__onchildremoved);};this.addEventListener('childremoved',__onchildremoved);this.addEventListener('childadded',__onchildadded);},width:{get:function get(){return this._width;},set:function set(width){this._width=width;this._element.style.width=width+'px';}},height:{get:function get(){return this._height;},set:function set(height){this._height=height;this._element.style.height=height+'px';}},addChild:function addChild(node){this.childNodes.push(node);node.parentNode=this;var childAdded=new enchant.Event('childadded');childAdded.node=node;childAdded.next=null;this.dispatchEvent(childAdded);node.dispatchEvent(new enchant.Event('added'));if(this.scene){node.scene=this.scene;var addedToScene=new enchant.Event('addedtoscene');node.dispatchEvent(addedToScene);}},insertBefore:function insertBefore(node,reference){var i=this.childNodes.indexOf(reference);if(i!==-1){this.childNodes.splice(i,0,node);node.parentNode=this;var childAdded=new enchant.Event('childadded');childAdded.node=node;childAdded.next=reference;this.dispatchEvent(childAdded);node.dispatchEvent(new enchant.Event('added'));if(this.scene){node.scene=this.scene;var addedToScene=new enchant.Event('addedtoscene');node.dispatchEvent(addedToScene);}}else {this.addChild(node);}},_startRendering:function _startRendering(){this.addEventListener('exitframe',this._onexitframe);this._onexitframe();},_stopRendering:function _stopRendering(){this.removeEventListener('exitframe',this._onexitframe);this._onexitframe();},_onexitframe:function _onexitframe(){this._rendering(this,new enchant.Event(enchant.Event.RENDER));},_rendering:function _rendering(node,e,inheritMat){var child;if(!inheritMat){inheritMat=[1,0,0,1,0,0];}node.dispatchEvent(e);node._domManager.render(inheritMat);if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){child=node.childNodes[i];this._rendering(child,e,inheritMat.slice());}}if(node._domManager instanceof enchant.DomlessManager){enchant.Matrix.instance.stack.pop();}node._dirty=false;},_determineEventTarget:function _determineEventTarget(){var target=this._touchEventTarget;this._touchEventTarget=null;return target===this?null:target;}});enchant.DomLayer._attachDomManager=function(node,onchildadded,onchildremoved){var child;if(!node._domManager){node.addEventListener('childadded',onchildadded);node.addEventListener('childremoved',onchildremoved);if(node instanceof enchant.Group){node._domManager=new enchant.DomlessManager(node);}else {if(node._element){node._domManager=new enchant.DomManager(node,node._element);}else {node._domManager=new enchant.DomManager(node,'div');}}}if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){child=node.childNodes[i];enchant.DomLayer._attachDomManager(child,onchildadded,onchildremoved);node._domManager.addManager(child._domManager,null);}}};enchant.DomLayer._detachDomManager=function(node,onchildadded,onchildremoved){var child;node.removeEventListener('childadded',onchildadded);node.removeEventListener('childremoved',onchildremoved);if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){child=node.childNodes[i];node._domManager.removeManager(child._domManager,null);enchant.DomLayer._detachDomManager(child,onchildadded,onchildremoved);}}node._domManager.remove();delete node._domManager;}; /**
 * @scope enchant.CanvasLayer.prototype
 */enchant.CanvasLayer=enchant.Class.create(enchant.Group,{ /**
     * @name enchant.CanvasLayer
     * @class
     * Class that uses the HTML Canvas for rendering.
     * The rendering of children will be replaced by the Canvas rendering.
     * @constructs
     * @extends enchant.Group
     */initialize:function initialize(){var core=enchant.Core.instance;enchant.Group.call(this);this._cvsCache={matrix:[1,0,0,1,0,0],detectColor:'#000000'};this._cvsCache.layer=this;this._element=document.createElement('canvas');this._element.style.position='absolute'; // issue 179
this._element.style.left=this._element.style.top='0px';this._detect=document.createElement('canvas');this._detect.style.position='absolute';this._lastDetected=0;this.context=this._element.getContext('2d');this._dctx=this._detect.getContext('2d');this._setImageSmoothingEnable();this._colorManager=new enchant.DetectColorManager(16,256);this.width=core.width;this.height=core.height;var touch=[enchant.Event.TOUCH_START,enchant.Event.TOUCH_MOVE,enchant.Event.TOUCH_END];touch.forEach(function(type){this.addEventListener(type,function(e){if(this._scene){this._scene.dispatchEvent(e);}});},this);var __onchildadded=function __onchildadded(e){var child=e.node;var self=e.target;var layer;if(self instanceof enchant.CanvasLayer){layer=self._scene._layers.Canvas;}else {layer=self.scene._layers.Canvas;}enchant.CanvasLayer._attachCache(child,layer,__onchildadded,__onchildremoved);var render=new enchant.Event(enchant.Event.RENDER);if(self._dirty){self._updateCoordinate();}child._dirty=true;enchant.Matrix.instance.stack.push(self._matrix);enchant.CanvasRenderer.instance.render(layer.context,child,render);enchant.Matrix.instance.stack.pop(self._matrix);};var __onchildremoved=function __onchildremoved(e){var child=e.node;var self=e.target;var layer;if(self instanceof enchant.CanvasLayer){layer=self._scene._layers.Canvas;}else {layer=self.scene._layers.Canvas;}enchant.CanvasLayer._detachCache(child,layer,__onchildadded,__onchildremoved);};this.addEventListener('childremoved',__onchildremoved);this.addEventListener('childadded',__onchildadded);}, /**
     * The width of the CanvasLayer.
     * @type Number
     */width:{get:function get(){return this._width;},set:function set(width){this._width=width;this._element.width=this._detect.width=width;this._setImageSmoothingEnable();}}, /**
     * The height of the CanvasLayer.
     * @type Number
     */height:{get:function get(){return this._height;},set:function set(height){this._height=height;this._element.height=this._detect.height=height;this._setImageSmoothingEnable();}},addChild:function addChild(node){this.childNodes.push(node);node.parentNode=this;var childAdded=new enchant.Event('childadded');childAdded.node=node;childAdded.next=null;this.dispatchEvent(childAdded);node.dispatchEvent(new enchant.Event('added'));},insertBefore:function insertBefore(node,reference){var i=this.childNodes.indexOf(reference);if(i!==-1){this.childNodes.splice(i,0,node);node.parentNode=this;var childAdded=new enchant.Event('childadded');childAdded.node=node;childAdded.next=reference;this.dispatchEvent(childAdded);node.dispatchEvent(new enchant.Event('added'));}else {this.addChild(node);}}, /**
     * @private
     */_startRendering:function _startRendering(){this.addEventListener('exitframe',this._onexitframe);this._onexitframe();}, /**
     * @private
     */_stopRendering:function _stopRendering(){this.removeEventListener('exitframe',this._onexitframe);this._onexitframe();},_onexitframe:function _onexitframe(){var core=enchant.Core.instance;var ctx=this.context;ctx.clearRect(0,0,core.width,core.height);var render=new enchant.Event(enchant.Event.RENDER);enchant.CanvasRenderer.instance.render(ctx,this,render);},_determineEventTarget:function _determineEventTarget(e){return this._getEntityByPosition(e.x,e.y);},_getEntityByPosition:function _getEntityByPosition(x,y){var core=enchant.Core.instance;var ctx=this._dctx;if(this._lastDetected<core.frame){ctx.clearRect(0,0,this.width,this.height);enchant.CanvasRenderer.instance.detectRender(ctx,this);this._lastDetected=core.frame;}var extra=enchant.ENV.COLOR_DETECTION_LEVEL-1;var rgba=ctx.getImageData(x-extra,y-extra,1+extra*2,1+extra*2).data;return this._colorManager.getSpriteByColors(rgba);},_setImageSmoothingEnable:function _setImageSmoothingEnable(){this._dctx.imageSmoothingEnabled=this._dctx.msImageSmoothingEnabled=this._dctx.mozImageSmoothingEnabled=this._dctx.webkitImageSmoothingEnabled=false;}});enchant.CanvasLayer._attachCache=function(node,layer,onchildadded,onchildremoved){var child;if(!node._cvsCache){node._cvsCache={};node._cvsCache.matrix=[1,0,0,1,0,0];node._cvsCache.detectColor='rgba('+layer._colorManager.attachDetectColor(node)+')';node.addEventListener('childadded',onchildadded);node.addEventListener('childremoved',onchildremoved);}if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){child=node.childNodes[i];enchant.CanvasLayer._attachCache(child,layer,onchildadded,onchildremoved);}}};enchant.CanvasLayer._detachCache=function(node,layer,onchildadded,onchildremoved){var child;if(node._cvsCache){layer._colorManager.detachDetectColor(node);node.removeEventListener('childadded',onchildadded);node.removeEventListener('childremoved',onchildremoved);delete node._cvsCache;}if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){child=node.childNodes[i];enchant.CanvasLayer._detachCache(child,layer,onchildadded,onchildremoved);}}};enchant.CanvasRenderer=enchant.Class.create({render:function render(ctx,node,e){var width,height,child;ctx.save();node.dispatchEvent(e); // transform
this.transform(ctx,node);if(typeof node._visible==='undefined'||node._visible){width=node.width;height=node.height; // composite
if(node.compositeOperation){ctx.globalCompositeOperation=node.compositeOperation;}ctx.globalAlpha=typeof node._opacity==='number'?node._opacity:1.0; // render
if(node._backgroundColor){ctx.fillStyle=node._backgroundColor;ctx.fillRect(0,0,width,height);}if(node.cvsRender){node.cvsRender(ctx);}if(enchant.Core.instance._debug&&node._debugColor){ctx.strokeStyle=node._debugColor;ctx.strokeRect(0,0,width,height);}if(node._clipping){ctx.beginPath();ctx.rect(0,0,width,height);ctx.clip();}if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){child=node.childNodes[i];this.render(ctx,child,e);}}}ctx.restore();enchant.Matrix.instance.stack.pop();},detectRender:function detectRender(ctx,node){var width,height,child;if(typeof node._visible==='undefined'||node._visible){width=node.width;height=node.height;ctx.save();this.transform(ctx,node);ctx.fillStyle=node._cvsCache.detectColor;if(node._touchEnabled){if(node.detectRender){node.detectRender(ctx);}else {ctx.fillRect(0,0,width,height);}}if(node._clipping){ctx.beginPath();ctx.rect(0,0,width,height);ctx.clip();}if(node.childNodes){for(var i=0,l=node.childNodes.length;i<l;i++){child=node.childNodes[i];this.detectRender(ctx,child);}}ctx.restore();enchant.Matrix.instance.stack.pop();}},transform:function transform(ctx,node){var matrix=enchant.Matrix.instance;var stack=matrix.stack;var newmat,ox,oy,vec;if(node._dirty){matrix.makeTransformMatrix(node,node._cvsCache.matrix);newmat=[];matrix.multiply(stack[stack.length-1],node._cvsCache.matrix,newmat);node._matrix=newmat;ox=typeof node._originX==='number'?node._originX:node._width/2||0;oy=typeof node._originY==='number'?node._originY:node._height/2||0;vec=[ox,oy];matrix.multiplyVec(newmat,vec,vec);node._offsetX=vec[0]-ox;node._offsetY=vec[1]-oy;node._dirty=false;}else {newmat=node._matrix;}stack.push(newmat);ctx.setTransform.apply(ctx,newmat);}});enchant.CanvasRenderer.instance=new enchant.CanvasRenderer(); /**
 * @scope enchant.Scene.prototype
 */enchant.Scene=enchant.Class.create(enchant.Group,{ /**
     * @name enchant.Scene
     * @class
     * Class that becomes the root of the display object tree.
     * Child {@link Entity} objects are distributed to the Scene layer according to the drawing method.
     * The DOM of each Scene layer has a ({@link enchant.DOMLayer} and  {@link enchant.CanvasLayer}) and is drawn using the Canvas.
     * Scenes are drawn in the order that they are added.
     *
     * @example
     * var scene = new Scene();
     * scene.addChild(player);
     * scene.addChild(enemy);
     * core.pushScene(scene);
     *
     * @constructs
     * @extends enchant.Group
     */initialize:function initialize(){var core=enchant.Core.instance; // Call initialize method of enchant.Group
enchant.Group.call(this); // All nodes (entities, groups, scenes) have reference to the scene that it belongs to.
this.scene=this;this._backgroundColor=null; // Create div tag which possesses its layers
this._element=document.createElement('div');this._element.style.position='absolute';this._element.style.overflow='hidden';this._element.style[enchant.ENV.VENDOR_PREFIX+'TransformOrigin']='0 0';this._layers={};this._layerPriority=[];this.addEventListener(enchant.Event.CHILD_ADDED,this._onchildadded);this.addEventListener(enchant.Event.CHILD_REMOVED,this._onchildremoved);this.addEventListener(enchant.Event.ENTER,this._onenter);this.addEventListener(enchant.Event.EXIT,this._onexit);var that=this;this._dispatchExitframe=function(){var layer;for(var prop in that._layers){layer=that._layers[prop];layer.dispatchEvent(new enchant.Event(enchant.Event.EXIT_FRAME));}};this.addEventListener(enchant.Event.CORE_RESIZE,this._oncoreresize);this._oncoreresize(core);}, /**#nocode+*/x:{get:function get(){return this._x;},set:function set(x){this._x=x;for(var type in this._layers){this._layers[type].x=x;}}},y:{get:function get(){return this._y;},set:function set(y){this._y=y;for(var type in this._layers){this._layers[type].y=y;}}},width:{get:function get(){return this._width;},set:function set(width){this._width=width;for(var type in this._layers){this._layers[type].width=width;}}},height:{get:function get(){return this._height;},set:function set(height){this._height=height;for(var type in this._layers){this._layers[type].height=height;}}},rotation:{get:function get(){return this._rotation;},set:function set(rotation){this._rotation=rotation;for(var type in this._layers){this._layers[type].rotation=rotation;}}},scaleX:{get:function get(){return this._scaleX;},set:function set(scaleX){this._scaleX=scaleX;for(var type in this._layers){this._layers[type].scaleX=scaleX;}}},scaleY:{get:function get(){return this._scaleY;},set:function set(scaleY){this._scaleY=scaleY;for(var type in this._layers){this._layers[type].scaleY=scaleY;}}},backgroundColor:{get:function get(){return this._backgroundColor;},set:function set(color){this._backgroundColor=this._element.style.backgroundColor=color;}},remove:function remove(){this.clearEventListener();while(this.childNodes.length>0){this.childNodes[0].remove();}return enchant.Core.instance.removeScene(this);}, /**#nocode-*/_oncoreresize:function _oncoreresize(e){this._element.style.width=e.width+'px';this.width=e.width;this._element.style.height=e.height+'px';this.height=e.height;this._element.style[enchant.ENV.VENDOR_PREFIX+'Transform']='scale('+e.scale+')';for(var type in this._layers){this._layers[type].dispatchEvent(e);}},addLayer:function addLayer(type,i){var core=enchant.Core.instance;if(this._layers[type]){return;}var layer=new enchant[type+'Layer']();if(core.currentScene===this){layer._startRendering();}this._layers[type]=layer;var element=layer._element;if(typeof i==='number'){var nextSibling=this._element.childNodes[i];if(nextSibling){this._element.insertBefore(element,nextSibling);}else {this._element.appendChild(element);}this._layerPriority.splice(i,0,type);}else {this._element.appendChild(element);this._layerPriority.push(type);}layer._scene=this;},_determineEventTarget:function _determineEventTarget(e){var layer,target;for(var i=this._layerPriority.length-1;i>=0;i--){layer=this._layers[this._layerPriority[i]];target=layer._determineEventTarget(e);if(target){break;}}if(!target){target=this;}return target;},_onchildadded:function _onchildadded(e){var child=e.node;var next=e.next;var target,i;if(child._element){target='Dom';i=1;}else {target='Canvas';i=0;}if(!this._layers[target]){this.addLayer(target,i);}child._layer=this._layers[target];this._layers[target].insertBefore(child,next);child.parentNode=this;},_onchildremoved:function _onchildremoved(e){var child=e.node;child._layer.removeChild(child);child._layer=null;},_onenter:function _onenter(){for(var type in this._layers){this._layers[type]._startRendering();}enchant.Core.instance.addEventListener('exitframe',this._dispatchExitframe);},_onexit:function _onexit(){for(var type in this._layers){this._layers[type]._stopRendering();}enchant.Core.instance.removeEventListener('exitframe',this._dispatchExitframe);}}); /**
 * @scope enchant.LoadingScene.prototype
 */enchant.LoadingScene=enchant.Class.create(enchant.Scene,{ /**
     * @name enchant.LoadingScene
     * @class
     * Default loading scene. If you want to use your own loading animation, overwrite (don't inherit) this class.
     * Referred from enchant.Core in default, as `new enchant.LoadingScene` etc.
     *
     * @example
     * enchant.LoadingScene = enchant.Class.create(enchant.Scene, {
     *     initialize: function() {
     *         enchant.Scene.call(this);
     *         this.backgroundColor = 'red';
     *         // ...
     *         this.addEventListener('progress', function(e) {
     *             progress = e.loaded / e.total;
     *         });
     *         this.addEventListener('enterframe', function() {
     *             // animation
     *         });
     *     }
     * });
     * @constructs
     * @extends enchant.Scene
     */initialize:function initialize(){enchant.Scene.call(this);this.backgroundColor='#000';var barWidth=this.width*0.4|0;var barHeight=this.width*0.05|0;var border=barWidth*0.03|0;var bar=new enchant.Sprite(barWidth,barHeight);bar.disableCollection();bar.x=(this.width-barWidth)/2;bar.y=(this.height-barHeight)/2;var image=new enchant.Surface(barWidth,barHeight);image.context.fillStyle='#fff';image.context.fillRect(0,0,barWidth,barHeight);image.context.fillStyle='#000';image.context.fillRect(border,border,barWidth-border*2,barHeight-border*2);bar.image=image;var progress=0,_progress=0;this.addEventListener('progress',function(e){ // avoid #167 https://github.com/wise9/enchant.js/issues/177
progress=e.loaded/e.total*1.0;});bar.addEventListener('enterframe',function(){_progress*=0.9;_progress+=progress*0.1;image.context.fillStyle='#fff';image.context.fillRect(border,0,(barWidth-border*2)*_progress,barHeight);});this.addChild(bar);this.addEventListener('load',function(e){var core=enchant.Core.instance;core.removeScene(core.loadingScene);core.dispatchEvent(e);});}}); /**
 * @scope enchant.CanvasScene.prototype
 */enchant.CanvasScene=enchant.Class.create(enchant.Scene,{ /**
     * @name enchant.CanvasScene
     * @class
     * Scene to draw by the Canvas all of the children.
     * @constructs
     * @extends enchant.Scene
     */initialize:function initialize(){enchant.Scene.call(this);this.addLayer('Canvas');},_determineEventTarget:function _determineEventTarget(e){var target=this._layers.Canvas._determineEventTarget(e);if(!target){target=this;}return target;},_onchildadded:function _onchildadded(e){var child=e.node;var next=e.next;child._layer=this._layers.Canvas;this._layers.Canvas.insertBefore(child,next);},_onenter:function _onenter(){this._layers.Canvas._startRendering();enchant.Core.instance.addEventListener('exitframe',this._dispatchExitframe);},_onexit:function _onexit(){this._layers.Canvas._stopRendering();enchant.Core.instance.removeEventListener('exitframe',this._dispatchExitframe);}}); /**
 * @scope enchant.DOMScene.prototype
 */enchant.DOMScene=enchant.Class.create(enchant.Scene,{ /**
     * @name enchant.DOMScene
     * @class
     * Scene to draw by the DOM all of the children.
     * @constructs
     * @extends enchant.Scene
     */initialize:function initialize(){enchant.Scene.call(this);this.addLayer('Dom');},_determineEventTarget:function _determineEventTarget(e){var target=this._layers.Dom._determineEventTarget(e);if(!target){target=this;}return target;},_onchildadded:function _onchildadded(e){var child=e.node;var next=e.next;child._layer=this._layers.Dom;this._layers.Dom.insertBefore(child,next);},_onenter:function _onenter(){this._layers.Dom._startRendering();enchant.Core.instance.addEventListener('exitframe',this._dispatchExitframe);},_onexit:function _onexit(){this._layers.Dom._stopRendering();enchant.Core.instance.removeEventListener('exitframe',this._dispatchExitframe);}}); /**
 * @scope enchant.Surface.prototype
 */enchant.Surface=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.Surface
     * @class
     * Class that wraps canvas elements.
     *
     * Can be used to set the {@link enchant.Sprite} and {@link enchant.Map}'s image properties to be displayed.
     * If you wish to access Canvas API use the {@link enchant.Surface#context} property.
     *
     * @example
     * // Creates Sprite that displays a circle.
     * var ball = new Sprite(50, 50);
     * var surface = new Surface(50, 50);
     * surface.context.beginPath();
     * surface.context.arc(25, 25, 25, 0, Math.PI*2, true);
     * surface.context.fill();
     * ball.image = surface;
     *
     * @param {Number} width Surface width.
     * @param {Number} height Surface height.
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(width,height){enchant.EventTarget.call(this);var core=enchant.Core.instance; /**
         * Surface width.
         * @type Number
         */this.width=Math.ceil(width); /**
         * Surface height.
         * @type Number
         */this.height=Math.ceil(height); /**
         * Surface drawing context.
         * @type CanvasRenderingContext2D
         */this.context=null;var id='enchant-surface'+core._surfaceID++;if(document.getCSSCanvasContext){this.context=document.getCSSCanvasContext('2d',id,width,height);this._element=this.context.canvas;this._css='-webkit-canvas('+id+')';var context=this.context;}else if(document.mozSetImageElement){this._element=document.createElement('canvas');this._element.width=width;this._element.height=height;this._css='-moz-element(#'+id+')';this.context=this._element.getContext('2d');document.mozSetImageElement(id,this._element);}else {this._element=document.createElement('canvas');this._element.width=width;this._element.height=height;this._element.style.position='absolute';this.context=this._element.getContext('2d');enchant.ENV.CANVAS_DRAWING_METHODS.forEach(function(name){var method=this.context[name];this.context[name]=function(){method.apply(this,arguments);this._dirty=true;};},this);}}, /**
     * Returns 1 pixel from the Surface.
     * @param {Number} x The pixel's x coordinates.
     * @param {Number} y The pixel's y coordinates.
     * @return {Number[]} An array that holds pixel information in [r, g, b, a] format.
     */getPixel:function getPixel(x,y){return this.context.getImageData(x,y,1,1).data;}, /**
     * Sets one pixel within the surface.
     * @param {Number} x The pixel's x coordinates.
     * @param {Number} y The pixel's y coordinates.
     * @param {Number} r The pixel's red level.
     * @param {Number} g The pixel's green level.
     * @param {Number} b The pixel's blue level.
     * @param {Number} a The pixel's transparency.
     */setPixel:function setPixel(x,y,r,g,b,a){var pixel=this.context.createImageData(1,1);pixel.data[0]=r;pixel.data[1]=g;pixel.data[2]=b;pixel.data[3]=a;this.context.putImageData(pixel,x,y);}, /**
     * Clears all Surface pixels and makes the pixels transparent.
     */clear:function clear(){this.context.clearRect(0,0,this.width,this.height);}, /**
     * Draws the content of the given Surface onto this surface.
     *
     * Wraps Canvas API drawImage and if multiple arguments are given,
     * these are getting applied to the Canvas drawImage method.
     *
     * @example
     * var src = core.assets['src.gif'];
     * var dst = new Surface(100, 100);
     * dst.draw(src);         // Draws source at (0, 0)
     * dst.draw(src, 50, 50); // Draws source at (50, 50)
     * // Draws just 30 horizontal and vertical pixels of source at (50, 50)
     * dst.draw(src, 50, 50, 30, 30);
     * // Takes the image content in src starting at (10,10) with a (Width, Height) of (40,40),
     * // scales it and draws it in this surface at (50, 50) with a (Width, Height) of (30,30).
     * dst.draw(src, 10, 10, 40, 40, 50, 50, 30, 30);
     *
     * @param {enchant.Surface} image Surface used in drawing.
     */draw:function draw(image){image=image._element;if(arguments.length===1){this.context.drawImage(image,0,0);}else {var args=arguments;args[0]=image;this.context.drawImage.apply(this.context,args);}}, /**
     * Copies Surface.
     * @return {enchant.Surface} The copied Surface.
     */clone:function clone(){var clone=new enchant.Surface(this.width,this.height);clone.draw(this);return clone;}, /**
     * Creates a data URI scheme from this Surface.
     * @return {String} The data URI scheme that identifies this Surface and
     * can be used to include this Surface into a dom tree.
     */toDataURL:function toDataURL(){var src=this._element.src;if(src){if(src.slice(0,5)==='data:'){return src;}else {return this.clone().toDataURL();}}else {return this._element.toDataURL();}}}); /**
 * Loads an image and creates a Surface object out of it.
 *
 * It is not possible to access properties or methods of the {@link enchant.Surface#context}, or to call methods using the Canvas API -
 * like {@link enchant.Surface#draw}, {@link enchant.Surface#clear}, {@link enchant.Surface#getPixel}, {@link enchant.Surface#setPixel}.. -
 * of the wrapped image created with this method.
 * However, it is possible to use this surface to draw it to another surface using the {@link enchant.Surface#draw} method.
 * The resulting surface can then be manipulated. (when loading images in a cross-origin resource sharing environment,
 * pixel acquisition and other image manipulation might be limited).
 *
 * @param {String} src The file path of the image to be loaded.
 * @param {Function} callback on load callback.
 * @param {Function} [onerror] on error callback.
 * @static
 * @return {enchant.Surface} Surface
 */enchant.Surface.load=function(src,callback,onerror){var image=new Image();var surface=Object.create(enchant.Surface.prototype,{context:{value:null},_css:{value:'url('+src+')'},_element:{value:image}});enchant.EventTarget.call(surface);onerror=onerror||function(){};surface.addEventListener('load',callback);surface.addEventListener('error',onerror);image.onerror=function(){var e=new enchant.Event(enchant.Event.ERROR);e.message='Cannot load an asset: '+image.src;enchant.Core.instance.dispatchEvent(e);surface.dispatchEvent(e);};image.onload=function(){surface.width=image.width;surface.height=image.height;surface.dispatchEvent(new enchant.Event('load'));};image.src=src;return surface;};enchant.Surface._staticCanvas2DContext=document.createElement('canvas').getContext('2d');enchant.Surface._getPattern=function(surface,force){if(!surface._pattern||force){surface._pattern=this._staticCanvas2DContext.createPattern(surface._element,'repeat');}return surface._pattern;};if(window.Deferred){enchant.Deferred=window.Deferred;}else { /**
     * @scope enchant.Deferred.prototype
     */enchant.Deferred=enchant.Class.create({ /**
         * @name enchant.Deferred
         * @class
         * <br/>
         * See: <a href="http://cho45.stfuawsc.com/jsdeferred/">
         * http://cho45.stfuawsc.com/jsdeferred/</a>
         *
         * @example
         * enchant.Deferred
         *     .next(function() {
         *         return 42;
         *     })
         *     .next(function(n) {
         *         console.log(n); // 42
         *     })
         *     .next(function() {
         *         return core.load('img.png'); // wait loading
         *     })
         *     .next(function() {
         *         var img = core.assets['img.png'];
         *         console.log(img instanceof enchant.Surface); // true
         *         throw new Error('!!!');
         *     })
         *     .next(function() {
         *         // skip
         *     })
         *     .error(function(err) {
         *          console.log(err.message); // !!!
         *     });
         *
         * @constructs
         */initialize:function initialize(){this._succ=this._fail=this._next=this._id=null;this._tail=this;}, /**
         * @param {Function} func
         */next:function next(func){var q=new enchant.Deferred();q._succ=func;return this._add(q);}, /**
         * @param {Function} func
         */error:function error(func){var q=new enchant.Deferred();q._fail=func;return this._add(q);},_add:function _add(queue){this._tail._next=queue;this._tail=queue;return this;}, /**
         * @param {*} arg
         */call:function call(arg){var received;var queue=this;while(queue&&!queue._succ){queue=queue._next;}if(!(queue instanceof enchant.Deferred)){return;}try{received=queue._succ(arg);}catch(e){return queue.fail(e);}if(received instanceof enchant.Deferred){enchant.Deferred._insert(queue,received);}else if(queue._next instanceof enchant.Deferred){queue._next.call(received);}}, /**
         * @param {*} arg
         */fail:function fail(arg){var result,err,queue=this;while(queue&&!queue._fail){queue=queue._next;}if(queue instanceof enchant.Deferred){result=queue._fail(arg);queue.call(result);}else if(arg instanceof Error){throw arg;}else {err=new Error('failed in Deferred');err.arg=arg;throw err;}}});enchant.Deferred._insert=function(queue,ins){if(queue._next instanceof enchant.Deferred){ins._tail._next=queue._next;}queue._next=ins;}; /**
     * @param {Function} func
     * @return {enchant.Deferred}
     * @static
     */enchant.Deferred.next=function(func){var q=new enchant.Deferred().next(func);q._id=setTimeout(function(){q.call();},0);return q;}; /**
     * @param {Object|enchant.Deferred[]} arg
     * @return {enchant.Deferred}
     *
     * @example
     * // array
     * enchant.Deferred
     *     .parallel([
     *         enchant.Deferred.next(function() {
     *             return 24;
     *         }),
     *         enchant.Deferred.next(function() {
     *             return 42;
     *         })
     *     ])
     *     .next(function(arg) {
     *         console.log(arg); // [ 24, 42 ]
     *     });
     * // object
     * enchant.Deferred
     *     .parallel({
     *         foo: enchant.Deferred.next(function() {
     *             return 24;
     *         }),
     *         bar: enchant.Deferred.next(function() {
     *             return 42;
     *         })
     *     })
     *     .next(function(arg) {
     *         console.log(arg.foo); // 24
     *         console.log(arg.bar); // 42
     *     });
     *
     * @static
     */enchant.Deferred.parallel=function(arg){var q=new enchant.Deferred();q._id=setTimeout(function(){q.call();},0);var progress=0;var ret=arg instanceof Array?[]:{};var p=new enchant.Deferred();for(var prop in arg){if(arg.hasOwnProperty(prop)){progress++; /*jshint loopfunc:true */(function(queue,name){queue.next(function(arg){progress--;ret[name]=arg;if(progress<=0){p.call(ret);}}).error(function(err){p.fail(err);});if(typeof queue._id==='number'){clearTimeout(queue._id);}queue._id=setTimeout(function(){queue.call();},0);})(arg[prop],prop);}}if(!progress){p._id=setTimeout(function(){p.call(ret);},0);}return q.next(function(){return p;});};} /**
 * @scope enchant.DOMSound.prototype
 */enchant.DOMSound=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.DOMSound
     * @class
     * Class to wrap audio elements.
     *
     * Safari, Chrome, Firefox, Opera, and IE all play MP3 files
     * (Firefox and Opera play via Flash). WAVE files can be played on
     * Safari, Chrome, Firefox, and Opera. When the browser is not compatible with
     * the used codec the file will not play.
     *
     * Instances are created not via constructor but via {@link enchant.DOMSound.load}.
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(){enchant.EventTarget.call(this); /**
         * Sound file duration (seconds).
         * @type Number
         */this.duration=0;throw new Error("Illegal Constructor");}, /**
     * Begin playing.
     */play:function play(){if(this._element){this._element.play();}}, /**
     * Pause playback.
     */pause:function pause(){if(this._element){this._element.pause();}}, /**
     * Stop playing.
     */stop:function stop(){this.pause();this.currentTime=0;}, /**
     * Create a copy of this Sound object.
     * @return {enchant.DOMSound} Copied Sound.
     */clone:function clone(){var clone;if(this._element instanceof Audio){clone=Object.create(enchant.DOMSound.prototype,{_element:{value:this._element.cloneNode(false)},duration:{value:this.duration}});}else if(enchant.ENV.USE_FLASH_SOUND){return this;}else {clone=Object.create(enchant.DOMSound.prototype);}enchant.EventTarget.call(clone);return clone;}, /**
     * Current playback position (seconds).
     * @type Number
     */currentTime:{get:function get(){return this._element?this._element.currentTime:0;},set:function set(time){if(this._element){this._element.currentTime=time;}}}, /**
     * Volume. 0 (muted) ～ 1 (full volume).
     * @type Number
     */volume:{get:function get(){return this._element?this._element.volume:1;},set:function set(volume){if(this._element){this._element.volume=volume;}}}}); /**
 * Loads an audio file and creates DOMSound object.
 * @param {String} src Path of the audio file to be loaded.
 * @param {String} [type] MIME Type of the audio file.
 * @param {Function} [callback] on load callback.
 * @param {Function} [onerror] on error callback.
 * @return {enchant.DOMSound} DOMSound
 * @static
 */enchant.DOMSound.load=function(src,type,callback,onerror){if(type==null){var ext=enchant.Core.findExt(src);if(ext){type='audio/'+ext;}else {type='';}}type=type.replace('mp3','mpeg').replace('m4a','mp4');callback=callback||function(){};onerror=onerror||function(){};var sound=Object.create(enchant.DOMSound.prototype);enchant.EventTarget.call(sound);sound.addEventListener('load',callback);sound.addEventListener('error',onerror);var audio=new Audio();if(!enchant.ENV.SOUND_ENABLED_ON_MOBILE_SAFARI&&enchant.ENV.VENDOR_PREFIX==='webkit'&&enchant.ENV.TOUCH_ENABLED){window.setTimeout(function(){sound.dispatchEvent(new enchant.Event('load'));},0);}else {if(!enchant.ENV.USE_FLASH_SOUND&&audio.canPlayType(type)){audio.addEventListener('canplaythrough',function canplay(){sound.duration=audio.duration;sound.dispatchEvent(new enchant.Event('load'));audio.removeEventListener('canplaythrough',canplay);},false);audio.src=src;audio.load();audio.autoplay=false;audio.onerror=function(){var e=new enchant.Event(enchant.Event.ERROR);e.message='Cannot load an asset: '+audio.src;enchant.Core.instance.dispatchEvent(e);sound.dispatchEvent(e);};sound._element=audio;}else if(type==='audio/mpeg'){var embed=document.createElement('embed');var id='enchant-audio'+enchant.Core.instance._soundID++;embed.width=embed.height=1;embed.name=id;embed.src='sound.swf?id='+id+'&src='+src;embed.allowscriptaccess='always';embed.style.position='absolute';embed.style.left='-1px';sound.addEventListener('load',function(){Object.defineProperties(embed,{currentTime:{get:function get(){return embed.getCurrentTime();},set:function set(time){embed.setCurrentTime(time);}},volume:{get:function get(){return embed.getVolume();},set:function set(volume){embed.setVolume(volume);}}});sound._element=embed;sound.duration=embed.getDuration();});enchant.Core.instance._element.appendChild(embed);enchant.DOMSound[id]=sound;}else {window.setTimeout(function(){sound.dispatchEvent(new enchant.Event('load'));},0);}}return sound;};window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.msAudioContext||window.oAudioContext; /**
 * @scope enchant.WebAudioSound.prototype
 */enchant.WebAudioSound=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.WebAudioSound
     * @class
     * Sound wrapper class for Web Audio API (supported on some webkit-based browsers)
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(){if(!window.AudioContext){throw new Error("This browser does not support WebAudio API.");}enchant.EventTarget.call(this);if(!enchant.WebAudioSound.audioContext){enchant.WebAudioSound.audioContext=new window.AudioContext();enchant.WebAudioSound.destination=enchant.WebAudioSound.audioContext.destination;}this.context=enchant.WebAudioSound.audioContext;this.src=this.context.createBufferSource();this.buffer=null;this._volume=1;this._currentTime=0;this._state=0;this.connectTarget=enchant.WebAudioSound.destination;}, /**
     * Begin playing.
     * @param {Boolean} [dup=false] If true, Object plays new sound while keeps last sound.
     */play:function play(dup){if(this._state===1&&!dup){this.src.disconnect();}if(this._state!==2){this._currentTime=0;}var offset=this._currentTime;var actx=this.context;this.src=actx.createBufferSource();if(actx.createGain!=null){this._gain=actx.createGain();}else {this._gain=actx.createGainNode();}this.src.buffer=this.buffer;this._gain.gain.value=this._volume;this.src.connect(this._gain);this._gain.connect(this.connectTarget);if(this.src.start!=null){this.src.start(0,offset,this.buffer.duration-offset-1.192e-7);}else {this.src.noteGrainOn(0,offset,this.buffer.duration-offset-1.192e-7);}this._startTime=actx.currentTime-this._currentTime;this._state=1;}, /**
     * Pause playback.
     */pause:function pause(){var currentTime=this.currentTime;if(currentTime===this.duration){return;}if(this.src.stop!=null){this.src.stop(0);}else {this.src.noteOff(0);}this._currentTime=currentTime;this._state=2;}, /**
     * Stop playing.
     */stop:function stop(){if(this.src.stop!=null){this.src.stop(0);}else {this.src.noteOff(0);}this._state=0;}, /**
     * Create a copy of this Sound object.
     * @return {enchant.WebAudioSound} Copied Sound.
     */clone:function clone(){var sound=new enchant.WebAudioSound();sound.buffer=this.buffer;return sound;}, /**
     * Sound file duration (seconds).
     * @type Number
     */duration:{get:function get(){if(this.buffer){return this.buffer.duration;}else {return 0;}}}, /**
     * Volume. 0 (muted) ～ 1 (full volume).
     * @type Number
     */volume:{get:function get(){return this._volume;},set:function set(volume){volume=Math.max(0,Math.min(1,volume));this._volume=volume;if(this.src){this._gain.gain.value=volume;}}}, /**
     * Current playback position (seconds).
     * @type Number
     */currentTime:{get:function get(){return Math.max(0,Math.min(this.duration,this.src.context.currentTime-this._startTime));},set:function set(time){this._currentTime=time;if(this._state!==2){this.play(false);}}}}); /**
 * Loads an audio file and creates WebAudioSound object.
 * @param {String} src Path of the audio file to be loaded.
 * @param {String} [type] MIME Type of the audio file.
 * @param {Function} [callback] on load callback.
 * @param {Function} [onerror] on error callback.
 * @return {enchant.WebAudioSound} WebAudioSound
 * @static
 */enchant.WebAudioSound.load=function(src,type,callback,onerror){var canPlay=new Audio().canPlayType(type);var sound=new enchant.WebAudioSound();callback=callback||function(){};onerror=onerror||function(){};sound.addEventListener(enchant.Event.LOAD,callback);sound.addEventListener(enchant.Event.ERROR,onerror);function dispatchErrorEvent(){var e=new enchant.Event(enchant.Event.ERROR);e.message='Cannot load an asset: '+src;enchant.Core.instance.dispatchEvent(e);sound.dispatchEvent(e);}var actx,xhr;if(canPlay==='maybe'||canPlay==='probably'){actx=enchant.WebAudioSound.audioContext;xhr=new XMLHttpRequest();xhr.open('GET',src,true);xhr.responseType='arraybuffer';xhr.onload=function(){actx.decodeAudioData(xhr.response,function(buffer){sound.buffer=buffer;sound.dispatchEvent(new enchant.Event(enchant.Event.LOAD));},dispatchErrorEvent);};xhr.onerror=dispatchErrorEvent;xhr.send(null);}else {setTimeout(dispatchErrorEvent,50);}return sound;};enchant.Sound=window.AudioContext&&enchant.ENV.USE_WEBAUDIO?enchant.WebAudioSound:enchant.DOMSound; /*
 * ============================================================================================
 * Easing Equations v2.0
 * September 1, 2003
 * (c) 2003 Robert Penner, all rights reserved.
 * This work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
 * ============================================================================================
 */ /**
 * @namespace
 * JavaScript translation of Robert Penner's "Easing Equations" library which is widely used in ActionScript.
 * 
 * @param [t] the current time
 * @param [b] the property's initial value
 * @param [c] how much the value should change
 * @param [d] how much time should elapse before value is changed
 * 
 * @return {Number}
 * <br/>
 * See: <a href="http://www.robertpenner.com/easing/">
 * http://www.robertpenner.com/easing/</a>
 * <br/>
 * See: <a href="http://www.robertpenner.com/easing/penner_chapter7_tweening.pdf">
 * http://www.robertpenner.com/easing/penner_chapter7_tweening.pdf</a>
 */enchant.Easing={LINEAR:function LINEAR(t,b,c,d){return c*t/d+b;},SWING:function SWING(t,b,c,d){return c*(0.5-Math.cos(t/d*Math.PI)/2)+b;}, // *** quad
QUAD_EASEIN:function QUAD_EASEIN(t,b,c,d){return c*(t/=d)*t+b;},QUAD_EASEOUT:function QUAD_EASEOUT(t,b,c,d){return -c*(t/=d)*(t-2)+b;},QUAD_EASEINOUT:function QUAD_EASEINOUT(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b;}return -c/2*(--t*(t-2)-1)+b;}, // *** cubic
CUBIC_EASEIN:function CUBIC_EASEIN(t,b,c,d){return c*(t/=d)*t*t+b;},CUBIC_EASEOUT:function CUBIC_EASEOUT(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},CUBIC_EASEINOUT:function CUBIC_EASEINOUT(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b;}return c/2*((t-=2)*t*t+2)+b;}, // *** quart
QUART_EASEIN:function QUART_EASEIN(t,b,c,d){return c*(t/=d)*t*t*t+b;},QUART_EASEOUT:function QUART_EASEOUT(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},QUART_EASEINOUT:function QUART_EASEINOUT(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b;}return -c/2*((t-=2)*t*t*t-2)+b;}, // *** quint
QUINT_EASEIN:function QUINT_EASEIN(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},QUINT_EASEOUT:function QUINT_EASEOUT(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},QUINT_EASEINOUT:function QUINT_EASEINOUT(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b;}return c/2*((t-=2)*t*t*t*t+2)+b;}, // *** sin
SIN_EASEIN:function SIN_EASEIN(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},SIN_EASEOUT:function SIN_EASEOUT(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},SIN_EASEINOUT:function SIN_EASEINOUT(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;}, // *** circ
CIRC_EASEIN:function CIRC_EASEIN(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},CIRC_EASEOUT:function CIRC_EASEOUT(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},CIRC_EASEINOUT:function CIRC_EASEINOUT(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b;}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;}, // *** elastic
ELASTIC_EASEIN:function ELASTIC_EASEIN(t,b,c,d,a,p){if(t===0){return b;}if((t/=d)===1){return b+c;}if(!p){p=d*0.3;}var s;if(!a||a<Math.abs(c)){a=c;s=p/4;}else {s=p/(2*Math.PI)*Math.asin(c/a);}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},ELASTIC_EASEOUT:function ELASTIC_EASEOUT(t,b,c,d,a,p){if(t===0){return b;}if((t/=d)===1){return b+c;}if(!p){p=d*0.3;}var s;if(!a||a<Math.abs(c)){a=c;s=p/4;}else {s=p/(2*Math.PI)*Math.asin(c/a);}return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},ELASTIC_EASEINOUT:function ELASTIC_EASEINOUT(t,b,c,d,a,p){if(t===0){return b;}if((t/=d/2)===2){return b+c;}if(!p){p=d*(0.3*1.5);}var s;if(!a||a<Math.abs(c)){a=c;s=p/4;}else {s=p/(2*Math.PI)*Math.asin(c/a);}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;}, // *** bounce
BOUNCE_EASEOUT:function BOUNCE_EASEOUT(t,b,c,d){if((t/=d)<1/2.75){return c*(7.5625*t*t)+b;}else if(t<2/2.75){return c*(7.5625*(t-=1.5/2.75)*t+0.75)+b;}else if(t<2.5/2.75){return c*(7.5625*(t-=2.25/2.75)*t+0.9375)+b;}else {return c*(7.5625*(t-=2.625/2.75)*t+0.984375)+b;}},BOUNCE_EASEIN:function BOUNCE_EASEIN(t,b,c,d){return c-enchant.Easing.BOUNCE_EASEOUT(d-t,0,c,d)+b;},BOUNCE_EASEINOUT:function BOUNCE_EASEINOUT(t,b,c,d){if(t<d/2){return enchant.Easing.BOUNCE_EASEIN(t*2,0,c,d)*0.5+b;}else {return enchant.Easing.BOUNCE_EASEOUT(t*2-d,0,c,d)*0.5+c*0.5+b;}}, // *** back
BACK_EASEIN:function BACK_EASEIN(t,b,c,d,s){if(s===undefined){s=1.70158;}return c*(t/=d)*t*((s+1)*t-s)+b;},BACK_EASEOUT:function BACK_EASEOUT(t,b,c,d,s){if(s===undefined){s=1.70158;}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},BACK_EASEINOUT:function BACK_EASEINOUT(t,b,c,d,s){if(s===undefined){s=1.70158;}if((t/=d/2)<1){return c/2*(t*t*(((s*=1.525)+1)*t-s))+b;}return c/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+b;}, // *** expo
EXPO_EASEIN:function EXPO_EASEIN(t,b,c,d){return t===0?b:c*Math.pow(2,10*(t/d-1))+b;},EXPO_EASEOUT:function EXPO_EASEOUT(t,b,c,d){return t===d?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},EXPO_EASEINOUT:function EXPO_EASEINOUT(t,b,c,d){if(t===0){return b;}if(t===d){return b+c;}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b;}return c/2*(-Math.pow(2,-10*--t)+2)+b;}}; /**
 * @scope enchant.ActionEventTarget.prototype
 */enchant.ActionEventTarget=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.ActionEventTarget
     * @class
     * EventTarget which can change the context of event listeners.
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(){enchant.EventTarget.apply(this,arguments);},dispatchEvent:function dispatchEvent(e){var target=this.node?this.node:this;e.target=target;e.localX=e.x-target._offsetX;e.localY=e.y-target._offsetY;if(this['on'+e.type]!=null){this['on'+e.type].call(target,e);}var listeners=this._listeners[e.type];if(listeners!=null){listeners=listeners.slice();for(var i=0,len=listeners.length;i<len;i++){listeners[i].call(target,e);}}}}); /**
 * @scope enchant.Timeline.prototype
 */enchant.Timeline=enchant.Class.create(enchant.EventTarget,{ /**
     * @name enchant.Timeline
     * @class
     * Time-line class.
     * Class for managing the action.
     *
     * For one node to manipulate the timeline of one must correspond.
     * Time-line class has a method to add a variety of actions to himself,
     * entities can be animated and various operations by using these briefly.
     * You can choose time based and frame based(default) animation.
     * @param {enchant.Node} node target node.
     * @constructs
     * @extends enchant.EventTarget
     */initialize:function initialize(node){enchant.EventTarget.call(this);this.node=node;this.queue=[];this.paused=false;this.looped=false;this.isFrameBased=true;this._parallel=null;this._activated=false;this.addEventListener(enchant.Event.ENTER_FRAME,this._onenterframe);var tl=this;this._nodeEventListener=function(e){tl.dispatchEvent(e);};}, /**
     * @private
     */_deactivateTimeline:function _deactivateTimeline(){if(this._activated){this._activated=false;this.node.removeEventListener('enterframe',this._nodeEventListener);}}, /**
     * @private
     */_activateTimeline:function _activateTimeline(){if(!this._activated&&!this.paused){this.node.addEventListener("enterframe",this._nodeEventListener);this._activated=true;}}, /**
     * @private
     */_onenterframe:function _onenterframe(evt){if(this.paused){return;}this.tick(this.isFrameBased?1:evt.elapsed);}, /**
     */setFrameBased:function setFrameBased(){this.isFrameBased=true;}, /**
     */setTimeBased:function setTimeBased(){this.isFrameBased=false;}, /**
     */next:function next(remainingTime){var e,action=this.queue.shift();if(action){e=new enchant.Event("actionend");e.timeline=this;action.dispatchEvent(e);e=new enchant.Event("removedfromtimeline");e.timeline=this;action.dispatchEvent(e);if(this.looped){this.add(action);}}if(this.queue.length===0){this._deactivateTimeline();return;}if(remainingTime>0||this.queue[0]&&this.queue[0].time===0){var event=new enchant.Event("actiontick");event.elapsed=remainingTime;event.timeline=this;this.queue[0].dispatchEvent(event);}}, /**
     * @param {Number} elapsed
     */tick:function tick(elapsed){if(this.queue.length>0){var action=this.queue[0];if(action.frame===0){var f;f=new enchant.Event("actionstart");f.timeline=this;action.dispatchEvent(f);}var e=new enchant.Event("actiontick");e.timeline=this;e.elapsed=elapsed;action.dispatchEvent(e);}}, /**
     * @param {enchant.Action} action
     * @return {enchant.Timeline}
     */add:function add(action){this._activateTimeline();if(this._parallel){this._parallel.actions.push(action);this._parallel=null;}else {this.queue.push(action);}action.frame=0;var e=new enchant.Event("addedtotimeline");e.timeline=this;action.dispatchEvent(e);e=new enchant.Event("actionadded");e.action=action;this.dispatchEvent(e);return this;}, /**
     * @param {Object} params
     * @return {enchant.Timeline}
     */action:function action(params){return this.add(new enchant.Action(params));}, /**
     * @param {Object} params
     * @return {enchant.Timeline}
     */tween:function tween(params){return this.add(new enchant.Tween(params));}, /**
     * @return {enchant.Timeline}
     */clear:function clear(){var e=new enchant.Event("removedfromtimeline");e.timeline=this;for(var i=0,len=this.queue.length;i<len;i++){this.queue[i].dispatchEvent(e);}this.queue=[];this._deactivateTimeline();return this;}, /**
     * @param {Number} frames
     * @return {enchant.Timeline}
     */skip:function skip(frames){var event=new enchant.Event("enterframe");if(this.isFrameBased){event.elapsed=1;}else {event.elapsed=frames;frames=1;}while(frames--){this.dispatchEvent(event);}return this;}, /**
     * @return {enchant.Timeline}
     */pause:function pause(){if(!this.paused){this.paused=true;this._deactivateTimeline();}return this;}, /**
     * @return {enchant.Timeline}
     */resume:function resume(){if(this.paused){this.paused=false;this._activateTimeline();}return this;}, /**
     * @return {enchant.Timeline}
     */loop:function loop(){this.looped=true;return this;}, /**
     * @return {enchant.Timeline}
     */unloop:function unloop(){this.looped=false;return this;}, /**
     * @param {Number} time
     * @return {enchant.Timeline}
     */delay:function delay(time){return this.action({time:time});}, /**
     * @ignore
     * @param {Number} time
     */wait:function wait(time){ // reserved
return this;}, /**
     * @param {Function} func
     * @return {enchant.Timeline}
     */then:function then(func){return this.action({onactiontick:function onactiontick(evt){func.call(this);}, // if time is 0, next action will be immediately executed
time:0});}, /**
     * @param {Function} func
     * @return {enchant.Timeline}
     */exec:function exec(func){return this.then(func);}, /**
     * @param {Object} cue
     * @return {enchant.Timeline}
     */cue:function cue(_cue){var ptr=0;for(var frame in _cue){if(_cue.hasOwnProperty(frame)){this.delay(frame-ptr);this.then(_cue[frame]);ptr=frame;}}return this;}, /**
     * @param {Function} func
     * @param {Number} time
     * @return {enchant.Timeline}
     */repeat:function repeat(func,time){return this.action({onactiontick:function onactiontick(evt){func.call(this);},time:time});}, /**
     * @return {enchant.Timeline}
     */and:function and(){var last=this.queue.pop();if(last instanceof enchant.ParallelAction){this._parallel=last;this.queue.push(last);}else {var parallel=new enchant.ParallelAction();parallel.actions.push(last);this.queue.push(parallel);this._parallel=parallel;}return this;}, /**
     * @ignore
     */or:function or(){return this;}, /**
     * @ignore
     */doAll:function doAll(children){return this;}, /**
     * @ignore
     */waitAll:function waitAll(){return this;}, /**
     * @param {Function} func
     * @return {enchant.Timeline}
     */waitUntil:function waitUntil(func){return this.action({onactiontick:function onactiontick(evt){if(func.call(this)){evt.timeline.next();}}});}, /**
     * @param {Number} opacity
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */fadeTo:function fadeTo(opacity,time,easing){return this.tween({opacity:opacity,time:time,easing:easing});}, /**
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */fadeIn:function fadeIn(time,easing){return this.fadeTo(1,time,easing);}, /**
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */fadeOut:function fadeOut(time,easing){return this.fadeTo(0,time,easing);}, /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */moveTo:function moveTo(x,y,time,easing){return this.tween({x:x,y:y,time:time,easing:easing});}, /**
     * @param {Number} x
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */moveX:function moveX(x,time,easing){return this.tween({x:x,time:time,easing:easing});}, /**
     * @param {Number} y
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */moveY:function moveY(y,time,easing){return this.tween({y:y,time:time,easing:easing});}, /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */moveBy:function moveBy(_x,_y,time,easing){return this.tween({x:function x(){return this.x+_x;},y:function y(){return this.y+_y;},time:time,easing:easing});}, /**
     * @return {enchant.Timeline}
     */hide:function hide(){return this.then(function(){this.opacity=0;});}, /**
     * @return {enchant.Timeline}
     */show:function show(){return this.then(function(){this.opacity=1;});}, /**
     * @return {enchant.Timeline}
     */removeFromScene:function removeFromScene(){return this.then(function(){this.parentNode.removeChild(this);});}, /**
     * @param {Number} scaleX
     * @param {Number} [scaleY]
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */scaleTo:function scaleTo(scale,time,easing){var scaleX,scaleY;if(typeof easing==="number"){scaleX=arguments[0];scaleY=arguments[1];time=arguments[2];easing=arguments[3];}else {scaleX=scaleY=scale;}return this.tween({scaleX:scaleX,scaleY:scaleY,time:time,easing:easing});}, /**
     * @param {Number} scaleX
     * @param {Number} [scaleY]
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */scaleBy:function scaleBy(scale,time,easing){var _scaleX,_scaleY;if(typeof easing==="number"){_scaleX=arguments[0];_scaleY=arguments[1];time=arguments[2];easing=arguments[3];}else {_scaleX=_scaleY=scale;}return this.tween({scaleX:function scaleX(){return this.scaleX*_scaleX;},scaleY:function scaleY(){return this.scaleY*_scaleY;},time:time,easing:easing});}, /**
     * @param {Number} deg
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */rotateTo:function rotateTo(deg,time,easing){return this.tween({rotation:deg,time:time,easing:easing});}, /**
     * @param {Number} deg
     * @param {Number} time
     * @param {Function} [easing=enchant.Easing.LINEAR]
     * @return {enchant.Timeline}
     */rotateBy:function rotateBy(deg,time,easing){return this.tween({rotation:function rotation(){return this.rotation+deg;},time:time,easing:easing});}}); /**
 * @scope enchant.Action.prototype
 */enchant.Action=enchant.Class.create(enchant.ActionEventTarget,{ /**
     * @name enchant.Action
     * @class
     * Actions are units that make up the timeline.
     * It is a unit used to specify the action you want to perform.
     * 
     * Actions that have been added to the timeline are performed in sequential order.
     * The transition from one action to the next occurs automatically 
     * after the number of frames specified by the time parameter have elapsed.
     *
     * An actionstart event is fired when the action has started.
     * An actionend event is fired when the action has stopped.
     * For each frame that elapses, an actiontick event is fired.
     * 
     * You can specify a listener for these events to perform specific events when they occur.
     *
     * @param {Object} param
     * @param {Number} [param.time] The number of frames that the action will persist. For an infinite number set this to null.
     * @param {Function} [param.onactionstart] Event listener for when the action is initiated.
     * @param {Function} [param.onactiontick] Event listener for when the action has passed one frame.
     * @param {Function} [param.onactionend] Event listener for when the action is finished.
     * @constructs
     * @extends enchant.ActionEventTarget
     */initialize:function initialize(param){enchant.ActionEventTarget.call(this);this.time=null;this.frame=0;for(var key in param){if(param.hasOwnProperty(key)){if(param[key]!=null){this[key]=param[key];}}}var action=this;this.timeline=null;this.node=null;this.addEventListener(enchant.Event.ADDED_TO_TIMELINE,function(evt){action.timeline=evt.timeline;action.node=evt.timeline.node;action.frame=0;});this.addEventListener(enchant.Event.REMOVED_FROM_TIMELINE,function(){action.timeline=null;action.node=null;action.frame=0;});this.addEventListener(enchant.Event.ACTION_TICK,function(evt){var remaining=action.time-(action.frame+evt.elapsed);if(action.time!=null&&remaining<=0){action.frame=action.time;evt.timeline.next(-remaining);}else {action.frame+=evt.elapsed;}});}}); /**
 * @scope enchant.ParallelAction.prototype
 */enchant.ParallelAction=enchant.Class.create(enchant.Action,{ /**
     * @name enchant.ParallelAction
     * @class
     * Actions to be executed in parallel.
     * It's possible to have more than one child action.
     * @constructs
     * @extends enchant.Action
     */initialize:function initialize(param){enchant.Action.call(this,param); /**
         * Children Actions.
         * @type enchant.Action[]
         */this.actions=[]; /**
         * Removed actions.
         * @type enchant.Action[]
         */this.endedActions=[];var that=this;this.addEventListener(enchant.Event.ACTION_START,function(evt){for(var i=0,len=that.actions.length;i<len;i++){that.actions[i].dispatchEvent(evt);}});this.addEventListener(enchant.Event.ACTION_TICK,function(evt){var i,len,timeline={next:function next(remaining){var action=that.actions[i];that.actions.splice(i--,1);len=that.actions.length;that.endedActions.push(action);var e=new enchant.Event("actionend");e.timeline=this;action.dispatchEvent(e);e=new enchant.Event("removedfromtimeline");e.timeline=this;action.dispatchEvent(e);}};var e=new enchant.Event("actiontick");e.timeline=timeline;e.elapsed=evt.elapsed;for(i=0,len=that.actions.length;i<len;i++){that.actions[i].dispatchEvent(e);}if(that.actions.length===0){evt.timeline.next();}});this.addEventListener(enchant.Event.ADDED_TO_TIMELINE,function(evt){for(var i=0,len=that.actions.length;i<len;i++){that.actions[i].dispatchEvent(evt);}});this.addEventListener(enchant.Event.REMOVED_FROM_TIMELINE,function(){that.actions=that.endedActions;that.endedActions=[];});}}); /**
 * @scope enchant.Tween.prototype
 */enchant.Tween=enchant.Class.create(enchant.Action,{ /**
     * @name enchant.Tween
     * @class
     * @param {Object} params
     * @param {Number} params.time
     * @param {Function} [params.easing=enchant.Easing.LINEAR]
     * @constructs
     * @extends enchant.Action
     */initialize:function initialize(params){var origin={};var target={};enchant.Action.call(this,params);if(this.easing==null){this.easing=enchant.Easing.LINEAR;}var tween=this;this.addEventListener(enchant.Event.ACTION_START,function(){ // excepted property
var excepted=["frame","time","callback","onactiontick","onactionstart","onactionend"];for(var prop in params){if(params.hasOwnProperty(prop)){ // if function is used instead of numerical value, evaluate it
var target_val;if(typeof params[prop]==="function"){target_val=params[prop].call(tween.node);}else {target_val=params[prop];}if(excepted.indexOf(prop)===-1){origin[prop]=tween.node[prop];target[prop]=target_val;}}}});this.addEventListener(enchant.Event.ACTION_TICK,function(evt){ // if time is 0, set property to target value immediately
var ratio=tween.time===0?1:tween.easing(Math.min(tween.time,tween.frame+evt.elapsed),0,1,tween.time)-tween.easing(tween.frame,0,1,tween.time);for(var prop in target){if(target.hasOwnProperty(prop)){if(typeof this[prop]==="undefined"){continue;}tween.node[prop]+=(target[prop]-origin[prop])*ratio;if(Math.abs(tween.node[prop])<10e-8){tween.node[prop]=0;}}}});}});})(window);

},{}],5:[function(require,module,exports){
'use strict';

/**
 * @fileOverview
 * ui.enchant.js v2 (2012/11/05)
 * ui parts support
 * @require enchant.js v0.5.2 or later
 * @require image files for gamepad, icons (default: pad.png, apad.png, icon0.png, font0.png)
 *
 * @features
 * - D-Pad (left, right, up, down)
 * - Analog Pad
 * - Button (3 built-in themes and can be customized)
 * - MutableText
 * - ScoreLabel
 * - TimeLabel
 * - LifeLabel
 * - Bar
 * - VirtualMap
 *
 * @usage
 * [D-Pad]
 *      var pad = new Pad();
 *      pad.x = 0;
 *      pad.y = 220;
 *      core.rootScene.addChild(pad);
 *  (input of X direction can be detected from "Xbuttonup" "Xbuttondown" events
 *   or enchant.Core.instance.input.X)
 *
 * [A-Pad]
 *      var pad = new APad();
 *      pad.x = 0;
 *      pad.y = 220;
 *      core.rootScene.addChild(pad);
 *  (input can be detected from pad.vx/vy and pad.touched)
 *
 * [Button]
 *      var button = new Button("Press me");
 *      button.addEventListener("touchstart", function(){ ... })
 *      core.rootScene.addEventListener(button);
 *
 *      var button_light = new Button("Press me", "light");
 *      core.rootScene.addEventListener(button);
 *
 *      var button_blue = new Button("Press me", "blue");
 *      core.rootScene.addEventListener(button);
 */

/**
 * @type {Object}
 */
enchant.ui = { assets: ['/images/pad.png', '/images/apad.png', '/images/icon0.png', '/images/font0.png'] };

/**
 * 方向キーパッドのクラス: Pad
 * @scope enchant.ui.Pad
 */
enchant.ui.Pad = enchant.Class.create(enchant.Sprite, {
    /**
     * 方向キーパッドオブジェクトを作成する。
     * @constructs
     * @extends enchant.Sprite
     */
    initialize: function initialize() {
        var core = enchant.Core.instance;
        var image = core.assets['pad.png'];
        enchant.Sprite.call(this, image.width / 2, image.height);
        this.image = image;
        this.input = { left: false, right: false, up: false, down: false };
        this.addEventListener('touchstart', function (e) {
            this._updateInput(this._detectInput(e.localX, e.localY));
        });
        this.addEventListener('touchmove', function (e) {
            this._updateInput(this._detectInput(e.localX, e.localY));
        });
        this.addEventListener('touchend', function (e) {
            this._updateInput({ left: false, right: false, up: false, down: false });
        });
    },
    _detectInput: function _detectInput(x, y) {
        x -= this.width * 0.5;
        y -= this.height * 0.5;
        var input = { left: false, right: false, up: false, down: false };
        if (x * x + y * y <= 2500 && x * x + y * y > 200) {
            if (x < 0 && y < x * x * 0.1 && y > x * x * -0.1) {
                input.left = true;
            }
            if (x > 0 && y < x * x * 0.1 && y > x * x * -0.1) {
                input.right = true;
            }
            if (y < 0 && x < y * y * 0.1 && x > y * y * -0.1) {
                input.up = true;
            }
            if (y > 0 && x < y * y * 0.1 && x > y * y * -0.1) {
                input.down = true;
            }
        }
        return input;
    },
    _updateInput: function _updateInput(input) {
        var core = enchant.Core.instance;
        ['left', 'right', 'up', 'down'].forEach(function (type) {
            if (this.input[type] && !input[type]) {
                core.changeButtonState(type, false);
            }
            if (!this.input[type] && input[type]) {
                core.changeButtonState(type, true);
            }
        }, this);
        this.input = input;
    }
});

/**
 * アナログパッドのクラス: APad
 * @scope enchant.ui.APad
 */
enchant.ui.APad = enchant.Class.create(enchant.Group, {
    /**
     * アナログパッドオブジェクトを作成する。
     * @constructs
     * @extends enchant.Group
     * @param mode
     *   'direct': 入力ベクトルは正規化されない (大きさは 0~1 の間)
     *   'normal': 入力ベクトルを常に正規化する (大きさは常に1となる)
     */
    initialize: function initialize(mode) {
        var core = enchant.Core.instance;
        var image = core.assets['apad.png'];
        var w = this.width = image.width;
        var h = this.height = image.height;
        enchant.Group.call(this);

        this.outside = new enchant.Sprite(w, h);
        var outsideImage = new enchant.Surface(w, h);
        outsideImage.draw(image, 0, 0, w, h / 4, 0, 0, w, h / 4);
        outsideImage.draw(image, 0, h / 4 * 3, w, h / 4, 0, h / 4 * 3, w, h / 4);
        outsideImage.draw(image, 0, h / 4, w / 4, h / 2, 0, h / 4, w / 4, h / 2);
        outsideImage.draw(image, w / 4 * 3, h / 4, w / 4, h / 2, w / 4 * 3, h / 4, w / 4, h / 2);
        this.outside.image = outsideImage;
        this.inside = new enchant.Sprite(w / 2, h / 2);
        var insideImage = new enchant.Surface(w / 2, h / 2);
        insideImage.draw(image, w / 4, h / 4, w / 2, h / 2, 0, 0, w / 2, h / 2);
        this.inside.image = insideImage;
        this.r = w / 2;

        /**
         * isTouched
         * @type {Boolean}
         * タッチされているかどうか
         */
        this.isTouched = false;

        /**
         * vx, vy
         * @type {Number}
         * 入力ベクトルの(x, y)方向の大きさ
         */
        this.vx = 0;
        this.vy = 0;

        /**
         * rad, dist
         * @type {Number}
         * 入力ベクトルの極座標表示
         * radは角度、distはベクトルの大きさを示す
         */
        this.rad = 0;
        this.dist = 0;

        if (mode === 'direct') {
            this.mode = 'direct';
        } else {
            this.mode = 'normal';
        }
        this._updateImage();
        this.addChild(this.inside);
        this.addChild(this.outside);
        this.addEventListener('touchstart', function (e) {
            this._detectInput(e.localX, e.localY);
            this._calcPolar(e.localX, e.localY);
            this._updateImage(e.localX, e.localY);
            this._dispatchPadEvent('apadstart');
            this.isTouched = true;
        });
        this.addEventListener('touchmove', function (e) {
            this._detectInput(e.localX, e.localY);
            this._calcPolar(e.localX, e.localY);
            this._updateImage(e.localX, e.localY);
            this._dispatchPadEvent('apadmove');
        });
        this.addEventListener('touchend', function (e) {
            this._detectInput(this.width / 2, this.height / 2);
            this._calcPolar(this.width / 2, this.height / 2);
            this._updateImage(this.width / 2, this.height / 2);
            this._dispatchPadEvent('apadend');
            this.isTouched = false;
        });
    },
    _dispatchPadEvent: function _dispatchPadEvent(type) {
        var e = new enchant.Event(type);
        e.vx = this.vx;
        e.vy = this.vy;
        e.rad = this.rad;
        e.dist = this.dist;
        this.dispatchEvent(e);
    },
    _updateImage: function _updateImage(x, y) {
        x -= this.width / 2;
        y -= this.height / 2;
        this.inside.x = this.vx * (this.r - 10) + 25;
        this.inside.y = this.vy * (this.r - 10) + 25;
    },
    _detectInput: function _detectInput(x, y) {
        x -= this.width / 2;
        y -= this.height / 2;
        var distance = Math.sqrt(x * x + y * y);
        var tan = y / x;
        var rad = Math.atan(tan);
        var dir = x / Math.abs(x);
        if (distance === 0) {
            this.vx = 0;
            this.vy = 0;
        } else if (x === 0) {
            this.vx = 0;
            if (this.mode === 'direct') {
                this.vy = y / this.r;
            } else {
                dir = y / Math.abs(y);
                this.vy = Math.pow(y / this.r, 2) * dir;
            }
        } else if (distance < this.r) {
            if (this.mode === 'direct') {
                this.vx = x / this.r;
                this.vy = y / this.r;
            } else {
                this.vx = Math.pow(distance / this.r, 2) * Math.cos(rad) * dir;
                this.vy = Math.pow(distance / this.r, 2) * Math.sin(rad) * dir;
            }
        } else {
            this.vx = Math.cos(rad) * dir;
            this.vy = Math.sin(rad) * dir;
        }
    },
    _calcPolar: function _calcPolar(x, y) {
        x -= this.width / 2;
        y -= this.height / 2;
        var add = 0;
        var rad = 0;
        var dist = Math.sqrt(x * x + y * y);
        if (dist > this.r) {
            dist = this.r;
        }
        dist /= this.r;
        if (this.mode === 'normal') {
            dist *= dist;
        }
        if (x >= 0 && y < 0) {
            add = Math.PI / 2 * 3;
            rad = x / y;
        } else if (x < 0 && y <= 0) {
            add = Math.PI;
            rad = y / x;
        } else if (x <= 0 && y > 0) {
            add = Math.PI / 2;
            rad = x / y;
        } else if (x > 0 && y >= 0) {
            add = 0;
            rad = y / x;
        }
        if (x === 0 || y === 0) {
            rad = 0;
        }
        this.rad = Math.abs(Math.atan(rad)) + add;
        this.dist = dist;
    }
});

/**
 * ボタンオブジェクトのクラス: Button
 * available in only DOMGroup
 *
 * @scope enchant.ui.Button.prototype
 * @deprecated
 * @classes
 */
enchant.ui.Button = enchant.Class.create(enchant.Entity, {
    /**
     * ボタンオブジェクトを作成する。
     * @constructs
     * @extends enchant.Entity
     */
    initialize: function initialize(text, theme, height, width) {
        enchant.Entity.call(this);

        if (enchant.CanvasLayer) {
            this._element = 'div';
        }

        this.width = width || null;
        this.height = height || null;
        this.text = text;
        this.pressed = false;

        // デフォルトのスタイル (テーマで上書き可能)
        var style = this._style;
        style["display"] = "inline-block";
        style["font-size"] = "12px";
        style["height"] = "2em";
        style["line-height"] = "2em";
        style["min-width"] = "2em";
        style["padding"] = "2px 10px";
        style["text-align"] = "center";
        style["font-weight"] = "bold";
        style["border-radius"] = "0.5em";

        // テーマの指定がなければ "dark" を使う
        theme = theme || "dark";

        if (typeof theme === "string") {
            // theme 引数が string なら、その名前のデフォルトテーマを使う
            this.theme = enchant.ui.Button.DEFAULT_THEME[theme];
        } else {
            // theme 引数が object なら、その引数をテーマとして扱う
            this.theme = theme;
        }

        // テーマを適用する
        this._applyTheme(this.theme.normal);

        // タッチしたときの挙動
        this.addEventListener("touchstart", function () {
            this._applyTheme(this.theme.active);
            this.pressed = true;
            this.y++;
        });

        // タッチが離されたときの挙動
        this.addEventListener("touchend", function () {
            this._applyTheme(this.theme.normal);
            this.pressed = false;
            this.y--;
        });
    },
    _applyTheme: function _applyTheme(theme) {
        var style = this._style;
        var css = enchant.ui.Button.theme2css(theme);
        for (var i in css) {
            if (css.hasOwnProperty(i)) {
                style[i] = css[i];
            }
        }
    },
    /**
     * 表示するテキスト
     * @type {String}
     */
    text: {
        get: function get() {
            return this._text;
        },
        set: function set(text) {
            this._text = text;
            if (!enchant.CanvasLayer) {
                this._element.innerHTML = text;
            }
        }
    },
    /**
     * フォントサイズ
     */
    size: {
        get: function get() {
            return this._style.fontSize;
        },
        set: function set(size) {
            this._style.fontSize = size;
        }
    },
    /**
     * フォントの指定
     * @type {String}
     */
    font: {
        get: function get() {
            return this._style.font;
        },
        set: function set(font) {
            this._style.font = font;
        }
    },
    /**
     * Text color settings.
     * CSS 'color' can be set to same format as properties.
     * @type {String}
     */
    color: {
        get: function get() {
            return this._style.color;
        },
        set: function set(color) {
            this._style.color = color;
        }
    },
    cvsRender: function cvsRender() {
        // not available now
    },
    domRender: function domRender() {
        var element = this._domManager.element;
        element.innerHTML = this._text;
        element.style.font = this._font;
        element.style.color = this._color;
        element.style.textAlign = this._textAlign;
    }
});

enchant.ui.Button.theme2css = function (theme) {
    var prefix = '-' + enchant.ENV.VENDOR_PREFIX.toLowerCase() + '-';
    var obj = {};
    var bg = theme.background;
    var bd = theme.border;
    var ts = theme.textShadow;
    var bs = theme.boxShadow;
    if (prefix === '-ms-') {
        obj['background'] = bg.start;
    } else {
        obj['background-image'] = prefix + bg.type + '(' + ['top', bg.start, bg.end] + ')';
    }
    obj['color'] = theme.color;
    obj['border'] = bd.color + ' ' + bd.width + ' ' + bd.type;
    obj['text-shadow'] = ts.offsetX + 'px ' + ts.offsetY + 'px ' + ts.blur + ' ' + ts.color;
    obj['box-shadow'] = bs.offsetX + 'px ' + bs.offsetY + 'px ' + bs.blur + ' ' + bs.color;
    return obj;
};

enchant.ui.Button.DEFAULT_THEME = {
    dark: {
        normal: {
            color: '#fff',
            background: { type: 'linear-gradient', start: '#666', end: '#333' },
            border: { color: '#333', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#666' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(255, 255, 255, 0.3)' }
        },
        active: {
            color: '#ccc',
            background: { type: 'linear-gradient', start: '#333', end: '#000' },
            border: { color: '#333', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#000' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(255, 255, 255, 0.3)' }
        }
    },
    light: {
        normal: {
            color: '#333',
            background: { type: 'linear-gradient', start: '#fff', end: '#ccc' },
            border: { color: '#999', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#fff' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(0, 0, 0, 1)' }
        },
        active: {
            color: '#333',
            background: { type: 'linear-gradient', start: '#ccc', end: '#999' },
            border: { color: '#666', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#ccc' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(255, 255, 255, 0.3)' }
        }
    },
    blue: {
        normal: {
            color: '#fff',
            background: { type: 'linear-gradient', start: '#04f', end: '#04c' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#666' },
            boxShadow: { offsetX: 0, offsetY: 1, blur: 0, color: 'rgba(0, 0, 0, 0.5)' }
        },
        active: {
            color: '#ccc',
            background: { type: 'linear-gradient', start: '#029', end: '#026' },
            border: { color: '#026', width: 1, type: 'solid' },
            textShadow: { offsetX: 0, offsetY: 1, blur: 0, color: '#000' },
            boxShadow: 'none'
        }
    }
};

/**
 * @scope enchant.ui.MutableText.prototype
 * @type {*}
 */
enchant.ui.MutableText = enchant.Class.create(enchant.Sprite, {
    /**
     *
     * @usage
     *     var text = new MutableText(0, 0);
     *     game.text = 'Hello, world!';
     *     game.rootScene.addChild(text);
     *
     * @constructs
     * @param posX
     * @param posY
     * @param width
     */
    initialize: function initialize(x, y, width) {
        enchant.Sprite.call(this, 0, 0);
        this.fontSize = 16;
        this.widthItemNum = 16;
        this.x = x;
        this.y = y;
        this._imageAge = Number.MAX_VALUE;
        this.text = '';
        if (arguments[2]) {
            this.row = Math.floor(arguments[2] / this.fontSize);
        }
    },
    /**
     * ラベルの内容を書き換える関数
     * @param txt
     */
    setText: function setText(txt) {
        var i, x, y, wNum, charCode, charPos;
        this._text = txt;
        var newWidth;
        if (!this.returnLength) {
            this.width = Math.min(this.fontSize * this._text.length, enchant.Game.instance.width);
        } else {
            this.width = Math.min(this.returnLength * this.fontSize, enchant.Game.instance.width);
        }
        this.height = this.fontSize * (Math.ceil(this._text.length / this.row) || 1);
        // if image is to small or was to big for a long time create new image
        if (!this.image || this.width > this.image.width || this.height > this.image.height || this._imageAge > 300) {
            this.image = new enchant.Surface(this.width, this.height);
            this._imageAge = 0;
        } else if (this.width < this.image.width || this.height < this.image.height) {
            this._imageAge++;
        } else {
            this._imageAge = 0;
        }
        this.image.context.clearRect(0, 0, this.width, this.height);
        for (i = 0; i < txt.length; i++) {
            charCode = txt.charCodeAt(i);
            if (charCode >= 32 && charCode <= 127) {
                charPos = charCode - 32;
            } else {
                charPos = 0;
            }
            x = charPos % this.widthItemNum;
            y = charPos / this.widthItemNum | 0;
            this.image.draw(enchant.Game.instance.assets['/images/font0.png'], x * this.fontSize, y * this.fontSize, this.fontSize, this.fontSize, i % this.row * this.fontSize, (i / this.row | 0) * this.fontSize, this.fontSize, this.fontSize);
        }
    },
    /**
     * ラベルの内容
     * @type {String}
     */
    text: {
        get: function get() {
            return this._text;
        },
        set: function set(txt) {
            this.setText(txt);
        }
    },
    /**
     * @type {Number}
     */
    row: {
        get: function get() {
            return this.returnLength || this.width / this.fontSize;
        },
        set: function set(row) {
            this.returnLength = row;
            this.text = this.text;
        }
    }
});

/**
 * @scope enchant.ui.ScoreLabel.prototype
 * @type {*}
 */
enchant.ui.ScoreLabel = enchant.Class.create(enchant.ui.MutableText, {
    /**
     * スコアを表示するラベル。
     * 画像フォントクラス (MutableText) を使って表示する。
     * @constructs
     * @param x
     * @param y
     */
    initialize: function initialize(x, y) {
        enchant.ui.MutableText.call(this, 0, 0);
        switch (arguments.length) {
            case 2:
                this.y = y;
                this.x = x;
                break;
            case 1:
                this.x = x;
                break;
            default:
                break;
        }
        this._score = 0;
        this._current = 0;
        this.easing = 2.5;
        this.text = this.label = 'SCORE:';
        this.addEventListener('enterframe', function () {
            if (this.easing === 0) {
                this.text = this.label + (this._current = this._score);
            } else {
                var dist = this._score - this._current;
                if (0 < dist) {
                    this._current += Math.ceil(dist / this.easing);
                } else if (dist < 0) {
                    this._current += Math.floor(dist / this.easing);
                }
                this.text = this.label + this._current;
            }
        });
    },
    /**
     * スコア
     * @type {Number}
     */
    score: {
        get: function get() {
            return this._score;
        },
        set: function set(newscore) {
            this._score = newscore;
        }
    }
});

/**
 * @type {*}
 * @scope enchant.ui.TimeLabel.prototype
 */
enchant.ui.TimeLabel = enchant.Class.create(enchant.ui.MutableText, {
    /**
     * 残り時間などのタイムを表示するラベル
     * @constructs
     * @param x
     * @param y
     * @param counttype
     */
    initialize: function initialize(x, y, counttype) {
        enchant.ui.MutableText.call(this, 0, 0);
        switch (arguments.length) {
            case 3:
            case 2:
                this.y = y;
                this.x = x;
                break;
            case 1:
                this.x = x;
                break;
            default:
                break;
        }
        this._time = 0;
        this._count = 1; // この数を毎フレーム每に足して上げ下げを制御する
        if (counttype === 'countdown') {
            this._count = -1;
        }
        this.text = this.label = 'TIME:';
        this.addEventListener('enterframe', function () {
            this._time += this._count;
            this.text = this.label + (this._time / enchant.Game.instance.fps).toFixed(2);
        });
    },
    /**
     * 残り時間
     * @type {Number}
     */
    time: {
        get: function get() {
            return Math.floor(this._time / enchant.Game.instance.fps);
        },
        set: function set(newtime) {
            this._time = newtime * enchant.Game.instance.fps;
        }
    }
});

/**
 * @type {*}
 * @scope enchant.ui.LifeLabel.prototype
 */
enchant.ui.LifeLabel = enchant.Class.create(enchant.Group, {
    /**
     * ライフを表示する専用のラベル
     * icon0.png 内のハートの画像を用いる
     * @constructs
     * @param x
     * @param y
     * @param maxlife
     */
    initialize: function initialize(x, y, maxlife) {
        enchant.Group.call(this);
        this.x = x || 0;
        this.y = y || 0;
        this._maxlife = maxlife || 9;
        this._life = 0;
        this.label = new enchant.ui.MutableText(0, 0, 80);
        this.label.text = 'LIFE:';
        this.addChild(this.label);
        this.heart = [];
        for (var i = 0; i < this._maxlife; i++) {
            this.heart[i] = new enchant.Sprite(16, 16);
            this.heart[i].image = enchant.Game.instance.assets['/images/icon0.png'];
            this.heart[i].x = this.label.width + i * 16;
            this.heart[i].y = -3;
            this.heart[i].frame = 10;
            this.addChild(this.heart[i]);
        }
    },
    /**
     * 残りライフの数
     * @type {Number}
     */
    life: {
        get: function get() {
            return this._life;
        },
        set: function set(newlife) {
            this._life = newlife;
            if (this._maxlife < newlife) {
                this._life = this._maxlife;
            }
            for (var i = 0; i < this._maxlife; i++) {
                this.heart[i].visible = i <= newlife - 1;
            }
        }
    }
});

/**
 * @scope enchant.ui.Bar
 * @type {*}
 */
enchant.ui.Bar = enchant.Class.create(enchant.Sprite, {
    /**
     * イージング付きのバークラス
     * @constructs
     * @param x
     * @param y
     */
    initialize: function initialize(x, y) {
        enchant.Sprite.call(this, 1, 16);
        this.image = new enchant.Surface(1, 16); // Null用
        this.image.context.fillColor = 'RGB(0, 0, 256)';
        this.image.context.fillRect(0, 0, 1, 16);
        this._direction = 'right';
        this._origin = 0;
        this._maxvalue = enchant.Game.instance.width;
        this._lastvalue = 0;
        this.value = 0;
        this.easing = 5;
        switch (arguments.length) {
            case 2:
                this.y = y;
                this.x = x;
                this._origin = x;
                break;
            case 1:
                this.x = x;
                this._origin = x;
                break;
            default:
                break;
        }
        this.addEventListener('enterframe', function () {
            if (this.value < 0) {
                this.value = 0;
            }
            this._lastvalue += (this.value - this._lastvalue) / this.easing;
            if (Math.abs(this._lastvalue - this.value) < 1.3) {
                this._lastvalue = this.value;
            }
            this.width = this._lastvalue | 0;
            if (this.width > this._maxvalue) {
                this.width = this._maxvalue;
            }
            if (this._direction === 'left') {
                this._x = this._origin - this.width;
            } else {
                this._x = this._origin;
            }
            this._updateCoordinate();
        });
    },
    /**
     * バーの向き ('right' or 'left')
     * @default 'right'
     * @type {String}
     */
    direction: {
        get: function get() {
            return this._direction;
        },
        set: function set(newdirection) {
            if (newdirection !== 'right' && newdirection !== 'left') {
                // ignore
            } else {
                    this._direction = newdirection;
                }
        }
    },
    /**
     * x 座標
     * @type {Number}
     */
    x: {
        get: function get() {
            return this._origin;
        },
        set: function set(x) {
            this._x = x;
            this._origin = x;
            this._dirty = true;
        }
    },
    /**
     * @type {Number}
     */
    maxvalue: {
        get: function get() {
            return this._maxvalue;
        },
        set: function set(val) {
            this._maxvalue = val;
        }
    }
});

/**
 * @scope enchant.ui.VirtualMap.prototype
 */
enchant.ui.VirtualMap = enchant.Class.create(enchant.Group, {
    /**
     * マップライクな Group
     * addChildで Sprite 等を追加すると、自動的に mx, my プロパティが追加され、
     * VirtualMap内での座標で Sprite を操作できる
     *
     * 使い方
     * //20 x 20 メッシュの縦横320ピクセルの盤を作り、その上に16 x 16の駒を8つ並べる
     * var board = new VirtualMap(20, 20);
     * board.width = 320;
     * board.height = 320;
     * for(var i=0; i<8; i++){
     *     var piece = new Sprite(16, 16);
     *     piece.image = game.assets['icon0.gif'];
     *     board.addChild(piece);
     *     piece.mx = i + 3;
     *     piece.my = 16;
     * }
     * game.rootScene.addChild(board);
     *
     * @param meshWidth
     * @param meshHeight
     * @constructs
     */
    initialize: function initialize(meshWidth, meshHeight) {
        enchant.Group.call(this);
        this.meshWidth = meshWidth || 16;
        this.meshHeight = meshHeight || 16;
    },
    /**
     * VirtualMap にオブジェクトを追加する (自動的にバインドされる)
     * @param obj
     */
    addChild: function addChild(obj) {
        enchant.Group.prototype.addChild.call(this, obj);
        this.bind(obj);
    },
    /**
     * VirtualMap にオブジェクトを追加する
     * reference で指定したオブジェクトより前に追加される (自動的にバインドされる)。
     * @param obj
     * @param reference
     */
    insertBefore: function insertBefore(obj, reference) {
        enchant.Group.prototype.insertBefore.call(this, obj, reference);
        this.bind(obj);
    },
    /**
     * オブジェクトを VirtualMap にバインドする。
     * バインドされたオブジェクトはメッシュ座標 mx, my プロパティを持ち、これを操作することで
     * VirtualMap の中を移動させることができる。
     * @param obj
     */
    bind: function bind(obj) {
        Object.defineProperties(obj, {
            "mx": {
                get: function get() {
                    return Math.floor(this.x / this.parentNode.meshWidth);
                },
                set: function set(arg) {
                    this.x = Math.floor(arg * this.parentNode.meshWidth);
                }
            },
            "my": {
                get: function get() {
                    return Math.floor(this.y / this.parentNode.meshHeight);
                },
                set: function set(arg) {
                    this.y = Math.floor(arg * this.parentNode.meshWidth);
                }
            }
        });
        obj.mx = 0;
        obj.my = 0;
    }
});

function rand(num) {
    return Math.floor(Math.random() * num);
}

},{}],6:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var serviceName = 'Enginner Fighter';
var thisServer = 'http://localhost:3000/';
var socket = io.connect(thisServer);

var screen_width = 640;
var screen_height = 290;
var player02_width = 80;
var player02_height = 80;
var player01_image = thisServer + 'images/player01.gif';
var player02_image = thisServer + 'images/player02.gif';
var bg_battle_image01 = thisServer + 'images/bg_battle01.jpg';

var assets = [player01_image, player02_image, bg_battle_image01];

// const name = window.prompt('ユーザー名を入力してください');

var player01 = void 0;

var playerInfo = {
	id: '',
	loginName: 'イギー',
	x: screen_width / 5,
	y: 220,
	nameX: 0,
	nameY: 0,
	frame: 1,
	settingFile: thisServer + 'data/player01.json',
	img: thisServer + 'images/main.png'
};
var player = null;
var otherPlayers = {};

enchant();

// 繋がった時の処理
socket.on('connect', function () {

	Push.create('Enginner Fighter', {
		body: playerInfo.loginName + 'がログインしました。',
		icon: {
			x32: '' + playerInfo.img
		},
		timeout: 3000
	});

	playerInfo.id = socket.id;

	socket.emit('name', playerInfo);
});

window.onload = function () {

	if (window.GamepadEvent) {
		window.addEventListener('gamepadconnected', function (e) {
			console.log("ゲームパッドが接続されました。");
			console.log(e.gamepad);
		});
	}

	var gamepad = navigator.getGamepads && navigator.getGamepads()[0];

	function errorLog() {
		console.log("Fail!");
		console.log(XMLHttpRequest.status);
		console.log(textStatus);
	}

	var game = new Game(screen_width, screen_height);
	game.preload(assets);
	game.fps = 30;
	game.keybind(32, 'space');
	game.keybind(65, 'a');
	game.onload = function () {

		var root = game.rootScene;
		var input = game.input;
		var player_speed = 15;

		var LifeP1 = new Entity();
		LifeP1.width = screen_width / 2 - 10;
		LifeP1.height = 20;
		LifeP1.x = 10;
		LifeP1.y = 10;
		LifeP1.backgroundColor = '#27e4b2';

		var LifeP2 = new Entity();
		LifeP2.width = -screen_width / 2 + 10;
		LifeP2.height = 20;
		LifeP2.x = screen_width - 10;
		LifeP2.y = 10;
		LifeP2.backgroundColor = '#27e4b2';

		var scene = new Scene();
		var bg = new Sprite(screen_width, screen_height);
		bg.image = game.assets[bg_battle_image01];
		bg.x = 0;
		bg.y = 0;

		socket.on('name', function (otherPlayerInfo) {

			var id = otherPlayerInfo.id;
			var otherPlayer = otherPlayers[id] = new Sprite(64, 64);
			otherPlayer.id = id;
			otherPlayer.x = 0;
			otherPlayer.y = 0;

			otherPlayer.setPosition = function (pos) {
				otherPlayer.x = pos.x;
				otherPlayer.y = pos.y;
				otherPlayer.frame = pos.frame;
			};
			otherPlayer.setPosition.bind(otherPlayerInfo);

			// player01のジャンプ
			socket.on('pushUp01:' + id, function (pos) {
				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;
				console.log('y: ' + player01.y + ', frame: ' + player01.frame);
			});

			// player01の右移動
			socket.on('pushRight01:' + id, function (pos) {
				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;
				console.log('x: ' + player01.x + ', frame: ' + player01.frame);
			});

			// player01のかかみ
			socket.on('pushDown01:' + id, function (pos) {
				player01.x = pos.x;
				player01.y = pos.y;
				player01.frame = pos.frame;
				console.log('y: ' + player01.y + ', frame: ' + player01.frame);
			});

			// player01の左移動
			socket.on('pushLeft01:' + id, function (pos) {

				// let moveEvent = document.createEvent('Event');
				// moveEvent.initEvent('keydown', true, true);
				// moveEvent.keyCode = 37;
				// document.dispatchEvent(moveEvent);

				player01.x = pos.x;
				player01.y = pos.y;
				console.log('x: ' + player01.x + ', frame: ' + player01.frame);

				return;
			});
		});

		var Player01 = Class.create(Sprite, {
			initialize: function initialize(playerInfo) {
				var _this = this;

				var ground = 220;
				var preInput = false;
				var jump = false;

				Sprite.call(this, 64, 64);
				this.playerInfo = playerInfo;
				this.setSettingFile(playerInfo.settingFile);
				this.image = game.assets[player01_image];
				this.scaleX = -1;
				this.x = this.playerInfo.x;
				this.y = this.playerInfo.y;
				// 名前
				this.loginName = new Label(this.playerInfo.loginName);
				this.loginName.width = 100;
				this.loginName.color = 'black';
				this.loginName.x = this.x + 10;
				this.loginName.y = this.y - 15;
				this.frame = 0;
				this.on('enterframe', function () {
					var tempy = _this.y;
					var gravity = 1.0;

					_this.frame = 0;
					_this.scaleX = -1;

					if (input.up && !preInput && !jump) {
						gravity = -12.0;
						jump = true;

						_this.loginName.y = _this.y - 15;

						socket.emit('pushUp01', {
							x: _this.x,
							y: _this.y,
							frame: _this.frame
						});
					}
					if (input.right) {
						_this.x += player_speed;
						_this.loginName.x += player_speed;
						_this.frame = _this.age % 3 + 1;
						socket.emit('pushRight01', {
							x: _this.x,
							y: _this.y,
							nameX: _this.loginName.x,
							nameY: _this.loginName.y,
							frame: _this.frame
						});
					}

					if (input.down) {
						_this.frame = 8;
						socket.emit('pushDown01', {
							x: _this.x,
							y: _this.y,
							frame: _this.frame
						});
					}

					if (input.left) {
						_this.scaleX = 1;
						_this.x -= player_speed;
						_this.loginName.x -= player_speed;
						_this.frame = _this.age % 3 + 1;
						socket.emit('pushLeft01', {
							x: _this.x,
							y: _this.y,
							frame: _this.frame
						});
					}

					_this.y += _this.y - ground + gravity;

					if (_this.y > 220) {
						_this.y = 220;
						jump = false;
					}

					ground = tempy;
					preInput = input.up;

					var left = 0;
					var top = 0;
					var right = screen_width - _this.width;
					var bottom = screen_height - _this.heigh;


					if (_this.x < left || _this.loginName.x < left) {
						_this.x = left;
						_this.loginName.x = left;
					} else if (_this.x > right || _this.loginName.x > right) {
						_this.x = right;
						_this.loginName.x = right;
					}
					if (_this.y < top || _this.loginName.y < top) {
						_this.y = top;
						_this.loginName.y = top;
					} else if (_this.y > bottom || _this.loginName.y > bottom) {
						_this.y = bottom;
						_this.loginName.y = bottom;
					}
				});

				return this;
			},
			setSettingFile: function setSettingFile(settingFile) {
				this.settingFile = settingFile;
				var core = enchant.Core.instance;
				if (core.assets[this.settingFile]) {
					this.setSetting(core.assets[this.settingFile]);
				}
			},
			setSetting: function setSetting(setting) {
				var info = JSON.parse(setting);

				this.width = info.width;
				this.height = info.height;
				this.x = info.x;
				this.y = info.y;
				console.log(this.x);
				this.setImage(info.image);
			},
			attack: function attack() {
				this.frame = this.age % 3 + 4;
				console.log(player01);
			}
		});

		var Attack01 = Class.create(Sprite, {
			initialize: function initialize(x, y) {
				sprite.call(this, 64, 64);
				this.destroy = false;
				this.x = x;
				this.y = y;
				this.on('enterframe', function () {
					if (game.input.a) {
						Attack01Fuc();
					}
					console.log(Attack01);
				});
			}
		});

		var Player03 = function Player03(x, y) {
			_classCallCheck(this, Player03);

			var player03_img = new Image();
			player03_img.src = 'http://localhost:3000/images/bigmonster2.gif';
			this.x = x;
			this.y = y;
			this.width = 254;
			this.height = 254;
			this.image = game.assets[player01_image];
			this.frame = 0;
		};

		var Player02 = Class.create(Sprite, {
			initialize: function initialize(x, y) {
				var _this2 = this;

				Sprite.call(this, 64, 64);
				this.image = game.assets[player02_image];
				var p01_image = this.image;
				this.x = x;
				this.y = y;
				this.scaleX = 1;
				this.frame = 0;
				this.on('enterframe', function () {
					_this2.frame = _this2.direction * 3 + _this2.walk;
				});
			}
		});

		function Attack01Fuc() {
			var attack01 = new Attack01();
			root.addChild(attack01);
			console.log(attack01);
		}

		function topScene() {
			var scene = new Scene();
			var bg = new Sprite(screen_width, screen_height);

			return scene;
		}

		function battleScene() {
			root.addChild(bg);
			root.addChild(LifeP1);
			root.addChild(LifeP2);

			player01 = new Player01(playerInfo);
			root.addChild(player01);
			root.addChild(player01.loginName);

			var player02 = new Player02(screen_width / 1.5, 220);
			root.addChild(player02);

			var player03 = new Player03(screen_width / 2, 100);

			if (player01.x > player02.x) {
				player01.scaleX = 1;
				console.log(player01);
			}
			return scene;
		}

		game.rootScene.on('enterframe', function () {

			topScene();

			if (game.input.space) {
				battleScene();
			}
		});
	};
	game.start();
};

},{}]},{},[2])