/**
 * ChirashiEventEmitter.js v1.0.0
 * (c) 2017 Alex Toudic
 * Released under MIT License.
 **/

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Creates a new event emitter.
 * @return {EventEmitter} emitter - The event emitter.
 * @example //esnext
 * import EventEmitter from 'chirashi-event-emitter'
 *
 * const emitter = EventEmitter()
 *
 * const off = emitter.on('event', (foo, bar) => {
 *   console.log(foo, bar)
 * })
 *
 * emitter.emit('event', 'foo', 'bar')
 * // logs: foo, bar
 * off()
 * emitter.emit('event', 'foo', 'bar')
 * // won't log anything
 * @example //es5
 * var emitter = ChirashiEventEmitter()
 *
 * var off = emitter.on('event', function (foo, bar) {
 *   console.log(foo, bar)
 * })
 *
 * emitter.emit('event', 'foo', 'bar')
 * // logs: foo, bar
 * off()
 * emitter.emit('event', 'foo', 'bar')
 * // won't log anything
 */
var EventEmitter = function EventEmitter() {
  var events = {};

  /**
   * Add event listener.
   *
   * @callback EventEmitter~on
   * @param {string} event - The event's name.
   * @param {eventCallback} callback - The callback to execute on event.
   * @returns {offCallback} off - Callback to unbind event.
   */
  var on = function on(event, callback) {
    if (!(event in events)) {
      events[event] = [];
    }

    events[event].push(callback);

    return function () {
      off(event, callback);
    };
  };

  /**
   * Remove event listener.
   *
   * @callback EventEmitter~off
   * @param {string} event - The event's name.
   * @param {eventCallback} callback - The callback executed on event.
   */
  var off = function off(event, callback) {
    if (!(event in events)) return;

    if (typeof callback === 'function') {
      var index = void 0;
      if ((index = events[event].indexOf(callback)) !== -1) {
        events[event].splice(index);
      }
    } else {
      delete events[event];
    }
  };

  /**
   * Call all listeners for an event.
   *
   * @callback EventEmitter~emit
   * @param {string} event - The event's name.
   * @param {...*} args - Arguments.
   */
  var emit = function emit(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (!(event in events)) return;

    var listeners = events[event];
    var n = listeners.length;
    for (var i = 0; i < n; ++i) {
      listeners[i].apply(listeners, args);
    }
  };

  return { on: on, off: off, emit: emit };
};

exports.EventEmitter = EventEmitter;
