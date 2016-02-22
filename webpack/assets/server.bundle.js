require("source-map-support/register");
var Npm = Meteor.__mwrContext__.Npm;
var Assets = Meteor.__mwrContext__.Assets;
delete Meteor.__mwrContext__;
var require = Npm.require;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! regenerator/runtime */1);
	module.exports = __webpack_require__(/*! ../app/server/main */2);


/***/ },
/* 1 */
/*!***********************************!*\
  !*** ../~/regenerator/runtime.js ***!
  \***********************************/
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);


/***/ },
/* 2 */
/*!******************************!*\
  !*** ../app/server/main.jsx ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _BotService = __webpack_require__(/*! ./services/BotService.jsx */ 3);
	
	var _server = __webpack_require__(/*! ./server.jsx */ 17);
	
	var _services = __webpack_require__(/*! ./services.jsx */ 41);
	
	var _facebook = __webpack_require__(/*! ./facebook.jsx */ 42);
	
	var _FriendRepository = __webpack_require__(/*! ./repositories/FriendRepository.jsx */ 43);
	
	var _publish = __webpack_require__(/*! ./publish.jsx */ 45);
	
	var _methods = __webpack_require__(/*! ./methods.jsx */ 46);
	
	var _Marker = __webpack_require__(/*! ../common/models/questions/Marker */ 12);
	
	console.log("we start the server", process.env.GAME_CREATOR_URL);
	
	Meteor.startup(function () {
	    debugger;
	    (0, _services.setup)();
	    (0, _publish.publishCollections)();
	    (0, _methods.setupMeteorMethods)();
	    _BotService.BotService.createBot();
	    _BotService.BotService.observeGameCreation();
	
	    if (process.env.TIMEOUT_BETWEEN_FETCHES == null) {
	        throw new Error("Missing environment variable: TIMEOUT_BETWEEN_FETCHES");
	    }
	
	    Meteor.setInterval(_server.Server.fetchAllBoards.bind(_server.Server), process.env.TIMEOUT_BETWEEN_FETCHES);
	});
	
	Accounts.onLogin(function (attempt) {
	    if (!attempt.allowed) {
	        return;
	    }
	
	    // if (attempt.type === 'resume') {}
	
	    var user = attempt.user;
	
	    _server.Server.fetchData(user._id);
	
	    console.log('Fetching friends for user ' + user._id + '...');
	
	    var fbFriends = _facebook.Facebook.getFriends(user);
	    _FriendRepository.FriendRepository.updateFriends(user._id, fbFriends);
	    _FriendRepository.FriendRepository.addBot(user._id, _BotService.BotService.botAsFriend());
	});

/***/ },
/* 3 */
/*!*********************************************!*\
  !*** ../app/server/services/BotService.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BotService = undefined;
	
	var _Games = __webpack_require__(/*! ./../collections/Games.jsx */ 4);
	
	var _GameStatus = __webpack_require__(/*! ./../../common/models/GameStatus.jsx */ 14);
	
	var _JoinRequests = __webpack_require__(/*! ./../collections/JoinRequests.jsx */ 15);
	
	var _JoinRequestService = __webpack_require__(/*! ./../services/JoinRequestService.jsx */ 16);
	
	var _Questions = __webpack_require__(/*! ./../../common/models/Questions.jsx */ 10);
	
	var _GameBoard = __webpack_require__(/*! ./../../common/models/GameBoard.jsx */ 8);
	
	var _GameBoardRepository = __webpack_require__(/*! ./../repositories/GameBoardRepository.jsx */ 24);
	
	var _GameRepository = __webpack_require__(/*! ./../repositories/GameRepository.jsx */ 22);
	
	var _AnswerVerificationService = __webpack_require__(/*! ./verification/AnswerVerificationService.jsx */ 30);
	
	var _BoardStateService = __webpack_require__(/*! ./BoardStateService.jsx */ 35);
	
	var _GamestatsService = __webpack_require__(/*! ./GamestatsService.jsx */ 36);
	
	var _findIndex = __webpack_require__(/*! ./../../common/helpers/findIndex.jsx */ 39);
	
	var _MultipleChoiceVerificationService = __webpack_require__(/*! ./verification/MultipleChoiceVerificationService.jsx */ 32);
	
	var _TimelineVerificationService = __webpack_require__(/*! ./verification/TimelineVerificationService.jsx */ 31);
	
	var _GeoVerificationService = __webpack_require__(/*! ./verification/GeoVerificationService.jsx */ 34);
	
	var _ReorderVerificationService = __webpack_require__(/*! ./verification/ReorderVerificationService.jsx */ 33);
	
	var _AnswerService = __webpack_require__(/*! ./AnswerService.jsx */ 40);
	
	var _Marker = __webpack_require__(/*! ./../../common/models/questions/Marker */ 12);
	
	var BOT_USERNAME = 'bot';
	
	var BotService = exports.BotService = {
	    bot: function bot() {
	        return BotService.getBot();
	    },
	    getBot: function getBot() {
	        if (!BotService.botCreated()) {
	            this.createBot();
	        }
	
	        return Meteor.users.findOne({ username: BOT_USERNAME });
	    },
	    isBot: function isBot(userId) {
	        return BotService.getBot()._id == userId;
	    },
	    botAsFriend: function botAsFriend() {
	        var bot = this.getBot();
	        return {
	            id: bot._id,
	            name: bot.profile.name,
	            isBot: true
	        };
	    },
	    botCreated: function botCreated() {
	        return Meteor.users.find({ username: BOT_USERNAME }).count() > 0;
	    },
	    createBot: function createBot() {
	        var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	        if (force || !BotService.botCreated()) {
	            console.log("Creating bot...");
	
	            Accounts.createUser({
	                username: BOT_USERNAME,
	                email: "bot@reminisceme.com",
	                password: "123456",
	                profile: {
	                    name: "Anne Droid"
	                }
	            });
	        }
	    },
	    observeGameCreation: function observeGameCreation() {
	        var bot = BotService.bot();
	
	        var query = _Games.Games.find({ $and: [{ $or: [{ player1: bot._id }, { player2: bot._id }] }, { status: { $in: [_GameStatus.GameStatus.Playing, _GameStatus.GameStatus.Creating, _GameStatus.GameStatus.Waiting] } }]
	        });
	
	        var handle = query.observe({
	            added: function added(game) {
	                console.log("Starting to observe game " + game._id);
	
	                BotService.observeGame(game._id, bot._id);
	
	                var request = _JoinRequests.JoinRequests.findOne({ gameId: game._id });
	                if (request) {
	                    _JoinRequestService.JoinRequestService.accept(request._id);
	                    console.log("Bot #1 accepted join request " + request._id + ".");
	                }
	            },
	            removed: function removed(game) {
	                console.log("Game " + game._id + " that bot #1 was playing has been removed.");
	            }
	        });
	    },
	    observeGame: function observeGame(gameId, botId) {
	        var TIMEOUT = 3 * 1000;
	
	        var query = _Games.Games.find(gameId);
	        var game = _Games.Games.findOne(gameId);
	        var botTurn = game.player1 === botId ? 1 : 2;
	        var handle = query.observe({
	            changed: function changed(newGame, oldGame) {
	                if (newGame.playerTurn === botTurn) {
	                    setTimeout(Meteor.bindEnvironment(function () {
	                        BotService.onGameChanged(newGame, handle);
	                    }), TIMEOUT);
	                }
	            }
	        });
	    },
	    onGameChanged: function onGameChanged(game, handle) {
	        if (game.status === _GameStatus.GameStatus.Ended || game.status === _GameStatus.GameStatus.Waiting) {
	            return;
	        }
	
	        var result = BotService.playTurn(game);
	        console.log("Results for bot turn:", result);
	
	        BotService.drawBoardState(_Games.Games.findOne(game._id));
	
	        if (result.win || result.draw) {
	            handle.stop();
	            console.log("Game ended. Won: " + result.win + ". Draw: " + result.draw + ".");
	        }
	    },
	    playTurn: function playTurn(game) {
	        if (game.getStatus() !== _GameStatus.GameStatus.Playing) {
	            return;
	        }
	
	        var player = game.getCurrentPlayer();
	        var gameBoard = game.getCurrentBoard();
	        var firstTurn = game.getCurrentPlayerAvailableMoves().length == 9;
	
	        var method = firstTurn ? 'pickRandom' : 'pickTile';
	        var tile = BotService[method](game, gameBoard);
	        var successrate = 66;
	
	        if (!tile) {
	            throw new Meteor.Error(500, "Bot could't find a tile to play on.");
	        }
	
	        var answers = _.map(tile.getQuestions(), function (q) {
	            switch (q.kind) {
	                case _Questions.Kind.Timeline:
	                    return new _TimelineVerificationService.TimelineAnswer(new _TimelineVerificationService.TimelineData(_.random(0, 100) < successrate ? q.answer : q.default));
	                    break;
	                case _Questions.Kind.MultipleChoice:
	                    return new _MultipleChoiceVerificationService.MultipleChoiceAnswer(new _MultipleChoiceVerificationService.MultipleChoiceData(_.random(0, 100) < successrate ? q.answer : q.answer + 1 % 4));
	                    break;
	                case _Questions.Kind.Geolocation:
	                    var geoAnswer = new _GeoVerificationService.GeoAnswer(
	                    //new GeoData(new Marker(0, 0))
	                    new _GeoVerificationService.GeoData(_.random(0, 100) < successrate ? q.getAnswer() : new _Marker.Marker(0, 0)));
	                    return geoAnswer;
	                    break;
	                case _Questions.Kind.Order:
	                    var correctOrder = new _ReorderVerificationService.OrderData([new _ReorderVerificationService.OrderItem(q.answer[0], ""), new _ReorderVerificationService.OrderItem(q.answer[1], ""), new _ReorderVerificationService.OrderItem(q.answer[2], ""), new _ReorderVerificationService.OrderItem(q.answer[3], "")]);
	                    var incorrectOrder = new _ReorderVerificationService.OrderData([new _ReorderVerificationService.OrderItem(0, ""), new _ReorderVerificationService.OrderItem(0, ""), new _ReorderVerificationService.OrderItem(0, ""), new _ReorderVerificationService.OrderItem(0, "")]);
	                    return new _ReorderVerificationService.OrderAnswer(0, _.random(0, 100) < successrate ? correctOrder : incorrectOrder);
	                    break;
	                default:
	                    throw new Meteor.Error(500, "Unknown Question Kind " + q.kind + " for Bot");
	            }
	        });
	
	        return _AnswerService.AnswerService.post(player, game._id, tile._id, answers);
	    },
	    pickTile: function pickTile(game, gameBoard) {
	        var tiles = gameBoard.getTiles();
	        var result = BotService.minmax(game, game.getPlayerTurn(), 0);
	
	        if (result.move == null) {
	            return null;
	        }
	
	        return tiles[result.move.row * 3 + result.move.column];
	    },
	    pickRandom: function pickRandom(game, gameBoard) {
	        var tiles = gameBoard.getTiles();
	
	        var indexTiles = _.zip(_.range(9), _.flatten(game.boardState));
	
	        var potentialTiles = _.filter(indexTiles, function (t) {
	            return t[1].player === 0;
	        });
	        if (potentialTiles.length > 0) {
	            return tiles[_.sample(potentialTiles)[0]];
	        } else {
	            return _.sample(tiles);
	        }
	    },
	    minmax: function minmax(game, player, depth) {
	        var score = BotService.score(game.boardState, player, depth);
	        if (score !== 0) {
	            return { move: null, score: score };
	        }
	        depth += 1;
	        var scores = [];
	        var moves = [];
	
	        var possibilities = BotService.getAvailableMoves(game, game.getPlayerTurn());
	        if (_.isEmpty(possibilities)) {
	            return { move: null, score: 0 };
	        }
	        _.forEach(possibilities, function (m) {
	            var updatedGame = game.createCopy();
	            BotService.makeMove(updatedGame, m, game.getPlayerTurn());
	            scores.push(BotService.minmax(updatedGame, player, depth).score);
	            moves.push(m);
	        });
	
	        if (game.getPlayerTurn() === player) {
	            var maxScoreIndex = _.indexOf(scores, _.max(scores));
	            var move = moves[maxScoreIndex];
	            return { move: move, score: scores[maxScoreIndex] };
	        } else {
	            var minScoreIndex = _.indexOf(scores, _.min(scores));
	            var move = moves[minScoreIndex];
	            return { move: move, score: scores[minScoreIndex] };
	        }
	    },
	    makeMove: function makeMove(game, move, player) {
	        game.setPlayer1AvailableMoves(_.filter(game.getPlayer1AvailableMoves(), function (m) {
	            return m.row !== move.row || m.column !== move.column;
	        }));
	        game.setPlayer2AvailableMoves(_.filter(game.getPlayer2AvailableMoves(), function (m) {
	            return m.row !== move.row || m.column !== move.column;
	        }));
	        game.boardState[move.row][move.column] = { player: player, score: 3 };
	        game.setPlayerTurn(player % 2 + 1);
	    },
	    score: function score(boardState, currentPlayer, depth) {
	        var boardStateService = new _BoardStateService.BoardStateService(boardState, currentPlayer);
	
	        if (boardStateService.playerWins()) {
	            return 10 - depth;
	        }
	
	        if (boardStateService.playerWins(currentPlayer % 2 + 1)) {
	            return depth - 10;
	        }
	
	        return 0;
	    },
	    getAvailableMoves: function getAvailableMoves(game, currentPlayer) {
	        if (currentPlayer == 1) {
	            return game.getPlayer1AvailableMoves();
	        } else {
	            return game.getPlayer2AvailableMoves();
	        }
	    },
	    drawBoardState: function drawBoardState(game) {
	        var bs = game.boardState;
	        for (var i = 0; i < bs.length; i++) {
	            var line = _.map(bs[i], function (s) {
	                if (s.player === 1) {
	                    return s.score === 0 ? '-' : "x";
	                } else if (s.player === 2) {
	                    return s.score === 0 ? '-' : "o";
	                } else {
	                    return " ";
	                }
	            });
	            console.log('|' + line.join('|') + '|');
	        }
	    }
	};

