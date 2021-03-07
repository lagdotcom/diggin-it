import EventEmitter from "events";

import { EventMap, EventName } from "./Event";

type ListenerFn = <T extends EventName>(
  name: T,
  listener: (data: EventMap[T]) => void
) => void;

interface Events {
  emit<T extends EventName>(name: T, data: EventMap[T]): boolean;
  off: ListenerFn;
  on: ListenerFn;
  once: ListenerFn;
}

export default class EventHandler implements Events {
  emit: Events["emit"];
  off: Events["off"];
  on: Events["on"];
  once: Events["once"];

  constructor() {
    const emitter = new EventEmitter();

    this.emit = (name, data) => emitter.emit(name, data);
    this.off = (name, listener) => emitter.off(name, listener);
    this.on = (name, listener) => emitter.on(name, listener);
    this.once = (name, listener) => emitter.once(name, listener);
  }
}
