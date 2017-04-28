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
const EventEmitter = () => {
  const events = {}

  /**
   * Add event listener.
   *
   * @callback EventEmitter~on
   * @param {string} event - The event's name.
   * @param {eventCallback} callback - The callback to execute on event.
   * @returns {offCallback} off - Callback to unbind event.
   */
  const on = (event, callback) => {
    if (!(event in events)) {
      events[event] = []
    }

    events[event].push(callback)

    return () => { off(event, callback) }
  }

  /**
   * Remove event listener.
   *
   * @callback EventEmitter~off
   * @param {string} event - The event's name.
   * @param {eventCallback} callback - The callback executed on event.
   */
  const off = (event, callback) => {
    if (!(event in events)) return

    if (typeof callback === 'function') {
      let index
      if ((index = events[event].indexOf(callback)) !== -1) {
        events[event].splice(index)
      }
    } else {
      delete events[event]
    }
  }

  /**
   * Call all listeners for an event.
   *
   * @callback EventEmitter~emit
   * @param {string} event - The event's name.
   * @param {...*} args - Arguments.
   */
  const emit = (event, ...args) => {
    if (!(event in events)) return

    const listeners = events[event]
    const n = listeners.length
    for (let i = 0; i < n; ++i) {
      listeners[i](...args)
    }
  }

  return { on, off, emit }
}

/**
 * @typedef EventEmitter
 * @property {EventEmitter~on} on
 * @property {EventEmitter~off} off
 * @property {EventEmitter~emit} emit
 */

/**
 * Callback to execute on event.
 * @callback eventCallback
 * @param {...*} args - Arguments.
 */

/**
 * Callback to unbind event.
 * @callback offCallback
 */

export default EventEmitter