/***/ },
/* 4 */
/*!*******************************************!*\
  !*** ../app/server/collections/Games.jsx ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Game = exports.GameProps = exports.Games = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _assignProps = __webpack_require__(/*! ./../../common/helpers/assignProps.jsx */ 5);
	
	var _GameBoards = __webpack_require__(/*! ./GameBoards.jsx */ 7);
	
	var _GameBoard = __webpack_require__(/*! ./../../common/models/GameBoard.jsx */ 8);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Games = exports.Games = new Mongo.Collection("games", {
	    transform: function transform(doc) {
	        return new Game(doc);
	    }
	});
	
	var GameProps = exports.GameProps = ['_id', 'player1', 'player2', 'player1Board', 'player2Board', 'status', 'playerTurn', 'player1Scores', 'player2Scores', 'boardState', 'player1AvailableMoves', 'player2AvailableMoves', 'wonBy', 'creationTime'];
	
	var Game = exports.Game = function () {
	    function Game(props) {
	        _classCallCheck(this, Game);
	
	        var diff = _.difference(Object.keys(props), GameProps);
	        if (!_.isEmpty(diff)) {
	            throw new Meteor.Error(500, "Game constructor with unusable parameters " + diff);
	        }
	        (0, _assignProps.assignProps)(this, GameProps, props);
	    }
	
	    _createClass(Game, [{
	        key: 'getId',
	        value: function getId() {
	            return this._id;
	        }
	    }, {
	        key: 'getPlayer1',
	        value: function getPlayer1() {
	            return this.player1;
	        }
	    }, {
	        key: 'getPlayer2',
	        value: function getPlayer2() {
	            return this.player2;
	        }
	    }, {
	        key: 'getPlayer1Board',
	        value: function getPlayer1Board() {
	            if (typeof this.player1Board === 'string') {
	                this.player1Board = _GameBoards.GameBoards.findOne(this.player1Board);
	            }
	
	            var board = this.player1Board;
	
	            if (!(board instanceof _GameBoard.GameBoard)) {
	                return _GameBoard.GameBoard.fromRaw(board);
	            }
	
	            return board;
	        }
	    }, {
	        key: 'setPlayer1Board',
	        value: function setPlayer1Board(value) {
	            this.player1Board = value;
	        }
	    }, {
	        key: 'getPlayer2Board',
	        value: function getPlayer2Board() {
	            if (typeof this.player2Board === 'string') {
	                this.player2Board = _GameBoards.GameBoards.findOne(this.player2Board);
	            }
	
	            var board = this.player2Board;
	
	            if (!(board instanceof _GameBoard.GameBoard)) {
	                return _GameBoard.GameBoard.fromRaw(board);
	            }
	
	            return board;
	        }
	    }, {
	        key: 'getCurrentBoard',
	        value: function getCurrentBoard() {
	            return this['getPlayer' + this.getPlayerTurn() + 'Board']();
	        }
	    }, {
	        key: 'setPlayer2Board',
	        value: function setPlayer2Board(value) {
	            this.player2Board = value;
	        }
	    }, {
	        key: 'getBoardState',
	        value: function getBoardState() {
	            return this.boardState;
	        }
	    }, {
	        key: 'getStatus',
	        value: function getStatus() {
	            return this.status;
	        }
	    }, {
	        key: 'setStatus',
	        value: function setStatus(value) {
	            this.status = value;
	        }
	    }, {
	        key: 'getPlayerTurn',
	        value: function getPlayerTurn() {
	            return this.playerTurn;
	        }
	    }, {
	        key: 'setPlayerTurn',
	        value: function setPlayerTurn(value) {
	            if (value < 1 || value > 2) {
	                throw new Meteor.Error("There can only be 2 players per game, turn value " + value);
	            }
	            this.playerTurn = value;
	        }
	    }, {
	        key: 'nextTurn',
	        value: function nextTurn() {
	            this.setPlayerTurn(this.getPlayerTurn() === 1 ? 2 : 1);
	        }
	    }, {
	        key: 'getCurrentPlayer',
	        value: function getCurrentPlayer() {
	            if (this.playerTurn === 1) {
	                return this.player1;
	            }
	            return this.player2;
	        }
	    }, {
	        key: 'getPlayer1Scores',
	        value: function getPlayer1Scores() {
	            return this.player1Scores;
	        }
	    }, {
	        key: 'getPlayer2Scores',
	        value: function getPlayer2Scores() {
	            return this.player2Scores;
	        }
	    }, {
	        key: 'incrementCurrentPlayerScore',
	        value: function incrementCurrentPlayerScore(value) {
	            this['player' + this.getPlayerTurn() + 'Scores'] += value;
	        }
	    }, {
	        key: 'getOpponent',
	        value: function getOpponent() {
	            var myId = Meteor.userId();
	
	            if (this.player1 === myId) {
	                return this.player2;
	            }
	            return this.player1;
	        }
	    }, {
	        key: 'getOpponentForUser',
	        value: function getOpponentForUser(userId) {
	            if (this.player1 === userId) {
	                return this.player2;
	            }
	            return this.player1;
	        }
	    }, {
	        key: 'getPlayer1AvailableMoves',
	        value: function getPlayer1AvailableMoves() {
	            return this.player1AvailableMoves;
	        }
	    }, {
	        key: 'setPlayer1AvailableMoves',
	        value: function setPlayer1AvailableMoves(value) {
	            this.player1AvailableMoves = value;
	        }
	    }, {
	        key: 'getPlayer2AvailableMoves',
	        value: function getPlayer2AvailableMoves() {
	            return this.player2AvailableMoves;
	        }
	    }, {
	        key: 'setPlayer2AvailableMoves',
	        value: function setPlayer2AvailableMoves(value) {
	            this.player2AvailableMoves = value;
	        }
	    }, {
	        key: 'getCurrentPlayerAvailableMoves',
	        value: function getCurrentPlayerAvailableMoves() {
	            return this['player' + this.getPlayerTurn() + 'AvailableMoves'];
	        }
	    }, {
	        key: 'setCurrentPlayerAvailableMoves',
	        value: function setCurrentPlayerAvailableMoves(value) {
	            this['player' + this.getPlayerTurn() + 'AvailableMoves'] = value;
	        }
	    }, {
	        key: 'removeCurrentPlayerAvailableMove',
	        value: function removeCurrentPlayerAvailableMove(move) {
	            this.setCurrentPlayerAvailableMoves(_.filter(this.getCurrentPlayerAvailableMoves(), function (m) {
	                return m.row !== move.row || m.column !== move.column;
	            }));
	        }
	    }, {
	        key: 'getWonBy',
	        value: function getWonBy() {
	            return this.wonBy;
	        }
	    }, {
	        key: 'setWonBy',
	        value: function setWonBy(value) {
	            this.wonBy = value;
	        }
	    }, {
	        key: 'getCreationTime',
	        value: function getCreationTime() {
	            return this.creationTime;
	        }
	    }, {
	        key: 'setCreationTime',
	        value: function setCreationTime(time) {
	            this.creationTime = time;
	        }
	    }, {
	        key: 'createCopy',
	        value: function createCopy() {
	            var newBoardState = GameBoardClone(this.getBoardState());
	            //for (var i = 0; i < this.getBoardState().length; i++){
	            //    newBoardState.push([]);
	            //    for (var j = 0; j < this.getBoardState()[i].length; j++){
	            //        newBoardState[i][j] = this.getBoardState()[i][j].slice(0);
	            //    }
	            //}
	            return new Game({
	                _id: this.getId(),
	                player1: this.getPlayer1(),
	                player2: this.getPlayer2(),
	                player1Board: this.getPlayer1Board(),
	                player2Board: this.getPlayer2Board(),
	                status: this.getStatus(),
	                playerTurn: this.getPlayerTurn(),
	                player1Scores: this.getPlayer1Scores(),
	                player2Scores: this.getPlayer2Scores(),
	                boardState: newBoardState,
	                player1AvailableMoves: this.getPlayer1AvailableMoves(),
	                player2AvailableMoves: this.getPlayer2AvailableMoves(),
	                creationTime: this.getCreationTime()
	            });
	        }
	    }]);
	
	    return Game;
	}();
	
	;
	
	Game.fromRaw = function (game) {
	    return new Game(game);
	};
	
	var GameBoardClone = function GameBoardClone(existingArray) {
	    var newObj = existingArray instanceof Array ? [] : {};
	    for (var i in existingArray) {
	        if (i == 'clone') continue;
	        if (existingArray[i] && _typeof(existingArray[i]) == "object") {
	            newObj[i] = GameBoardClone(existingArray[i]);
	        } else {
	            newObj[i] = existingArray[i];
	        }
	    }
	    return newObj;
	};

/***/ },
/* 5 */
/*!*********************************************!*\
  !*** ../app/common/helpers/assignProps.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.assignProps = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _capitalize = __webpack_require__(/*! ./capitalize.jsx */ 6);
	
	var assignProps = exports.assignProps = function assignProps(obj, propNames, props) {
	    if (props == null || (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
	        return;
	    }
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var propName = _step.value;
	
	            if (!props.hasOwnProperty(propName)) {
	                continue;
	            }
	
	            var methodName = 'set' + (0, _capitalize.capitalize)(propName);
	            if (typeof obj[methodName] === 'function') {
	                obj[methodName](props[propName]);
	            } else {
	                obj[propName] = props[propName];
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};

/***/ },
/* 6 */
/*!********************************************!*\
  !*** ../app/common/helpers/capitalize.jsx ***!
  \********************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var capitalize = exports.capitalize = function capitalize(str) {
	    return str.charAt(0).toUpperCase() + str.substring(1);
	};

/***/ },
/* 7 */
/*!************************************************!*\
  !*** ../app/server/collections/GameBoards.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameBoards = undefined;
	
	var _GameBoard = __webpack_require__(/*! ./../../common/models/GameBoard.jsx */ 8);
	
	var GameBoards = exports.GameBoards = new Mongo.Collection('gameBoards', {
	    transform: function transform(doc) {
	        return _GameBoard.GameBoard.fromRaw(doc);
	    }
	});

/***/ },
/* 8 */
/*!******************************************!*\
  !*** ../app/common/models/GameBoard.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GameBoard = exports.GameBoardProps = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Tile = __webpack_require__(/*! ./Tile.jsx */ 9);
	
	var _assignProps = __webpack_require__(/*! ./../../common/helpers/assignProps.jsx */ 5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var cache = {};
	
	var lazy = function lazy(key, obj, prop, compute) {
	  if (cache[key] === undefined) {
	    cache[key] = compute(obj[prop]);
	  }
	  return cache[key];
	};
	
	var GameBoardProps = exports.GameBoardProps = ['_id', 'userId', 'tiles'];
	
	var GameBoard = exports.GameBoard = function () {
	  function GameBoard(props) {
	    _classCallCheck(this, GameBoard);
	
	    (0, _assignProps.assignProps)(this, GameBoardProps, props);
	  }
	
	  _createClass(GameBoard, [{
	    key: 'getId',
	    value: function getId() {
	      return this._id;
	    }
	  }, {
	    key: 'getUserId',
	    value: function getUserId() {
	      return this.userId;
	    }
	  }, {
	    key: 'getTiles',
	    value: function getTiles() {
	      return this.tiles;
	    }
	  }, {
	    key: 'getTileById',
	    value: function getTileById(tileId) {
	      return _.find(this.getTiles(), function (tile) {
	        return tile._id === tileId;
	      });
	    }
	  }], [{
	    key: 'fromRaw',
	    value: function fromRaw(userId, data) {
	      if ((typeof userId === 'undefined' ? 'undefined' : _typeof(userId)) === 'object') {
	        data = userId;
	        userId = data.userId;
	      }
	
	      var tiles = _.map(data.tiles, _Tile.Tile.fromRaw.bind(_Tile.Tile));
	
	      return new GameBoard({ userId: userId, tiles: tiles });
	    }
	  }]);
	
	  return GameBoard;
	}();

/***/ },
/* 9 */
/*!*************************************!*\
  !*** ../app/common/models/Tile.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tile = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Questions = __webpack_require__(/*! ./Questions.jsx */ 10);
	
	var _generateId = __webpack_require__(/*! ./../../common/helpers/generateId.jsx */ 13);
	
	var _assignProps = __webpack_require__(/*! ./../../common/helpers/assignProps.jsx */ 5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TileProps = ['_id', 'type', 'question1', 'question2', 'question3', 'score', 'answered', 'disabled'];
	
	var Tile = exports.Tile = function () {
	    function Tile(props) {
	        _classCallCheck(this, Tile);
	
	        (0, _assignProps.assignProps)(this, TileProps, props);
	    }
	
	    _createClass(Tile, [{
	        key: 'getId',
	        value: function getId() {
	            return this._id;
	        }
	    }, {
	        key: 'getType',
	        value: function getType() {
	            return this.type;
	        }
	    }, {
	        key: 'getScore',
	        value: function getScore() {
	            return this.score || {
	                me: 0,
	                them: 0
	            };
	        }
	    }, {
	        key: 'getQuestion1',
	        value: function getQuestion1() {
	            return this.question1;
	        }
	    }, {
	        key: 'getQuestion2',
	        value: function getQuestion2() {
	            return this.question2;
	        }
	    }, {
	        key: 'getQuestion3',
	        value: function getQuestion3() {
	            return this.question3;
	        }
	
	        /**
	         * return the array of questions for the tile
	         * @return {[Question]}
	         */
	
	    }, {
	        key: 'getQuestions',
	        value: function getQuestions() {
	            return [this.question1, this.question2, this.question3];
	        }
	    }, {
	        key: 'setDisabled',
	        value: function setDisabled(value) {
	            this.disabled = value;
	        }
	    }, {
	        key: 'getIsDisabled',
	        value: function getIsDisabled() {
	            return this.disabled;
	        }
	    }, {
	        key: 'isDisabled',
	        value: function isDisabled() {
	            return this.disabled;
	        }
	    }, {
	        key: 'getIsAnswered',
	        value: function getIsAnswered() {
	            return this.answered;
	        }
	    }, {
	        key: 'isAnswered',
	        value: function isAnswered() {
	            return this.answered;
	        }
	    }, {
	        key: 'setAnswered',
	        value: function setAnswered(value) {
	            this.answered = value;
	        }
	    }], [{
	        key: 'fromRaw',
	        value: function fromRaw(tile) {
	            var question1 = _Questions.Question.fromRaw(tile, tile.question1);
	            var question2 = _Questions.Question.fromRaw(tile, tile.question2);
	            var question3 = _Questions.Question.fromRaw(tile, tile.question3);
	            return new Tile({
	                _id: tile._id || (0, _generateId.generateId)(),
	                type: tile.type,
	                question1: question1,
	                question2: question2,
	                question3: question3,
	                score: 0,
	                answered: !!tile.answered,
	                disabled: !!tile.disabled
	            });
	        }
	    }]);
	
	    return Tile;
	}();
	
	;

/***/ },
/* 10 */
/*!******************************************!*\
  !*** ../app/common/models/Questions.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Kind = exports.Question = exports.GeoQuestion = exports.TimelineQuestion = exports.TimelineUnit = exports.MultipleChoiceQuestion = exports.Choice = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _assignProps = __webpack_require__(/*! ./../../common/helpers/assignProps.jsx */ 5);
	
	var _OrderQuestion = __webpack_require__(/*! ./questions/OrderQuestion */ 11);
	
	var _Marker = __webpack_require__(/*! ./questions/Marker */ 12);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Subject = {
	  fromRaw: function fromRaw(doc) {
	    return doc;
	  }
	};
	
	var ChoiceProps = ['text', 'imageUrl', 'fbId', 'pageId'];
	
	var Choice = exports.Choice = function () {
	  function Choice(props) {
	    _classCallCheck(this, Choice);
	
	    (0, _assignProps.assignProps)(this, ChoiceProps, props);
	  }
	
	  _createClass(Choice, [{
	    key: 'getText',
	    value: function getText() {
	      return this.text;
	    }
	  }, {
	    key: 'getImageUrl',
	    value: function getImageUrl() {
	      return this.imageUrl;
	    }
	  }, {
	    key: 'getFbId',
	    value: function getFbId() {
	      return this.fbId;
	    }
	  }, {
	    key: 'getPageId',
	    value: function getPageId() {
	      return this.pageId;
	    }
	  }], [{
	    key: 'fromRaw',
	    value: function fromRaw(data) {
	      return new Choice({
	        text: data.text || data.name,
	        fbId: data.fbId || data.fb_id,
	        pageId: data.pageId || data.page_id,
	        imageUrl: data.imageUrl || data.image_url
	      });
	    }
	  }]);
	
	  return Choice;
	}();
	
	var MultipleChoiceQuestionProps = ['_id', 'subject', 'choices', 'answer', 'type', 'kind'];
	
	var MultipleChoiceQuestion = exports.MultipleChoiceQuestion = function () {
	  function MultipleChoiceQuestion(props) {
	    _classCallCheck(this, MultipleChoiceQuestion);
	
	    (0, _assignProps.assignProps)(this, MultipleChoiceQuestionProps, props);
	  }
	
	  _createClass(MultipleChoiceQuestion, [{
	    key: 'getId',
	    value: function getId() {
	      return this._id;
	    }
	  }, {
	    key: 'getSubject',
	    value: function getSubject() {
	      return this.subject;
	    }
	  }, {
	    key: 'getType',
	    value: function getType() {
	      return this.type;
	    }
	  }, {
	    key: 'getKind',
	    value: function getKind() {
	      return this.kind;
	    }
	  }, {
	    key: 'getChoices',
	    value: function getChoices() {
	      return this.choices;
	    }
	  }, {
	    key: 'getAnswer',
	    value: function getAnswer() {
	      if (!Meteor.isServer) {
	        throw new Error('Well tried, there\'s nothing to see here. See for yourself: ' + this.answer);
	      }
	
	      return this.answer;
	    }
	  }], [{
	    key: 'fromRaw',
	    value: function fromRaw(data) {
	      data.choices = _.map(data.choices, function (c) {
	        return Choice.fromRaw(c);
	      });
	      data.subject = Subject.fromRaw(data.subject);
	      return new MultipleChoiceQuestion(data);
	    }
	  }]);
	
	  return MultipleChoiceQuestion;
	}();
	
	var TimelineUnit = exports.TimelineUnit = {
	  Day: 'Day',
	  Week: 'Week',
	  Month: 'Month',
	  Year: 'Year'
	};
	
	var TimelineQuestionProps = ['_id', 'subject', 'min', 'max', 'default', 'unit', 'step', 'threshold', 'answer', 'type', 'kind'];
	
	var TimelineQuestion = exports.TimelineQuestion = function () {
	  function TimelineQuestion(props) {
	    _classCallCheck(this, TimelineQuestion);
	
	    (0, _assignProps.assignProps)(this, TimelineQuestionProps, props);
	  }
	
	  _createClass(TimelineQuestion, [{
	    key: 'getId',
	    value: function getId() {
	      return this._id;
	    }
	  }, {
	    key: 'getType',
	    value: function getType() {
	      return this.type;
	    }
	  }, {
	    key: 'getKind',
	    value: function getKind() {
	      return this.kind;
	    }
	  }, {
	    key: 'getSubject',
	    value: function getSubject() {
	      return this.subject;
	    }
	  }, {
	    key: 'getMin',
	    value: function getMin() {
	      return this.min;
	    }
	  }, {
	    key: 'getMax',
	    value: function getMax() {
	      return this.max;
	    }
	  }, {
	    key: 'getStep',
	    value: function getStep() {
	      return this.step;
	    }
	  }, {
	    key: 'getUnit',
	    value: function getUnit() {
	      return this.unit;
	    }
	  }, {
	    key: 'getThreshold',
	    value: function getThreshold() {
	      return this.threshold;
	    }
	  }, {
	    key: 'getDefault',
	    value: function getDefault() {
	      return this.default;
	    }
	  }, {
	    key: 'getAnswer',
	    value: function getAnswer() {
	      if (!Meteor.isServer) {
	        throw new Error('Well tried, there\'s nothing to see here. See for yourself: ' + this.answer);
	      }
	
	      return this.answer;
	    }
	  }], [{
	    key: 'fromRaw',
	    value: function fromRaw(data) {
	      data.subject = Subject.fromRaw(data.subject);
	      return new TimelineQuestion(data);
	    }
	  }]);
	
	  return TimelineQuestion;
	}();
	
	;
	
	var GeoQuestionProps = ['_id', 'subject', 'range', 'defaultLocation', 'answer', 'type', 'kind'];
	
	var GeoQuestion = exports.GeoQuestion = function () {
	  function GeoQuestion(props) {
	    _classCallCheck(this, GeoQuestion);
	
	    (0, _assignProps.assignProps)(this, GeoQuestionProps, props);
	  }
	
	  _createClass(GeoQuestion, [{
	    key: 'getId',
	    value: function getId() {
	      return this._id;
	    }
	
	    /**
	     *
	     * @returns {Subject}
	     */
	
	  }, {
	    key: 'getSubject',
	    value: function getSubject() {
	      return this.subject;
	    }
	  }, {
	    key: 'getType',
	    value: function getType() {
	      return this.type;
	    }
	
	    /**
	     * The allowed distance which is still considered correct
	     * @returns {number}
	     */
	
	  }, {
	    key: 'getRange',
	    value: function getRange() {
	      return this.range;
	    }
	
	    /**
	     *
	     * @returns {Marker}
	     */
	
	  }, {
	    key: 'getDefaultLocation',
	    value: function getDefaultLocation() {
	      return this.defaultLocation;
	    }
	  }, {
	    key: 'getKind',
	    value: function getKind() {
	      return this.kind;
	    }
	
	    //TODO: Improve the creation through props to properly show types, create a constructor
	    /**
	     * @return {Marker}
	     */
	
	  }, {
	    key: 'getAnswer',
	    value: function getAnswer() {
	      if (!Meteor.isServer) {
	        throw new Error('Well tried, there\'s nothing to see here. See for yourself: ' + this.answer);
	      }
	      return new _Marker.Marker(this.answer.latitude, this.answer.longitude);
	    }
	  }], [{
	    key: 'fromRaw',
	    value: function fromRaw(raw) {
	      return new GeoQuestion(raw);
	    }
	  }]);
	
	  return GeoQuestion;
	}();
	
	;
	
	var Question = exports.Question = function () {
	  function Question() {
	    _classCallCheck(this, Question);
	  }
	
	  _createClass(Question, null, [{
	    key: 'getQuestionFromType',
	    value: function getQuestionFromType(kind) {
	      switch (kind) {
	        case Kind.MultipleChoice:
	          return MultipleChoiceQuestion;
	        case Kind.Timeline:
	          return TimelineQuestion;
	        case Kind.Order:
	          return _OrderQuestion.OrderQuestion;
	        case Kind.Geolocation:
	          return GeoQuestion;
	        default:
	          Meteor.Error(404, 'Unknown question kind: ' + kind);
	      }
	    }
	  }, {
	    key: 'fromRaw',
	    value: function fromRaw(tile, data) {
	      var kind = data.kind;
	      if (kind == null) {
	        throw new Meteor.Error(500, 'Unknown question kind: ' + data.kind);
	      }
	
	      var Constructor = Question.getQuestionFromType(kind);
	      if (Constructor == null) {
	        throw new Meteor.Error(500, 'Cannot find constructor for question of kind ' + kind);
	      }
	
	      return Constructor.fromRaw(data);
	    }
	  }]);
	
	  return Question;
	}();
	
	;
	
	var Kind = exports.Kind = {
	  MultipleChoice: 'MultipleChoice',
	  Timeline: 'Timeline',
	  Geolocation: 'Geolocation',
	  Order: 'Order'
	};

