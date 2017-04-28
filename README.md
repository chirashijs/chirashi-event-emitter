[![chirashi](./logo.png)](https://chirashi.js.org)

[![npm version](https://badge.fury.io/js/chirashi-event-emitter.svg)](https://badge.fury.io/js/chirashi-event-emitter)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Code Climate](https://codeclimate.com/github/chirashijs/chirashi-event-emitter/badges/gpa.svg)](https://codeclimate.com/github/chirashijs/chirashi-event-emitter)
[![Issue Count](https://codeclimate.com/github/chirashijs/chirashi-event-emitter/badges/issue_count.svg)](https://codeclimate.com/github/chirashijs/chirashi-event-emitter)
[![Test Coverage](https://codeclimate.com/github/chirashijs/chirashi-event-emitter/badges/coverage.svg)](https://codeclimate.com/github/chirashijs/chirashi-event-emitter/coverage)
[![Build Status](https://travis-ci.org/chirashijs/chirashi-event-emitter.svg?branch=master)](https://travis-ci.org/chirashijs/chirashi-event-emitter)

## Intro

This is a tiny factory fonction to create a really simple event emitter.

## Get started

Find API documentation on [chirashijs.github.io/chirashi-event-emitter](https://chirashijs.github.io/chirashi-event-emitter).

## Quick view

### Installation

#### Using npm / yarn (recommended)

```
yarn add chirashi-event-emitter
```
or
```
npm i --save chirashi-event-emitter
```

Now you can import methods in your project:

```js
import EventEmitter from 'chirashi-event-emitter'

const emitter = EventEmitter()

const off = emitter.on('event', (foo, bar) => {
  console.log(foo, bar)
})

emitter.emit('event', 'foo', 'bar')
// logs: foo, bar
off()
emitter.emit('event', 'foo', 'bar')
// won't log anything
```

#### Standalone

You can download [chirashi-event-emitter.js](https://github.com/chirashijs/chirashi-event-emitter/releases/download/1.0.0/chirashi-event-emitter.js) or [chirashi-event-emitter.min.js](https://github.com/chirashijs/chirashi/releases/download/1.0.0/chirashi-event-emitter.min.js) and load it using a script tag. You can also use CDN version of those files from unpkg using the link [https://unpkg.com/chirashi@latest/dist/chirashi-event-emitter.min.js](https://unpkg.com/chirashi@latest/dist/chirashi-event-emitter.min.js). It'll create an instance of ChirashiEventEmitter on your window. Then use as following example

```js
const emitter = ChirashiEventEmitter()

const off = emitter.on('event', (foo, bar) => {
  console.log(foo, bar)
})

emitter.emit('event', 'foo', 'bar')
// logs: foo, bar
off()
emitter.emit('event', 'foo', 'bar')
// won't log anything
```
