// @flow

/**
 * The TEventEmitter type.
 */
export type TEventEmitter = {
  on (event: string, callback: Function): () => void,
  off (event: string, callback: Function): void,
  emit (event: string, ...args: any): void
}

/**
 * The TEventEmitter factory function.
 */
const EventEmitter = (): TEventEmitter => {
  const _events: { [event: string]: Function[] } = {}

  const self: TEventEmitter = {
    on (event, callback) {
      if (!(event in _events)) {
        _events[event] = []
      }

      _events[event].push(callback)

      return (): void => self.off(event, callback)
    },

    off (event, callback) {
      if (!(event in _events)) return

      if (typeof callback === 'function') {
        let index: number
        if ((index = _events[event].indexOf(callback)) !== -1) {
          _events[event].splice(index, 1)
        }
      } else {
        delete _events[event]
      }
    },

    emit (event, ...args) {
      if (!(event in _events)) return

      const listeners: Function[] = _events[event].slice() // copy current listeners in case of unbinding
      const n: number = listeners.length
      for (let i: number = 0; i < n; ++i) {
        setTimeout((): void => {
          listeners[i](...args)
        })
      }
    }
  }

  return self
}

export default EventEmitter