/***/ },
/* 11 */
/*!*******************************************************!*\
  !*** ../app/common/models/questions/OrderQuestion.ts ***!
  \*******************************************************/
/***/ function(module, exports) {

	//import {assignProps} from './../../../common/helpers/assignProps.jsx';
	/// <reference path="../../../../typings/main.d.ts" />
	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OrderQuestionProps = ['_id', 'subject', 'choices', 'answer', 'type', 'kind', 'items'];
	
	var OrderQuestion = function () {
	    function OrderQuestion(id, subject, choices, answer, type, kind, items) {
	        _classCallCheck(this, OrderQuestion);
	
	        this.id = id;
	        this.subject = subject;
	        this.choices = choices;
	        this.answer = answer;
	        this.type = type;
	        this.kind = kind;
	        this.items = items;
	        this._id = id;
	        this._subject = subject;
	        this._choices = choices;
	        this._answer = answer;
	        this._type = type;
	        this._kind = kind;
	        this._items = items;
	    }
	    /**
	     * retunrs the Question id
	     * @returns {string}
	     */
	
	
	    _createClass(OrderQuestion, [{
	        key: 'getId',
	        value: function getId() {
	            return this._id;
	        }
	        /**
	         *
	         * @returns {Subject}
	         */
	
	    }, {
	        key: 'getSubject',
	        value: function getSubject() {
	            return this.subject;
	        }
	    }, {
	        key: 'getType',
	        value: function getType() {
	            return this.type;
	        }
	    }, {
	        key: 'getItems',
	        value: function getItems() {
	            return this.items;
	        }
	        /**
	         * returns an array of SubjectWithIds
	         * @returns {[SubjectWithId]}
	         */
	
	    }, {
	        key: 'getChoices',
	        value: function getChoices() {
	            return this.choices;
	        }
	    }, {
	        key: 'setChoices',
	        value: function setChoices(value) {
	            this._choices = value;
	            this.items = _.map(value, function (c) {
	                switch (c.subject.type) {
	                    case SubjectType.Page:
	                        return { id: c.uId, text: c.subject.name, subject: c.subject };
	                    case SubjectType.TextPost:
	                        return { id: c.uId, text: c.subject.text, subject: c.subject };
	                    case SubjectType.ImagePost:
	                        return { id: c.uId, text: c.subject.text, subject: c.subject };
	                    case SubjectType.VideoPost:
	                        return { id: c.uId, text: c.subject.text, subject: c.subject };
	                    case SubjectType.LinkPost:
	                        return { id: c.uId, text: c.subject.text, subject: c.subject };
	                    case SubjectType.Comment:
	                        return { id: c.uId, text: c.subject.comment, subject: c.subject };
	                    default:
	                        console.error("Ordering subject type not defined: " + c.type);
	                        throw new Meteor.Error(500, "Ordering subject type not defined: " + c.type);
	                }
	            });
	        }
	    }, {
	        key: 'getKind',
	        value: function getKind() {
	            return this.kind;
	        }
	        /**
	         * returns the correct id of the answers
	         * @returns {[number]}
	         */
	
	    }, {
	        key: 'getAnswer',
	        value: function getAnswer() {
	            if (!Meteor.isServer) {
	                throw new Error('Well tried, there\'s nothing to see here. See for yourself: ' + this.answer);
	            }
	            return this.answer;
	        }
	    }], [{
	        key: 'fromRaw',
	        value: function fromRaw(raw) {
	            return new OrderQuestion(raw._id, raw.subject, raw.choices, raw.answer, raw.type, raw.kind, raw.items);
	        }
	    }]);
	
	    return OrderQuestion;
	}();
	
	exports.OrderQuestion = OrderQuestion;
	;

/***/ },
/* 12 */
/*!************************************************!*\
  !*** ../app/common/models/questions/Marker.ts ***!
  \************************************************/
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Marker = function () {
	    /**
	     *
	     * @param {number} latitude
	     * @param {number} longitude
	     */
	
	    function Marker(latitude, longitude) {
	        _classCallCheck(this, Marker);
	
	        this.latitude = latitude;
	        this.longitude = longitude;
	        this.latitude = latitude;
	        this.longitude = longitude;
	    }
	    /**
	     * Returns the latitude
	     * @return {number}
	     */
	
	
	    _createClass(Marker, [{
	        key: "getLatitude",
	        value: function getLatitude() {
	            return this.latitude;
	        }
	        /**
	         * Returns the longitude
	         * @return {number}
	         */
	
	    }, {
	        key: "getLongitude",
	        value: function getLongitude() {
	            return this.longitude;
	        }
	    }]);
	
	    return Marker;
	}();
	
	exports.Marker = Marker;
	;

/***/ },
/* 13 */
/*!********************************************!*\
  !*** ../app/common/helpers/generateId.jsx ***!
  \********************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.generateId = generateId;
	function generateId() {
	    return new Mongo.Collection.ObjectID()._str;
	};

/***/ },
/* 14 */
/*!*******************************************!*\
  !*** ../app/common/models/GameStatus.jsx ***!
  \*******************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var GameStatus = exports.GameStatus = Object.freeze({
	    Playing: 'playing',
	    Waiting: 'waiting',
	    Creating: 'creating',
	    Failed: 'failed',
	    Declined: 'declined',
	    Ended: 'ended',
	
	    // Backward-compatibility
	    Finished: 'finished'
	});

/***/ },
/* 15 */
/*!**************************************************!*\
  !*** ../app/server/collections/JoinRequests.jsx ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.JoinRequest = exports.JoinRequestProps = exports.JoinRequests = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _assignProps = __webpack_require__(/*! ./../../common/helpers/assignProps.jsx */ 5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JoinRequests = exports.JoinRequests = new Mongo.Collection("joinRequests", {
	    transform: function transform(doc) {
	        return new JoinRequest(doc);
	    }
	});
	
	var JoinRequestProps = exports.JoinRequestProps = ['_id', 'from', 'to', 'gameId'];
	
	var JoinRequest = exports.JoinRequest = function () {
	    function JoinRequest(props) {
	        _classCallCheck(this, JoinRequest);
	
	        (0, _assignProps.assignProps)(this, JoinRequestProps, props);
	    }
	
	    _createClass(JoinRequest, [{
	        key: 'getId',
	        value: function getId() {
	            return this._id;
	        }
	    }, {
	        key: 'getFrom',
	        value: function getFrom() {
	            return this.from;
	        }
	    }, {
	        key: 'getTo',
	        value: function getTo() {
	            return this.to;
	        }
	    }, {
	        key: 'getGameId',
	        value: function getGameId() {
	            return this.gameId;
	            return this.gameId;
	        }
	    }], [{
	        key: 'fromRaw',
	        value: function fromRaw(request) {
	            return new JoinRequest(request);
	        }
	    }]);
	
	    return JoinRequest;
	}();

/***/ },
/* 16 */
/*!*****************************************************!*\
  !*** ../app/server/services/JoinRequestService.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.JoinRequestService = undefined;
	
	var _server = __webpack_require__(/*! ./../server.jsx */ 17);
	
	var _Games = __webpack_require__(/*! ./../collections/Games.jsx */ 4);
	
	var _JoinRequests = __webpack_require__(/*! ./../collections/JoinRequests.jsx */ 15);
	
	var _Friends = __webpack_require__(/*! ./../../common/collections/Friends.jsx */ 25);
	
	var _BotService = __webpack_require__(/*! ./BotService.jsx */ 3);
	
	var _GameService = __webpack_require__(/*! ./GameService.jsx */ 28);
	
	var _GameRepository = __webpack_require__(/*! ./../repositories/GameRepository.jsx */ 22);
	
	var _JoinRequestRepository = __webpack_require__(/*! ./../repositories/JoinRequestRepository.jsx */ 29);
	
	var JoinRequestService = exports.JoinRequestService = {
	  accept: function accept(requestId) {
	    var request = _JoinRequests.JoinRequests.findOne(requestId);
	    if (!request) {
	      throw Meteor.Error("404", "Request does not exist with id" + requestId);
	    }
	
	    var game = _Games.Games.findOne(request.gameId);
	
	    try {
	      _server.Server.fetchGameBoard(request.from, game.getId(), 1);
	      _server.Server.fetchGameBoard(request.to, game.getId(), 2);
	    } catch (e) {}
	
	    _JoinRequests.JoinRequests.remove(requestId);
	    return _Games.Games.findOne(game.getId());
	  },
	  decline: function decline(requestId) {
	    var request = _JoinRequests.JoinRequests.findOne(requestId);
	
	    if (request == null) {
	      var msg = 'No request with id ' + requestId + ' found.';
	      console.error(msg);
	      return {
	        status: 'error',
	        msg: msg
	      };
	    }
	
	    _JoinRequests.JoinRequests.remove(requestId);
	    var game = _Games.Games.findOne(request.gameId);
	    game.setStatus(GameStatus.Declined);
	    _GameRepository.GameRepository.save(game);
	    return { status: "success" };
	  },
	  getOpponent: function getOpponent(currentUserId, friendId) {
	    var friend = _Friends.Friends.findOne(friendId);
	
	    if (friend == null) {
	      var msg = 'Couldn\'t find a friend with id ' + friendId + '.';
	      throw new Meteor.Error('JoinRequestService.noFriendWithId', msg);
	    }
	
	    if (friend.isBot) {
	      return _BotService.BotService.getBot();
	    }
	
	    if (friend.facebookId == null) {
	      var msg = 'Friend with id ' + friendId + ' has no associated Facebook id.';
	      throw new Meteor.Error('JoinRequestService.noAssociatedFacebook', msg);
	    }
	
	    console.log('Checking if user ' + currentUserId + ' is friend with ' + friend.userId);
	
	    if (friend.userId == null) {
	      var friendUser = UserRepository.byFacebookId(friend.facebookId);
	
	      if (friendUser == null) {
	        var msg = 'Friend ' + friendId + ' has no associated user.';
	        throw new Meteor.Error('JoinRequestService.noAssociatedUser', msg);
	      }
	
	      friend.userId = friendUser._id;
	      FriendRepository.save(friend);
	    }
	
	    var currentUser = Meteor.users.findOne(currentUserId);
	    var asFriend = {
	      id: currentUser.services.facebook.id,
	      name: currentUser.services.facebook.name,
	      isBot: false
	    };
	
	    FriendRepository.updateFriends(friend.userId, [asFriend]);
	
	    return Meteor.users.findOne(friend.userId);
	  },
	  send: function send(currentUserId, friendId) {
	    try {
	      var opponent = JoinRequestService.getOpponent(currentUserId, friendId);
	      var game = _GameService.GameService.createGame(currentUserId, opponent._id);
	      var gameId = _GameRepository.GameRepository.save(game);
	      var join = _JoinRequests.JoinRequest.fromRaw({ from: currentUserId, to: opponent._id, gameId: gameId });
	      var requestId = _JoinRequestRepository.JoinRequestRepository.save(join);
	      console.log('Created join request ' + requestId + ' from ' + currentUserId + ' to ' + opponent._id + ' for game ' + gameId);
	
	      return {
	        status: 'success',
	        requestId: requestId
	      };
	    } catch (e) {
	      console.error('JoinRequestService - Error: ' + e);
	      return {
	        status: 'error',
	        msg: e.reason
	      };
	    }
	  }
	};

