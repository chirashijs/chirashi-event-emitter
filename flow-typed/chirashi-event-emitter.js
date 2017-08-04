declare module 'chirashi-event-emitter' {
  declare type TEventEmitter = {
    on (event: string, callback: Function): () => void,
    off (event: string, callback: Function): void,
    emit (event: string, ...args: any): void
  }

  declare module.exports: () => TEventEmitter
}
