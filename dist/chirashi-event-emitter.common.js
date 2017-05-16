/**
 * ChirashiEventEmitter.js v1.0.3
 * (c) 2017 Alex Toudic
 * Released under MIT License.
 **/

'use strict';

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * The TEventEmitter factory function.
 */
var EventEmitter$1 = function EventEmitter() {
  var _events = {};

  var self = {
    on: function on(event, callback) {
      if (!(event in _events)) {
        _events[event] = [];
      }

      _events[event].push(callback);

      return function () {
        return self.off(event, callback);
      };
    },
    off: function off(event, callback) {
      if (!(event in _events)) return;

      if (typeof callback === 'function') {
        var index = void 0;
        if ((index = _events[event].indexOf(callback)) !== -1) {
          _events[event].splice(index);
        }
      } else {
        delete _events[event];
      }
    },
    emit: function emit(event) {
      if (!(event in _events)) return;

      var listeners = _events[event];
      var n = listeners.length;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = 0; i < n; ++i) {
        listeners[i].apply(listeners, toConsumableArray(args));
      }
    }
  };

  return self;
};

module.exports = EventEmitter$1;