/***/ },
/* 17 */
/*!********************************!*\
  !*** ../app/server/server.jsx ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Server = undefined;
	
	var _GameFetches = __webpack_require__(/*! ./collections/GameFetches.jsx */ 18);
	
	var _GameCreatorService = __webpack_require__(/*! ./services/GameCreatorService.jsx */ 19);
	
	var _GameRepository = __webpack_require__(/*! ./repositories/GameRepository.jsx */ 22);
	
	var _GameFetchRepository = __webpack_require__(/*! ./repositories/GameFetchRepository.jsx */ 23);
	
	var _BotService = __webpack_require__(/*! ./services/BotService.jsx */ 3);
	
	var _Games = __webpack_require__(/*! ./collections/Games.jsx */ 4);
	
	var _GameBoard = __webpack_require__(/*! ./../common/models/GameBoard.jsx */ 8);
	
	var _GameBoardRepository = __webpack_require__(/*! ./repositories/GameBoardRepository.jsx */ 24);
	
	var _GameStatus = __webpack_require__(/*! ./../common/models/GameStatus.jsx */ 14);
	
	var Server = exports.Server = {
	  fetchGameBoard: function fetchGameBoard(userId, gameId, playerNum) {
	    var createFetch = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	
	    console.log("Fetching game board for user " + userId + "...");
	
	    var game = _Games.Games.findOne(gameId);
	    var bot = _BotService.BotService.bot();
	
	    var gameBoard = undefined;
	
	    try {
	      if (_BotService.BotService.isBot(userId)) {
	        console.log("User " + userId + " is a bot. Creating bot board...");
	        var botBoard = JSON.parse(Assets.getText('json/gameboards/gameboard1.json'));
	        gameBoard = _GameBoard.GameBoard.fromRaw(userId, botBoard);
	      } else {
	        var user = Meteor.users.findOne(userId);
	        var fbUserId = user.services.facebook.id;
	        var accessToken = user.services.facebook.accessToken;
	        var result = _GameCreatorService.GameCreatorService.fetchGameboard(fbUserId, accessToken);
	
	        gameBoard = _GameBoard.GameBoard.fromRaw(userId, result.data);
	
	        console.log("Fetched game board for user " + userId);
	      }
	
	      console.log("Saving board for player " + playerNum);
	      _GameBoardRepository.GameBoardRepository.save(gameBoard);
	      game["setPlayer" + playerNum + "Board"](gameBoard);
	
	      var status = game.player1Board && game.player2Board ? _GameStatus.GameStatus.Playing : _GameStatus.GameStatus.Creating;
	      console.log(status);
	      game.setStatus(status);
	
	      _GameRepository.GameRepository.save(game);
	
	      return gameBoard;
	    } catch (e) {
	      console.error("ERROR: Can't create game board from game creator result: " + e);
	
	      if (createFetch) {
	        var fetch = new GameFetch({
	          gameId: game.getId(),
	          player: playerNum,
	          playerId: game["getPlayer" + playerNum](),
	          tries: 1
	        });
	
	        _GameFetchRepository.GameFetchRepository.save(fetch);
	      }
	    }
	  },
	  fetchData: function fetchData(userId) {
	    console.log("Fetching data for user " + userId + "...");
	
	    var user = Meteor.users.findOne(userId);
	    var fbUserId = user.services.facebook.id;
	    var accessToken = user.services.facebook.accessToken;
	
	    try {
	      console.log("we try to fetch data from gamecreator");
	      _GameCreatorService.GameCreatorService.fetchData(fbUserId, accessToken);
	    } catch (e) {
	      console.log("INFO: Non 200 reply from Game creator to 'fetchData' request " + e);
	    }
	  },
	  fetchAllBoards: function fetchAllBoards() {
	    var _this = this;
	
	    var fetches = _GameFetches.GameFetches.find().fetch();
	
	    fetches.forEach(function (fetch) {
	      Meteor.setTimeout(function () {
	        _this.processFetch(fetch);
	      }, 0);
	    });
	  },
	  processFetch: function processFetch(fetch) {
	    console.log("Processing fetch " + fetch.getId() + "...");
	    console.log(" - Game: " + fetch.getGameId());
	    console.log(" - Player Id: " + fetch.getPlayerId());
	    console.log(" - Player Num: " + fetch.getPlayer());
	    console.log(" - Tries: " + fetch.getTries());
	
	    try {
	      var board = this.fetchGameBoard(fetch.getPlayerId(), fetch.getGameId(), fetch.getPlayer(), false);
	
	      if (board == null) {
	        throw new Exception("Fetch failed");
	      }
	
	      _GameFetches.GameFetches.remove(fetch.getId());
	    } catch (e) {
	      this.fetchFailed(fetch);
	    }
	  },
	  fetchFailed: function fetchFailed(fetch) {
	    fetch.incrementTries();
	
	    if (fetch.getTries() >= 10) {
	      var failedGame = _Games.Games.findOne(fetch.getGameId());
	      failedGame.setStatus(_GameStatus.GameStatus.Failed);
	      _GameRepository.GameRepository.save(failedGame);
	
	      _GameFetches.GameFetches.remove(fetch.getId());
	
	      console.log("Server: Maximum number of tries for game " + failedGame.getId() + " reached");
	    } else {
	      _GameFetchRepository.GameFetchRepository.save(fetch);
	    }
	  }
	};

/***/ },
/* 18 */
/*!*************************************************!*\
  !*** ../app/server/collections/GameFetches.jsx ***!
  \*************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameFetches = exports.GameFetches = new Mongo.Collection('gameFetches', {
	    transform: function transform(doc) {
	        return new GameFetch(doc);
	    }
	});
	
	var GameFetchProps = ['_id', 'gameId', 'playerId', 'player', 'tries'];
	
	var GameFetch = exports.GameFetch = function () {
	    function GameFetch(props) {
	        _classCallCheck(this, GameFetch);
	
	        assignProps(this, GameFetchProps, props);
	    }
	
	    _createClass(GameFetch, [{
	        key: 'getId',
	        value: function getId() {
	            return this._id;
	        }
	    }, {
	        key: 'getGameId',
	        value: function getGameId() {
	            return this.gameId;
	        }
	    }, {
	        key: 'getPlayerId',
	        value: function getPlayerId() {
	            return this.playerId;
	        }
	    }, {
	        key: 'getPlayer',
	        value: function getPlayer() {
	            return this.player;
	        }
	    }, {
	        key: 'getTries',
	        value: function getTries() {
	            return this.tries;
	        }
	    }, {
	        key: 'incrementTries',
	        value: function incrementTries() {
	            this.tries += 1;
	        }
	    }]);
	
	    return GameFetch;
	}();
	
	;

/***/ },
/* 19 */
/*!*****************************************************!*\
  !*** ../app/server/services/GameCreatorService.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GameCreator = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _querystring = __webpack_require__(/*! ./../../common/helpers/querystring.jsx */ 20);
	
	var _http = __webpack_require__(/*! ./../helpers/http.jsx */ 21);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameCreator = exports.GameCreator = function () {
	  function GameCreator(baseUrl) {
	    _classCallCheck(this, GameCreator);
	
	    if (baseUrl == null || baseUrl == '') {
	      throw new Error('GameCreatorService: missing baseUrl argument.');
	    }
	
	    this._baseUrl = baseUrl;
	  }
	
	  _createClass(GameCreator, [{
	    key: 'url',
	    value: function url(method, params) {
	      var query = undefined;
	
	      if (params != null) {
	        query = '?' + _querystring.Querystring.encode(params);
	      } else {
	        query = '';
	      }
	
	      var url = this._baseUrl + '/' + method + query;
	      return url;
	    }
	  }, {
	    key: 'fetchData',
	    value: function fetchData(fbUserId, accessToken, callback) {
	      var params = {
	        user_id: fbUserId,
	        access_token: accessToken
	      };
	
	      var url = this.url('fetchData', params);
	
	      return _http.HTTPHelper.get(url, callback);
	    }
	  }, {
	    key: 'fetchGameboard',
	    value: function fetchGameboard(fbUserId, accessToken, callback) {
	      var params = {
	        user_id: fbUserId,
	        access_token: accessToken
	      };
	
	      var url = this.url('gameboard', params);
	
	      return _http.HTTPHelper.get(url, callback);
	    }
	  }, {
	    key: 'fetchBuildInfo',
	    value: function fetchBuildInfo(callback) {
	      var url = this.url('info');
	
	      return _http.HTTPHelper.get(url, callback);
	    }
	  }]);
	
	  return GameCreator;
	}();
	
	;
	
	module.exports = {
	  GameCreatorService: new GameCreator(process.env.GAME_CREATOR_URL)
	};

/***/ },
/* 20 */
/*!*********************************************!*\
  !*** ../app/common/helpers/querystring.jsx ***!
  \*********************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Querystring = exports.Querystring = {
	  stringify: function stringify(value) {
	    if (typeof value === 'boolean') {
	      return value ? 'true' : 'false';
	    }
	    return value + '';
	  },
	  encode: function encode(props) {
	    var _this = this;
	
	    return Object.keys(props).map(function (key) {
	      return key + '=' + encodeURIComponent(_this.stringify(props[key]));
	    }).join('&');
	  }
	};

/***/ },
/* 21 */
/*!**************************************!*\
  !*** ../app/server/helpers/http.jsx ***!
  \**************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var getSync = Meteor.wrapAsync(Meteor.http.get);
	var getAsync = Meteor.http.get;
	
	var delSync = Meteor.wrapAsync(Meteor.http.del);
	var delAsync = Meteor.http.del;
	
	var HTTPHelper = exports.HTTPHelper = {
	
	  getSync: getSync,
	  getAsync: getAsync,
	
	  delSync: delSync,
	  delAsync: delAsync,
	
	  get: function get(url, callback) {
	    if (typeof callback !== 'function') {
	      return HTTPHelper.getSync(url);
	    }
	
	    return HTTPHelper.getAsync(url, callback);
	  },
	  del: function del(url, callback) {
	    if (typeof callback !== 'function') {
	      return HTTPHelper.delSync(url);
	    }
	
	    return HTTPHelper.delAsync(url, callback);
	  }
	};

/***/ },
/* 22 */
/*!*****************************************************!*\
  !*** ../app/server/repositories/GameRepository.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GameRepository = undefined;
	
	var _Games = __webpack_require__(/*! ./../collections/Games.jsx */ 4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var GameRepository = exports.GameRepository = {
	  save: function save(game) {
	    var _ref;
	
	    var doc = (_ref = _).pick.apply(_ref, [game].concat(_toConsumableArray(_Games.GameProps)));
	    if (game._id) {
	      _Games.Games.update(game._id, doc);
	    } else {
	      game._id = _Games.Games.insert(doc);
	    }
	
	    return game._id;
	  }
	};

/***/ },
/* 23 */
/*!**********************************************************!*\
  !*** ../app/server/repositories/GameFetchRepository.jsx ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameFetchRepository = undefined;
	
	var _GameFetches = __webpack_require__(/*! ./../collections/GameFetches.jsx */ 18);
	
	var GameFetchRepository = exports.GameFetchRepository = {
	    save: function save(gameFetch) {
	
	        var doc = _.pick(gameFetch, 'gameId', 'playerId', 'player', 'tries');
	        if (gameFetch._id) {
	            _GameFetches.GameFetches.update(gameFetch._id, { $set: doc });
	        } else {
	            gameFetch._id = _GameFetches.GameFetches.insert(gameFetch);
	        }
	        return gameFetch._id;
	    }
	};

/***/ },
/* 24 */
/*!**********************************************************!*\
  !*** ../app/server/repositories/GameBoardRepository.jsx ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GameBoardRepository = undefined;
	
	var _GameBoard = __webpack_require__(/*! ./../../common/models/GameBoard.jsx */ 8);
	
	var _GameBoards = __webpack_require__(/*! ./../collections/GameBoards.jsx */ 7);
	
	var GameBoardRepository = exports.GameBoardRepository = {
	  save: function save(gameBoard) {
	    var doc = _.pick(gameBoard, _GameBoard.GameBoardProps);
	
	    if (gameBoard._id) {
	      _GameBoards.GameBoards.update(doc._id, doc);
	    } else {
	      gameBoard._id = _GameBoards.GameBoards.insert(doc);
	    }
	
	    return gameBoard._id;
	  }
	};

/***/ },
/* 25 */
/*!*********************************************!*\
  !*** ../app/common/collections/Friends.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Friends = undefined;
	
	var _Friend = __webpack_require__(/*! ./../models/Friend.jsx */ 26);
	
	var Friends = exports.Friends = new Mongo.Collection('friends', {
	    transform: function transform(doc) {
	        return _Friend.Friend.fromRaw(doc);
	    }
	});

/***/ },
/* 26 */
/*!***************************************!*\
  !*** ../app/common/models/Friend.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Friend = exports.FriendProps = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _assignProps = __webpack_require__(/*! ./../helpers/assignProps.jsx */ 5);
	
	var _Routes = __webpack_require__(/*! ./../../client/scripts/Routes.jsx */ 27);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FriendProps = exports.FriendProps = ['_id', 'userId', 'facebookId', 'name', 'friendOf', 'isBot'];
	
	var Friend = exports.Friend = function () {
	  function Friend(props) {
	    _classCallCheck(this, Friend);
	
	    (0, _assignProps.assignProps)(this, FriendProps, props);
	  }
	
	  _createClass(Friend, [{
	    key: 'getId',
	    value: function getId() {
	      return this._id;
	    }
	  }, {
	    key: 'getUserId',
	    value: function getUserId() {
	      return this.userId;
	    }
	  }, {
	    key: 'hasUserId',
	    value: function hasUserId() {
	      return this.getUserId() != null;
	    }
	  }, {
	    key: 'getFacebookId',
	    value: function getFacebookId() {
	      return this.facebookId;
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      return this.name;
	    }
	  }, {
	    key: 'getFriendOf',
	    value: function getFriendOf() {
	      return this.friendOf;
	    }
	  }, {
	    key: 'isABot',
	    value: function isABot() {
	      return !!this.isBot;
	    }
	  }, {
	    key: 'getAvatarUrl',
	    value: function getAvatarUrl() {
	      if (this.isABot()) {
	        return _Routes.Routes.Assets.avatars.bot();
	      }
	
	      if (this.getFacebookId() != null) {
	        return _Routes.Routes.Assets.avatars.facebook(this.getFacebookId());
	      }
	
	      return _Routes.Routes.Assets.avatars.default();
	    }
	  }], [{
	    key: 'fromRaw',
	    value: function fromRaw(data) {
	      return new Friend(data);
	    }
	  }]);
	
	  return Friend;
	}();

/***/ },
/* 27 */
/*!****************************************!*\
  !*** ../app/client/scripts/Routes.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Routes = undefined;
	
	var _querystring = __webpack_require__(/*! ./../../common/helpers/querystring.jsx */ 20);
	
	// FIXME: Get rid of URL object.
	function url(path) {
	  return {
	    url: path,
	    toString: function toString() {
	      return this.url;
	    }
	  };
	}
	
	var Routes = exports.Routes = {
	  Assets: {
	    at: function at(path) {
	      return url('/' + (path + '').trim('/'));
	    },
	
	    avatars: {
	      default: function _default() {
	        return url('images/avatar-default.png');
	      },
	      bot: function bot() {
	        return url('images/bot-avatar.png');
	      },
	      facebook: function facebook(facebookId) {
	        var query = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	        var qstr = query ? '?' + _querystring.Querystring.encode(query) : '';
	        return url('https://graph.facebook.com/' + facebookId + '/picture' + qstr);
	      }
	    }
	  },
	  Facebook: {
	    avatar: function avatar(facebookId, query) {
	      return Routes.Assets.avatars.facebook(facebookId, query);
	    }
	  }
	};

