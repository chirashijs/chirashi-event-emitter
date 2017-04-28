import { assert } from 'chai'
import { EventEmitter } from 'chirashi-event-emitter'

describe('chirashi#EventEmitter', () => {
  it('should be defined as a function', () => {
    assert.isFunction(EventEmitter)
  })

  it('should create emitter with on method', () => {
    const emitter = EventEmitter()
    assert.isFunction(emitter.on)
  })

  it('should create emitter with off method', () => {
    const emitter = EventEmitter()
    assert.isFunction(emitter.off)
  })

  it('should create emitter with emit method', () => {
    const emitter = EventEmitter()
    assert.isFunction(emitter.emit)
  })

  it('should listen event with args', done => {
    const emitter = EventEmitter()

    emitter.on('event', (a, b) => {
      assert.equal(a, 'a')
      assert.equal(b, 'b')
      done()
    })
    emitter.emit('event', 'a', 'b')
  })

  it('should return off method', done => {
    const emitter = EventEmitter()

    const off = emitter.on('event', (a, b) => {
      assert.equal(a, 'a')
      assert.equal(b, 'b')
    })
    assert.isFunction(off)
    off()
    emitter.emit('event', 'c', 'd')
    done()
  })

  it('should implement off method with callback', done => {
    const emitter = EventEmitter()

    const callback = (a, b) => {
      assert.equal(a, 'a')
      assert.equal(b, 'b')
    }

    emitter.on('event', callback)
    emitter.off('event', callback)
    emitter.emit('event', 'c', 'd')
    done()
  })

  it('should implement off method without callback', done => {
    const emitter = EventEmitter()

    const callback = (a, b) => {
      assert.equal(a, 'a')
      assert.equal(b, 'b')
    }

    emitter.on('event', callback)
    emitter.off('event')
    emitter.emit('event', 'c', 'd')
    done()
  })
})
