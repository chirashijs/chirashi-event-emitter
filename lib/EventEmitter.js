// @flow

/**
 * The EventEmitter type.
 */
export type EventEmitter = {
  on (event: string, callback: Function): Function,
  off (event: string, callback: Function): void,
  emit (event: string, ...args: any): void
}

/**
 * The EventEmitter factory function.
 */
const eventEmitter = (): EventEmitter => {
  const _events: Object = {}

  const self: EventEmitter = {
    on (event: string, callback: Function): Function {
      if (!(event in _events)) {
        _events[event] = []
      }

      _events[event].push(callback)

      return _ => self.off(event, callback)
    },

    off (event: string, callback: Function): void {
      if (!(event in _events)) return

      if (typeof callback === 'function') {
        let index
        if ((index = _events[event].indexOf(callback)) !== -1) {
          _events[event].splice(index)
        }
      } else {
        delete _events[event]
      }
    },

    emit (event: string, ...args: any): void {
      if (!(event in _events)) return

      const listeners: Array<Function> = _events[event]
      const n: number = listeners.length
      for (let i = 0; i < n; ++i) {
        listeners[i](...args)
      }
    }
  }

  return self
}

export default eventEmitter