/***/ },
/* 28 */
/*!**********************************************!*\
  !*** ../app/server/services/GameService.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GameService = undefined;
	
	var _Games = __webpack_require__(/*! ./../collections/Games.jsx */ 4);
	
	var _GameRepository = __webpack_require__(/*! ./../repositories/GameRepository.jsx */ 22);
	
	var _GameStatus = __webpack_require__(/*! ./../../common/models/GameStatus.jsx */ 14);
	
	var GameService = exports.GameService = {
	    start: function start(gameId) {
	        console.log("starting game " + gameId);
	        var game = _Games.Games.findOne(gameId);
	        game.setStatus(_GameStatus.GameStatus.Playing);
	        _GameRepository.GameRepository.save(game);
	        return { status: "success" };
	    },
	    createGame: function createGame(player1Id, player2Id) {
	        var boardState = [[{ player: 0, score: 0 }, { player: 0, score: 0 }, { player: 0, score: 0 }], [{ player: 0, score: 0 }, { player: 0, score: 0 }, { player: 0, score: 0 }], [{ player: 0, score: 0 }, { player: 0, score: 0 }, { player: 0, score: 0 }]];
	
	        return new _Games.Game({
	            player1: player1Id,
	            player2: player2Id,
	            status: _GameStatus.GameStatus.Waiting,
	            playerTurn: 1,
	            player1Scores: 0,
	            player2Scores: 0,
	            boardState: boardState,
	            player1AvailableMoves: GameService.createAvailableMoves(),
	            player2AvailableMoves: GameService.createAvailableMoves(),
	            wonBy: null,
	            creationTime: +new Date()
	        });
	    },
	    createAvailableMoves: function createAvailableMoves() {
	        var available = [];
	
	        for (var i = 0; i < 3; i++) {
	            for (var j = 0; j < 3; j++) {
	                available.push({ row: i, column: j });
	            }
	        }
	        return available;
	    }
	};

/***/ },
/* 29 */
/*!************************************************************!*\
  !*** ../app/server/repositories/JoinRequestRepository.jsx ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.JoinRequestRepository = undefined;
	
	var _JoinRequests = __webpack_require__(/*! ./../collections/JoinRequests.jsx */ 15);
	
	var JoinRequestRepository = exports.JoinRequestRepository = {
	  save: function save(joinRequest) {
	    var doc = _.pick(joinRequest, 'from', 'to', 'gameId');
	
	    if (joinRequest._id) {
	      _JoinRequests.JoinRequests.update(joinRequest._id, { $set: doc });
	    } else {
	      joinRequest._id = _JoinRequests.JoinRequests.insert(doc);
	    }
	
	    return joinRequest._id;
	  }
	};

/***/ },
/* 30 */
/*!*************************************************************************!*\
  !*** ../app/server/services/verification/AnswerVerificationService.jsx ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AnswerVerificationService = exports.Answer = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Questions = __webpack_require__(/*! ./../../../common/models/Questions.jsx */ 10);
	
	var _TimelineVerificationService = __webpack_require__(/*! ./TimelineVerificationService.jsx */ 31);
	
	var _MultipleChoiceVerificationService = __webpack_require__(/*! ./MultipleChoiceVerificationService.jsx */ 32);
	
	var _ReorderVerificationService = __webpack_require__(/*! ./ReorderVerificationService.jsx */ 33);
	
	var _GeoVerificationService = __webpack_require__(/*! ./GeoVerificationService.jsx */ 34);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Answer = exports.Answer = function Answer() {
	  _classCallCheck(this, Answer);
	};
	
	var AnswerVerificationService = exports.AnswerVerificationService = function () {
	  function AnswerVerificationService() {
	    _classCallCheck(this, AnswerVerificationService);
	  }
	
	  _createClass(AnswerVerificationService, null, [{
	    key: 'getVerifiers',
	    value: function getVerifiers() {
	      var verifiers = {};
	
	      verifiers[_Questions.Kind.Timeline] = _TimelineVerificationService.TimelineVerificationService;
	      verifiers[_Questions.Kind.MultipleChoice] = _MultipleChoiceVerificationService.MultipleChoiceVerificationService;
	      verifiers[_Questions.Kind.Geolocation] = _GeoVerificationService.GeoVerificationService;
	      verifiers[_Questions.Kind.Order] = _ReorderVerificationService.OrderVerificationService;
	
	      return verifiers;
	    }
	  }, {
	    key: 'getVerifier',
	    value: function getVerifier(kind) {
	      var verifiers = AnswerVerificationService.getVerifiers();
	      var verifier = verifiers[kind];
	
	      if (!AnswerVerificationService.isVerifier(verifier)) {
	        return null;
	      }
	
	      return verifier;
	    }
	
	    /**
	     * @param {Tile} tile
	     * @param {[Answer]} answers
	     *
	     * @return {[number]} the array of the results: 0 for incorrect 1 for correct per question
	     */
	
	  }, {
	    key: 'verifyTile',
	    value: function verifyTile(tile, answers) {
	      var questionAnswers = _.zip(tile.getQuestions(), answers);
	
	      return _.map(questionAnswers, function (qa) {
	        var kind = qa[0].getKind();
	        var verifier = AnswerVerificationService.getVerifier(kind);
	
	        if (verifier == null) {
	          console.error('AnswerVerificationService: Got invalid question kind: ' + kind);
	          return 0;
	        }
	
	        return verifier.verifyAnswer(qa[0], qa[1]);
	      });
	    }
	  }, {
	    key: 'isVerifier',
	    value: function isVerifier(verifier) {
	      return verifier != null && typeof verifier.verifyAnswer === 'function';
	    }
	  }]);
	
	  return AnswerVerificationService;
	}();
	
	;

/***/ },
/* 31 */
/*!***************************************************************************!*\
  !*** ../app/server/services/verification/TimelineVerificationService.jsx ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TimelineVerificationService = exports.TimelineAnswer = exports.TimelineData = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Questions = __webpack_require__(/*! ./../../../common/models/Questions.jsx */ 10);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TimelineData = exports.TimelineData = function () {
	
	    /**
	     * @constructor
	     * @param {string} date
	     */
	
	    function TimelineData(date) {
	        _classCallCheck(this, TimelineData);
	
	        this.date = date;
	    }
	
	    /**
	     * Gives the date as answer given by the user
	     *
	     * @return {Date}
	     */
	
	
	    _createClass(TimelineData, [{
	        key: 'getDate',
	        value: function getDate() {
	            return new Date(this.date);
	        }
	    }]);
	
	    return TimelineData;
	}();
	
	/**
	 * @extends {Answer}
	 */
	
	
	var TimelineAnswer = exports.TimelineAnswer = function () {
	    /**
	     * @constructor
	     * @param {TimelineData}data
	     */
	
	    function TimelineAnswer(data) {
	        _classCallCheck(this, TimelineAnswer);
	
	        this.data = data;
	    }
	    /**
	     * A data object
	     * @type {TimelineData}
	     */
	
	
	    _createClass(TimelineAnswer, [{
	        key: 'getData',
	        value: function getData() {
	            return this.data;
	        }
	    }]);
	
	    return TimelineAnswer;
	}();
	
	var TimelineVerificationService = exports.TimelineVerificationService = function () {
	    function TimelineVerificationService() {
	        _classCallCheck(this, TimelineVerificationService);
	    }
	
	    _createClass(TimelineVerificationService, null, [{
	        key: 'verifyAnswer',
	
	
	        /**
	         * verifies the timeline answer
	         *
	         * @param {TimelineQuestion} question
	         * @param {TimelineAnswer} answer
	         * @return {number} 0 for incorrect 1 for correct
	         */
	        value: function verifyAnswer(question, answer) {
	            switch (question.getUnit()) {
	                case _Questions.TimelineUnit.Day:
	                    return moment(answer.getData().getDate()).dayOfYear() === moment(question.getAnswer()).dayOfYear() ? 1 : 0;
	                    break;
	
	                case _Questions.TimelineUnit.Week:
	                    return moment(answer.getData().getDate()).week() === moment(question.getAnswer()).week() ? 1 : 0;
	                    break;
	
	                case _Questions.TimelineUnit.Month:
	                    return moment(answer.getData().getDate()).month() === moment(question.getAnswer()).month() ? 1 : 0;
	
	                    break;
	
	                case _Questions.TimelineUnit.Year:
	                    return moment(answer.getData().getDate()).year() === moment(question.getAnswer()).year() ? 1 : 0;
	                    break;
	
	                default:
	                    throw new Meteor.Error(500, 'Unknown unit ' + question.getUnit());
	            }
	        }
	    }]);
	
	    return TimelineVerificationService;
	}();
	
	;

/***/ },
/* 32 */
/*!*********************************************************************************!*\
  !*** ../app/server/services/verification/MultipleChoiceVerificationService.jsx ***!
  \*********************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MultipleChoiceData = exports.MultipleChoiceData = function () {
	    /**
	     * @constructor
	     * @param {number} choice
	     */
	
	    function MultipleChoiceData(choice) {
	        _classCallCheck(this, MultipleChoiceData);
	
	        this.choice = choice;
	    }
	
	    /**
	     * the number chosen as answer
	     * @type {number}
	     */
	
	
	    _createClass(MultipleChoiceData, [{
	        key: "getChoice",
	        value: function getChoice() {
	            return this.choice;
	        }
	    }]);
	
	    return MultipleChoiceData;
	}();
	
	/**
	 * @extends {Answer}
	 */
	
	
	var MultipleChoiceAnswer = exports.MultipleChoiceAnswer = function () {
	    /**
	     * @constructor
	     * @param {MultipleChoiceData} data
	     */
	
	    function MultipleChoiceAnswer(data) {
	        _classCallCheck(this, MultipleChoiceAnswer);
	
	        this.data = data;
	    }
	    /**
	     * A data object
	     * @type {MultipleChoiceData}
	     */
	
	
	    _createClass(MultipleChoiceAnswer, [{
	        key: "getData",
	        value: function getData() {
	            return this.data;
	        }
	    }]);
	
	    return MultipleChoiceAnswer;
	}();
	
	var MultipleChoiceVerificationService = exports.MultipleChoiceVerificationService = {
	
	    /**
	     *
	     * @param {MultipleChoiceQuestion} question
	     * @param {MultipleChoiceAnswer} answer
	     * @returns {number}
	     */
	
	    verifyAnswer: function verifyAnswer(question, answer) {
	        return question.getAnswer() === answer.getData().getChoice() ? 1 : 0;
	    }
	};

/***/ },
/* 33 */
/*!**************************************************************************!*\
  !*** ../app/server/services/verification/ReorderVerificationService.jsx ***!
  \**************************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OrderItem = exports.OrderItem = function () {
	
	    /**
	     *
	     * @param {number} id
	     * @param {string} title
	     */
	
	    function OrderItem(id, title) {
	        _classCallCheck(this, OrderItem);
	
	        this._id = id;
	        this._title = title;
	    }
	
	    /**
	     *
	     * @returns {number}
	     */
	
	    _createClass(OrderItem, [{
	        key: "id",
	        get: function get() {
	            return this._id;
	        }
	
	        /**
	         *
	         * @returns {string}
	         */
	
	    }, {
	        key: "title",
	        get: function get() {
	            return this._title;
	        }
	    }]);
	
	    return OrderItem;
	}();
	
	var OrderData = exports.OrderData = function () {
	
	    /**
	     *
	     * @param {[OrderItem]} items
	     */
	
	    function OrderData(items) {
	        _classCallCheck(this, OrderData);
	
	        this._items = items;
	    }
	
	    /**
	     * Contains the marker put by the user
	     * @type {[OrderItem]}
	     */
	
	
	    _createClass(OrderData, [{
	        key: "items",
	        get: function get() {
	            return this._items;
	        }
	    }]);
	
	    return OrderData;
	}();
	
	/**
	 * @extends {Answer}
	 */
	
	
	var OrderAnswer = exports.OrderAnswer = function () {
	
	    /**
	     *
	     * @param {number} timespent timespent in ms
	     * @param {OrderData} data
	     */
	
	    function OrderAnswer(timespent, data) {
	        _classCallCheck(this, OrderAnswer);
	
	        this._timespent = timespent;
	        this._data = data;
	    }
	
	    /**
	     * A data object
	     * @type {OrderData}
	     */
	
	
	    _createClass(OrderAnswer, [{
	        key: "data",
	        get: function get() {
	            return this._data;
	        }
	    }]);
	
	    return OrderAnswer;
	}();
	
	var OrderVerificationService = exports.OrderVerificationService = {
	
	    /**
	     * Verifies if the answer provided is at the correct location
	     *
	     * @param {OrderQuestion} question
	     * @param {OrderAnswer} answer
	     *
	     * @return {boolean}
	     */
	
	    verifyAnswer: function verifyAnswer(question, answer) {
	        var givenIds = answer.data.items.map(function (i) {
	            return i.id;
	        });
	        var answerIds = question.getAnswer();
	        var right = _.zip(answerIds, givenIds).map(function (_ref) {
	            var _ref2 = _slicedToArray(_ref, 2);
	
	            var answer = _ref2[0];
	            var given = _ref2[1];
	            return answer === given ? 1 : 0;
	        });
	        var correct = right.reduce(function (acc, cur) {
	            return acc + cur;
	        }, 0);
	        var numAnswers = answerIds.length;
	
	        console.log("OrderVerificationService: got " + correct + " correct answers over " + numAnswers);
	
	        return correct === numAnswers;
	    }
	};

/***/ },
/* 34 */
/*!**********************************************************************!*\
  !*** ../app/server/services/verification/GeoVerificationService.jsx ***!
  \**********************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GeoData = exports.GeoData = function () {
	
	    /**
	     *
	     * @param {Marker} marker
	     */
	
	    function GeoData(marker) {
	        _classCallCheck(this, GeoData);
	
	        this.marker = marker;
	    }
	
	    /**
	     * Contains the marker put by the user
	     * @type {Marker}
	     */
	
	
	    _createClass(GeoData, [{
	        key: "getMarker",
	        value: function getMarker() {
	            return this.marker;
	        }
	    }]);
	
	    return GeoData;
	}();
	
	;
	
	/**
	 * @extends {Answer}
	 */
	
	var GeoAnswer = exports.GeoAnswer = function () {
	
	    /**
	     *
	     * @param {GeoData} data
	     */
	
	    function GeoAnswer(data) {
	        _classCallCheck(this, GeoAnswer);
	
	        this.data = data;
	    }
	    /**
	     * A data object
	     * @type {GeoData}
	     */
	
	
	    _createClass(GeoAnswer, [{
	        key: "getData",
	        value: function getData() {
	            return this.data;
	        }
	    }]);
	
	    return GeoAnswer;
	}();
	
	;
	
	var GeoVerificationService = exports.GeoVerificationService = function () {
	    function GeoVerificationService() {
	        _classCallCheck(this, GeoVerificationService);
	    }
	
	    _createClass(GeoVerificationService, null, [{
	        key: "verifyAnswer",
	
	        /**
	         * verifies if the answer provided is at the correct location
	         *
	         * @param {GeoQuestion} question
	         * @param {GeoAnswer} answer
	         *
	         * @return {number} 1 for correct answer 0 for incorrect
	         */
	
	        value: function verifyAnswer(question, answer) {
	
	            var pickedLocation = answer.getData().getMarker();
	            var correctLocation = question.getAnswer();
	
	            var distance = Math.sqrt(Math.pow(pickedLocation.getLatitude() - correctLocation.getLatitude(), 2) + Math.pow(pickedLocation.getLongitude() - correctLocation.getLongitude(), 2));
	
	            console.error("Geo answer correct", question.getAnswer());
	            console.error("Geo answer given", answer.getData().getMarker());
	            console.error("Geo allowed distance", question.getRange());
	            console.error("Geo actuall distance", distance);
	            return distance < question.getRange() ? 1 : 0;
	        }
	    }]);
	
	    return GeoVerificationService;
	}();
	
	;

