import EventEmitter from '../lib'

describe('chirashi#EventEmitter', () => {
  it('should listen event with args', done => {
    const emitter = EventEmitter()

    const args = ['a', 'b']

    emitter.on('event', (...args) => {
      expect(args).toEqual(args)
      done()
    })

    emitter.emit('event', ...args)
  })

  it('should return off method', done => {
    const emitter = EventEmitter()

    const f = jest.fn()
    const g = jest.fn()

    const off = emitter.on('event', f)
    emitter.on('event', g)

    emitter.on('check', () => {
      expect(f).toHaveBeenCalledTimes(1)
      expect(g).toHaveBeenCalledTimes(2)
      done()
    })

    emitter.emit('event')
    off()
    emitter.emit('event')
    emitter.emit('check')
  })

  it('should implement off method for one callback', done => {
    const emitter = EventEmitter()

    const f = jest.fn()
    const g = jest.fn()

    emitter.on('event', f)
    emitter.on('event', g)

    emitter.on('check', () => {
      expect(f).toHaveBeenCalledTimes(1)
      expect(g).toHaveBeenCalledTimes(2)
      done()
    })

    emitter.emit('event')
    emitter.off('event', f)
    emitter.emit('event')
    emitter.emit('check')
  })

  it('should implement off all callbacks', done => {
    const emitter = EventEmitter()

    const f = jest.fn()
    const g = jest.fn()

    emitter.on('event', f)
    emitter.on('event', g)

    emitter.on('check', () => {
      expect(f).toHaveBeenCalledTimes(1)
      expect(g).toHaveBeenCalledTimes(1)
      done()
    })

    emitter.emit('event')
    emitter.off('event')
    emitter.emit('event')
    emitter.emit('check')
  })

  it('should go well if event doesn\'t exist', () => {
    const emitter = EventEmitter()

    emitter.off('null')
    emitter.emit('null')
  })

  it('should go well if callback doesn\'t exist', () => {
    const emitter = EventEmitter()

    const f = () => {}
    const g = () => {}

    emitter.on('event', f)
    emitter.off('event', g)
  })
})