/***/ },
/* 35 */
/*!****************************************************!*\
  !*** ../app/server/services/BoardStateService.jsx ***!
  \****************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BoardStateService = exports.BoardStateService = function () {
	  function BoardStateService(board, playerNum) {
	    _classCallCheck(this, BoardStateService);
	
	    this.board = board;
	    this.player = playerNum;
	  }
	
	  _createClass(BoardStateService, [{
	    key: "playerWins",
	    value: function playerWins() {
	      var player = arguments.length <= 0 || arguments[0] === undefined ? this.player : arguments[0];
	
	      if (this.verifyWonDiagonal(player) || this.verifyWonAntiDiagonal(player)) {
	        return true;
	      }
	
	      for (var i = 0; i < 3; i += 1) {
	        if (this.verifyWonRow(i, player) || this.verifyWonColumn(i, player)) {
	          return true;
	        }
	      }
	
	      return false;
	    }
	  }, {
	    key: "playerWinsForRowAndColumn",
	    value: function playerWinsForRowAndColumn(player, row, column) {
	      return this.verifyWonRow(row, player) || this.verifyWonColumn(column, player) || this.verifyWonDiagonal(player) || this.verifyWonAntiDiagonal(player);
	    }
	  }, {
	    key: "verifyWonRow",
	    value: function verifyWonRow(row) {
	      var player = arguments.length <= 1 || arguments[1] === undefined ? this.player : arguments[1];
	
	      for (var i = 0; i < 3; i += 1) {
	        if (this.board[row][i].player !== player || this.board[row][i].score === 0) {
	          return false;
	        }
	      }
	
	      return true;
	    }
	  }, {
	    key: "verifyWonColumn",
	    value: function verifyWonColumn(column) {
	      var player = arguments.length <= 1 || arguments[1] === undefined ? this.player : arguments[1];
	
	      for (var j = 0; j < 3; j += 1) {
	        if (this.board[j][column].player !== player || this.board[j][column].score === 0) {
	          return false;
	        }
	      }
	
	      return true;
	    }
	  }, {
	    key: "verifyWonDiagonal",
	    value: function verifyWonDiagonal() {
	      var player = arguments.length <= 0 || arguments[0] === undefined ? this.player : arguments[0];
	
	      for (var i = 0; i < 3; i += 1) {
	        var cell = this.board[i][i];
	
	        if (cell.player !== player || cell.score === 0) {
	          return false;
	        }
	      }
	
	      return true;
	    }
	  }, {
	    key: "verifyWonAntiDiagonal",
	    value: function verifyWonAntiDiagonal() {
	      var player = arguments.length <= 0 || arguments[0] === undefined ? this.player : arguments[0];
	
	      var y = 2;
	
	      for (var x = 0; x < 3; x += 1) {
	        var cell = this.board[y][x];
	
	        if (cell.player !== player || cell.score === 0) {
	          return false;
	        }
	
	        y -= 1;
	      }
	
	      return true;
	    }
	  }, {
	    key: "isDraw",
	    value: function isDraw(game) {
	      if (game.getPlayerTurn() == 1) {
	        return _.isEmpty(game.getPlayer1AvailableMoves());
	      }
	
	      return _.isEmpty(game.getPlayer2AvailableMoves());
	    }
	  }, {
	    key: "checkRows",
	    value: function checkRows() {
	      var player = 0;
	      var impossible = 0;
	
	      for (var x = 0; x < this.board.length; x += 1) {
	        for (var y = 0; y < this.board.length; y += 1) {
	          if (this.board[x][y].player !== player) {
	            impossible += 1;
	            break;
	          }
	          _.extend(player, this.board[x][y].player);
	        }
	      }
	      return impossible;
	    }
	  }, {
	    key: "checkColumns",
	    value: function checkColumns() {
	      var player = 0;
	      var impossible = 0;
	
	      for (var x = 0; x < 3; x += 1) {
	        for (var y = 0; y < 3; y += 1) {
	          var cell = this.board[y][x];
	
	          if (cell.player !== player) {
	            impossible += 1;
	            break;
	          }
	
	          _.extend(player, cell.player);
	        }
	      }
	
	      return impossible;
	    }
	  }, {
	    key: "checkDiagonal",
	    value: function checkDiagonal() {
	      var player = 0;
	      var impossible = 0;
	
	      for (var x = 0; x < 3; x += 1) {
	        var cell = this.board[x][x];
	
	        if (player !== 0 && cell.player !== player) {
	          impossible += 1;
	          break;
	        }
	
	        _.extend(player, cell.player);
	      }
	
	      return impossible;
	    }
	  }, {
	    key: "checkAntiDiagonal",
	    value: function checkAntiDiagonal() {
	      var player = 0;
	      var impossible = 0;
	      var y = 2;
	
	      for (var x = 0; x < 3; x += 1) {
	        var cell = this.board[y][x];
	
	        if (player !== 0 && cell.player !== player) {
	          impossible += 1;
	          break;
	        }
	
	        _.extend(player, cell.player);
	
	        y -= 1;
	      }
	
	      return impossible;
	    }
	  }]);
	
	  return BoardStateService;
	}();

/***/ },
/* 36 */
/*!***************************************************!*\
  !*** ../app/server/services/GamestatsService.jsx ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GamestatsService = undefined;
	
	var _Gamestats = __webpack_require__(/*! ./../../common/collections/Gamestats.jsx */ 37);
	
	var _GamestatsRepository = __webpack_require__(/*! ./../repositories/GamestatsRepository.jsx */ 38);
	
	var GamestatsService = exports.GamestatsService = {
	  updateStatsGameWon: function updateStatsGameWon(userId) {
	    var stat = GamestatsService.getStats(userId);
	    stat.setGamesPlayed(stat.getGamesPlayed() + 1);
	    stat.setGamesWon(stat.getGamesWon() + 1);
	    _GamestatsRepository.GamestatRepository.save(stat);
	  },
	  updateStatsGameLost: function updateStatsGameLost(userId) {
	    var stat = GamestatsService.getStats(userId);
	    stat.setGamesPlayed(stat.getGamesPlayed() + 1);
	    stat.setGamesLost(stat.getGamesLost() + 1);
	    _GamestatsRepository.GamestatRepository.save(stat);
	  },
	  updateStatsGameDraw: function updateStatsGameDraw(userId) {
	    var stat = GamestatsService.getStats(userId);
	    stat.setGamesPlayed(stat.getGamesPlayed() + 1);
	    _GamestatsRepository.GamestatRepository.save(stat);
	  },
	  updateStatsForQuestions: function updateStatsForQuestions(questions, userId, results) {
	
	    var questionsResults = _.zip(questions, results);
	    var stat = GamestatsService.getStats(userId);
	
	    _.forEach(questionsResults, function (qr) {
	      switch (qr[0].getType()) {
	        case _Gamestats.QuestionTypes.MCWhichPageDidYouLike:
	          stat.setMCWhichPageDidYouLikeQuestionsTried(stat.getMCWhichPageDidYouLikeQuestionsTried() + 1);
	          stat.setMCTried(stat.getMCTried() + 1);
	          if (qr[1]) {
	            stat.setMCWhichPageDidYouLikeCorrect(stat.getMCWhichPageDidYouLikeCorrect() + 1);
	            stat.setMCCorrect(stat.getMCCorrect() + 1);
	          }
	          break;
	        case _Gamestats.QuestionTypes.MCWhoLikedYourPost:
	          stat.setMCWhoLikedYourPostQuestionsTried(stat.getMCWhoLikedYourPostQuestionsTried() + 1);
	          stat.setMCTried(stat.getMCTried() + 1);
	
	          if (qr[1]) {
	            stat.setMCWhoLikedYourPostCorrect(stat.getMCWhoLikedYourPostCorrect() + 1);
	            stat.setMCCorrect(stat.getMCCorrect() + 1);
	          }
	          break;
	        case _Gamestats.QuestionTypes.MCWhoMadeThisCommentOnYourPost:
	          stat.setMCWhoMadeThisCommentOnYourPostQuestionsTried(stat.getMCWhoMadeThisCommentOnYourPostQuestionsTried() + 1);
	          stat.setMCTried(stat.getMCTried() + 1);
	
	          if (qr[1]) {
	            stat.setMCWhoMadeThisCommentOnYourPostCorrect(stat.getMCWhoMadeThisCommentOnYourPostCorrect() + 1);
	            stat.setMCCorrect(stat.getMCCorrect() + 1);
	          }
	          break;
	        case _Gamestats.QuestionTypes.TLWhenDidYouShareThisPost:
	          stat.setTLWhenDidYouShareThisPostQuestionsTried(stat.getTLWhenDidYouShareThisPostQuestionsTried() + 1);
	          stat.setTLTried(stat.getTLTried() + 1);
	
	          if (qr[1]) {
	            stat.setTLWhenDidYouShareThisPostCorrect(stat.getTLWhenDidYouShareThisPostCorrect() + 1);
	            stat.setTLCorrect(stat.getTLCorrect() + 1);
	          }
	          break;
	        case _Gamestats.QuestionTypes.TLWhenDidYouLikeThisPage:
	          stat.setTLWhenDidYouLikeThisPageQuestionsTried(stat.getTLWhenDidYouLikeThisPageQuestionsTried() + 1);
	          stat.setTLTried(stat.getTLTried() + 1);
	
	          if (qr[1]) {
	            stat.setTLWhenDidYouShareThisPostCorrect(stat.getTLWhenDidYouShareThisPostCorrect() + 1);
	            stat.setTLCorrect(stat.getTLCorrect() + 1);
	          }
	          break;
	        case _Gamestats.QuestionTypes.GeoWhatCoordinatesWereYouAt:
	          stat.setGeoWhatCoordinatesWereYouAtQuestionsTried(stat.getGeoWhatCoordinatesWereYouAtQuestionsTried() + 1);
	          stat.setGeoTried(stat.getGeoTried() + 1);
	
	          if (qr[1]) {
	            stat.setGeoWhatCoordinatesWereYouAtCorrect(stat.getGeoWhatCoordinatesWereYouAtCorrect() + 1);
	            stat.setGeoCorrect(stat.getGeoCorrect() + 1);
	          }
	          break;
	        case _Gamestats.QuestionTypes.ORDPostLikesNumber:
	          stat.setOrderTried(stat.getOrderTried() + 1);
	
	          if (qr[1]) {
	            stat.setOrderCorrect(stat.getGeoCorrect() + 1);
	          }
	          break;
	
	        case _Gamestats.QuestionTypes.ORDPageLike:
	        case _Gamestats.QuestionTypes.ORDPageLikes:
	          stat.setOrderTried(stat.getOrderTried() + 1);
	
	          if (qr[1]) {
	            stat.setOrderCorrect(stat.getGeoCorrect() + 1);
	          }
	          break;
	
	        case _Gamestats.QuestionTypes.ORDPageLikeTime:
	
	          break;
	
	        case _Gamestats.QuestionTypes.ORDPostCommentsNumber:
	          stat.setOrderTried(stat.getOrderTried() + 1);
	
	          if (qr[1]) {
	            stat.setOrderCorrect(stat.getGeoCorrect() + 1);
	          }
	          break;
	
	        case _Gamestats.QuestionTypes.ORDPostTime:
	          stat.setOrderTried(stat.getOrderTried() + 1);
	
	          if (qr[1]) {
	            stat.setOrderCorrect(stat.getGeoCorrect() + 1);
	          }
	          break;
	        default:
	          console.error('Unkown Question type for stats for user: ' + userId + ', type: ' + qr[0].getType());
	          Meteor.Error(500, 'Unkown Question type for stats for user: ' + userId + ', type: ' + qr[0].getType());
	      }
	      _GamestatsRepository.GamestatRepository.save(stat);
	    });
	  },
	  getStats: function getStats(userId) {
	    var stat = _Gamestats.Gamestats.findOne({ userId: userId });
	    if (!stat) {
	      stat = new _Gamestats.Gamestat({ userId: userId });
	    }
	    return stat;
	  }
	};

/***/ },
/* 37 */
/*!***********************************************!*\
  !*** ../app/common/collections/Gamestats.jsx ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Gamestat = exports.QuestionTypes = exports.GamestatProps = exports.Gamestats = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _assignProps = __webpack_require__(/*! ./../helpers/assignProps.jsx */ 5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gamestats = exports.Gamestats = new Mongo.Collection('gamestats', {
	    transform: function transform(doc) {
	        return new Gamestat(doc);
	    }
	});
	
	var GamestatProps = exports.GamestatProps = ['_id', 'userId', 'gamesPlayed', 'gamesWon', 'gamesLost', 'MCWhoLikedYourPostQuestionsTried', 'MCWhoLikedYourPostCorrect', 'MCWhoMadeThisCommentOnYourPostQuestionsTried', 'MCWhoMadeThisCommentOnYourPostCorrect', 'MCWhichPageDidYouLikeQuestionsTried', 'MCWhichPageDidYouLikeCorrect', 'TLWhenDidYouShareThisPostQuestionsTried', 'TLWhenDidYouShareThisPostCorrect', 'GeoWhatCoordinatesWereYouAtQuestionsTried', 'GeoWhatCoordinatesWereYouAtCorrect', 'MCTried', 'MCCorrect', 'TLTried', 'TLCorrect', 'GeoTried', 'GeoCorrect', 'OrderTried', 'OrderCorrect'];
	
	var QuestionTypes = exports.QuestionTypes = {
	    MCWhoLikedYourPost: 'MCWhoLikedYourPost',
	    MCWhoMadeThisCommentOnYourPost: 'MCWhoMadeThisCommentOnYourPost',
	    MCWhichPageDidYouLike: 'MCWhichPageDidYouLike',
	    TLWhenDidYouShareThisPost: 'TLWhenDidYouShareThisPost',
	    TLWhenDidYouLikeThisPage: 'TLWhenDidYouLikeThisPage',
	    GeoWhatCoordinatesWereYouAt: 'GeoWhatCoordinatesWereYouAt',
	    ORDPostLikesNumber: 'ORDPostLikesNumber',
	    ORDPageLike: 'ORDPageLike',
	    ORDPageLikes: 'ORDPageLikes',
	    ORDPageLikeTime: 'ORDPageLikeTime',
	    ORDPostCommentsNumber: 'ORDPostCommentsNumber',
	    ORDPostTime: 'ORDPostTime'
	};
	
	var Gamestat = exports.Gamestat = function () {
	    function Gamestat(props) {
	        _classCallCheck(this, Gamestat);
	
	        var diff = _.difference(Object.keys(props), GamestatProps);
	        if (!_.isEmpty(diff)) {
	            throw new Meteor.Error(500, "Game constructor with unusable parameters " + diff);
	        }
	
	        _.forEach(GamestatProps, function (p) {
	            if (!props[p] && p !== '_id') {
	                props[p] = 0;
	            }
	        });
	        (0, _assignProps.assignProps)(this, GamestatProps, props);
	    }
	
	    _createClass(Gamestat, [{
	        key: 'getGamesPlayed',
	        value: function getGamesPlayed() {
	            return this.gamesPlayed;
	        }
	    }, {
	        key: 'setGamesPlayed',
	        value: function setGamesPlayed(value) {
	            this.gamesPlayed = value;
	        }
	    }, {
	        key: 'getGamesWon',
	        value: function getGamesWon() {
	            return this.gamesWon;
	        }
	    }, {
	        key: 'setGamesWon',
	        value: function setGamesWon(value) {
	            this.gamesWon = value;
	        }
	    }, {
	        key: 'getGamesLost',
	        value: function getGamesLost() {
	            return this.gamesLost;
	        }
	    }, {
	        key: 'setGamesLost',
	        value: function setGamesLost(value) {
	            this.gamesLost = value;
	        }
	    }, {
	        key: 'getGamesDrawn',
	        value: function getGamesDrawn() {
	            return this.getGamesPlayed() - this.getGamesWon() - this.getGamesLost();
	        }
	    }, {
	        key: 'getMCWhoLikedYourPostQuestionsTried',
	        value: function getMCWhoLikedYourPostQuestionsTried() {
	            return this.MCWhoLikedYourPostQuestionsTried;
	        }
	    }, {
	        key: 'setMCWhoLikedYourPostQuestionsTried',
	        value: function setMCWhoLikedYourPostQuestionsTried(value) {
	            this.MCWhoLikedYourPostQuestionsTried = value;
	        }
	    }, {
	        key: 'getMCWhoLikedYourPostCorrect',
	        value: function getMCWhoLikedYourPostCorrect() {
	            return this.MCWhoLikedYourPostCorrect;
	        }
	    }, {
	        key: 'setMCWhoLikedYourPostCorrect',
	        value: function setMCWhoLikedYourPostCorrect(value) {
	            this.MCWhoLikedYourPostCorrect = value;
	        }
	    }, {
	        key: 'getMCWhoMadeThisCommentOnYourPostQuestionsTried',
	        value: function getMCWhoMadeThisCommentOnYourPostQuestionsTried() {
	            return this.MCWhoMadeThisCommentOnYourPostQuestionsTried;
	        }
	    }, {
	        key: 'setMCWhoMadeThisCommentOnYourPostQuestionsTried',
	        value: function setMCWhoMadeThisCommentOnYourPostQuestionsTried(value) {
	            this.MCWhoMadeThisCommentOnYourPostQuestionsTried = value;
	        }
	    }, {
	        key: 'getMCWhoMadeThisCommentOnYourPostCorrect',
	        value: function getMCWhoMadeThisCommentOnYourPostCorrect() {
	            return this.MCWhoMadeThisCommentOnYourPostCorrect;
	        }
	    }, {
	        key: 'setMCWhoMadeThisCommentOnYourPostCorrect',
	        value: function setMCWhoMadeThisCommentOnYourPostCorrect(value) {
	            this.MCWhoMadeThisCommentOnYourPostCorrect = value;
	        }
	    }, {
	        key: 'getMCWhichPageDidYouLikeQuestionsTried',
	        value: function getMCWhichPageDidYouLikeQuestionsTried() {
	            return this.MCWhichPageDidYouLikeQuestionsTried;
	        }
	    }, {
	        key: 'setMCWhichPageDidYouLikeQuestionsTried',
	        value: function setMCWhichPageDidYouLikeQuestionsTried(value) {
	            this.MCWhichPageDidYouLikeQuestionsTried = value;
	        }
	    }, {
	        key: 'getMCWhichPageDidYouLikeCorrect',
	        value: function getMCWhichPageDidYouLikeCorrect() {
	            return this.MCWhichPageDidYouLikeCorrect;
	        }
	    }, {
	        key: 'setMCWhichPageDidYouLikeCorrect',
	        value: function setMCWhichPageDidYouLikeCorrect(value) {
	            this.MCWhichPageDidYouLikeCorrect = value;
	        }
	    }, {
	        key: 'getTLWhenDidYouShareThisPostQuestionsTried',
	        value: function getTLWhenDidYouShareThisPostQuestionsTried() {
	            return this.TLWhenDidYouShareThisPostQuestionsTried;
	        }
	    }, {
	        key: 'setTLWhenDidYouShareThisPostQuestionsTried',
	        value: function setTLWhenDidYouShareThisPostQuestionsTried(value) {
	            this.TLWhenDidYouShareThisPostQuestionsTried = value;
	        }
	    }, {
	        key: 'getTLWhenDidYouLikeThisPageQuestionsTried',
	        value: function getTLWhenDidYouLikeThisPageQuestionsTried() {
	            return this.TLWhenDidYouLikeThisPageQuestionsTried;
	        }
	    }, {
	        key: 'setTLWhenDidYouLikeThisPageQuestionsTried',
	        value: function setTLWhenDidYouLikeThisPageQuestionsTried(value) {
	            this.TLWhenDidYouLikeThisPageQuestionsTried = value;
	        }
	    }, {
	        key: 'getTLWhenDidYouShareThisPostCorrect',
	        value: function getTLWhenDidYouShareThisPostCorrect() {
	            return this.TLWhenDidYouShareThisPostCorrect;
	        }
	    }, {
	        key: 'setTLWhenDidYouShareThisPostCorrect',
	        value: function setTLWhenDidYouShareThisPostCorrect(value) {
	            this.TLWhenDidYouShareThisPostCorrect = value;
	        }
	    }, {
	        key: 'getTLWhenDidYouLikeThisPageCorrect',
	        value: function getTLWhenDidYouLikeThisPageCorrect() {
	            return this.TLWhenDidYouLikeThisPageCorrect;
	        }
	    }, {
	        key: 'setTLWhenDidYouLikeThisPageCorrect',
	        value: function setTLWhenDidYouLikeThisPageCorrect(value) {
	            this.TLWhenDidYouLikeThisPageCorrect = value;
	        }
	    }, {
	        key: 'getGeoWhatCoordinatesWereYouAtQuestionsTried',
	        value: function getGeoWhatCoordinatesWereYouAtQuestionsTried() {
	            return this.GeoWhatCoordinatesWereYouAtQuestionsTried;
	        }
	    }, {
	        key: 'setGeoWhatCoordinatesWereYouAtQuestionsTried',
	        value: function setGeoWhatCoordinatesWereYouAtQuestionsTried(value) {
	            this.GeoWhatCoordinatesWereYouAtQuestionsTried = value;
	        }
	    }, {
	        key: 'getGeoWhatCoordinatesWereYouAtCorrect',
	        value: function getGeoWhatCoordinatesWereYouAtCorrect() {
	            return this.GeoWhatCoordinatesWereYouAtCorrect;
	        }
	    }, {
	        key: 'setGeoWhatCoordinatesWereYouAtCorrect',
	        value: function setGeoWhatCoordinatesWereYouAtCorrect(value) {
	            this.GeoWhatCoordinatesWereYouAtCorrect = value;
	        }
	    }, {
	        key: 'getMCTried',
	        value: function getMCTried() {
	            return this.MCTried;
	        }
	    }, {
	        key: 'setMCTried',
	        value: function setMCTried(value) {
	            this.MCTried = value;
	        }
	    }, {
	        key: 'getMCCorrect',
	        value: function getMCCorrect() {
	            return this.MCCorrect;
	        }
	    }, {
	        key: 'setMCCorrect',
	        value: function setMCCorrect(value) {
	            this.MCCorrect = value;
	        }
	    }, {
	        key: 'getTLTried',
	        value: function getTLTried() {
	            return this.TLTried;
	        }
	    }, {
	        key: 'setTLTried',
	        value: function setTLTried(value) {
	            this.TLTried = value;
	        }
	    }, {
	        key: 'getTLCorrect',
	        value: function getTLCorrect() {
	            return this.TLCorrect;
	        }
	    }, {
	        key: 'setTLCorrect',
	        value: function setTLCorrect(value) {
	            this.TLCorrect = value;
	        }
	    }, {
	        key: 'getGeoTried',
	        value: function getGeoTried() {
	            return this.GeoTried;
	        }
	    }, {
	        key: 'setGeoTried',
	        value: function setGeoTried(value) {
	            this.GeoTried = value;
	        }
	    }, {
	        key: 'getGeoCorrect',
	        value: function getGeoCorrect() {
	            return this.GeoCorrect;
	        }
	    }, {
	        key: 'setGeoCorrect',
	        value: function setGeoCorrect(value) {
	            this.GeoCorrect = value;
	        }
	    }, {
	        key: 'getOrderTried',
	        value: function getOrderTried() {
	            return this.OrderTried;
	        }
	    }, {
	        key: 'setOrderTried',
	        value: function setOrderTried(value) {
	            this.OrderTried = value;
	        }
	    }, {
	        key: 'getOrderCorrect',
	        value: function getOrderCorrect() {
	            return this.OrderCorrect;
	        }
	    }, {
	        key: 'setOrderCorrect',
	        value: function setOrderCorrect(value) {
	            this.OrderCorrect = value;
	        }
	    }]);
	
	    return Gamestat;
	}();

/***/ },
/* 38 */
/*!**********************************************************!*\
  !*** ../app/server/repositories/GamestatsRepository.jsx ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GamestatRepository = undefined;
	
	var _Gamestats = __webpack_require__(/*! ./../../common/collections/Gamestats.jsx */ 37);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var GamestatRepository = exports.GamestatRepository = {
	    save: function save(stat) {
	        var _ref;
	
	        var doc = (_ref = _).pick.apply(_ref, [stat].concat(_toConsumableArray(_Gamestats.GamestatProps)));
	        if (stat._id) {
	            _Gamestats.Gamestats.update(stat._id, doc);
	        } else {
	            stat._id = _Gamestats.Gamestats.insert(doc);
	        }
	
	        return stat._id;
	    }
	};

/***/ },
/* 39 */
/*!*******************************************!*\
  !*** ../app/common/helpers/findIndex.jsx ***!
  \*******************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// http://underscorejs.org/docs/underscore.html
	
	function createPredicateIndexFinder(dir) {
	  return function (array, predicate, context) {
	    var length = array.length;
	    var index = dir > 0 ? 0 : length - 1;
	    for (; index >= 0 && index < length; index += dir) {
	      if (predicate(array[index], index, array)) return index;
	    }
	    return -1;
	  };
	}
	
	var findIndex = exports.findIndex = createPredicateIndexFinder(1);

/***/ },
/* 40 */
/*!************************************************!*\
  !*** ../app/server/services/AnswerService.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Questions = __webpack_require__(/*! ./../../common/models/Questions.jsx */ 10);
	
	var _Games = __webpack_require__(/*! ./../collections/Games.jsx */ 4);
	
	var _Marker = __webpack_require__(/*! ./../../common/models/questions/Marker */ 12);
	
	var _GameStatus = __webpack_require__(/*! ./../../common/models/GameStatus.jsx */ 14);
	
	var _GameBoardRepository = __webpack_require__(/*! ./../repositories/GameBoardRepository.jsx */ 24);
	
	var _GameRepository = __webpack_require__(/*! ./../repositories/GameRepository.jsx */ 22);
	
	var _AnswerVerificationService = __webpack_require__(/*! ./verification/AnswerVerificationService.jsx */ 30);
	
	var _BoardStateService = __webpack_require__(/*! ./BoardStateService.jsx */ 35);
	
	var _GamestatsService = __webpack_require__(/*! ./GamestatsService.jsx */ 36);
	
	var _findIndex = __webpack_require__(/*! ./../../common/helpers/findIndex.jsx */ 39);
	
	var _MultipleChoiceVerificationService = __webpack_require__(/*! ./verification/MultipleChoiceVerificationService.jsx */ 32);
	
	var _TimelineVerificationService = __webpack_require__(/*! ./verification/TimelineVerificationService.jsx */ 31);
	
	var _GeoVerificationService = __webpack_require__(/*! ./verification/GeoVerificationService.jsx */ 34);
	
	var _ReorderVerificationService = __webpack_require__(/*! ./verification/ReorderVerificationService.jsx */ 33);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AnswerService = function () {
	  function AnswerService() {
	    _classCallCheck(this, AnswerService);
	  }
	
	  _createClass(AnswerService, [{
	    key: 'timeOut',
	    value: function timeOut(currentUser, gameId, tileId) {
	      if (gameId == null || tileId == null) {
	        return {
	          status: 'error',
	          message: 'Missing arguments for AnswerService.timeOut'
	        };
	      }
	
	      var game = _Games.Games.findOne(gameId);
	
	      if (!game) {
	        return {
	          status: 'error',
	          message: 'Cannot find game with id ' + gameId
	        };
	      }
	
	      var board = game.getCurrentBoard();
	
	      if (!board) {
	        return {
	          status: 'error',
	          message: 'Cannot find board for current player'
	        };
	      }
	
	      var tile = board.getTileById(tileId);
	
	      if (!tile) {
	        return {
	          status: 'error',
	          message: 'Cannot find tile with id ' + tileId
	        };
	      }
	
	      tile.setDisabled(true);
	      _GameBoardRepository.GameBoardRepository.save(board);
	
	      var currentPlayer = game.getPlayerTurn();
	      var boardState = game.getBoardState();
	      var boardService = new _BoardStateService.BoardStateService(boardState, currentPlayer);
	      var wins = boardService.playerWins();
	      var draw = boardService.isDraw(game);
	
	      this.updateStats(game, wins, draw, currentUser, currentPlayer);
	
	      if (wins) {
	        game.setWonBy(currentPlayer);
	        game.setStatus(_GameStatus.GameStatus.Ended);
	      } else if (draw) {
	        game.setWonBy(0);
	        game.setStatus(_GameStatus.GameStatus.Ended);
	      }
	
	      game.nextTurn();
	      _GameRepository.GameRepository.save(game);
	
	      return {
	        status: 'success'
	      };
	    }
	  }, {
	    key: 'post',
	    value: function post(currentUser, gameId, tileId, answers) {
	      var game = _Games.Games.findOne(gameId);
	
	      if (!game) {
	        throw new Meteor.Error(500, 'Cannot find game with id ' + gameId);
	      }
	
	      var board = game.getCurrentBoard();
	      var tiles = board.getTiles();
	      var tile = board.getTileById(tileId);
	
	      if (!tile) {
	        throw new Meteor.Error(500, 'Cannot find tile with id ' + tileId);
	      }
	
	      var boardState = game.getBoardState();
	      var currentPlayer = game.getPlayerTurn();
	      var boardService = new _BoardStateService.BoardStateService(boardState, currentPlayer);
	
	      var typedAnswers = this.typeAnswers(tile, answers);
	
	      var result = _AnswerVerificationService.AnswerVerificationService.verifyTile(tile, typedAnswers);
	      var questions = tile.getQuestions();
	
	      _GamestatsService.GamestatsService.updateStatsForQuestions(questions, currentUser, result);
	
	      var scores = _.zip(questions, result).map(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2);
	
	        var question = _ref2[0];
	        var score = _ref2[1];
	        return {
	          questionId: question._id,
	          score: score
	        };
	      });
	
	      var index = (0, _findIndex.findIndex)(tiles, function (t) {
	        return t.getId() === tileId;
	      });
	      var row = Math.floor(index / 3);
	      var col = index % 3;
	
	      var correctAnswersNum = scores.reduce(function (acc, s) {
	        return acc + s.score;
	      }, 0);
	      var wrongAnswersNum = questions.length - correctAnswersNum;
	      var otherScore = boardState[row][col].player !== currentPlayer ? boardState[row][col].score : 0;
	
	      var newScore = correctAnswersNum;
	      game.incrementCurrentPlayerScore(newScore);
	
	      if (newScore > otherScore || otherScore === 0) {
	        var scoreKey = 'player' + currentPlayer + 'Scores';
	        game[scoreKey][tileId] = scores;
	
	        boardState[row][col].player = currentPlayer;
	        boardState[row][col].score = newScore;
	      }
	
	      tile.setDisabled(true);
	
	      var filterMoves = function filterMoves(m) {
	        return m.row !== row || m.column !== col;
	      };
	
	      this.updateMoves(game, newScore, currentPlayer, filterMoves);
	
	      var wins = boardService.playerWinsForRowAndColumn(currentPlayer, row, col);
	      var draw = boardService.isDraw(game);
	
	      this.updateStats(game, wins, draw, currentUser, currentPlayer);
	
	      if (wins) {
	        game.setWonBy(currentPlayer);
	        game.setStatus(_GameStatus.GameStatus.Ended);
	      } else if (draw) {
	        game.setWonBy(0);
	        game.setStatus(_GameStatus.GameStatus.Ended);
	      }
	
	      game.nextTurn();
	
	      _GameRepository.GameRepository.save(game);
	      _GameBoardRepository.GameBoardRepository.save(board);
	
	      var returnValue = {
	        status: 'success',
	        win: wins,
	        draw: draw,
	        correct: correctAnswersNum,
	        wrong: wrongAnswersNum
	      };
	
	      console.log('Result of player ' + currentPlayer + ' turn:', returnValue);
	
	      return returnValue;
	    }
	  }, {
	    key: 'typeAnswers',
	    value: function typeAnswers(tile, answers) {
	      var _this = this;
	
	      var questions = tile.getQuestions();
	
	      return _.zip(questions, answers).map(function (_ref3) {
	        var _ref4 = _slicedToArray(_ref3, 2);
	
	        var q = _ref4[0];
	        var a = _ref4[1];
	        return _this.typeAnswer(q, a);
	      });
	    }
	  }, {
	    key: 'typeAnswer',
	    value: function typeAnswer(question, answer) {
	      var kind = question.getKind();
	      var data = answer.data;
	
	      switch (kind) {
	        case _Questions.Kind.MultipleChoice:
	          return new _MultipleChoiceVerificationService.MultipleChoiceAnswer(new _MultipleChoiceVerificationService.MultipleChoiceData(data.choice));
	
	        case _Questions.Kind.Timeline:
	          return new _TimelineVerificationService.TimelineAnswer(new _TimelineVerificationService.TimelineData(data.date));
	
	        case _Questions.Kind.Geolocation:
	          return new _GeoVerificationService.GeoAnswer(new _GeoVerificationService.GeoData(new _Marker.Marker(data.marker.latitude, data.marker.longitude)));
	
	        case _Questions.Kind.Order:
	          var items = data.items.map(function (i) {
	            return new _ReorderVerificationService.OrderItem(i.id, i.text);
	          });
	          var order = new _ReorderVerificationService.OrderData(items);
	
	          return new _ReorderVerificationService.OrderAnswer(answer.timespent, order);
	
	        default:
	          throw Meteor.Error(500, 'Unsupported question type ' + kind);
	      }
	    }
	  }, {
	    key: 'updateMoves',
	    value: function updateMoves(game, score, player, filterMoves) {
	      var player1AvailableMoves = game.getPlayer1AvailableMoves();
	      var player2AvailableMoves = game.getPlayer2AvailableMoves();
	
	      var player1NewMoves = player1AvailableMoves.filter(filterMoves);
	      var player2NewMoves = player2AvailableMoves.filter(filterMoves);
	
	      if (score === 3) {
	        game.setPlayer1AvailableMoves(player1NewMoves);
	        game.setPlayer2AvailableMoves(player2NewMoves);
	      } else {
	        if (player === 1) {
	          game.setPlayer1AvailableMoves(player1NewMoves);
	        } else {
	          game.setPlayer2AvailableMoves(player2NewMoves);
	        }
	      }
	    }
	  }, {
	    key: 'updateStats',
	    value: function updateStats(game, wins, draw, user, player) {
	      if (!wins || !draw) {
	        return;
	      }
	
	      if (game.status === _GameStatus.GameStatus.Ended) {
	        return;
	      }
	
	      if (wins) {
	        _GamestatsService.GamestatsService.updateStatsGameWon(user);
	        _GamestatsService.GamestatsService.updateStatsGameLost(game.getOpponentForUser(user));
	        game.setWonBy(player);
	      } else if (draw) {
	        _GamestatsService.GamestatsService.updateStatsGameDraw(user);
	        _GamestatsService.GamestatsService.updateStatsGameDraw(game.getOpponentForUser(user));
	        game.setWonBy(0);
	      }
	
	      game.setStatus(_GameStatus.GameStatus.Ended);
	    }
	  }]);
	
	  return AnswerService;
	}();
	
	module.exports = {
	  AnswerService: new AnswerService()
	};

/***/ },
/* 41 */
/*!**********************************!*\
  !*** ../app/server/services.jsx ***!
  \**********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setup = setup;
	function setup() {
	
	  var abort = false;
	
	  ['FACEBOOK_APPID', 'FACEBOOK_SECRET', 'GMAPS_KEY', 'TIMEOUT_BETWEEN_FETCHES', 'GAME_CREATOR_URL'].forEach(function (key) {
	    if (process.env[key] == null) {
	      console.error('ERROR: Missing environement variable %s', key);
	      abort = true;
	    }
	  });
	
	  if (abort) {
	    process.exit(1);
	  }
	
	  var appId = process.env.FACEBOOK_APPID;
	  var secret = process.env.FACEBOOK_SECRET;
	  var gmapsKey = process.env.GMAPS_KEY;
	
	  ServiceConfiguration.configurations.upsert({ service: 'facebook' }, {
	    $set: {
	      loginStyle: 'popup',
	      appId: appId,
	      secret: secret,
	      scope: ['public_profile', 'user_friends', 'email', 'user_likes', 'user_photos', 'user_posts', 'user_status', 'user_tagged_places']
	    }
	  });
	
	  ServiceConfiguration.configurations.upsert({ service: 'gmaps' }, {
	    $set: {
	      zoom: 9,
	      apiKey: gmapsKey,
	      sensor: false,
	      marker: {
	        initialPosition: {
	          latitude: 46.5285085,
	          longitude: 6.5601122
	        }
	      }
	    }
	  });
	}

/***/ },
/* 42 */
/*!**********************************!*\
  !*** ../app/server/facebook.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _FriendRepository = __webpack_require__(/*! ./repositories/FriendRepository.jsx */ 43);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// FIXME: Awful design...
	// TODO: Handle paging.
	// TODO: Fix caching.
	var API_URL = 'https://graph.facebook.com/v2.3';
	
	var Facebook = function () {
	  function Facebook() {
	    _classCallCheck(this, Facebook);
	
	    this.usersInfo = {};
	    this.avatars = {};
	  }
	
	  _createClass(Facebook, [{
	    key: 'getAppSecret',
	    value: function getAppSecret() {
	      var conf = ServiceConfiguration.configurations.findOne({ service: 'facebook' });
	      return conf.secret;
	    }
	  }, {
	    key: 'computeProof',
	    value: function computeProof(accessToken) {
	      return CryptoJS.HmacSHA256(accessToken, this.getAppSecret()).toString();
	    }
	  }, {
	    key: 'api',
	    value: function api(user, url) {
	      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      if (!user) {
	        throw new Meteor.Error(500, "You must specify the current user");
	      }
	
	      var fullUrl = API_URL + url;
	      var accessToken = user.services.facebook.accessToken;
	
	      if (!accessToken) {
	        throw new Meteor.Error(401, "User isn't logged in or doesn't have an access token");
	      }
	
	      /* eslint camelcase:0 */
	      var params = _.extend(options, {
	        access_token: accessToken,
	        appsecret_proof: this.computeProof(accessToken)
	      });
	
	      try {
	        var res = HTTP.get(fullUrl, { params: params });
	
	        if (res.statusCode !== 200) {
	          // TODO: Handle errors.
	        }
	        return res.data;
	      } catch (e) {
	        return { error: e };
	      }
	    }
	  }, {
	    key: 'getFriends',
	    value: function getFriends(user) {
	      return this.api(user, '/me/friends').data;
	    }
	  }, {
	    key: 'getUserInfo',
	    value: function getUserInfo(user, fbUserId) {
	      var key = user._id + '/' + fbUserId;
	      if (this.usersInfo.hasOwnProperty(key)) {
	        return this.usersInfo[key];
	      }
	
	      var userInfo = this.api(user, '/' + fbUserId);
	      this.usersInfo[key] = userInfo;
	      return userInfo;
	    }
	  }, {
	    key: 'getAvatar',
	    value: function getAvatar(user, fbUserId) {
	      var type = arguments.length <= 2 || arguments[2] === undefined ? 'small' : arguments[2];
	
	      var key = user._id + '/' + fbUserId;
	      if (this.avatars.hasOwnProperty(key)) {
	        return this.avatars[key];
	      }
	
	      var picture = this.api(user, '/' + fbUserId + '/picture', {
	        redirect: false,
	        type: type
	      }).data;
	
	      var url = picture.url;
	      this.avatars[key] = url;
	      return url;
	    }
	  }, {
	    key: 'getPermissions',
	    value: function getPermissions(user) {
	      return this.api(user, '/me/permissions').data;
	    }
	  }]);
	
	  return Facebook;
	}();
	
	module.exports = {
	  Facebook: new Facebook()
	};

/***/ },
/* 43 */
/*!*******************************************************!*\
  !*** ../app/server/repositories/FriendRepository.jsx ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FriendRepository = undefined;
	
	var _Friends = __webpack_require__(/*! ./../../common/collections/Friends.jsx */ 25);
	
	var _Friend = __webpack_require__(/*! ./../../common/models/Friend.jsx */ 26);
	
	var _UserRepository = __webpack_require__(/*! ./UserRepository.jsx */ 44);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var FriendRepository = exports.FriendRepository = {
	    friendsOf: function friendsOf(userId) {
	        return _Friends.Friends.find({ friendOf: userId }).fetch();
	    },
	    byFacebookId: function byFacebookId(facebookId, userId) {
	        return _Friends.Friends.findOne({ facebookId: facebookId, friendOf: userId });
	    },
	    byUserId: function byUserId(friendUserId, userId) {
	        return _Friends.Friends.findOne({ userId: friendUserId, friendOf: userId });
	    },
	    save: function save(friend) {
	        var _ref;
	
	        var doc = (_ref = _).pick.apply(_ref, [friend].concat(_toConsumableArray(_Friend.FriendProps)));
	
	        if (!doc.userId) {
	            FriendRepository.updateUserId(doc);
	        }
	
	        if (friend._id) {
	            _Friends.Friends.update(friend._id, doc);
	        } else {
	            friend._id = _Friends.Friends.insert(doc);
	        }
	
	        return friend;
	    },
	    updateUserId: function updateUserId(friend) {
	        var user = _UserRepository.UserRepository.byFacebookId(friend.facebookId);
	
	        if (user == null) {
	            return false;
	        }
	
	        friend.userId = user._id;
	        return true;
	    },
	    updateFriends: function updateFriends(userId, friends) {
	        return friends.map(function (f) {
	            var friend = FriendRepository.byFacebookId(f.id, userId);
	
	            if (friend == null) {
	                friend = {
	                    facebookId: f.id,
	                    friendOf: userId,
	                    name: f.name,
	                    isBot: !!f.isBot,
	                    userId: null
	                };
	            } else {
	                FriendRepository.updateUserId(friend);
	            }
	
	            return FriendRepository.save(friend);
	        });
	    },
	    addBot: function addBot(userId, bot) {
	        var friend = FriendRepository.byUserId(bot.id, userId);
	
	        if (friend != null) {
	            return;
	        }
	
	        friend = {
	            facebookId: bot.id,
	            userId: bot.id,
	            friendOf: userId,
	            name: bot.name,
	            isBot: true
	        };
	
	        FriendRepository.save(friend);
	    }
	};

/***/ },
/* 44 */
/*!*****************************************************!*\
  !*** ../app/server/repositories/UserRepository.jsx ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var UserRepository = exports.UserRepository = {
	    byFacebookId: function byFacebookId(facebookId) {
	        return Meteor.users.findOne({ 'services.facebook.id': facebookId });
	    }
	};

/***/ },
/* 45 */
/*!*********************************!*\
  !*** ../app/server/publish.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.publishCollections = publishCollections;
	
	var _Games = __webpack_require__(/*! ./collections/Games.jsx */ 4);
	
	var _GameBoards = __webpack_require__(/*! ./collections/GameBoards.jsx */ 7);
	
	var _Friends = __webpack_require__(/*! ./../common/collections/Friends.jsx */ 25);
	
	var _JoinRequests = __webpack_require__(/*! ./collections/JoinRequests.jsx */ 15);
	
	var _Gamestats = __webpack_require__(/*! ./../common/collections/Gamestats.jsx */ 37);
	
	var LOG_PUBLISH = true;
	
	function publishCollections() {
	    "use strict";
	
	    Meteor.publish('games', function () {
	        LOG_PUBLISH && console.log('Publishing games for user ' + this.userId + '...');
	
	        return _Games.Games.find({
	            $or: [{ player1: this.userId }, { player2: this.userId }]
	        });
	    });
	
	    Meteor.publish('gameBoards', function () {
	        LOG_PUBLISH && console.log('Publishing game boards for user ' + this.userId + '...');
	
	        return _GameBoards.GameBoards.find({ userId: this.userId });
	    });
	
	    Meteor.publish('joinRequests', function () {
	        LOG_PUBLISH && console.log('Publishing join requests for user ' + this.userId + '...');
	
	        return _JoinRequests.JoinRequests.find({ to: this.userId });
	    });
	
	    // TODO: Don't publish access token etc.
	    Meteor.publish('userServices', function () {
	        LOG_PUBLISH && console.log('Publishing services for user ' + this.userId + '...');
	
	        return Meteor.users.find({ _id: this.userId }, { fields: { 'services': 1 } });
	    });
	
	    Meteor.publish('friends', function () {
	        LOG_PUBLISH && console.log('Publishing friends for user ' + this.userId + '...');
	
	        return _Friends.Friends.find({ friendOf: this.userId });
	    });
	
	    Meteor.publish('gameStats', function () {
	        LOG_PUBLISH && console.log('Publishing game stats for user ' + this.userId + '...');
	        return _Gamestats.Gamestats.find();
	    });
	}

/***/ },
/* 46 */
/*!*********************************!*\
  !*** ../app/server/methods.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setupMeteorMethods = setupMeteorMethods;
	
	var _JoinRequestService = __webpack_require__(/*! ./services/JoinRequestService.jsx */ 16);
	
	var _GameService = __webpack_require__(/*! ./services/GameService.jsx */ 28);
	
	var _AnswerService = __webpack_require__(/*! ./services/AnswerService.jsx */ 40);
	
	var _GameCreatorService = __webpack_require__(/*! ./services/GameCreatorService.jsx */ 19);
	
	var _facebook = __webpack_require__(/*! ./facebook.jsx */ 42);
	
	var _FriendRepository = __webpack_require__(/*! ./repositories/FriendRepository.jsx */ 43);
	
	function setupMeteorMethods() {
	  Meteor.methods({
	    fetchData: function fetchData(userId) {
	      check(userId, String);
	
	      Server.fetchData(userId);
	
	      return {
	        status: 'success'
	      };
	    },
	    'Account.deleteAllData': function AccountDeleteAllData() {
	      var userId = Meteor.userId();
	
	      console.log('Deleting data for user: ' + userId);
	
	      var user = Meteor.users.findOne(userId);
	      var fbUserId = user.services.facebook.id;
	
	      var result = AccountService.deleteUserData(fbUserId);
	
	      if (result.statusCode === 200) {
	        Meteor.users.remove(userId);
	      }
	
	      console.log('Data deleted with following result:', result.data.message);
	
	      return {
	        status: result.statusCode === 200 ? 'success' : 'error',
	        msg: result.data.message
	      };
	    },
	    'JoinRequest.decline': function JoinRequestDecline(requestId) {
	      check(requestId, String);
	
	      return _JoinRequestService.JoinRequestService.decline(requestId);
	    },
	    'JoinRequest.accept': function JoinRequestAccept(requestId) {
	      check(requestId, String);
	
	      return _JoinRequestService.JoinRequestService.accept(requestId);
	    },
	    'JoinRequest.send': function JoinRequestSend(friendId) {
	      check(friendId, String);
	
	      return _JoinRequestService.JoinRequestService.send(this.userId, friendId);
	    },
	    'Game.start': function GameStart(gameId) {
	      check(gameId, String);
	
	      return _GameService.GameService.start(gameId);
	    },
	    'Game.quit': function GameQuit(gameId) {
	      check(gameId, String);
	
	      console.error('Method Game.quit is not implemented yet.');
	      return {
	        status: 'success'
	      };
	    },
	    'Answer.timeOut': function AnswerTimeOut(gameId, tileId) {
	      check(gameId, String);
	      check(tileId, String);
	
	      return _AnswerService.AnswerService.timeOut(this.userId, gameId, tileId);
	    },
	    'Answer.post': function AnswerPost(gameId, tileId, answers) {
	      check(gameId, String);
	      check(tileId, String);
	
	      return _AnswerService.AnswerService.post(this.userId, gameId, tileId, answers);
	    },
	    'Build.info': function BuildInfo() {
	      try {
	        var result = _GameCreatorService.GameCreatorService.fetchBuildInfo();
	        var data = result.data != null ? result.data : JSON.parse(result.content);
	
	        return {
	          status: 'success',
	          data: data
	        };
	      } catch (e) {
	        console.error('ERROR: Couldn\'t get build informations: ' + e);
	        return {
	          status: 'error',
	          error: e
	        };
	      }
	    },
	    'Facebook.getUserInfo': function FacebookGetUserInfo(userId) {
	      this.unblock();
	      var user = Meteor.users.findOne(this.userId);
	      return _facebook.Facebook.getUserInfo(user, userId);
	    },
	    'Facebook.getAvatar': function FacebookGetAvatar(facebookId, type) {
	      this.unblock();
	      var user = Meteor.users.findOne(this.userId);
	      return _facebook.Facebook.getAvatar(user, facebookId, type);
	    },
	    'Facebook.getFriends': function FacebookGetFriends() {
	      this.unblock();
	      var user = Meteor.users.findOne(this.userId);
	      var friends = _FriendRepository.FriendRepository.friendsOf(this.userId);
	
	      // TODO: Figure out when to refresh friends from Facebook
	      if (friends && friends.length > 0) {
	        return friends;
	      }
	      var fbFriends = _facebook.Facebook.getFriends(user);
	      return _FriendRepository.FriendRepository.updateFriends(this.userId, fbFriends);
	    },
	    'Facebook.getPermissions': function FacebookGetPermissions() {
	      this.unblock();
	      var user = Meteor.users.findOne(this.userId);
	      return _facebook.Facebook.getPermissions(user);
	    }
	  });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map